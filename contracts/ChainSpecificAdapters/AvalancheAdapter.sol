# Smart Contracts for Atomic Swaps
# Adapters for specific blockchains
# Avalanche integration

// Avalanche Adapter
contract AvalancheAdapter is AtomicSwap {
    // Implementation specific to Avalanche
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./AtomicSwap.sol";

contract AvalancheAdapter is AtomicSwap {
    IERC20 public token;

    constructor(address _token) {
        token = IERC20(_token);
    }

    function initiateTokenSwap(
        bytes32 _swapID,
        address payable _recipient,
        bytes32 _hashLock,
        uint256 _timelock,
        uint256 _amount
    ) external {
        require(swaps[_swapID].sender == address(0), "Swap already exists");
        require(_amount > 0, "Amount must be greater than zero");
        require(token.transferFrom(msg.sender, address(this), _amount), "Transfer failed");

        swaps[_swapID] = Swap({
            hashLock: _hashLock,
            timelock: _timelock,
            sender: payable(msg.sender),
            recipient: _recipient,
            amount: _amount,
            completed: false,
            refunded: false,
            preimage: ""
        });

        emit SwapInitiated(_swapID, msg.sender, _recipient, _amount, _hashLock, _timelock);
    }

    function completeTokenSwap(bytes32 _swapID, bytes memory _preimage) external {
        Swap storage swap = swaps[_swapID];
        require(swap.recipient == msg.sender, "Not recipient");
        require(keccak256(_preimage) == swap.hashLock, "Invalid preimage");
        require(block.timestamp < swap.timelock, "Timelock expired");
        require(!swap.completed, "Swap already completed");

        swap.completed = true;
        swap.preimage = _preimage;
        require(token.transfer(swap.recipient, swap.amount), "Transfer failed");

        emit SwapCompleted(_swapID, _preimage);
    }

    function refundTokenSwap(bytes32 _swapID) external {
        Swap storage swap = swaps[_swapID];
        require(swap.sender == msg.sender, "Not sender");
        require(block.timestamp >= swap.timelock, "Timelock not expired");
        require(!swap.completed, "Swap already completed");
        require(!swap.refunded, "Swap already refunded");

        swap.refunded = true;
        require(token.transfer(swap.sender, swap.amount), "Transfer failed");

        emit SwapRefunded(_swapID);
    }
}
