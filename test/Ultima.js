const { expect } = require("chai");
const { ethers } = require("hardhat");


describe("Ultima", function () {
  
  let token; // = 0x514910771af9ca656af840dff83e8264ecf986can;
  
  beforeEach(async function () {
    // Get the ContractFactory and Signers here.
    const Ultima = await ethers.getContractFactory("Ultima");
    const [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    // To deploy our contract, we just have to call Token.deploy() and await
    // for it to be deployed(), which happens once its transaction has been
    // mined.
    contract = await Ultima.deploy();
  });
  
  it("Should return the balance", async function () {
    
    const tokenContract = "0x514910771AF9Ca656af840dff83E8264EcF986CA";
    expect(await contract.getBalance(tokenContract)).to.equal(0);

  });
});

