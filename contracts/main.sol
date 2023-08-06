// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Main {

    struct Project {
        uint256 id;
        address projectOwner;
        bytes32 EAS_UID;
        string projectName;
        uint256 supporterCount;
        uint256 donationAmount;
        uint256 goalAmount;
        bool isActive;
        WithdrawalRequest[] requests;
    }

    struct WithdrawalRequest{
        uint256 requestID;
        uint256 amount;
        uint256 approvals;
        uint256 declines;
        uint256 endlineTimestamp;
        bool isActive;
    }

    Project[] projects;
}