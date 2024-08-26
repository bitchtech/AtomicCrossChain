# Documentation and guides
# Overview and setup instructions

  # BitBridgeX

BitBridgeX is a trustless atomic cross-chain bridging platform that integrates Layer 2 solutions like BASE for enhanced scalability and lower fees. It allows users to perform secure, decentralized swaps across multiple blockchains without intermediaries.

## Key Features
- **Atomic Swaps**: Trustless cross-chain swaps using HTLCs.
- **Layer 2 Integration**: Lower transaction fees and higher throughput with BASE and other Layer 2 networks.
- **Multi-Signature Support**: Secure joint control over assets with multi-signature wallets.
- **PWR Chain Integration**: Scalable transaction processing using PWR Chain.

## Getting Started
1. Clone the repository:
    ```bash
    git clone https://github.com/BitBridgeX/BitBridgeX.git
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Deploy contracts:
    ```bash
    npx hardhat run scripts/deployContracts.js --network <network-name>
    ```
4. Start the frontend:
    ```bash
    npm start
    ```

For more detailed instructions, see the `DeveloperGuide.md`.
