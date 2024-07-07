const HDWalletProvider = require('@truffle/hdwallet-provider');
const privateKey = "4a2eeecccb22563cb748dca7da300cd2d32d143976fd72f416c91417296c00dd";
module.exports = {
  mocha: {
    enableTimeouts: false,
    before_timeout: 480000
  },

  networks: {
    theta_testnet: {
      provider: () => {
        return new HDWalletProvider({
          privateKeys: [privateKey],
          providerOrUrl: 'https://eth-rpc-api-testnet.thetatoken.org/rpc',
        });
      },
      network_id: 365,
      gasPrice: 4000000000000,
    },

    theta_mainnet: {
      provider: () => {
        return new HDWalletProvider({
          privateKeys: [privateKey],
          providerOrUrl: 'https://eth-rpc-api.thetatoken.org/rpc',
        });
      },
      network_id: 361,
      gasPrice: 4000000000000,
    }
  },

  compilers: {
    solc: {
      version: "0.8.19",
      settings: {
        optimizer: {
          enabled: true,
          runs: 200
        }
      }
    }
  }
};
