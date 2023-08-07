// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./ERC721.sol";
import "./ERC20.sol";


contract Main {

    event newProject(string _projectName, address indexed _owner, uint256 _timestamp);
    
    SmileProtocolToken immutable SMILE;
    Project[] public projects;
    mapping(uint256 => WithdrawalRequest[]) requests;

    constructor(){
        SMILE = new SmileProtocolToken("Smile Protocol", "SMILE");
    }

    struct Project {
        uint256 id;
        address projectOwner;
        //bytes32 EAS_UID;
        string projectName;
        uint256 donationAmount;
        uint256 goalAmount;
        uint256 withdrawalRequestCount;
        ProjectNFT projectNFT;
        bool isActive;
    }

    struct WithdrawalRequest{
        uint256 requestID;
        uint256 amount;
        uint256 approvals;
        uint256 declines;
        uint256 endlineTimestamp;
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
            donationAmount: 0,
            goalAmount: _goalAmount,
            withdrawalRequestCount: 0,
            projectNFT: ProjectNFT({
                nftAddress: address(nftContract),
                threshold: _nftThreshold,
                maxSupply: _nftMaxSupply,
                voterCount: 0
            }),
            isActive: true
        }));

        emit newProject(_projectName, msg.sender, block.timestamp);
        return currentID;
    }

    function getProject(uint256 _projectID) external view returns(Project memory) {
        return projects[_projectID];
    }


    function donate(uint256 _projectID, uint256 _amount) external {
        require(projects[_projectID].isActive, "This project is not active.");
        require(_amount <= SMILE.balanceOf(msg.sender), "Insufficient balance.");
        require(_amount <= SMILE.allowance(msg.sender, address(this)));
        
        SMILE.transferFrom(msg.sender, address(this), _amount);
        Project storage project = projects[_projectID];
        project.donationAmount += _amount;
        
        if(_amount >= project.projectNFT.threshold) {
            uint256 votePower = _amount / project.projectNFT.threshold;
            SmileProtocol_ProjectNFT(project.projectNFT.nftAddress).safeMint(msg.sender, votePower);
            project.projectNFT.voterCount += votePower;
        }
    }

    function getVotePower(uint256 _projectID) external view returns(uint256){
        return SmileProtocol_ProjectNFT(projects[_projectID].projectNFT.nftAddress).getUserPower(msg.sender);
    }

    /*
    function getNFTPower(uint256 _projectID, uint256 _id) external view returns(uint256){
        return SmileProtocol_ProjectNFT(projects[_projectID].projectNFT.nftAddress).getNFTPower(msg.sender);
    }
    */
}