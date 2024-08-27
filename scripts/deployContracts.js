# Scripts for deployment, management, and automation
# Script for deploying contracts on various networks

const { ethers } = require('ethers');
const fs = require('fs');
const path = require('path');
const config = require('./networkConfig');

// Load the contract's ABI and bytecode (assumes Solidity compiler output)
const contractArtifactPath = path.join(__dirname, 'artifacts', 'MyContract.json');
const contractArtifact = JSON.parse(fs.readFileSync(contractArtifactPath, 'utf8'));

// Function to deploy the contract
async function deployContract() {
    try {
        console.log(`Deploying contract on ${config.name}...`);

        // Setup the provider and wallet
        const provider = new ethers.providers.JsonRpcProvider(config.url);
        const wallet = new ethers.Wallet(process.env.DEPLOYER_PRIVATE_KEY, provider);

        // Create a ContractFactory instance
        const contractFactory = new ethers.ContractFactory(contractArtifact.abi, contractArtifact.bytecode, wallet);

        // Deploy the contract
        const contract = await contractFactory.deploy({
            gasPrice: ethers.utils.parseUnits(config.gasPrice, 'gwei'),
            gasLimit: config.gasLimit,
        });

        // Wait for the deployment transaction to be mined
        await contract.deployTransaction.wait();

        console.log(`Contract deployed at address: ${contract.address}`);

        // Save the deployed contract address to a file
        const deploymentInfo = {
            address: contract.address,
            network: config.name,
            deployer: wallet.address,
            transactionHash: contract.deployTransaction.hash,
        };

        fs.writeFileSync(
            path.join(__dirname, 'deployments', `${config.name}-MyContract.json`),
            JSON.stringify(deploymentInfo, null, 2)
        );

        console.log('Deployment info saved.');

    } catch (error) {
        console.error('Deployment failed:', error);
    }
}

// Execute the deployment
deployContract();
