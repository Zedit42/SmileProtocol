// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./ERC721.sol";
import "./ERC20.sol";


contract Main {

    event newProject(uint256 indexed _projectID, string _projectName, address indexed _owner, uint256 _timestamp);
    event newWithdrawalRequest(uint256 indexed _projectID, uint256 _reqID, string _projectName, uint256 _amount, string _description, uint256 endTimestamp);

    SmileProtocolToken immutable SMILE;
    Project[] public projects;
    mapping(uint256 => WithdrawalRequest[]) requests;
    mapping(uint256 => mapping(uint256 => mapping(address => bool))) voteStatus;
    uint256 constant minSecondsToVote = 1209600;
    uint8 constant maxFailedWithdrawalRequests = 3;

    constructor(){
        SMILE = new SmileProtocolToken("Smile Protocol", "SMILE");
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
            description: ""
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
        
        if(_amount >= project.projectNFT.threshold) {
            uint256 votePower = _amount / project.projectNFT.threshold;
            SmileProtocol_ProjectNFT(project.projectNFT.nftAddress).safeMint(msg.sender, votePower);
            project.projectNFT.voterCount += votePower;
        }
    }

    function getVotePower(uint256 _projectID) external view returns(uint256){
        return SmileProtocol_ProjectNFT(projects[_projectID].projectNFT.nftAddress).getUserPower(msg.sender);
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
            description: _description
            }));

            emit newWithdrawalRequest(
                _projectID,
                projects[_projectID].withdrawalRequestCount,
                projects[_projectID].projectName,
                _amount,
                _description,
                _endTimestamp
            );

            projects[_projectID].withdrawalRequestCount++;
        }
    }

    function checkWithdrawalRequest(uint256 _projectID, uint256 _reqID) external view returns(WithdrawalRequest memory) {
        return requests[_projectID][_reqID];
    }

    function checkLastWithdrawalRequest(uint256 _projectID) public view returns(WithdrawalRequest memory) {
        return requests[_projectID][(projects[_projectID].withdrawalRequestCount)-1];
    }
}