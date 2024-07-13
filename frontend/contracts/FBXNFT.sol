// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";

contract FBXNFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    address admin;

    struct NFT {
        uint256 tokenId;
        address payable owner;
        uint256 price;
        bool forSale;
    }

    mapping(uint256 => NFT) public nfts;

    event MintedNFT(
        address indexed owner,
        uint256 indexed tokenId,
        string tokenUrl
    );

    event ListedNFT(uint256 indexed tokenId, uint256 price, bool forSale);

    event PurchasedNFT(
        uint256 indexed tokenId,
        address indexed newOwner,
        uint256 price
    );

    constructor() ERC721("Anvil3dNFT", "ANV3D") {
        admin = msg.sender;
    }

    function createNFT(string memory tokenUrl) public returns (uint256) {
        _tokenIdCounter.increment();
        uint256 newTokenId = _tokenIdCounter.current();

        _safeMint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenUrl);

        nfts[newTokenId] = NFT(newTokenId, payable(msg.sender), 0, false);

        emit MintedNFT(msg.sender, newTokenId, tokenUrl);

        return newTokenId;
    }

    function listNFT(uint256 tokenId, uint256 price) public {
        require(
            ownerOf(tokenId) == msg.sender,
            "Only the owner can list this NFT"
        );
        require(price > 0, "Price must be greater than zero");

        nfts[tokenId].price = price;
        nfts[tokenId].forSale = true;

        emit ListedNFT(tokenId, price, true);
    }

    function buyNFT(uint256 tokenId) public payable {
        NFT memory nft = nfts[tokenId];
        require(nft.forSale, "This NFT is not for sale");
        require(msg.value == nft.price, "Please submit the asking price");

        address payable seller = nft.owner;
        _transfer(seller, msg.sender, tokenId);

        seller.transfer(msg.value);

        nfts[tokenId].owner = payable(msg.sender);
        nfts[tokenId].forSale = false;

        emit PurchasedNFT(tokenId, msg.sender, nft.price);
    }

    function cancelSale(uint256 tokenId) public {
        require(
            ownerOf(tokenId) == msg.sender,
            "Only the owner can cancel the sale"
        );

        nfts[tokenId].forSale = false;

        emit ListedNFT(tokenId, nfts[tokenId].price, false);
    }
}
