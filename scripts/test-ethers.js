const { ethers } = require("hardhat");

async function test() {
  const [deployer] = await ethers.getSigners();

  try {
    const balance = await ethers.provider.getBalance(deployer.address);

    console.log("Balance en Wei:", balance.toString());
    console.log("Balance en ETH:", ethers.utils.formatEther(balance));
  } catch (error) {
    console.error("Error al obtener el balance:", error);
  }
}

test().catch(console.error);
