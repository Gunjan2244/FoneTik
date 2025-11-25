import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Complaints = () => {
    const [complaints, setComplaints] = useState([]);
    const [orderId, setOrderId] = useState('');
    const [description, setDescription] = useState('');
    const token = localStorage.getItem('token');

    const fetchComplaints = async () => {
        try {
            const response = await axios.get('http://localhost:8000/complaints/', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setComplaints(response.data);
        } catch (error) {
            console.error("Error fetching complaints", error);
        }
    };

    useEffect(() => {
        fetchComplaints();
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/complaints/', {
                order_id: orderId,
                description: description
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setOrderId('');
            setDescription('');
            fetchComplaints();
        } catch (error) {
            console.error("Error raising complaint", error);
        }
    };

    return (
        <div className="container section">
            <h2 className="mb-md">Complaints & Support</h2>

            <div style={{ marginBottom: '3rem' }}>
                <h3 className="mb-sm">Raise a New Complaint</h3>
                <form onSubmit={handleSubmit} style={{ maxWidth: '600px' }}>
                    <div className="mb-sm">
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Order ID</label>
                        <input
                            type="text"
                            value={orderId}
                            onChange={(e) => setOrderId(e.target.value)}
                            required
                            style={{ width: '100%', padding: '0.8rem', borderRadius: '4px', border: '1px solid #ddd' }}
                        />
                    </div>
                    <div className="mb-sm">
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            rows="3"
                            style={{ width: '100%', padding: '0.8rem', borderRadius: '4px', border: '1px solid #ddd' }}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit Complaint</button>
                </form>
            </div>

            <h3>Your Complaints</h3>
            {complaints.length === 0 ? (
                <p>No complaints found.</p>
            ) : (
                <div style={{ display: 'grid', gap: '1rem', marginTop: '1rem' }}>
                    {complaints.map((complaint) => (
                        <div key={complaint._id} style={{
                            padding: '1.5rem',
                            border: '1px solid var(--color-border)',
                            borderRadius: 'var(--border-radius)',
                            backgroundColor: 'white'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                <span style={{ fontWeight: 'bold' }}>Order: {complaint.order_id}</span>
                                <span style={{
                                    padding: '0.25rem 0.5rem',
                                    borderRadius: '4px',
                                    backgroundColor: complaint.status === 'resolved' ? '#e6f4ea' : '#fce8e6',
                                    color: complaint.status === 'resolved' ? '#1e8e3e' : '#c5221f',
                                    fontSize: '0.85rem'
                                }}>
                                    {complaint.status.toUpperCase()}
                                </span>
                            </div>
                            <p style={{ color: 'var(--color-text-light)' }}>{complaint.description}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Complaints;
