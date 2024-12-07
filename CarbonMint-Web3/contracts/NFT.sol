// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract CarbonMintNFT is ERC721 {
    uint256 public tokenCounter;

    constructor() ERC721("CarbonMintNFT", "CMNFT") {}

    function mintNFT(address to) public {
        _safeMint(to, tokenCounter);
        tokenCounter++;
    }
}
