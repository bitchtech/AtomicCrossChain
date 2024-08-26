# Smart Contracts for Atomic Swaps
# Multi-signature support for transaction approvals

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./AtomicSwap.sol";

contract MultisigAdapter is Ownable, AtomicSwap {
    using SafeMath for uint256;
    using ECDSA for bytes32;

    struct MultisigTransaction {
        bytes32 swapID;
        address payable recipient;
        uint256 amount;
        bytes32 hashLock;
        uint256 timelock;
        bool executed;
        mapping(address => bool) approvals;
        uint256 approvalCount;
    }

    uint256 public requiredSignatures;
    address[] public signers;
    mapping(bytes32 => MultisigTransaction) public multisigTransactions;

    event MultisigTransactionCreated(bytes32 indexed swapID, address indexed recipient, uint256 amount);
    event MultisigTransactionApproved(bytes32 indexed swapID, address indexed signer);
    event MultisigTransactionExecuted(bytes32 indexed swapID);
    event SignerAdded(address indexed newSigner);
    event SignerRemoved(address indexed oldSigner);
    event RequiredSignaturesChanged(uint256 newRequiredSignatures);

    modifier onlySigner() {
        require(isSigner(msg.sender), "Not a signer");
        _;
    }

    constructor(address[] memory _signers, uint256 _requiredSignatures) {
        require(_signers.length >= _requiredSignatures, "Signers less than required signatures");
        signers = _signers;
        requiredSignatures = _requiredSignatures;
    }

    function isSigner(address account) public view returns (bool) {
        for (uint256 i = 0; i < signers.length; i++) {
            if (signers[i] == account) {
                return true;
            }
        }
        return false;
    }

    function createMultisigTransaction(
        bytes32 _swapID,
        address payable _recipient,
        uint256 _amount,
        bytes32 _hashLock,
        uint256 _timelock
    ) external onlySigner {
        require(multisigTransactions[_swapID].recipient == address(0), "Transaction already exists");

        MultisigTransaction storage txn = multisigTransactions[_swapID];
        txn.swapID = _swapID;
        txn.recipient = _recipient;
        txn.amount = _amount;
        txn.hashLock = _hashLock;
        txn.timelock = _timelock;
        txn.executed = false;
        txn.approvalCount = 0;

        emit MultisigTransactionCreated(_swapID, _recipient, _amount);
    }

    function approveMultisigTransaction(bytes32 _swapID) external onlySigner {
        MultisigTransaction storage txn = multisigTransactions[_swapID];
        require(txn.recipient != address(0), "Transaction does not exist");
        require(!txn.executed, "Transaction already executed");
        require(!txn.approvals[msg.sender], "Transaction already approved by this signer");

        txn.approvals[msg.sender] = true;
        txn.approvalCount = txn.approvalCount.add(1);

        emit MultisigTransactionApproved(_swapID, msg.sender);

        if (txn.approvalCount >= requiredSignatures) {
            executeMultisigTransaction(_swapID);
        }
    }

    function executeMultisigTransaction(bytes32 _swapID) internal {
        MultisigTransaction storage txn = multisigTransactions[_swapID];
        require(!txn.executed, "Transaction already executed");
        require(txn.approvalCount >= requiredSignatures, "Not enough approvals");

        txn.executed = true;
        initiateSwap(txn.swapID, txn.recipient, txn.hashLock, txn.timelock, {value: txn.amount});

        emit MultisigTransactionExecuted(_swapID);
    }

    function addSigner(address _newSigner) external onlyOwner {
        require(!isSigner(_newSigner), "Address is already a signer");
        signers.push(_newSigner);
        emit SignerAdded(_newSigner);
    }

    function removeSigner(address _oldSigner) external onlyOwner {
        require(isSigner(_oldSigner), "Address is not a signer");

        uint256 signerIndex;
        for (uint256 i = 0; i < signers.length; i++) {
            if (signers[i] == _oldSigner) {
                signerIndex = i;
                break;
            }
        }

        signers[signerIndex] = signers[signers.length - 1];
        signers.pop();

        emit SignerRemoved(_oldSigner);

        // Adjust required signatures if necessary
        if (requiredSignatures > signers.length) {
            changeRequiredSignatures(signers.length);
        }
    }

    function changeRequiredSignatures(uint256 _newRequiredSignatures) public onlyOwner {
        require(_newRequiredSignatures <= signers.length, "Required signatures cannot exceed number of signers");
        requiredSignatures = _newRequiredSignatures;
        emit RequiredSignaturesChanged(_newRequiredSignatures);
    }
}
