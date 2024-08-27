# Scripts for deployment, management, and automation
# Interact with deployed contracts

const { ethers } = require('ethers');
const fs = require('fs');
const path = require('path');
const networkConfig = require('./networkConfig');

// Load the deployment info to get the deployed contract addresses
const deploymentPath = path.join(__dirname, 'deployments', `${networkConfig.name}-PWRChain.json`);
const deploymentInfo = JSON.parse(fs.readFileSync(deploymentPath, 'utf8'));

// Load the contract's ABI
function loadContractABI(contractName) {
    const artifactPath = path.join(__dirname, 'artifacts', `${contractName}.json`);
    const artifact = JSON.parse(fs.readFileSync(artifactPath, 'utf8'));
    return artifact.abi;
}

// Initialize the contract instance
function getContractInstance(contractName, provider, wallet) {
    const contractABI = loadContractABI(contractName);
    const contractAddress = deploymentInfo[contractName.toLowerCase()];
    return new ethers.Contract(contractAddress, contractABI, wallet || provider);
}

// Function to read data from the contract (e.g., checking balances)
async function checkBalance(walletAddress) {
    try {
        const provider = new ethers.providers.JsonRpcProvider(networkConfig.url);
        const pwrToken = getContractInstance('PWRToken', provider);

        const balance = await pwrToken.balanceOf(walletAddress);
        console.log(`Balance of ${walletAddress}: ${ethers.utils.formatUnits(balance, 18)} PWR`);

        return balance;
    } catch (error) {
        console.error('Error checking balance:', error);
    }
}

// Function to execute a transaction (e.g., transferring tokens)
async function transferTokens(toAddress, amount) {
    try {
        const provider = new ethers.providers.JsonRpcProvider(networkConfig.url);
        const wallet = new ethers.Wallet(process.env.USER_PRIVATE_KEY, provider);
        const pwrToken = getContractInstance('PWRToken', provider, wallet);

        const amountInWei = ethers.utils.parseUnits(amount.toString(), 18);
        const tx = await pwrToken.transfer(toAddress, amountInWei);

        console.log(`Transaction sent: ${tx.hash}`);

        // Wait for transaction confirmation
        await tx.wait();
        console.log(`Transaction confirmed: ${tx.hash}`);
    } catch (error) {
        console.error('Error transferring tokens:', error);
    }
}

// Function to call a governance function (e.g., proposing a vote)
async function proposeVote(description) {
    try {
        const provider = new ethers.providers.JsonRpcProvider(networkConfig.url);
        const wallet = new ethers.Wallet(process.env.USER_PRIVATE_KEY, provider);
        const pwrGovernance = getContractInstance('PWRGovernance', provider, wallet);

        const tx = await pwrGovernance.proposeVote(description);
        console.log(`Vote proposal transaction sent: ${tx.hash}`);

        // Wait for transaction confirmation
        await tx.wait();
        console.log(`Vote proposal transaction confirmed: ${tx.hash}`);
    } catch (error) {
        console.error('Error proposing vote:', error);
    }
}

// Function to query the status of a governance proposal
async function queryProposalStatus(proposalId) {
    try {
        const provider = new ethers.providers.JsonRpcProvider(networkConfig.url);
        const pwrGovernance = getContractInstance('PWRGovernance', provider);

        const status = await pwrGovernance.getProposalStatus(proposalId);
        console.log(`Status of proposal ${proposalId}: ${status}`);

        return status;
    } catch (error) {
        console.error('Error querying proposal status:', error);
    }
}

// Main interaction function to choose and execute actions
async function main() {
    try {
        console.log(`Interacting with contracts on ${networkConfig.name}...`);

        // Example usage
        const walletAddress = '0xYourWalletAddress';
        await checkBalance(walletAddress);

        const recipientAddress = '0xRecipientAddress';
        await transferTokens(recipientAddress, 100); // Transfer 100 PWR

        const proposalDescription = 'Increase reward distribution';
        await proposeVote(proposalDescription);

        const proposalId = 1;
        await queryProposalStatus(proposalId);

    } catch (error) {
        console.error('Error interacting with contracts:', error);
    }
}

// Execute the script
main();



# How to run

USER_PRIVATE_KEY=your_private_key_here



# Run the Script

NODE_ENV=production node interactWithContracts.js
