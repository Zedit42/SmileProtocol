// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SmileProtocolToken is ERC20, Ownable {
    constructor(string memory _name, string memory _short) ERC20(_name, _short) {}

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}
