const { ethers } = require("hardhat");
const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  const balance = await deployer.getBalance();
  const ticketBooking = await hre.ethers.getContractFactory("TicketBooking");
  const contract = await ticketBooking.deploy();

  await contract.deployed();
  console.log(contract.address);
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });