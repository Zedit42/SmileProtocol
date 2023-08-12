// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const { getRouterConfig } = require("./utils");
const fs  = require("fs");


async function main() {
 
  const sourceDonorFactory = await hre.ethers.getContractFactory("SourceDonor");
  const sourceDonor = await sourceDonorFactory.deploy(getRouterConfig("avalancheFuji").address);

  await sourceDonor.deployed();
  console.log("sourceDonor deployed to:", sourceDonor.address);
  console.log("Waiting for confirmations...")
  await sourceDonor.deployTransaction.wait(6);
  console.log("Confirmed!")
  
  console.log("Verifying on Etherscan...")
  hre.run("verify:verify", {
    address: sourceDonor.address,
    constructorArguments: [getRouterConfig("avalancheFuji").address],
  })

  replaceThirdLineInFile("addresses.txt", `SourceDonor: ${sourceDonor.address}`);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

function replaceThirdLineInFile(filePath, newString) {
    // Read the file content
    const content = fs.readFileSync(filePath, 'utf8');

    // Split the content into lines
    const lines = content.split('\n');

    // Replace the third line with the specified string
    lines[2] = newString;

    // Join the lines back
    const newContent = lines.join('\n');

    // Write the modified content back to the file
    fs.writeFileSync(filePath, newContent);
}
