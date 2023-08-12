const { ethers } = require("hardhat");
const hre = require("hardhat");
const fs  = require("fs");

const { getFaucetTokensAddresses, getRouterConfig } = require("./utils");

const PayFeesIn = {
    Native:0,
    LINK:1,
  }

async function main() {
    // Get provider from url
  const provider = new hre.ethers.providers.JsonRpcProvider(process.env.AVALANCHE_FUJI_RPC_URL);
  const ccipBnM = await hre.ethers.getContractAt("ERC20Token", getFaucetTokensAddresses("avalancheFuji").ccipBnM);
  //const wavaxToken = await hre.ethers.getContractAt("ERC20Token", "0xd00ae08403B9bbb9124bB305C09058E32C39A48c" )

  const destinationDonorAddress = adresleriAl(fs.readFileSync("addresses.txt", "utf8")).DestinationDonor;
  const sourceDonorAddress = adresleriAl(fs.readFileSync("addresses.txt", "utf8")).SourceDonor;
  const sourceDonor = await ethers.getContractAt("SourceDonor", sourceDonorAddress);

  // Get New Wallet from Private key
  const wallet = new hre.ethers.Wallet(process.env.PRIVATE_KEY, provider);
  console.log("Wallet address: ", wallet.address);
  //wavaxToken.connect(wallet);
  ccipBnM.connect(wallet);
  sourceDonor.connect(wallet);

  await ccipBnM.approve(sourceDonor.address, hre.ethers.utils.parseEther("1000"))
  await ccipBnM.approve(getRouterConfig("avalancheFuji").address, hre.ethers.utils.parseEther("1000"))
  console.log("Approved!")

  await sourceDonor.buySmileAndDonate(getRouterConfig("optimismGoerli").chainSelector,destinationDonorAddress, 0, ethers.utils.parseEther("0.1"))
  console.log("Donated!")
}
  
function adresleriAl(dosyaIcerigi) {
    const mainAdresRegex = /Main: (\w+)/;
    const destinationDonorAdresRegex = /DestinationDonor: (\w+)/;
    const sourceDonorAdresRegex = /SourceDonor: (\w+)/;  // Yeni regex ekledik

    const mainAdresMatch = dosyaIcerigi.match(mainAdresRegex);
    const destinationDonorAdresMatch = dosyaIcerigi.match(destinationDonorAdresRegex);
    const sourceDonorAdresMatch = dosyaIcerigi.match(sourceDonorAdresRegex); // Yeni match işlemi

    const adresler = {};

    if (mainAdresMatch && mainAdresMatch[1]) {
        adresler.Main = mainAdresMatch[1];
    }

    if (destinationDonorAdresMatch && destinationDonorAdresMatch[1]) {
        adresler.DestinationDonor = destinationDonorAdresMatch[1];
    }

    if (sourceDonorAdresMatch && sourceDonorAdresMatch[1]) { // Eğer SourceDonor bulunursa adresleri objesine ekliyoruz
        adresler.SourceDonor = sourceDonorAdresMatch[1];
    }

    return adresler;
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  