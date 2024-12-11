import React, { useState, useEffect } from 'react';
import './MenuItems.css';

function MenuItems() {
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [editingMenuItem, setEditingMenuItem] = useState(null);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchMenuItems();
        fetchCategories();
    }, []);

    const fetchMenuItems = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/menu-items');
            if (!response.ok) throw new Error('Failed to fetch menu items');
            const data = await response.json();
            console.log('Menu Items:', data);
            setMenuItems(data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/menu-items');
            const data = await response.json();
            const uniqueCategories = [...new Set(data.map(item => item.category).filter(Boolean))];
            setCategories(uniqueCategories);
        } catch (err) {
            console.error('Error fetching categories:', err);
        }
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        
        const newMenuItem = {
            name: formData.get('name'),
            description: formData.get('description'),
            price: parseFloat(formData.get('price')),
            category: formData.get('category') || 'Uncategorized'
        };

        try {
            const response = await fetch('http://localhost:8080/api/menu-items', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newMenuItem)
            });
            
            if (!response.ok) throw new Error('Failed to create menu item');
            
            setShowAddForm(false);
            fetchMenuItems();
        } catch (err) {
            setError(err.message);
        }
    };

    const handleEdit = (menuItem) => {
        setEditingMenuItem(menuItem);
        setShowEditForm(true);
    };

    const handleEditSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        
        console.log('Form data:', {
            name: formData.get('name'),
            description: formData.get('description'),
            price: formData.get('price'),
            category: formData.get('category')
        });
        
        const updatedMenuItem = {
            ...editingMenuItem,
            name: formData.get('name'),
            description: formData.get('description'),
            price: parseFloat(formData.get('price')),
            category: formData.get('category')
        };

        console.log('Sending update:', updatedMenuItem);
        console.log('Original item:', editingMenuItem);

        try {
            const response = await fetch(`http://localhost:8080/api/menu-items/${editingMenuItem.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedMenuItem)
            });
            
            if (!response.ok) {
                const errorText = await response.text();
                console.error('Server error:', errorText);
                throw new Error('Failed to update menu item');
            }
            
            const updatedData = await response.json();
            console.log('Server response:', updatedData);
            
            await fetchMenuItems();
            setShowEditForm(false);
            setEditingMenuItem(null);
        } catch (err) {
            console.error('Update error:', err);
            setError(err.message);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this menu item?')) {
            try {
                const response = await fetch(`http://localhost:8080/api/menu-items/${id}`, {
                    method: 'DELETE',
                });
                if (!response.ok) {
                    const data = await response.json();
                    throw new Error(data.error || 'Failed to delete menu item');
                }
                fetchMenuItems();
            } catch (err) {
                alert(err.message);
            }
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="menu-items">
            <h1>Menu Items</h1>
            
            {showAddForm && (
                <>
                    <div className="modal-overlay" onClick={() => setShowAddForm(false)} />
                    <div className="edit-form">
                        <h3>Add New Menu Item</h3>
                        <form onSubmit={handleAdd}>
                            <div className="form-group">
                                <label>Name:</label>
                                <input type="text" name="name" required />
                            </div>
                            <div className="form-group">
                                <label>Description:</label>
                                <textarea name="description" required />
                            </div>
                            <div className="form-group">
                                <label>Price:</label>
                                <input type="number" name="price" step="0.01" required />
                            </div>
                            <div className="form-group">
                                <label>Category:</label>
                                <input 
                                    type="text"
                                    name="category"
                                    list="categories"
                                    required
                                />
                                <datalist id="categories">
                                    {categories.map((cat, index) => (
                                        <option key={index} value={cat} />
                                    ))}
                                </datalist>
                            </div>
                            <div className="form-buttons">
                                <button type="submit">Add Menu Item</button>
                                <button type="button" onClick={() => setShowAddForm(false)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </>
            )}
            
            {showEditForm && editingMenuItem && (
                <>
                    <div className="modal-overlay" onClick={() => setShowEditForm(false)} />
                    <div className="edit-form">
                        <h3>Edit Menu Item</h3>
                        <form onSubmit={handleEditSubmit}>
                            <div className="form-group">
                                <label>Name:</label>
                                <input 
                                    type="text" 
                                    name="name" 
                                    defaultValue={editingMenuItem.name}
                                    required 
                                />
                            </div>
                            <div className="form-group">
                                <label>Description:</label>
                                <textarea 
                                    name="description"
                                    defaultValue={editingMenuItem.description}
                                    required 
                                />
                            </div>
                            <div className="form-group">
                                <label>Price:</label>
                                <input 
                                    type="number"
                                    name="price"
                                    step="0.01"
                                    defaultValue={editingMenuItem.price}
                                    required 
                                />
                            </div>
                            <div className="form-group">
                                <label>Category:</label>
                                <input 
                                    type="text"
                                    name="category"
                                    list="categories"
                                    defaultValue={editingMenuItem.category}
                                    required
                                />
                                <datalist id="categories">
                                    {categories.map((cat, index) => (
                                        <option key={index} value={cat} />
                                    ))}
                                </datalist>
                            </div>
                            <div className="form-buttons">
                                <button type="submit">Update</button>
                                <button type="button" onClick={() => {
                                    setShowEditForm(false);
                                    setEditingMenuItem(null);
                                }}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </>
            )}

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {menuItems.map(item => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.description}</td>
                            <td>${parseFloat(item.price).toFixed(2)}</td>
                            <td>{item.category || 'N/A'}</td>
                            <td>
                                <button className="edit-btn" onClick={() => handleEdit(item)}>Edit</button>
                                <button className="delete-btn" onClick={() => handleDelete(item.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
            <button className="add-btn" onClick={() => setShowAddForm(true)}>Add New Menu Item</button>
        </div>
    );
}

export default MenuItems; 