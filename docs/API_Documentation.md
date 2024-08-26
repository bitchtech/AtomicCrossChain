# Documentation and guides
# API reference for interacting with BitBridgeX

# BitBridgeX API Documentation

## Overview
The BitBridgeX API allows developers to interact with the platform’s smart contracts, enabling cross-chain swaps, multi-signature approvals, and integration with Layer 2 networks.

## Endpoints

### 1. Initiate Swap
- **Endpoint**: `/api/swap/initiate`
- **Method**: POST
- **Parameters**:
    - `sender`: Address of the swap initiator.
    - `recipient`: Address of the swap recipient.
    - `amount`: Amount to be swapped.
    - `hashLock`: Hash of the preimage.
    - `timelock`: Time after which the swap can be refunded.
- **Response**: `swapID`, transaction details.

### 2. Complete Swap
- **Endpoint**: `/api/swap/complete`
- **Method**: POST
- **Parameters**:
    - `swapID`: The ID of the swap.
    - `preimage`: The preimage to unlock the swap.
- **Response**: Transaction details.

### 3. Refund Swap
- **Endpoint**: `/api/swap/refund`
- **Method**: POST
- **Parameters**:
    - `swapID`: The ID of the swap.
- **Response**: Transaction details.

For more endpoints and detailed usage, see the API reference in the `docs/` directory.
