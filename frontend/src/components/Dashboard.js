// Dashboard.js
import React from 'react';
import './Dashboard.scss';

const Dashboard = () => {
    return (
        <div className="dashboard container">
            <h1>Welcome to BitBridgeX</h1>
            <p>Manage your cross-chain swaps efficiently and securely.</p>
            <div className="dashboard__cards">
                <div className="dashboard__card">
                    <h3>Total Swaps</h3>
                    <p>1,234</p>
                </div>
                <div className="dashboard__card">
                    <h3>Active Swaps</h3>
                    <p>123</p>
                </div>
                <div className="dashboard__card">
                    <h3>Completed Swaps</h3>
                    <p>1,111</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
