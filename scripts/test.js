const hre = require("hardhat");
const fs = require("fs");
require("dotenv").config();

let config,ultima,owner;
const network = hre.network.name;
if (network === 'boba') config = require('./../config/boba.json');


const main = async () => {
  [owner] = await ethers.getSigners();
  console.log(`Owner: ${owner.address}`);
  const IUltima = await ethers.getContractFactory('InstaUltima');
  ultima = await IUltima.attach(config.ultimaContract);
	const res = await ultima.stables(0);
	console.log(res);
	
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