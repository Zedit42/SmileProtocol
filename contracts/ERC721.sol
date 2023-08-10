// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract SmileProtocol_ProjectNFT is ERC721, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    mapping(uint256 => uint256) private idToPower;
    mapping(address => uint256) private userToID;

    constructor(string memory _projectName, string memory _projectShortname) ERC721(_projectName, _projectShortname) {}

    function safeMint(address to, uint256 _votePower) public onlyOwner {
        if(balanceOf(to) == 0){
            uint256 tokenId = _tokenIdCounter.current();
            _tokenIdCounter.increment();
            _safeMint(to, tokenId);
            userToID[to] = tokenId;
            idToPower[tokenId] += _votePower;
        } else {
            idToPower[userToID[to]] += _votePower;
        }
    }

    function getUserPower(address _user) external view onlyOwner returns(uint256) {
        return idToPower[userToID[_user]];
    }

    function getNFTPower(uint256 _tokenID) external view onlyOwner returns(uint256) {
        return idToPower[_tokenID];
    }
}