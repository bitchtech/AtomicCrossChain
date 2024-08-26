#Smart Contracts for Atomic Swaps
#Core Contract for Ethereum and other EVM-compatible chains

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AtomicSwap {
    struct Swap {
        bytes32 hashLock;
        uint256 timelock;
        address payable sender;
        address payable recipient;
        uint256 amount;
        bool completed;
        bool refunded;
        bytes preimage;
    }

    mapping(bytes32 => Swap) public swaps;

    event SwapInitiated(
        bytes32 indexed swapID,
        address indexed sender,
        address indexed recipient,
        uint256 amount,
        bytes32 hashLock,
        uint256 timelock
    );

    event SwapCompleted(
        bytes32 indexed swapID,
        bytes preimage
    );

    event SwapRefunded(
        bytes32 indexed swapID
    );

    function initiateSwap(
        bytes32 _swapID,
        address payable _recipient,
        bytes32 _hashLock,
        uint256 _timelock
    ) external payable {
        require(swaps[_swapID].sender == address(0), "Swap already exists");
        require(msg.value > 0, "Amount must be greater than zero");

        swaps[_swapID] = Swap({
            hashLock: _hashLock,
            timelock: _timelock,
            sender: payable(msg.sender),
            recipient: _recipient,
            amount: msg.value,
            completed: false,
            refunded: false,
            preimage: ""
        });

        emit SwapInitiated(_swapID, msg.sender, _recipient, msg.value, _hashLock, _timelock);
    }

    function completeSwap(bytes32 _swapID, bytes memory _preimage) external {
        Swap storage swap = swaps[_swapID];
        require(swap.recipient == msg.sender, "Not recipient");
        require(keccak256(_preimage) == swap.hashLock, "Invalid preimage");
        require(block.timestamp < swap.timelock, "Timelock expired");
        require(!swap.completed, "Swap already completed");

        swap.completed = true;
        swap.preimage = _preimage;
        swap.recipient.transfer(swap.amount);

        emit SwapCompleted(_swapID, _preimage);
    }

    function refundSwap(bytes32 _swapID) external {
        Swap storage swap = swaps[_swapID];
        require(swap.sender == msg.sender, "Not sender");
        require(block.timestamp >= swap.timelock, "Timelock not expired");
        require(!swap.completed, "Swap already completed");
        require(!swap.refunded, "Swap already refunded");

        swap.refunded = true;
        swap.sender.transfer(swap.amount);

        emit SwapRefunded(_swapID);
    }
}
