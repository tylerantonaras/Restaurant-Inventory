import React, { useState, useEffect } from 'react';
import './Suppliers.css';

function Suppliers() {
    const [suppliers, setSuppliers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showEditForm, setShowEditForm] = useState(false);
    const [editingSupplier, setEditingSupplier] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [supplierNames, setSupplierNames] = useState([]);

    useEffect(() => {
        fetchSuppliers();
    }, []);

    const fetchSuppliers = async () => {
        try {
            const response = await fetch('http://localhost:8080/suppliers');
            if (!response.ok) {
                throw new Error('Failed to fetch suppliers');
            }
            const data = await response.json();
            setSuppliers(data);
            const names = [...new Set(data.map(supplier => supplier.name))];
            setSupplierNames(names);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        
        const newSupplier = {
            name: formData.get('name'),
            contactInfo: formData.get('contactInfo'),
            address: formData.get('address'),
            email: formData.get('email'),
            phone: formData.get('phone')
        };

        try {
            const response = await fetch('http://localhost:8080/suppliers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newSupplier)
            });
            
            if (!response.ok) throw new Error('Failed to create supplier');
            
            setShowAddForm(false);
            fetchSuppliers();
        } catch (err) {
            setError(err.message);
        }
    };

    const handleEdit = (supplier) => {
        setEditingSupplier(supplier);
        setShowEditForm(true);
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        
        const updatedSupplier = {
            ...editingSupplier,
            name: formData.get('name'),
            contactInfo: formData.get('contactInfo'),
            address: formData.get('address'),
            email: formData.get('email'),
            phone: formData.get('phone')
        };

        try {
            const response = await fetch(`http://localhost:8080/suppliers/${editingSupplier.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedSupplier)
            });
            
            if (!response.ok) throw new Error('Failed to update supplier');
            
            setShowEditForm(false);
            setEditingSupplier(null);
            fetchSuppliers();
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this supplier?')) {
            try {
                const response = await fetch(`http://localhost:8080/suppliers/${id}`, {
                    method: 'DELETE',
                });
                if (!response.ok) {
                    const data = await response.json();
                    throw new Error(data.error || 'Failed to delete supplier');
                }
                fetchSuppliers();
            } catch (err) {
                alert(err.message);
            }
        }
    };

    const handleNameSelect = (e) => {
        const selectedName = e.target.value;
        const existingSupplier = suppliers.find(s => s.name === selectedName);
        
        if (existingSupplier) {
            const form = e.target.form;
            form.contactInfo.value = existingSupplier.contactInfo || '';
            form.address.value = existingSupplier.address || '';
            form.email.value = existingSupplier.email || '';
            form.phone.value = existingSupplier.phone || '';
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="suppliers">
            <div className="ingredients-header">
                <h1>Suppliers</h1>
                <button className="add-btn" onClick={() => setShowAddForm(true)}>Add New Supplier</button>
            </div>
            {showAddForm && (
                <>
                    <div className="modal-overlay" onClick={() => setShowAddForm(false)} />
                    <div className="edit-form">
                        <h3>Add New Supplier</h3>
                        <form onSubmit={handleAdd} autoComplete="off">
                            <div className="form-group">
                                <label>Name:</label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    list="supplierNames"
                                    onChange={handleNameSelect}
                                    autoComplete="off"
                                />
                                <datalist id="supplierNames">
                                    {supplierNames.map((name, index) => (
                                        <option key={index} value={name} />
                                    ))}
                                </datalist>
                            </div>
                            <div className="form-group">
                                <label>Contact Info:</label>
                                <input
                                    type="text"
                                    name="contactInfo"
                                    required
                                    autoComplete="new-contact"
                                />
                            </div>
                            <div className="form-group">
                                <label>Address:</label>
                                <input
                                    type="text"
                                    name="address"
                                    required
                                    autoComplete="new-address"
                                />
                            </div>
                            <div className="form-group">
                                <label>Email:</label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    autoComplete="new-email"
                                />
                            </div>
                            <div className="form-group">
                                <label>Phone:</label>
                                <input
                                    type="text"
                                    name="phone"
                                    required
                                    autoComplete="new-phone"
                                />
                            </div>
                            <div className="form-buttons">
                                <button type="submit">Add Supplier</button>
                                <button type="button" onClick={() => setShowAddForm(false)}>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </>
            )}
            {showEditForm && editingSupplier && (
                <>
                    <div className="modal-overlay" onClick={() => setShowEditForm(false)} />
                    <div className="edit-form">
                        <h3>Edit Supplier</h3>
                        <form onSubmit={handleEditSubmit}>
                            <div className="form-group">
                                <label>Name:</label>
                                <input
                                    type="text"
                                    name="name"
                                    defaultValue={editingSupplier.name}
                                    required
                                    autocomplete="off"
                                />
                            </div>
                            <div className="form-group">
                                <label>Contact Info:</label>
                                <input
                                    type="text"
                                    name="contactInfo"
                                    defaultValue={editingSupplier.contactInfo}
                                    required
                                    autocomplete="off"
                                />
                            </div>
                            <div className="form-group">
                                <label>Address:</label>
                                <input
                                    type="text"
                                    name="address"
                                    defaultValue={editingSupplier.address}
                                    required
                                    autocomplete="off"
                                />
                            </div>
                            <div className="form-group">
                                <label>Email:</label>
                                <input
                                    type="email"
                                    name="email"
                                    defaultValue={editingSupplier.email}
                                    required
                                    autocomplete="off"
                                />
                            </div>
                            <div className="form-group">
                                <label>Phone:</label>
                                <input
                                    type="text"
                                    name="phone"
                                    defaultValue={editingSupplier.phone}
                                    required
                                    autocomplete="off"
                                />
                            </div>
                            <div className="form-buttons">
                                <button type="submit">Update</button>
                                <button type="button" onClick={() => {
                                    setShowEditForm(false);
                                    setEditingSupplier(null);
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
                        <th>Contact Info</th>
                        <th>Address</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {suppliers.map(supplier => (
                        <tr key={supplier.id}>
                            <td>{supplier.id}</td>
                            <td>{supplier.name}</td>
                            <td>{supplier.contactInfo}</td>
                            <td>{supplier.address}</td>
                            <td>{supplier.email}</td>
                            <td>{supplier.phone}</td>
                            <td>
                                <button className="edit-btn" onClick={() => handleEdit(supplier)}>Edit</button>
                                <button className="delete-btn" onClick={() => handleDelete(supplier.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className="add-btn" onClick={() => setShowAddForm(true)}>Add New Supplier</button>
        </div>
    );
}

export default Suppliers; 