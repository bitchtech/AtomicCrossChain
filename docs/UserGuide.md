# Documentation and guides
# User guide for navigating and using BitBridgeX

# BitBridgeX User Guide

## Getting Started
### 1. Connect Your Wallet
- Open the BitBridgeX application and connect your Ethereum wallet (e.g., MetaMask).

### 2. Initiate a Swap
- Navigate to the Swap section.
- Enter the recipient’s address, the amount to swap, and other details.
- Confirm the transaction to initiate the swap.

### 3. Complete a Swap
- If you are the recipient, enter the preimage when prompted to complete the swap.
- The swapped asset will be credited to your account.

### 4. Refund a Swap
- If the swap is not completed within the specified timelock, the initiator can refund the swap.
- Navigate to the Refund section and follow the instructions.

For troubleshooting and advanced features, refer to the sections below.

## Troubleshooting

### 1. Swap Not Completing
- **Issue**: The swap is not completing even after entering the correct preimage.
- **Solution**: 
    - Ensure that the preimage is correct and matches the hash provided during swap initiation.
    - Check if the timelock has expired. If it has, the swap cannot be completed and must be refunded.

### 2. Refund Not Processing
- **Issue**: Unable to process a refund.
- **Solution**: 
    - Verify that the timelock period has expired.
    - Ensure that the swap has not already been completed by the counterparty.
    - If issues persist, check your network connection and try again.

### 3. High Fees on Mainnet
- **Issue**: Gas fees on the Ethereum mainnet are too high.
- **Solution**: 
    - Consider using a Layer 2 solution like BASE to initiate your swap. This will reduce the fees significantly.
    - Alternatively, wait for a period of lower network congestion to perform your transaction.

## Advanced Features

### 1. Multi-Signature Approvals
- **Setting Up**:
    - Navigate to the Multi-Signature section.
    - Add the addresses of all participants and specify the required number of signatures.
    - Confirm to create a multi-signature wallet.

- **Using Multi-Sig for Transactions**:
    - When initiating a swap, select the option to use multi-signature approval.
    - Each participant will need to sign off on the transaction before it is processed.

### 2. Using Layer 2 Networks
- **BASE Integration**:
    - Select the BASE network when initiating a swap to reduce fees and improve transaction speed.
    - Ensure that your wallet is configured to interact with BASE.
    - Complete the swap as usual, benefiting from the lower costs associated with Layer 2 transactions.

### 3. Managing Transaction History
- **View Past Transactions**:
    - Navigate to the Transaction History section to see all past swaps, completions, and refunds.
    - Use filters to search by date, status, or network.

### 4. Security Best Practices
- **Keep Your Private Keys Secure**: 
    - Never share your private keys or preimages with anyone.
    - Consider using hardware wallets for added security.

- **Double-Check All Addresses**:
    - Ensure that recipient addresses are correct before initiating any transaction.
    - BitBridgeX is not responsible for transactions sent to incorrect addresses.

For more information and support, please visit our [Help Center](https://bitchtech.io) or contact us at info@bitchtech.io.
