// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";

contract FBXNFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    address admin;

    event mintedNFT(
        address indexed owner,
        uint256 indexed tokenId,
        string tokenUrl
    );

    constructor() ERC721("Anvil3dNFT", "ANV3D") {}

    function createNFT(string memory tokenUrl) public returns (uint256) {
        _tokenIdCounter.increment();
        uint256 newTokenId = _tokenIdCounter.current();

        _safeMint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenUrl);

        emit mintedNFT(msg.sender, newTokenId, tokenUrl);

        return newTokenId;
    }
}
