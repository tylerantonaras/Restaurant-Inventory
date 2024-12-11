import React, { useState, useEffect } from 'react';
import './Ingredients.css';
import { useLocation } from 'react-router-dom';

function Ingredients() {
    const location = useLocation();
    const [ingredients, setIngredients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showEditForm, setShowEditForm] = useState(false);
    const [editingIngredient, setEditingIngredient] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [categories, setCategories] = useState([]);
    const [customCategories, setCustomCategories] = useState([]);

    const defaultCategories = [
        'Produce',
        'Meat',
        'Dairy',
        'Grains',
        'Spices',
        'Beverages',
        'Condiments',
        'Baking',
        'Poultry'
    ];

    const defaultUnits = [
        'kg',
        'g',
        'lb',
        'oz',
        'L',
        'ml',
        'cup',
        'tbsp',
        'tsp',
        'piece',
        'unit'
    ];

    useEffect(() => {
        fetchIngredients();
        fetchCategories();
        
        if (location.state?.openAddForm) {
            setShowAddForm(true);
            // Clear the state so it doesn't reopen on page refresh
            window.history.replaceState({}, document.title);
        }
    }, []);

    const fetchIngredients = async () => {
        try {
            const response = await fetch('http://localhost:8080/ingredients', {
                headers: {
                    'Cache-Control': 'no-cache'
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch ingredients');
            }
            const data = await response.json();
            setIngredients(data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await fetch('http://localhost:8080/ingredients');
            const data = await response.json();
            const existingCategories = [...new Set(data.map(item => item.category).filter(Boolean))];
            
            // Filter out unwanted categories
            const validCategories = existingCategories.filter(cat => 
                cat !== 'idk' && 
                cat !== 'Poultry 3' && 
                cat !== 'Baked Goods' &&
                cat.trim() !== ''  // Also remove any empty or whitespace-only categories
            );
            
            const customCats = validCategories.filter(cat => !defaultCategories.includes(cat));
            setCustomCategories(customCats);
            const allCategories = [...new Set([...defaultCategories, ...customCats])];
            setCategories(allCategories);
        } catch (err) {
            console.error('Error fetching categories:', err);
        }
    };

    const handleAdd = async (event) => {
        event.preventDefault();
        const newIngredient = {
            name: event.target.name.value,
            category: event.target.category.value,
            unitOfMeasure: event.target.unitOfMeasure.value,
            stockQuantity: parseInt(event.target.stockQuantity.value),
            reorderLevel: parseInt(event.target.reorderLevel.value),
            pricePerUnit: parseFloat(event.target.pricePerUnit.value)
        };

        try {
            const response = await fetch('http://localhost:8080/ingredients', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newIngredient)
            });
            
            if (!response.ok) throw new Error('Failed to create ingredient');
            
            await fetchIngredients();
            setShowAddForm(false);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleEdit = (ingredient) => {
        setEditingIngredient(ingredient);
        setShowEditForm(true);
    };

    const handleEditSubmit = async (event) => {
        event.preventDefault();
        const updatedIngredient = {
            ...editingIngredient,
            name: event.target.name.value,
            category: event.target.category.value,
            unitOfMeasure: event.target.unitOfMeasure.value,
            stockQuantity: parseInt(event.target.stockQuantity.value),
            reorderLevel: parseInt(event.target.reorderLevel.value),
            pricePerUnit: parseFloat(event.target.pricePerUnit.value)
        };

        try {
            const response = await fetch(`http://localhost:8080/ingredients/${editingIngredient.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedIngredient)
            });
            
            if (!response.ok) throw new Error('Failed to update ingredient');
            
            await fetchIngredients();
            setShowEditForm(false);
            setEditingIngredient(null);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this ingredient?')) {
            try {
                const response = await fetch(`http://localhost:8080/ingredients/${id}`, {
                    method: 'DELETE',
                });
                if (!response.ok) throw new Error('Failed to delete ingredient');
                fetchIngredients();
            } catch (err) {
                setError(err.message);
            }
        }
    };

    const handleRemoveCategory = (categoryToRemove) => {
        if (defaultCategories.includes(categoryToRemove)) {
            alert('Cannot remove default category');
            return;
        }

        setCustomCategories(prev => prev.filter(cat => cat !== categoryToRemove));
        setCategories(prev => prev.filter(cat => cat !== categoryToRemove));
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="ingredients">
            <div className="ingredients-header">
                <h1>Ingredients</h1>
                <button className="add-btn" onClick={() => setShowAddForm(true)}>Add New Ingredient</button>
            </div>
            
            {showAddForm && (
                <>
                    <div className="modal-overlay" onClick={() => setShowAddForm(false)} />
                    <div className="edit-form">
                        <h3>Add New Ingredient</h3>
                        <form onSubmit={handleAdd}>
                            <div className="form-group">
                                <label>Name:</label>
                                <input 
                                    type="text" 
                                    name="name" 
                                    required 
                                    autocomplete="off"
                                />
                            </div>
                            <div className="form-group">
                                <label>Category:</label>
                                <input 
                                    type="text" 
                                    name="category" 
                                    list="addCategories"
                                    required 
                                />
                                <datalist id="addCategories">
                                    {categories.map((cat, index) => (
                                        <option key={index} value={cat} />
                                    ))}
                                </datalist>
                            </div>
                            <div className="form-group">
                                <label>Unit of Measure:</label>
                                <input 
                                    type="text" 
                                    name="unitOfMeasure" 
                                    list="addUnits"
                                    required 
                                />
                                <datalist id="addUnits">
                                    {defaultUnits.map((unit, index) => (
                                        <option key={index} value={unit} />
                                    ))}
                                </datalist>
                            </div>
                            <div className="form-group">
                                <label>Stock Quantity:</label>
                                <input type="number" name="stockQuantity" required />
                            </div>
                            <div className="form-group">
                                <label>Reorder Level:</label>
                                <input type="number" name="reorderLevel" required />
                            </div>
                            <div className="form-group">
                                <label>Price per Unit:</label>
                                <input type="number" step="0.01" name="pricePerUnit" required />
                            </div>
                            <div className="form-buttons">
                                <button type="submit">Add Ingredient</button>
                                <button type="button" onClick={() => setShowAddForm(false)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </>
            )}

            {showEditForm && editingIngredient && (
                <>
                    <div className="modal-overlay" onClick={() => setShowEditForm(false)} />
                    <div className="edit-form">
                        <h3>Edit Ingredient</h3>
                        <form onSubmit={handleEditSubmit}>
                            <div className="form-group">
                                <label>Name:</label>
                                <input 
                                    type="text" 
                                    name="name" 
                                    defaultValue={editingIngredient.name}
                                    required 
                                    autocomplete="off"
                                />
                            </div>
                            <div className="form-group">
                                <label>Category:</label>
                                <input 
                                    type="text" 
                                    name="category" 
                                    list="editCategories"
                                    defaultValue={editingIngredient.category}
                                    required 
                                />
                                <datalist id="editCategories">
                                    {categories.map((cat, index) => (
                                        <option key={index} value={cat} />
                                    ))}
                                </datalist>
                            </div>
                            <div className="form-group">
                                <label>Unit of Measure:</label>
                                <input 
                                    type="text" 
                                    name="unitOfMeasure" 
                                    list="editUnits"
                                    defaultValue={editingIngredient.unitOfMeasure}
                                    required 
                                />
                                <datalist id="editUnits">
                                    {defaultUnits.map((unit, index) => (
                                        <option key={index} value={unit} />
                                    ))}
                                </datalist>
                            </div>
                            <div className="form-group">
                                <label>Stock Quantity:</label>
                                <input type="number" name="stockQuantity" defaultValue={editingIngredient.stockQuantity} required />
                            </div>
                            <div className="form-group">
                                <label>Reorder Level:</label>
                                <input type="number" name="reorderLevel" defaultValue={editingIngredient.reorderLevel} required />
                            </div>
                            <div className="form-group">
                                <label>Price per Unit:</label>
                                <input type="number" step="0.01" name="pricePerUnit" defaultValue={editingIngredient.pricePerUnit} required />
                            </div>
                            <div className="form-buttons">
                                <button type="submit">Update</button>
                                <button type="button" onClick={() => {
                                    setShowEditForm(false);
                                    setEditingIngredient(null);
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
                        <th>Category</th>
                        <th>Quantity</th>
                        <th>Reorder Level</th>
                        <th>Unit</th>
                        <th>Price per Unit</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {ingredients.map(ingredient => (
                        <tr 
                            key={ingredient.id}
                            style={{
                                backgroundColor: ingredient.stockQuantity <= ingredient.reorderLevel ? '#ffebeb' : 'inherit',
                                transition: 'background-color 0.3s'
                            }}
                        >
                            <td>{ingredient.id}</td>
                            <td>{ingredient.name}</td>
                            <td>{ingredient.category || 'N/A'}</td>
                            <td style={{ 
                                color: ingredient.stockQuantity <= ingredient.reorderLevel ? '#ff0000' : 'inherit',
                                fontWeight: ingredient.stockQuantity <= ingredient.reorderLevel ? 'bold' : 'normal'
                            }}>
                                {ingredient.stockQuantity}
                            </td>
                            <td>{ingredient.reorderLevel}</td>
                            <td>{ingredient.unitOfMeasure}</td>
                            <td>
                                ${(ingredient.pricePerUnit !== null && ingredient.pricePerUnit !== undefined) 
                                    ? Number(ingredient.pricePerUnit).toFixed(2) 
                                    : '0.00'}
                            </td>
                            <td>
                                <button className="edit-btn" onClick={() => handleEdit(ingredient)}>Edit</button>
                                <button className="delete-btn" onClick={() => handleDelete(ingredient.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
            <button className="add-btn" onClick={() => setShowAddForm(true)}>Add New Ingredient</button>
        </div>
    );
}

export default Ingredients;
