#Component for the navigation bar.

// Navbar.js
import React from 'react';
import './Navbar.scss';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar__logo">
                <img src="/images/logo.png" alt="BitBridgeX Logo" />
            </div>
            <ul className="navbar__links">
                <li><a href="#dashboard">Dashboard</a></li>
                <li><a href="#swap">Swap</a></li>
                <li><a href="#history">History</a></li>
                <li><a href="#support">Support</a></li>
            </ul>
        </nav>
    );
};

export default Navbar;
