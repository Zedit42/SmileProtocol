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
    avalancheFujiTestnet: {
      url: process.env.AVALANCHE_FUJI_RPC_URL,
      accounts: [process.env.PRIVATE_KEY],
    },
    optimismGoerli: {
      url: process.env.OPTIMISM_GOERLI_RPC_URL,
      accounts: [process.env.PRIVATE_KEY],
    }

  },
  etherscan: {
    apiKey: {
      optimisticGoerli: process.env.OPTIMISTIC_API_KEY,
      avalancheFujiTestnet: process.env.SNOWTRACE_API_KEY
    }
    
  }
};
