# Form for initiating swaps

// SwapForm.js
import React, { useState } from 'react';
import './SwapForm.scss';

const SwapForm = () => {
    const [sourceChain, setSourceChain] = useState('Ethereum');
    const [destinationChain, setDestinationChain] = useState('Binance Smart Chain');
    const [amount, setAmount] = useState('');

    const handleSwap = (e) => {
        e.preventDefault();
        console.log('Swap initiated:', { sourceChain, destinationChain, amount });
        // Integrate with smart contract or API here
    };

    return (
        <form className="swap-form" onSubmit={handleSwap}>
            <h2>Perform a Swap</h2>
            <div className="swap-form__group">
                <label htmlFor="sourceChain">Source Chain</label>
                <select id="sourceChain" value={sourceChain} onChange={(e) => setSourceChain(e.target.value)}>
                    <option value="Ethereum">Ethereum</option>
                    <option value="Binance Smart Chain">Binance Smart Chain</option>
                    <option value="Avalanche">Avalanche</option>
                    <option value="Solana">Solana</option>
                </select>
            </div>
            <div className="swap-form__group">
                <label htmlFor="destinationChain">Destination Chain</label>
                <select id="destinationChain" value={destinationChain} onChange={(e) => setDestinationChain(e.target.value)}>
                    <option value="Binance Smart Chain">Binance Smart Chain</option>
                    <option value="Ethereum">Ethereum</option>
                    <option value="Avalanche">Avalanche</option>
                    <option value="Solana">Solana</option>
                </select>
            </div>
            <div className="swap-form__group">
                <label htmlFor="amount">Amount</label>
                <input type="number" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
            </div>
            <button type="submit" className="swap-form__submit">Initiate Swap</button>
        </form>
    );
};

export default SwapForm;
