// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;


import {IRouterClient} from "@chainlink/contracts-ccip/src/v0.8/ccip/interfaces/IRouterClient.sol";
import {Client} from "@chainlink/contracts-ccip/src/v0.8/ccip/libraries/Client.sol";


contract SourceDonor {

    address immutable i_router;
    
    event MessageSent(bytes32 messageId);

    constructor(address router) {
        i_router = router;
    }

    receive() external payable {}

    function buySmileAndDonate(
        uint64 destinationChainSelector,
        address receiver,
        uint256 _projectId,
        address _tokenAddress,
        uint256 _tokenAmount
    ) external {

        // Create an instance of EVMTokenAmount
        Client.EVMTokenAmount memory tokenTransfer = Client.EVMTokenAmount({
            token: _tokenAddress,
            amount: _tokenAmount
        });

        // Create an array of EVMTokenAmount and add the tokenTransfer to it
        Client.EVMTokenAmount[] memory tokenAmounts = new Client.EVMTokenAmount[](1);
        tokenAmounts[0] = tokenTransfer;

        Client.EVM2AnyMessage memory message = Client.EVM2AnyMessage({
            receiver: abi.encode(receiver),
            data: abi.encodeWithSignature("buySmileAndDonate(uint256,uint256)", _projectId, _tokenAmount),
            tokenAmounts: tokenAmounts,
            extraArgs: "",
            feeToken: address(0)
        });

        uint256 fee = IRouterClient(i_router).getFee(
            destinationChainSelector,
            message
        );

        bytes32 messageId;

        messageId = IRouterClient(i_router).ccipSend{value: fee}(
            destinationChainSelector,
            message
        );
        
        emit MessageSent(messageId);
    }
}