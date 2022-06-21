require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  networks: {
    boba: {
      url: `https://mainnet.boba.network`,
      accounts: [process.env.privateKey],
    }
  },
  solidity: {
    compilers: [
      { version: "0.8.7" },
      { version: "0.7.6" },
      { version: "0.7.3" },
      { version: "0.6.6" }
    ]
  },
};