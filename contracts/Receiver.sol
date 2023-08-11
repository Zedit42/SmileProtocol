// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import {CCIPReceiver} from "@chainlink/contracts-ccip/src/v0.8/ccip/applications/CCIPReceiver.sol";
import {Client} from "@chainlink/contracts-ccip/src/v0.8/ccip/libraries/Client.sol";
import {Main} from "./main.sol";
import "./ERC20.sol";

contract DestinationDonor is CCIPReceiver {
    Main mainContract;
    ERC20 immutable SMILE;
    ERC20 immutable CCIPBnM;
    
    
    event DonateCallSuccessfull();

    constructor(address router, address _mainAddress, address _ccip, address _smile) CCIPReceiver(router) {
        mainContract = Main(_mainAddress);
        SMILE = ERC20(_smile);
        CCIPBnM = ERC20(_ccip);
    }

    function _ccipReceive(
        Client.Any2EVMMessage memory message
    ) internal override {
        CCIPBnM.approve(address(mainContract), type(uint256).max);
        SMILE.approve(address(mainContract), type(uint256).max);
        (bool success, ) = address(mainContract).call(message.data);
        require(success);
        emit DonateCallSuccessfull();
    }
}