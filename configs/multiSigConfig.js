# Configuration files for different environments
# Configuration for multi-signature operations
# Required confirmations, owners and contract addresses

// multiSigConfig.js

const config = {
    development: {
        multiSig: {
            requiredConfirmations: 2, // Number of signatures required to execute a transaction
            owners: [
                '0x1234567890abcdef1234567890abcdef12345678', // Example owner address 1
                '0xabcdef1234567890abcdef1234567890abcdef12', // Example owner address 2
                '0x7890abcdef1234567890abcdef1234567890abcd', // Example owner address 3
            ],
            contractAddress: '0xDeV1234567890abcdef1234567890abcdef1234', // Example development contract address
        },
        network: {
            name: 'localhost',
            url: 'http://localhost:8545',
            networkId: 1337, // Local Ganache network ID or similar
        },
        logging: {
            level: 'debug', // Detailed logging for development
        },
    },

    testing: {
        multiSig: {
            requiredConfirmations: 2,
            owners: [
                '0x234567890abcdef1234567890abcdef123456789', // Example owner address 1
                '0xbcdef1234567890abcdef1234567890abcdef123', // Example owner address 2
                '0x890abcdef1234567890abcdef1234567890abcdef', // Example owner address 3
            ],
            contractAddress: '0xTeST234567890abcdef1234567890abcdef1234', // Example testing contract address
        },
        network: {
            name: 'localhost',
            url: 'http://localhost:8545',
            networkId: 1337,
        },
        logging: {
            level: 'info', // Reduced logging for testing
        },
    },

    staging: {
        multiSig: {
            requiredConfirmations: 3, // Increase confirmations for more security in staging
            owners: [
                '0x34567890abcdef1234567890abcdef1234567890', // Example owner address 1
                '0xcdef1234567890abcdef1234567890abcdef1234', // Example owner address 2
                '0x90abcdef1234567890abcdef1234567890abcdef12', // Example owner address 3
            ],
            contractAddress: '0xStg1234567890abcdef1234567890abcdef1234', // Example staging contract address
        },
        network: {
            name: 'rinkeby', // Rinkeby testnet
            url: 'https://rinkeby.infura.io/v3/YOUR_INFURA_PROJECT_ID', // Rinkeby Infura URL
            networkId: 4, // Rinkeby network ID
        },
        logging: {
            level: 'warn', // Warnings and errors only for staging
        },
    },

    production: {
        multiSig: {
            requiredConfirmations: 4, // Highest security for production
            owners: [
                '0x4567890abcdef1234567890abcdef123456789012', // Example owner address 1
                '0xdef1234567890abcdef1234567890abcdef123456', // Example owner address 2
                '0x0abcdef1234567890abcdef1234567890abcdef1234', // Example owner address 3
                '0x7890abcdef1234567890abcdef1234567890abcdef', // Example owner address 4
            ],
            contractAddress: '0xProd1234567890abcdef1234567890abcdef1234', // Example production contract address
        },
        network: {
            name: 'mainnet',
            url: 'https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID', // Mainnet Infura URL
            networkId: 1, // Mainnet network ID
        },
        logging: {
            level: 'error', // Errors only for production
        },
    },
};

// Export the appropriate configuration based on the environment variable
const environment = process.env.NODE_ENV || 'development';
module.exports = config[environment];



# USAGE: 
# To use this configuration in your application, you can import and access it as follows:

const config = require('./multiSigConfig');

// Accessing the multi-signature settings
console.log(`Multi-Sig Contract Address: ${config.multiSig.contractAddress}`);
console.log(`Required Confirmations: ${config.multiSig.requiredConfirmations}`);


