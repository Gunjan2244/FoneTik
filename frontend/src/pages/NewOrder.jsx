import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';

const NewOrder = () => {
    const [deviceModel, setDeviceModel] = useState('');
    const [issueDescription, setIssueDescription] = useState('');
    const [location, setLocation] = useState('');
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const handleGetLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setLocation(`https://www.google.com/maps?q=${latitude},${longitude}`);
                },
                (error) => {
                    console.error("Error getting location", error);
                    alert("Unable to retrieve your location.");
                }
            );
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post('/orders/', {
                device_model: deviceModel,
                issue_description: issueDescription,
                location: location
            });
            navigate('/dashboard');
        } catch (error) {
            console.error("Error creating order", error);
        }
    };

    return (
        <div className="container section">
            <h2 className="mb-md">Place New Repair Order</h2>
            <form onSubmit={handleSubmit} style={{ maxWidth: '600px' }}>
                <div className="mb-md">
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Device Model</label>
                    <input
                        type="text"
                        value={deviceModel}
                        onChange={(e) => setDeviceModel(e.target.value)}
                        required
                        placeholder="e.g. iPhone 13 Pro"
                        style={{ width: '100%', padding: '0.8rem', borderRadius: '4px', border: '1px solid #ddd' }}
                    />
                </div>
                <div className="mb-md">
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Issue Description</label>
                    <textarea
                        value={issueDescription}
                        onChange={(e) => setIssueDescription(e.target.value)}
                        required
                        placeholder="Describe the problem..."
                        rows="4"
                        style={{ width: '100%', padding: '0.8rem', borderRadius: '4px', border: '1px solid #ddd' }}
                    />
                </div>
                <div className="mb-md">
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Location (Optional)</label>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <input
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder="Google Maps Link"
                            style={{ flex: 1, padding: '0.8rem', borderRadius: '4px', border: '1px solid #ddd' }}
                        />
                        <button
                            type="button"
                            onClick={handleGetLocation}
                            className="btn btn-secondary"
                            style={{ padding: '0.8rem' }}
                        >
                            📍 Use My Location
                        </button>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Submit Order</button>
            </form>
        </div>
    );
};

export default NewOrder;
