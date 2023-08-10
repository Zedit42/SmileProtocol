// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./ERC721.sol";
import "./ERC20.sol";


contract Main {

    event newProject(uint256 indexed _projectID, string _projectName, address indexed _owner, uint256 _timestamp);
    event newWithdrawalRequest(uint256 indexed _projectID, uint256 _reqID, string _projectName, uint256 _amount, string _description, uint256 endTimestamp);
    event claimedWithdrawalRequest(uint256 indexed _projectID, uint256 _reqID, string _projectName, uint256 _amount, string _description);
    event newDonation(address indexed _donor, uint256 indexed _projectID, uint256 _amount);
    event newVote(address indexed _voter, uint256 indexed _projectID, uint256 _reqID, bool _vote, uint256 _power);

    ERC20Token immutable SMILE;
    ERC20Token immutable CCIPBnM;
    Project[] private projects;
    mapping(uint256 => WithdrawalRequest[]) private requests;
    mapping(uint256 => mapping(uint256 => mapping(address => bool[2]))) private voteStatus;
    mapping(address => mapping(uint256 => uint256)) private addressToDonationAmount;
    uint256 constant minSecondsToVote = 1209600;
    uint8 constant maxFailedWithdrawalRequests = 3;

    constructor(address _ccipBnM){
        SMILE = new ERC20Token("Smile Protocol", "SMILE");
        CCIPBnM = ERC20Token(_ccipBnM);
    }

    struct Project {
        uint256 id;
        address projectOwner;
        //bytes32 EAS_UID;
        string projectName;
        uint256 currentBalance;
        uint256 totalDonationAmount;
        uint256 goalAmount;
        uint256 withdrawalRequestCount;
        uint256 failedWithdrawalRequestCount;
        ProjectNFT projectNFT;
        bool isActive;
    }

    struct WithdrawalRequest{
        uint256 requestID;
        uint256 amount;
        uint256 approvals;
        uint256 declines;
        uint256 endTimestamp;
        string description;
        bool isActive;
    }

    struct ProjectNFT {
        address nftAddress;
        uint256 threshold;
        uint256 maxSupply;
        uint256 voterCount;
    }

    function deployNewProject(
        //bytes32 _EAS_UID,
        string calldata _projectName,
        uint256 _goalAmount,
        uint256 _nftThreshold,
        uint256 _nftMaxSupply,
        string calldata _nftShort
    ) external returns (uint256) {

        uint256 currentID = projects.length;

        SmileProtocol_ProjectNFT nftContract = new SmileProtocol_ProjectNFT(_projectName, _nftShort);

        projects.push(Project({
            id: currentID,
            projectOwner: msg.sender,
            //EAS_UID: _EAS_UID,
            projectName: _projectName,
            currentBalance: 0,
            totalDonationAmount: 0,
            goalAmount: _goalAmount,
            withdrawalRequestCount: 0,
            failedWithdrawalRequestCount: 0,
            projectNFT: ProjectNFT({
                nftAddress: address(nftContract),
                threshold: _nftThreshold,
                maxSupply: _nftMaxSupply,
                voterCount: 0
            }),
            isActive: true
        }));

        requests[currentID].push(WithdrawalRequest({
            requestID: 0,
            amount: 0,
            approvals: 0,
            declines: 0,
            endTimestamp: 0,
            description: "",
            isActive: true
        }));

        emit newProject(currentID ,_projectName, msg.sender, block.timestamp);
        return currentID;
    }

    function getProject(uint256 _projectID) external view returns(Project memory) {
        return projects[_projectID];
    }


    function donate(uint256 _projectID, uint256 _amount) external {
        require(_amount > 0, "The donation amount must be greater than 0.");
        require(projects[_projectID].isActive, "This project is not active.");
        require(_amount <= SMILE.balanceOf(msg.sender), "Insufficient balance.");
        require(_amount <= SMILE.allowance(msg.sender, address(this)));
        
        SMILE.transferFrom(msg.sender, address(this), _amount);
        Project storage project = projects[_projectID];
        project.totalDonationAmount += _amount;
        project.currentBalance += _amount;

        addressToDonationAmount[msg.sender][_projectID] += _amount;
        
        if(_amount >= project.projectNFT.threshold) {
            uint256 votePower = _amount / project.projectNFT.threshold;
            SmileProtocol_ProjectNFT(project.projectNFT.nftAddress).safeMint(msg.sender, votePower);
            project.projectNFT.voterCount += votePower;
        }
    }

    function createWithdrawalRequest(uint256 _projectID, uint256 _amount, uint256 _endTimestamp, string memory _description) external {
        require(msg.sender == projects[_projectID].projectOwner, "You are not authorized");
        require(projects[_projectID].isActive, "This project is no longer active.");
        require(_amount > 0, "The withdrawal amount must be greater than 0.");
        require(block.timestamp > checkLastWithdrawalRequest(_projectID).endTimestamp, "There is already an active withdrawal request.");
        require(_amount <= projects[_projectID].currentBalance, "Unvalid amount.");
        require(_endTimestamp >= (block.timestamp + minSecondsToVote), "There must be a minimum 14 days voting period.");

        if(checkLastWithdrawalRequest(_projectID).declines > checkLastWithdrawalRequest(_projectID).approvals){
            projects[_projectID].failedWithdrawalRequestCount++;
        } else if (projects[_projectID].failedWithdrawalRequestCount > 0) {
            projects[_projectID].failedWithdrawalRequestCount = 0;
        }

        if(projects[_projectID].failedWithdrawalRequestCount == maxFailedWithdrawalRequests) {
            projects[_projectID].isActive = false;
            return;
        } else {
            requests[_projectID].push(WithdrawalRequest({
            requestID: projects[_projectID].withdrawalRequestCount,
            amount: _amount,
            approvals: 0,
            declines: 0,
            endTimestamp: _endTimestamp,
            description: _description,
            isActive: true
            }));

            emit newWithdrawalRequest(
                _projectID,
                projects[_projectID].withdrawalRequestCount,
                projects[_projectID].projectName,
                _amount,
                _description,
                _endTimestamp
            );

            checkLastWithdrawalRequest(_projectID).isActive = false;
            projects[_projectID].withdrawalRequestCount++;
        }
    }

    function checkWithdrawalRequest(uint256 _projectID, uint256 _reqID) public view returns(WithdrawalRequest memory) {
        return requests[_projectID][_reqID];
    }

    function checkLastWithdrawalRequest(uint256 _projectID) public view returns(WithdrawalRequest memory) {
        return requests[_projectID][(projects[_projectID].withdrawalRequestCount)];
    }

    function checkVotes(uint256 _projectID, uint256 _reqID) internal view returns(bool){
        return (checkWithdrawalRequest(_projectID, _reqID).approvals > checkWithdrawalRequest(_projectID, _reqID).declines);
    }

    function claimWithdrawal(uint256 _projectID, uint256 _reqID) external {
        require(msg.sender == projects[_projectID].projectOwner, "You are not authorized");
        require(checkWithdrawalRequest(_projectID, _reqID).isActive, "This withdrawal is not active.");
        require(block.timestamp > checkWithdrawalRequest(_projectID, _reqID).endTimestamp);
        require(checkVotes(_projectID, _reqID), "There is no consensus!");
        require(checkWithdrawalRequest(_projectID, _reqID).amount <= projects[_projectID].currentBalance);

        requests[_projectID][_reqID].isActive = false;
        projects[_projectID].currentBalance -= checkWithdrawalRequest(_projectID, _reqID).amount;
        SMILE.transfer(projects[_projectID].projectOwner, checkWithdrawalRequest(_projectID, _reqID).amount);

        emit claimedWithdrawalRequest(
            _projectID,
            _reqID,
            projects[_projectID].projectName,
            checkWithdrawalRequest(_projectID, _reqID).amount,
            checkWithdrawalRequest(_projectID, _reqID).description
        );
    }

    function getVotePower(uint256 _projectID, address _user) internal view returns(uint256) {
        return SmileProtocol_ProjectNFT(projects[_projectID].projectNFT.nftAddress).getUserPower(_user);
    }

    function myVotePower(uint256 _projectID) external view returns(uint256) {
        return SmileProtocol_ProjectNFT(projects[_projectID].projectNFT.nftAddress).getUserPower(msg.sender);
    }

    function vote(uint256 _projectID, uint256 _reqID, bool _vote) external {
        require(SmileProtocol_ProjectNFT(projects[_projectID].projectNFT.nftAddress).balanceOf(msg.sender) > 0, "You are not eligible to vote.");
        require(checkLastWithdrawalRequest(_projectID).isActive, "This withdrawal request is no longer active.");
        require(block.timestamp < checkLastWithdrawalRequest(_projectID).endTimestamp, "You are late to vote.");
        require(!voteStatus[_projectID][_reqID][msg.sender][0], "You have already voted.");

        voteStatus[_projectID][_reqID][msg.sender][0] = true;

        if(_vote){
            voteStatus[_projectID][_reqID][msg.sender][1] = true;
            checkLastWithdrawalRequest(_projectID).approvals += getVotePower(_projectID, msg.sender);
        } else {
            voteStatus[_projectID][_reqID][msg.sender][1] = false;
            checkLastWithdrawalRequest(_projectID).declines += getVotePower(_projectID, msg.sender);
        }

        emit newVote(msg.sender, _projectID, _reqID, _vote, getVotePower(_projectID, msg.sender));
    }

    function buySMILE(uint256 _amount) external {
        require(_amount > 0, "Amount must be greater than 0.");
        require(_amount <= CCIPBnM.balanceOf(msg.sender), "Insufficient balance.");
        require(_amount <= CCIPBnM.allowance(msg.sender, address(this)));

        CCIPBnM.transferFrom(msg.sender, address(this), _amount);
        SMILE.mint(msg.sender, _amount);
    }

    function sellSMILE(uint256 _amount) external {
        require(_amount > 0, "Amount must be greater than 0.");
        require(_amount <= SMILE.balanceOf(msg.sender), "Insufficient balance.");
        require(_amount <= SMILE.allowance(msg.sender, address(this)));

        SMILE.burnFrom(msg.sender, _amount);
        CCIPBnM.transfer(msg.sender, _amount);
    }

    function getArchivedDonation(uint256 _projectID) external {
        require(!projects[_projectID].isActive);
        require(addressToDonationAmount[msg.sender][_projectID] > 0);

        uint256 donationAmount = addressToDonationAmount[msg.sender][_projectID];
        addressToDonationAmount[msg.sender][_projectID] = 0;
        SMILE.transfer(msg.sender, donationAmount);
    }

    function reloadProjectActivity(uint256 _projectID) external returns(bool){
        require(projects[_projectID].isActive);
        require(projects[_projectID].failedWithdrawalRequestCount == 2);
        require(block.timestamp > checkLastWithdrawalRequest(_projectID).endTimestamp);
        require(checkLastWithdrawalRequest(_projectID).isActive);

        if(checkLastWithdrawalRequest(_projectID).declines > checkLastWithdrawalRequest(_projectID).approvals){
            requests[_projectID][(requests[_projectID].length)-1].isActive = false;
            projects[_projectID].isActive = false;
        }
    }
}