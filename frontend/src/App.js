# User Interface (UI) and Frontend code
# Main React component

// App.js
import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
import SwapForm from './components/SwapForm';
import TransactionHistory from './components/TransactionHistory';
import './App.scss';

const App = () => {
    return (
        <div className="app">
            <Navbar />
            <main>
                <Dashboard />
                <SwapForm />
                <TransactionHistory />
            </main>
            <Footer />
        </div>
    );
};

export default App;
