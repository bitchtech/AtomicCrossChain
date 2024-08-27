# Configuration files for different environments
# Configuration for PWR Chain nodes
# Ensures dApp behaves differently in each environment without hardcoding environment-specific details throughout your codebase

// PWRChainConfig.js

const config = {
    development: {
        node: {
            url: 'http://localhost:8545', // Local node URL for development
            networkId: 1337, // Local Ganache network ID or similar
            gasPrice: '20000000000', // 20 Gwei
            gasLimit: 6721975,
        },
        database: {
            host: 'localhost',
            port: 5432,
            username: 'dev_user',
            password: 'dev_password',
            database: 'pwrchain_dev',
        },
        logging: {
            level: 'debug', // Detailed logging for development
        },
        security: {
            enableHTTPS: false, // Disable HTTPS for local development
            privateKeyPath: '',
            certificatePath: '',
        },
        features: {
            enableFeatureX: true, // Example feature flag for development
        },
    },

    testing: {
        node: {
            url: 'http://localhost:8545', // Local node URL for testing
            networkId: 1337,
            gasPrice: '20000000000',
            gasLimit: 6721975,
        },
        database: {
            host: 'localhost',
            port: 5432,
            username: 'test_user',
            password: 'test_password',
            database: 'pwrchain_test',
        },
        logging: {
            level: 'info', // Reduced logging for testing
        },
        security: {
            enableHTTPS: false, // HTTPS usually not needed for testing
            privateKeyPath: '',
            certificatePath: '',
        },
        features: {
            enableFeatureX: true,
        },
    },

    staging: {
        node: {
            url: 'https://staging-node.pwrchain.com', // Staging node URL
            networkId: 4, // Rinkeby testnet ID
            gasPrice: '30000000000', // 30 Gwei
            gasLimit: 8000000,
        },
        database: {
            host: 'staging-db.pwrchain.com',
            port: 5432,
            username: 'staging_user',
            password: 'staging_password',
            database: 'pwrchain_staging',
        },
        logging: {
            level: 'warn', // Warnings and errors only for staging
        },
        security: {
            enableHTTPS: true, // Enable HTTPS for staging
            privateKeyPath: '/etc/ssl/private/staging-key.pem',
            certificatePath: '/etc/ssl/certs/staging-cert.pem',
        },
        features: {
            enableFeatureX: false, // Example feature might be disabled in staging
        },
    },

    production: {
        node: {
            url: 'https://mainnet-node.pwrchain.com', // Production node URL
            networkId: 1, // Mainnet ID
            gasPrice: '50000000000', // 50 Gwei
            gasLimit: 10000000,
        },
        database: {
            host: 'prod-db.pwrchain.com',
            port: 5432,
            username: 'prod_user',
            password: 'prod_password',
            database: 'pwrchain_prod',
        },
        logging: {
            level: 'error', // Errors only for production
        },
        security: {
            enableHTTPS: true, // Enable HTTPS for production
            privateKeyPath: '/etc/ssl/private/prod-key.pem',
            certificatePath: '/etc/ssl/certs/prod-cert.pem',
        },
        features: {
            enableFeatureX: false, // Feature disabled in production
        },
    },
};

// Export the appropriate configuration based on the environment variable
const environment = process.env.NODE_ENV || 'development';
module.exports = config[environment];


# USAGE: you can use this configuration in your application by importing it:
  
const config = require('./PWRChainConfig');

// Now you can access the config for the current environment
console.log(`Connecting to node at ${config.node.url}`);
