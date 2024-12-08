// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract CarbonMintNFT01 is ERC721 {
    uint256 private _tokenIdCounter;

    constructor() ERC721("CarbonMintNFT", "CMNFT") {
        _tokenIdCounter = 0; // Inicializa el contador de IDs
    }

    function mintNFT(address recipient) public returns (uint256) {
        _tokenIdCounter++; // Incrementa manualmente el contador
        uint256 newTokenId = _tokenIdCounter;
        _mint(recipient, newTokenId);
        return newTokenId;
    }
}
