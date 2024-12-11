import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        totalMenuItems: 0,
        totalIngredients: 0,
        lowStockItems: 0
    });

    useEffect(() => {
        fetchDashboardStats();
    }, []);

    const fetchDashboardStats = async () => {
        try {
            // Fetch menu items
            const menuResponse = await fetch('http://localhost:8080/api/menu-items');
            const menuItems = await menuResponse.json();
            
            // Fetch ingredients
            const ingredientsResponse = await fetch('http://localhost:8080/ingredients');
            const ingredients = await ingredientsResponse.json();
            
            // Calculate low stock items
            const lowStock = ingredients.filter(item => 
                item.stockQuantity <= item.reorderLevel
            ).length;

            setStats({
                totalMenuItems: menuItems.length,
                totalIngredients: ingredients.length,
                lowStockItems: lowStock
            });
        } catch (error) {
            console.error('Error fetching dashboard stats:', error);
        }
    };

    const handleAddMenuItem = () => {
        navigate('/menu-items?add=true');
    };

    return (
        <div className="home">
            <header className="dashboard-header">
                <h1>Restaurant Inventory Management</h1>
                <p>Welcome to your restaurant management dashboard</p>
            </header>

            <div className="quick-stats">
                <div className="stat-card">
                    <h3>Menu Items</h3>
                    <p className="stat-number">{stats.totalMenuItems}</p>
                    <button onClick={() => navigate('/menu-items')} className="stat-link">View All</button>
                </div>
                <div className="stat-card">
                    <h3>Ingredients</h3>
                    <p className="stat-number">{stats.totalIngredients}</p>
                    <button onClick={() => navigate('/ingredients')} className="stat-link">View All</button>
                </div>
                <div className="stat-card alert">
                    <h3>Low Stock Items</h3>
                    <p className="stat-number">{stats.lowStockItems}</p>
                    <button onClick={() => navigate('/ingredients')} className="stat-link">Check Stock</button>
                </div>
            </div>

            <div className="quick-actions">
                <h2>Quick Actions</h2>
                <div className="action-buttons">
                    <button onClick={handleAddMenuItem} className="action-button">
                        <span className="icon">➕</span>
                        Add Menu Item
                    </button>
                    <button 
                        onClick={() => navigate('/ingredients', { state: { openAddForm: true } })} 
                        className="action-button"
                    >
                        <span className="icon">🥘</span>
                        Add Ingredient
                    </button>
                    <button onClick={() => navigate('/inventory')} className="action-button">
                        <span className="icon">📦</span>
                        Update Stock
                    </button>
                    <button onClick={() => navigate('/reports')} className="action-button">
                        <span className="icon">📊</span>
                        View Reports
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Home;
