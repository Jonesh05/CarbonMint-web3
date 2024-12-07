require('dotenv').config();
require("@nomicfoundation/hardhat-toolbox");

const { PRIVATE_KEY, ALCHEMY_API_URL } = process.env;

module.exports = {
  solidity: "0.8.28",
  networks: {
    sepolia: {
      url: ALCHEMY_API_URL,
      accounts: [PRIVATE_KEY]
    }
  }
};
