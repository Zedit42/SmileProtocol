// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const { getPayFeesIn, getPrivateKey, getProviderRpcUrl, getRouterConfig } = require("./utils");

async function main() {
  
  const mainFactory = await hre.ethers.getContractFactory("Main");
  const main = await mainFactory.deploy("0xFd57b4ddBf88a4e07fF4e34C487b99af2Fe82a05");
 //const main= await hre.ethers.deployContract("Main", ["0xFd57b4ddBf88a4e07fF4e34C487b99af2Fe82a05"]);

  await main.deployed();
  console.log("main deployed to:", main.address);
  console.log(getRouterConfig("ethereumSepolia"));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
