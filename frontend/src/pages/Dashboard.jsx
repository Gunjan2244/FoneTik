import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

const Dashboard = () => {
    const [orders, setOrders] = useState([]);
    const [complaints, setComplaints] = useState([]);
    const [userType, setUserType] = useState('customer');
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (token) {
            const decoded = jwtDecode(token);
            setUserType(decoded.user_type || 'customer');
        }
    }, [token]);

    const fetchData = async () => {
        try {
            const ordersRes = await axios.get('http://localhost:8000/orders/', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setOrders(ordersRes.data);

            if (userType === 'technician') {
                const complaintsRes = await axios.get('http://localhost:8000/complaints/', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setComplaints(complaintsRes.data);
            }
        } catch (error) {
            console.error("Error fetching data", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [token, userType]);

    const handleStatusUpdate = async (orderId, newStatus) => {
        try {
            await axios.put(`http://localhost:8000/orders/${orderId}?status_update=${newStatus}`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchData();
        } catch (error) {
            console.error("Error updating status", error);
        }
    };

    const handleResolveComplaint = async (complaintId) => {
        try {
            await axios.put(`http://localhost:8000/complaints/${complaintId}`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchData();
        } catch (error) {
            console.error("Error resolving complaint", error);
        }
    };

    const handleDeleteOrder = async (orderId) => {
        if (window.confirm("Are you sure you want to delete this order?")) {
            try {
                await axios.delete(`http://localhost:8000/orders/${orderId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                fetchData();
            } catch (error) {
                console.error("Error deleting order", error);
                alert("Failed to delete order");
            }
        }
    };

    return (
        <div className="container section">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '2rem', fontWeight: 'bold' }}>{userType === 'technician' ? 'Technician Dashboard' : 'My Dashboard'}</h2>
                {userType === 'customer' && (
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <Link to="/new-order" className="btn btn-primary">New Repair</Link>
                        <Link to="/complaints" className="btn btn-secondary">Complaints</Link>
                    </div>
                )}
            </div>

            <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', borderBottom: '2px solid var(--color-border)', paddingBottom: '0.5rem' }}>
                {userType === 'technician' ? 'All Orders' : 'Your Orders'}
            </h3>

            {orders.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
                    <p style={{ color: '#666', fontSize: '1.1rem' }}>No orders found.</p>
                    {userType === 'customer' && <Link to="/new-order" style={{ color: 'var(--color-primary)', fontWeight: 'bold', marginTop: '1rem', display: 'inline-block' }}>Start a new repair</Link>}
                </div>
            ) : (
                <div style={{ display: 'grid', gap: '1.5rem' }}>
                    {orders.map((order) => (
                        <div key={order._id} style={{
                            padding: '1.5rem',
                            border: '1px solid var(--color-border)',
                            borderRadius: '12px',
                            backgroundColor: 'white',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                            transition: 'transform 0.2s',
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                                <div>
                                    <h4 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>{order.device_model}</h4>
                                    <span style={{ fontSize: '0.85rem', color: '#888' }}>ID: {order._id}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <span style={{
                                        padding: '0.4rem 0.8rem',
                                        borderRadius: '20px',
                                        backgroundColor: order.status === 'completed' ? '#e6f4ea' : order.status === 'in_progress' ? '#e8f0fe' : '#fff0b3',
                                        color: order.status === 'completed' ? '#1e8e3e' : order.status === 'in_progress' ? '#1967d2' : '#b06000',
                                        fontSize: '0.85rem',
                                        fontWeight: '600',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.5px'
                                    }}>
                                        {order.status.replace('_', ' ')}
                                    </span>
                                    {userType === 'technician' && (
                                        <select
                                            value={order.status}
                                            onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                                            style={{ padding: '0.4rem', borderRadius: '4px', border: '1px solid #ddd' }}
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="in_progress">In Progress</option>
                                            <option value="completed">Completed</option>
                                        </select>
                                    )}
                                </div>
                            </div>

                            <div style={{ marginBottom: '1rem' }}>
                                <p style={{ color: '#444', lineHeight: '1.5' }}>{order.issue_description}</p>
                            </div>

                            {order.location && (
                                <div style={{ marginBottom: '1rem' }}>
                                    <a href={order.location} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-primary)', fontWeight: '500' }}>
                                        📍 View Location on Maps
                                    </a>
                                </div>
                            )}

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #eee', paddingTop: '1rem', marginTop: '1rem' }}>
                                <div style={{ fontSize: '0.9rem', color: '#666' }}>
                                    User: <span style={{ fontWeight: '500' }}>{order.user_email}</span>
                                </div>
                                {userType === 'customer' && order.status === 'pending' && (
                                    <button
                                        onClick={() => handleDeleteOrder(order._id)}
                                        className="btn"
                                        style={{
                                            backgroundColor: '#fee2e2',
                                            color: '#dc2626',
                                            padding: '0.5rem 1rem',
                                            fontSize: '0.9rem',
                                            border: 'none',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        Delete Order
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {userType === 'technician' && (
                <div style={{ marginTop: '4rem' }}>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', borderBottom: '2px solid var(--color-border)', paddingBottom: '0.5rem' }}>All Complaints</h3>
                    {complaints.length === 0 ? (
                        <p style={{ color: '#666' }}>No complaints found.</p>
                    ) : (
                        <div style={{ display: 'grid', gap: '1rem' }}>
                            {complaints.map((complaint) => (
                                <div key={complaint._id} style={{
                                    padding: '1.5rem',
                                    border: '1px solid var(--color-border)',
                                    borderRadius: '8px',
                                    backgroundColor: 'white'
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                        <span style={{ fontWeight: 'bold' }}>Order: {complaint.order_id}</span>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                            <span style={{
                                                padding: '0.25rem 0.5rem',
                                                borderRadius: '4px',
                                                backgroundColor: complaint.status === 'resolved' ? '#e6f4ea' : '#fce8e6',
                                                color: complaint.status === 'resolved' ? '#1e8e3e' : '#c5221f',
                                                fontSize: '0.85rem'
                                            }}>
                                                {complaint.status.toUpperCase()}
                                            </span>
                                            {complaint.status !== 'resolved' && (
                                                <button
                                                    onClick={() => handleResolveComplaint(complaint._id)}
                                                    className="btn btn-primary"
                                                    style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem' }}
                                                >
                                                    Resolve
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                    <p style={{ color: 'var(--color-text-light)' }}>{complaint.description}</p>
                                    <div style={{ marginTop: '1rem', fontSize: '0.8rem', color: '#999' }}>
                                        User: {complaint.user_email}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Dashboard;
