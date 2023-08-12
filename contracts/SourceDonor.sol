// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import {LinkTokenInterface} from "@chainlink/contracts/src/v0.8/interfaces/LinkTokenInterface.sol";
import {IRouterClient} from "@chainlink/contracts-ccip/src/v0.8/ccip/interfaces/IRouterClient.sol";
import {Client} from "@chainlink/contracts-ccip/src/v0.8/ccip/libraries/Client.sol";

interface IERC20 {
    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
}

interface Main {
    function buySmileAndDonate(address donor, uint256 _projectID, uint256 _amount) external;
}

/**
 * THIS IS AN EXAMPLE CONTRACT THAT USES HARDCODED VALUES FOR CLARITY.
 * THIS IS AN EXAMPLE CONTRACT THAT USES UN-AUDITED CODE.
 * DO NOT USE THIS CODE IN PRODUCTION.
 */
contract SourceDonor {
    enum PayFeesIn {
        Native,
        LINK
    }

    address immutable i_router;
    address immutable i_ccipbnm;

    event MessageSent(bytes32 messageId);

    constructor(address router, address ccipbnm) {
        i_router = router;
        i_ccipbnm = ccipbnm;
    }

    receive() external payable {}

    function buySmileAndDonate(
        uint64 destinationChainSelector,
        address receiver,
        uint256 projectId,        
        uint256 amount
    ) payable external {

        if (IERC20(i_ccipbnm).allowance(msg.sender, address(this)) < amount) revert("Allowance not enough");
        IERC20(i_ccipbnm).transferFrom(msg.sender, address(this), amount);

        bool supported = IRouterClient(i_router).isChainSupported(destinationChainSelector);
        if (!supported) {
            revert("Chain not supported");
        }

        Client.EVM2AnyMessage memory message = Client.EVM2AnyMessage({
            receiver: abi.encode(receiver),
            data: abi.encodeCall(Main.buySmileAndDonate,(msg.sender, projectId, amount)),
            tokenAmounts: new Client.EVMTokenAmount[](0),
            extraArgs: Client._argsToBytes(
                Client.EVMExtraArgsV1({gasLimit: 900_000, strict: false}) // Additional arguments, setting gas limit and non-strict sequency mode
            ),
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


/*

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
*/