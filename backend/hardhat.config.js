
require('@nomiclabs/hardhat-waffle');
require('@nomiclabs/hardhat-ethers');
const fs = require('fs');
const path = require('path');

module.exports = {
  defaultNetwork: "ganache",
  networks: {
    hardhat: {},
    ganache: {
      url: 'http://127.0.0.1:7545',
      chainId: 1337,
      from: `YOUR_ACCOUNT_ADDRESS`,
      gas: 3000000
    },

    //POLYGON_AMOY_RPC_URL=https://rpc-amoy.polygon.technology/
    // amoy: {
    //   url: "https://rpc-amoy.polygon.technology/",
    //   accounts: ['YOUR_PRIVTE_KEY']
    // },
  },
  solidity: {
    version: "0.8.27",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
};


