const hre = require("hardhat");
const fs = require("fs");
require("dotenv").config();

let config,ultima,owner;
const network = hre.network.name;
if (network === 'boba') config = require('./../config/boba.json');


const main = async () => {
  [owner] = await ethers.getSigners();
  console.log(`Owner: ${owner.address}`);
  const IUltima = await ethers.getContractFactory('Ultima');
  ultima = await IUltima.attach(config.ultimaContract);
  for (let i = 0; i < config.baseAssets.length; i++) {
    const asset = config.baseAssets[i];
    let balance = await ultima.getBalance(asset.address);
    console.log(`${asset.sym} Start Balance: `,balance.toString());
    await ultima.connect(owner).recoverTokens(asset.address);
    balance = await ultima.getBalance(asset.address);
    await new Promise(r => setTimeout(r, 2000));
    console.log(`${asset.sym} Close Balance: `,balance.toString());
  }
}

process.on('uncaughtException', function(err) {
	console.log('UnCaught Exception 83: ' + err);
	console.error(err.stack);
	fs.appendFile('./critical.txt', err.stack, function(){ });
});

process.on('unhandledRejection', (reason, p) => {
	console.log('Unhandled Rejection at: '+p+' - reason: '+reason);
});

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});