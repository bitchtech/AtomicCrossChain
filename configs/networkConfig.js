# Configuration files for different environments
# Network configurations (Ethereum, BSC, BASE, etc.)

// networkConfig.js

const config = {
    development: {
        ethereum: {
            name: 'localhost',
            url: 'http://localhost:8545',
            networkId: 1337, // Local Ganache or Hardhat network ID
            gasPrice: '20000000000', // 20 Gwei
            gasLimit: 6721975,
            chainId: 1337, // Local network chain ID
        },
        bsc: {
            name: 'localhost',
            url: 'http://localhost:8545',
            networkId: 97, // Binance Smart Chain Testnet ID (similar local setup)
            gasPrice: '20000000000',
            gasLimit: 6721975,
            chainId: 97, // BSC Testnet chain ID
        },
        base: {
            name: 'localhost',
            url: 'http://localhost:8545',
            networkId: 84531, // BASE Testnet or local network ID
            gasPrice: '20000000000',
            gasLimit: 6721975,
            chainId: 84531, // BASE Testnet chain ID
        },
    },

    testing: {
        ethereum: {
            name: 'rinkeby', // Ethereum Rinkeby Testnet
            url: 'https://rinkeby.infura.io/v3/YOUR_INFURA_PROJECT_ID',
            networkId: 4, // Rinkeby network ID
            gasPrice: '20000000000', // 20 Gwei
            gasLimit: 8000000,
            chainId: 4, // Rinkeby chain ID
        },
        bsc: {
            name: 'bsc-testnet', // Binance Smart Chain Testnet
            url: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
            networkId: 97, // BSC Testnet network ID
            gasPrice: '20000000000',
            gasLimit: 8000000,
            chainId: 97, // BSC Testnet chain ID
        },
        base: {
            name: 'base-testnet', // BASE Testnet
            url: 'https://base-goerli.infura.io/v3/YOUR_INFURA_PROJECT_ID',
            networkId: 84531, // BASE Testnet network ID
            gasPrice: '20000000000',
            gasLimit: 8000000,
            chainId: 84531, // BASE Testnet chain ID
        },
    },

    staging: {
        ethereum: {
            name: 'goerli', // Ethereum Goerli Testnet
            url: 'https://goerli.infura.io/v3/YOUR_INFURA_PROJECT_ID',
            networkId: 5, // Goerli network ID
            gasPrice: '25000000000', // 25 Gwei
            gasLimit: 8000000,
            chainId: 5, // Goerli chain ID
        },
        bsc: {
            name: 'bsc-mainnet', // Binance Smart Chain Mainnet for staging
            url: 'https://bsc-dataseed.binance.org/',
            networkId: 56, // BSC Mainnet network ID
            gasPrice: '5000000000', // 5 Gwei
            gasLimit: 9000000,
            chainId: 56, // BSC Mainnet chain ID
        },
        base: {
            name: 'base-mainnet-staging', // BASE Mainnet staging environment
            url: 'https://base-mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID',
            networkId: 8453, // BASE Mainnet network ID
            gasPrice: '25000000000', // 25 Gwei
            gasLimit: 9000000,
            chainId: 8453, // BASE Mainnet chain ID
        },
    },

    production: {
        ethereum: {
            name: 'mainnet',
            url: 'https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID',
            networkId: 1, // Ethereum Mainnet network ID
            gasPrice: '50000000000', // 50 Gwei
            gasLimit: 10000000,
            chainId: 1, // Ethereum Mainnet chain ID
        },
        bsc: {
            name: 'bsc-mainnet',
            url: 'https://bsc-dataseed.binance.org/',
            networkId: 56, // BSC Mainnet network ID
            gasPrice: '5000000000', // 5 Gwei
            gasLimit: 10000000,
            chainId: 56, // BSC Mainnet chain ID
        },
        base: {
            name: 'base-mainnet',
            url: 'https://base-mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID',
            networkId: 8453, // BASE Mainnet network ID
            gasPrice: '50000000000', // 50 Gwei
            gasLimit: 10000000,
            chainId: 8453, // BASE Mainnet chain ID
        },
    },
};

// Export the appropriate configuration based on the environment variable
const environment = process.env.NODE_ENV || 'development';
module.exports = config[environment];



# USAGE
# use this configuration in your application by importing and accessing it as follows:

const config = require('./networkConfig');

// Accessing network configuration settings
console.log(`Ethereum Mainnet URL: ${config.ethereum.url}`);
console.log(`BSC Mainnet Chain ID: ${config.bsc.chainId}`);
