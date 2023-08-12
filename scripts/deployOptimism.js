// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const { getRouterConfig, getFaucetTokensAddresses} = require("./utils");
const fs = require("fs");

async function main() {
  const MainFactory = await hre.ethers.getContractFactory("Main");
  const DestinationDonorFactory = await hre.ethers.getContractFactory("DestinationDonor");

  const optimismCCIP = getFaucetTokensAddresses("optimismGoerli").ccipBnM;
  const Main = await MainFactory.deploy(optimismCCIP);
  const smileTokenAddress = await Main.getSmileAddress();
  const DestinationDonor = await DestinationDonorFactory.deploy(getRouterConfig("optimismGoerli").address, Main.address, optimismCCIP, smileTokenAddress);

  await Main.deployed();
  await DestinationDonor.deployed();

  console.log("Main deployed to:", Main.address);
  console.log("DestinationDonor deployed to:", DestinationDonor.address);

 
  console.log("Verifying contracts on Etherscan...")
  
  hre.run("verify:verify", {
    address: Main.address,
    constructorArguments: [optimismCCIP],
  })
  
  hre.run("verify:verify", {
    address: DestinationDonor.address,
    constructorArguments: [getRouterConfig("optimismGoerli").address, Main.address, optimismCCIP, smileTokenAddress],
  })

  // Get provider from url
  const provider = new hre.ethers.providers.JsonRpcProvider(process.env.OPTIMISM_GOERLI_RPC_URL);

  // Get New Wallet from Private key
  const wallet = new hre.ethers.Wallet(process.env.PRIVATE_KEY, provider);

   const main = Main.connect(wallet);
   await main.deployNewProject("Testpinar",10000,100,500,"NFT",hre.ethers.utils.formatBytes32String("test"));
   console.log("Deployed new project!")
   await main.setDestinationDonor(DestinationDonor.address);
   console.log("Set DestinationDonor!")

  fs.writeFileSync("addresses.txt", `Main: ${Main.address}\nDestinationDonor: ${DestinationDonor.address}`)

   
    
    
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
