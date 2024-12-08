const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CarbonMintNFT", function () {
  let NFT, nft, deployer, user1, user2;

  beforeEach(async function () {
    [deployer, user1, user2] = await ethers.getSigners();
    NFT = await ethers.getContractFactory("CarbonMintNFT");
    nft = await NFT.deploy();
    await nft.deployed();
  });

  it("Debe desplegar correctamente", async function () {
    expect(await nft.name()).to.equal("CarbonMintNFT");
    expect(await nft.symbol()).to.equal("CMNFT");
  });

  it("Debe mintear un NFT correctamente", async function () {
    const mintTx = await nft.mintNFT(user1.address);
    await mintTx.wait();

    const owner = await nft.ownerOf(1); // El primer token tendrá ID = 1
    expect(owner).to.equal(user1.address);
  });

  it("Debe asignar IDs únicos a cada NFT", async function () {
    await nft.mintNFT(user1.address);
    await nft.mintNFT(user2.address);

    const owner1 = await nft.ownerOf(1);
    const owner2 = await nft.ownerOf(2);

    expect(owner1).to.equal(user1.address);
    expect(owner2).to.equal(user2.address);
  });
});
