import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
    const location = useLocation();

    return (
        <div className="sidebar">
            <div className="logo-container">
                <Link to="/" className="site-title">
                    Restaurant Manager
                </Link>
            </div>
            
            <nav className="nav-menu">
                <Link to="/" className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>
                    <span className="nav-text">Home</span>
                </Link>
                
                <Link to="/ingredients" className={`nav-item ${location.pathname === '/ingredients' ? 'active' : ''}`}>
                    <span className="nav-text">Ingredients</span>
                </Link>
                
                <Link to="/menu-items" className={`nav-item ${location.pathname === '/menu-items' ? 'active' : ''}`}>
                    <span className="nav-text">Menu Items</span>
                </Link>
                
                <Link to="/orders" className={`nav-item ${location.pathname === '/orders' ? 'active' : ''}`}>
                    <span className="nav-text">Orders</span>
                </Link>
                
                <Link to="/suppliers" className={`nav-item ${location.pathname === '/suppliers' ? 'active' : ''}`}>
                    <span className="nav-text">Suppliers</span>
                </Link>
            </nav>
        </div>
    );
}

export default Sidebar;
