require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  optimizer: {
    enabled: true,
    runs: 200,
  },
  networks: {
    polygonMumbai: {
      url: process.env.POLYGON_MUMBAI_RPC_URL,
      accounts: [process.env.PRIVATE_KEY],
    },
    optimismGoerli: {
      url: process.env.OPTIMISM_GOERLI_RPC_URL,
      accounts: [process.env.PRIVATE_KEY],
    }

  }
};
