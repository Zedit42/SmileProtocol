// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const { getRouterConfig } = require("./utils");

async function main() {
  
  const sourceDonorFactory = await hre.ethers.getContractFactory("SourceDonor");
  const sourceDonor = await sourceDonorFactory.deploy(getRouterConfig("polygonMumbai").router);

  await sourceDonor.deployed();
  console.log("sourceDonor deployed to:", sourceDonor.address);
  console.log(getRouterConfig("polygonMumbai").address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
