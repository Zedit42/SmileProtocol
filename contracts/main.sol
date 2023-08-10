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

    error InvalidAmount();
    error NotActive();
    error Insufficent();
    error NoAllowance();
    error Unauthorized();
    error AlreadyActive();
    error NoConsensus();
    error AlreadyVoted();

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
        uint256 currentBalance;
        uint256 totalDonationAmount;
        uint256 withdrawalRequestCount;
        uint256 failedWithdrawalRequestCount;
        ProjectNFT projectNFT;
        uint256 goalAmount;
        bool isActive;
    }

    struct WithdrawalRequest{
        //bytes32 EAS_UID
        uint256 requestID;
        uint256 amount;
        uint256 approvals;
        uint256 declines;
        uint256 endTimestamp;
        bool isActive;
    }

    struct ProjectNFT {
        address nftAddress;
        uint256 threshold;
        uint256 maxSupply;
        uint256 holders;
        uint256 voterCount;
    }

    function deployNewProject(
        string calldata _projectName,
        uint256 _goalAmount,
        uint256 _nftThreshold,
        uint256 _nftMaxSupply,
        string calldata _nftShort,
        string calldata _description
    ) external returns (uint256) {

        uint256 currentID = projects.length;

        SmileProtocol_ProjectNFT nftContract = new SmileProtocol_ProjectNFT(_projectName, _nftShort);
        
        // EAS Attestation newProject
        /*
        uint256 id currentID
        address projectOwner msg.sender
        string projectName _projectName
        string description _description
        uint256 goalAmount _goalAmount
        address projectNFTaddress nftContract
        */

        projects.push(Project({
            id: currentID,
            projectOwner: msg.sender,
            //EAS_UID: EAS_UID,
            currentBalance: 0,
            totalDonationAmount: 0,
            goalAmount: _goalAmount,
            withdrawalRequestCount: 0,
            failedWithdrawalRequestCount: 0,
            projectNFT: ProjectNFT({
                nftAddress: address(nftContract),
                threshold: _nftThreshold,
                voterCount: 0
            }),
            isActive: true
        }));

        requests[currentID].push(WithdrawalRequest({
            //EAS_UID: EAS_UID,
            requestID: 0,
            amount: 0,
            approvals: 0,
            declines: 0,
            endTimestamp: 0,
            isActive: true
        }));
       
        emit newProject(currentID ,_projectName, msg.sender, block.timestamp);
        return currentID;
    }

    function getProject(uint256 _projectID) external view returns(Project memory) {
        return projects[_projectID];
    }


    function donate(uint256 _projectID, uint256 _amount) external {
        if(_amount <= 0) revert InvalidAmount();
        if(!projects[_projectID].isActive) revert NotActive();
        if(_amount > projects[_projectID].goalAmount - projects[_projectID].currentBalance) revert InvalidAmount();
        if(_amount > SMILE.balanceOf(msg.sender)) revert Insufficent();
        if(_amount > SMILE.allowance(msg.sender, address(this))) revert NoAllowance();
        
        SMILE.transferFrom(msg.sender, address(this), _amount);
        Project storage project = projects[_projectID];
        project.totalDonationAmount += _amount;
        project.currentBalance += _amount;

        // EAS Attestation donation
        /*
        bytes32 projectEAS_UID projects[_projectID].EAS_UID (reference)
        uint256 id _projectID
        address supporter msg.sender
        string amount _amount
        */

        addressToDonationAmount[msg.sender][_projectID] += _amount;
        
        if(_amount >= project.projectNFT.threshold && project.projectNFT.holders < projects.projectNFT.maxSupply) {
            uint256 votePower = _amount / project.projectNFT.threshold;
            if(SmileProtocol_ProjectNFT(projects.projectNFT.nftAddress).balanceOf(msg.sender) == 0) project.projectNFT.holders++;
            SmileProtocol_ProjectNFT(project.projectNFT.nftAddress).safeMint(msg.sender, votePower);
            project.projectNFT.voterCount += votePower;
        }
    }

    function createWithdrawalRequest(uint256 _projectID, uint256 _amount, uint256 _endTimestamp, string memory _description) external {
        if(msg.sender != projects[_projectID].projectOwner) revert Unauthorized();
        if(projects[_projectID].isActive) revert NotActive();
        if(_amount <= 0) revert InvalidAmount();
        if(block.timestamp < checkLastWithdrawalRequest(_projectID).endTimestamp) revert AlreadyActive();
        if(_amount > projects[_projectID].currentBalance) revert Insufficent();
        if(_endTimestamp < (block.timestamp + minSecondsToVote)) revert InvalidAmount();

        if(checkLastWithdrawalRequest(_projectID).declines > checkLastWithdrawalRequest(_projectID).approvals){
            projects[_projectID].failedWithdrawalRequestCount++;
        } else if (projects[_projectID].failedWithdrawalRequestCount > 0) {
            projects[_projectID].failedWithdrawalRequestCount = 0;
        }

        if(projects[_projectID].failedWithdrawalRequestCount == maxFailedWithdrawalRequests) {
            projects[_projectID].isActive = false;
            return;
        } else {

            // EAS Attestation newWithdrawalRequest
            /*
            bytes32 projectEAS_UID projects[_projectID].EAS_UID (reference)
            uint256 projectID _projectID
            uint256 requestID projects[_projectID].withdrawalRequestCount
            uint256 amount _amount
            uint256 endTimestamp
            string description _description
            */

            requests[_projectID].push(WithdrawalRequest({
                //EAS_UID: EAS_UID
                requestID: projects[_projectID].withdrawalRequestCount,
                amount: _amount,
                approvals: 0,
                declines: 0,
                endTimestamp: _endTimestamp,
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

    function checkLastWithdrawalRequest(uint256 _projectID) public view returns(WithdrawalRequest memory) {
        return requests[_projectID][(projects[_projectID].withdrawalRequestCount)];
    }

    function claimWithdrawal(uint256 _projectID, uint256 _reqID) external {
        if(msg.sender != projects[_projectID].projectOwner) revert Unauthorized();
        if(block.timestamp < requests[_projectID][_reqID].endTimestamp) revert AlreadyActive();
        if(requests[_projectID][_reqID].approvals < requests[_projectID][_reqID].declines) revert NoConsensus();
        if(requests[_projectID][_reqID].amount > projects[_projectID].currentBalance) revert Insufficent();

        requests[_projectID][_reqID].isActive = false;
        projects[_projectID].currentBalance -= requests[_projectID][_reqID].amount;
        SMILE.transfer(projects[_projectID].projectOwner, requests[_projectID][_reqID].amount);

        emit claimedWithdrawalRequest(
            _projectID,
            _reqID,
            projects[_projectID].projectName,
            requests[_projectID][_reqID].amount,
            requests[_projectID][_reqID].description
        );

        // EAS Attestation claimWithdrawal
        /*
        bytes32 EAS_UID requests[_projectID][_reqID].EAS_UID (reference)
        uint256 id _projectID
        uint256 projectOwner msg.sender
        uint256 amount requests[_projectID][_reqID].amount
        */
    }

    function getVotePower(uint256 _projectID, address _user) internal view returns(uint256) {
        return SmileProtocol_ProjectNFT(projects[_projectID].projectNFT.nftAddress).getUserPower(_user);
    }

    function vote(uint256 _projectID, uint256 _reqID, bool _vote) external {
        if(SmileProtocol_ProjectNFT(projects[_projectID].projectNFT.nftAddress).balanceOf(msg.sender) == 0) revert Unauthorized();
        if(!checkLastWithdrawalRequest(_projectID).isActive) revert NotActive();
        if(block.timestamp > checkLastWithdrawalRequest(_projectID).endTimestamp) revert NotActive();
        if(voteStatus[_projectID][_reqID][msg.sender][0]) revert AlreadyVoted();

        voteStatus[_projectID][_reqID][msg.sender][0] = true;

        if(_vote){
            voteStatus[_projectID][_reqID][msg.sender][1] = true;
            checkLastWithdrawalRequest(_projectID).approvals += getVotePower(_projectID, msg.sender);
        } else {
            voteStatus[_projectID][_reqID][msg.sender][1] = false;
            checkLastWithdrawalRequest(_projectID).declines += getVotePower(_projectID, msg.sender);
        }

        
        // EAS Attestation vote
        /*
        bytes32 EAS_UID requests[_projectID][_reqID].EAS_UID (reference)
        address supporter msg.sender
        bool vote _vote
        */

        

        emit newVote(msg.sender, _projectID, _reqID, _vote, getVotePower(_projectID, msg.sender));
    }

    function buySMILE(uint256 _amount) external {
        if(_amount <= 0) revert InvalidAmount();
        if(_amount > CCIPBnM.balanceOf(msg.sender)) revert Insufficent();
        if(_amount > CCIPBnM.allowance(msg.sender, address(this))) revert NoAllowance();

        CCIPBnM.transferFrom(msg.sender, address(this), _amount);
        SMILE.mint(msg.sender, _amount);
    }

    function sellSMILE(uint256 _amount) external {
        if(_amount <= 0) revert InvalidAmount();
        if(_amount > SMILE.balanceOf(msg.sender)) revert Insufficent();
        if(_amount > SMILE.allowance(msg.sender, address(this))) revert NoAllowance();

        SMILE.burnFrom(msg.sender, _amount);
        CCIPBnM.transfer(msg.sender, _amount);
    }

    function getArchivedDonation(uint256 _projectID) external {
        if(projects[_projectID].isActive) revert AlreadyActive();
        if(addressToDonationAmount[msg.sender][_projectID] == 0) revert Insufficent();

        uint256 donationAmount = addressToDonationAmount[msg.sender][_projectID];
        addressToDonationAmount[msg.sender][_projectID] = 0;
        SMILE.transfer(msg.sender, donationAmount);
    }

    function reloadProjectActivity(uint256 _projectID) external {
        if(!projects[_projectID].isActive) revert NotActive();
        if(projects[_projectID].failedWithdrawalRequestCount != 2) revert InvalidAmount();
        if(block.timestamp < checkLastWithdrawalRequest(_projectID).endTimestamp) revert AlreadyActive();

        if(checkLastWithdrawalRequest(_projectID).declines > checkLastWithdrawalRequest(_projectID).approvals){
            requests[_projectID][(requests[_projectID].length)-1].isActive = false;
            projects[_projectID].isActive = false;
        }
    }
}