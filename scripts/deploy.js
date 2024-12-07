const { ethers } = require("hardhat");
const fs = require("fs");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Desplegando contrato con la cuenta:", deployer.address);

  try {
    // Obtener el balance de la cuenta
    const balance = await ethers.provider.getBalance(deployer.address);
    console.log("Balance en Wei:", balance.toString());

    // Usar ethers.utils.formatEther para convertir el balance a ETH
    const balanceInETH = ethers.utils.formatEther(balance);
    console.log("Balance en ETH:", balanceInETH);

    const NFT = await ethers.getContractFactory("CarbonMintNFT");
    const nft = await NFT.deploy();

    console.log("Contrato desplegado en:", nft.address);

    const contractAddress = {
      address: nft.address,
    };

    fs.writeFileSync("./artifacts/contractAddress.json", JSON.stringify(contractAddress, null, 2));
  } catch (error) {
    console.error("Error al obtener el balance o desplegar el contrato:", error);
  }
}

main().catch((error) => {
  console.error("Error en el script:", error);
  process.exitCode = 1;
});
