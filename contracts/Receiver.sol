// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import {CCIPReceiver} from "@chainlink/contracts-ccip/src/v0.8/ccip/applications/CCIPReceiver.sol";
import {Client} from "@chainlink/contracts-ccip/src/v0.8/ccip/libraries/Client.sol";
import {Main} from "./main.sol";

contract DestinationDonor is CCIPReceiver {
    Main mainContract;

    event DonateCallSuccessfull();

    constructor(address router, address mainAddress) CCIPReceiver(router) {
        mainContract = Main(mainAddress);
    }

    function _ccipReceive(
        Client.Any2EVMMessage memory message
    ) internal override {
        (bool success, ) = address(mainContract).call(message.data);
        require(success);
        emit DonateCallSuccessfull();
    }
}