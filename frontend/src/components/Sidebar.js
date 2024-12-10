import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
    return (
        <div className="sidebar">
            <Link to="/" className="logo">
                <img
                    src="/logo.png" // Replace with your logo path if applicable
                    alt="Logo"
                    style={{ width: "100px", margin: "20px auto", display: "block" }}
                />
            </Link>
            <nav>
                <ul>
                    <li>
                        <Link to="/ingredients">Ingredients</Link>
                    </li>
                    <li>
                        <Link to="/menu-items">Menu Items</Link>
                    </li>
                    <li>
                        <Link to="/orders">Orders</Link>
                    </li>
                    <li>
                        <Link to="/suppliers">Suppliers</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Sidebar;
