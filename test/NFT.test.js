const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CarbonMintNFT", function () {
  let NFT, nft, owner;

  beforeEach(async function () {
    [owner] = await ethers.getSigners();
    NFT = await ethers.getContractFactory("CarbonMintNFT");
    nft = await NFT.deploy();
  });

  it("Debe desplegar correctamente", async function () {
    expect(await nft.tokenCounter()).to.equal(0);
  });

  it("Debe mintear un NFT", async function () {
    await nft.mintNFT(owner.address);
    expect(await nft.tokenCounter()).to.equal(1);
  });
});
