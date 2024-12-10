# 🚀 **CarbonMint Web 3.0**

**CarbonMint Web 3.0** is a decentralized dApp where buyers and sellers interact with NFTs on the **Arbitrum Sepolia** testnet.  
Sellers create and list NFTs while buyers mint and purchase assets on the platform.

---

## 📜 **Project Summary**

We have developed the backend using **Hardhat**, deploying the `CarbonMintNFT` contract on the Arbitrum Sepolia testnet.  
This contract follows the ERC721 standard and provides the following functionality:

- **Sellers:**  
  - Connect their wallets and create NFTs.  
  - List assets for others to view and purchase.

- **Buyers:**  
  - Connect their wallets to mint NFTs.  
  - Purchase assets directly on the platform, interacting with the smart contract.

We implemented all functionalities following **OpenZeppelin** standards, without using `Counters`.

---

## 🔍 **Technologies Used**

- **Hardhat**: A framework for developing, testing, and deploying smart contracts.
- **OpenZeppelin**: Provides ERC721 standards and secure contract functionalities.
- **Ethers.js**: Interacts with wallets and the Ethereum network.
- **Mocha and Chai**: Automated testing frameworks.

---

## ✅ **How to Run Tests, Deploy Contracts, and Update PRIVATE_KEY/API URL**

---

## 🔍 **1. Running Automated Tests**

To test your smart contracts and ensure everything works correctly:

1. Open your terminal.

2. Run the following command:

```bash
npx hardhat test
```
This command will execute all tests in the test/ folder.
It uses Mocha and Chai for validating smart contract interactions and functionality.

**Test Output:***
The console will display detailed test logs, showing which tests passed or failed.

## 🚀 **2. Deploying Your Smart Contract**
Deploy your smart contract to the Arbitrum Sepolia testnet.

**Step 1: Update hardhat.config.js**
Make sure your hardhat.config.js includes your network configuration:
```bash
require("@nomiclabs/hardhat-ethers");

module.exports.exports = {
  solidity: "0.8.4",
  networks: {
    sepolia: {
      url: "https://arb-goerli.g.alchemy.com/v2/YOUR_ALCHEMY_API_KEY",
      accounts: ["YOUR_PRIVATE_KEY"]
    }
  }
};
```
**Replace:**
- YOUR_ALCHEMY_API_KEY with your Alchemy API Key.
- YOUR_PRIVATE_KEY with your wallet's private key.

**Step 2: Deploy Script (scripts/deploy.js)**
Create the deployment script scripts/deploy.js:
```bash
async function main() {
  const [deployer] = await ethers.getSigners();

  console.log(`Deploying contract from: ${deployer.address}`);
  console.log(`Balance: ${ethers.utils.formatEther(await deployer.getBalance())} ETH`);

  const NFTContract = await ethers.getContractFactory("CarbonMintNFT");
  const nft = await NFTContract.deploy();

  console.log(`Contract deployed at address: ${nft.address}`);
}

main().catch((error) => {
  console.error("Deployment failed", error);
  process.exit(1);
});
```

**Step 3: Deploy Your Contract**
Run this command to deploy your contract to the testnet:
```bash
npx hardhat run scripts/deploy.js --network sepolia
```
- This deploys the CarbonMintNFT contract to the Arbitrum Sepolia testnet.
- Check the console output to confirm the deployment address.

## 🔑 **3. Update PRIVATE_KEY and API URL**
**Using Environment Variables**
Store your API key and private key securely using environment variables.
For Windows Command Prompt or PowerShell:
```bash
$env:PRIVATE_KEY="YOUR_PRIVATE_KEY"
$env:ALCHEMY_API_URL="https://arb-goerli.g.alchemy.com/v2/YOUR_ALCHEMY_API_KEY"
```

For Unix/Mac (Linux/MacOS Terminal):
Add the following lines to your terminal or environment file:
```bash
export PRIVATE_KEY="YOUR_PRIVATE_KEY"
export ALCHEMY_API_URL="https://arb-goerli.g.alchemy.com/v2/YOUR_ALCHEMY_API_KEY"
```

**Reference Environment Variables in hardhat.config.js**
Update your hardhat.config.js to reference these environment variables:
```bash
networks: {
  sepolia: {
    url: process.env.ALCHEMY_API_URL,
    accounts: [process.env.PRIVATE_KEY]
  }
}
```
This ensures that your private key and API URL remain secure and manageable.

---

This `README.md` contains everything about **Running Tests, Deploying Contracts**, and **Configuring `PRIVATE_KEY` and API URL** in a consolidated and accessible way.

