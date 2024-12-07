import { ethers } from "hardhat";

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Desplegador:", deployer.address);

    const NFT = await ethers.getContractFactory("CarbonMintNFT");
    const nft = await NFT.deploy();
    await nft.deployed();

    console.log("Contrato desplegado a:", nft.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
