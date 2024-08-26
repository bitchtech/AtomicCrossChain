# View past transactions

// TransactionHistory.js
import React from 'react';
import './TransactionHistory.scss';

const transactions = [
    { id: 1, source: 'Ethereum', destination: 'Binance Smart Chain', amount: '100', status: 'Completed' },
    { id: 2, source: 'Avalanche', destination: 'Solana', amount: '50', status: 'Pending' },
    // Add more transactions as needed
];

const TransactionHistory = () => {
    return (
        <div className="transaction-history container">
            <h2>Transaction History</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Source Chain</th>
                        <th>Destination Chain</th>
                        <th>Amount</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map(transaction => (
                        <tr key={transaction.id}>
                            <td>{transaction.id}</td>
                            <td>{transaction.source}</td>
                            <td>{transaction.destination}</td>
                            <td>{transaction.amount}</td>
                            <td>{transaction.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TransactionHistory;
