const hre = require("hardhat");
const fs = require("fs");
require("dotenv").config();

let config,ultima,owner;
const network = hre.network.name;
if (network === 'boba') config = require('./../config/boba.json');


const main = async () => {
	[owner] = await ethers.getSigners();
  console.log(`Owner: ${owner.address}`);
  const Iultima = await ethers.getContractFactory('Ultima');
  ultima = await Iultima.attach(config.ultimaContract);
	const interface = await ethers.getContractFactory('WETH9');
  for (let i = 0; i < config.baseAssets.length; i++) {
    const asset = config.baseAssets[i];
		const tokenAsset = await interface.attach(asset.address);
		const ownerBalance = await tokenAsset.balanceOf(owner.address);
    console.log(`${asset.sym} Owner Balance: `,ownerBalance.toString());
		const ultimaBalance = await ultima.getBalance(asset.address);
		console.log(`${asset.sym} Original Ultima Balance: `,ultimaBalance.toString());
		const tx = await tokenAsset.transfer(config.ultimaContract,ownerBalance);
		await tx.wait();
		await new Promise(r => setTimeout(r, 10000));
    const postFundBalance = await ultima.getBalance(asset.address);
    console.log(`${asset.sym} New Ultima Balance: `,postFundBalance.toString());
  }
	console.log('Note it might take a while for the funds to show up, try balances.js in a few mins');
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