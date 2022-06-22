const { expect } = require("chai");
const { ethers } = require("hardhat");


describe("Ultima", function () {
  
  const tokenContract1 = "0x514910771AF9Ca656af840dff83E8264EcF986CA";
  const tokenContract2 = "0xD76b5c2A23ef78368d8E34288B5b65D616B746aE";
  let owner;
  let addr1;

  beforeEach(async function () {
    // Get the ContractFactory and Signers here.
    const Ultima = await ethers.getContractFactory("Ultima");
    [owner,addr1] = await ethers.getSigners();
    

    // To deploy our contract, we just have to call Token.deploy() and await
    // for it to be deployed(), which happens once its transaction has been
    // mined.
    contract = await Ultima.deploy();
  });
  
  it("Should return the balance", async function () {

    expect(await contract.getBalance(tokenContract1)).to.equal(0);
    expect(await contract.getBalance(tokenContract2)).to.equal(0);


  });
});

