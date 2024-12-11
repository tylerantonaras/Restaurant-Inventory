import React, { useState, useEffect } from 'react';
import './Orders.css';

function Orders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [suppliers, setSuppliers] = useState([]);
    const [editingOrder, setEditingOrder] = useState(null);
    const [showEditForm, setShowEditForm] = useState(false);
    const [sortDirection, setSortDirection] = useState('asc');
    const [statusFilter, setStatusFilter] = useState('all');

    const fetchSuppliers = async () => {
        try {
            const response = await fetch('http://localhost:8080/suppliers');
            if (!response.ok) throw new Error('Failed to fetch suppliers');
            const data = await response.json();
            setSuppliers(data);
        } catch (err) {
            console.error('Error fetching suppliers:', err);
        }
    };

    useEffect(() => {
        fetchOrders();
        fetchSuppliers();
    }, [statusFilter, sortDirection]);

    const fetchOrders = async () => {
        try {
            let url = 'http://localhost:8080/orders';
            
            if (statusFilter !== 'all') {
                url = `http://localhost:8080/orders/status/${statusFilter}`;
            } else {
                url = `http://localhost:8080/orders/sorted?direction=${sortDirection}`;
            }
            
            const response = await fetch(url);
            if (!response.ok) throw new Error('Failed to fetch orders');
            const data = await response.json();
            setOrders(data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this order?')) {
            try {
                const response = await fetch(`http://localhost:8080/orders/${id}`, {
                    method: 'DELETE'
                });
                if (response.ok) {
                    fetchOrders(); // Refresh the list
                }
            } catch (err) {
                console.error('Error deleting order:', err);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        
        try {
            const supplierName = formData.get('supplier');
            // Find or create supplier
            let supplier = suppliers.find(s => s.name === supplierName);
            
            if (!supplier) {
                // Create new supplier if it doesn't exist
                const newSupplier = {
                    name: supplierName,
                    contactInfo: '',
                    address: '',
                    email: '',
                    phone: ''
                };
                
                const supplierResponse = await fetch('http://localhost:8080/suppliers', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newSupplier)
                });
                
                if (!supplierResponse.ok) throw new Error('Failed to create supplier');
                supplier = await supplierResponse.json();
            }

            const orderData = {
                orderDate: new Date().toISOString(),
                status: formData.get('status'),
                totalCost: parseFloat(formData.get('totalCost')),
                supplier: {
                    id: supplier.id
                }
            };

            const response = await fetch('http://localhost:8080/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData)
            });

            if (!response.ok) throw new Error('Failed to create order');
            
            setShowForm(false);
            fetchOrders();
        } catch (err) {
            console.error('Error creating order:', err);
            alert('Failed to create order');
        }
    };

    const handleEdit = (order) => {
        setEditingOrder(order);
        setShowEditForm(true);
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        
        try {
            const orderData = {
                orderDate: editingOrder.orderDate,
                status: formData.get('status'),
                totalCost: parseFloat(formData.get('totalCost')),
                supplier: {
                    id: parseInt(formData.get('supplier'))
                }
            };

            const response = await fetch(`http://localhost:8080/orders/${editingOrder.orderId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData)
            });

            if (response.ok) {
                setShowEditForm(false);
                setEditingOrder(null);
                fetchOrders(); // Refresh the list
            } else {
                throw new Error('Failed to update order');
            }
        } catch (err) {
            console.error('Error updating order:', err);
            alert('Failed to update order');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="orders-container">
            <div className="orders-header">
                <h2>Orders</h2>
                <button 
                    className="create-btn"
                    onClick={() => setShowForm(true)}
                >
                    Create New Order
                </button>
            </div>
            
            <div className="filters">
                <select 
                    value={statusFilter} 
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="status-filter"
                >
                    <option value="all">All Orders</option>
                    <option value="PENDING">Pending</option>
                    <option value="COMPLETED">Completed</option>
                    <option value="CANCELLED">Cancelled</option>
                </select>
                
                <button 
                    className="sort-btn"
                    onClick={() => setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc')}
                >
                    Sort {sortDirection === 'asc' ? '↓' : '↑'}
                </button>
            </div>

            {showForm && (
                <div className="order-form">
                    <h3>Create New Order</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Select Supplier</label>
                            <input 
                                type="text"
                                list="suppliers"
                                name="supplier"
                                required
                                autoComplete="off"
                            />
                            <datalist id="suppliers">
                                {suppliers.map(supplier => (
                                    <option key={supplier.id} value={supplier.name} />
                                ))}
                            </datalist>
                        </div>
                        <input
                            type="number"
                            name="totalCost"
                            placeholder="Total Cost"
                            required
                        />
                        <select name="status" required>
                            <option value="PENDING">Pending</option>
                            <option value="COMPLETED">Completed</option>
                            <option value="CANCELLED">Cancelled</option>
                        </select>
                        <button type="submit">Create Order</button>
                        <button type="button" onClick={() => setShowForm(false)}>
                            Cancel
                        </button>
                    </form>
                </div>
            )}

            {showEditForm && editingOrder && (
                <div className="order-form">
                    <h3>Edit Order</h3>
                    <form onSubmit={handleEditSubmit}>
                        <select name="supplier" required defaultValue={editingOrder.supplier?.id || ''}>
                            <option value="">Select Supplier</option>
                            {suppliers.map(supplier => (
                                <option key={supplier.id} value={supplier.id}>
                                    {supplier.name}
                                </option>
                            ))}
                        </select>
                        <input
                            type="number"
                            name="totalCost"
                            placeholder="Total Cost"
                            defaultValue={editingOrder.totalCost}
                            required
                        />
                        <select name="status" required defaultValue={editingOrder.status}>
                            <option value="PENDING">Pending</option>
                            <option value="COMPLETED">Completed</option>
                            <option value="CANCELLED">Cancelled</option>
                        </select>
                        <button type="submit">Update Order</button>
                        <button type="button" onClick={() => {
                            setShowEditForm(false);
                            setEditingOrder(null);
                        }}>
                            Cancel
                        </button>
                    </form>
                </div>
            )}

            <table className="orders-table">
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Total Cost</th>
                        <th>Supplier</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order.orderId}>
                            <td>{order.orderId}</td>
                            <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                            <td>{order.status}</td>
                            <td>${order.totalCost}</td>
                            <td>{order.supplier ? order.supplier.name : 'N/A'}</td>
                            <td>
                                <button className="edit-btn" onClick={() => handleEdit(order)}>Edit</button>
                                <button className="delete-btn" onClick={() => handleDelete(order.orderId)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Orders; 