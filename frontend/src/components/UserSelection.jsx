import React from 'react';
import { Link } from 'react-router-dom';

const UserSelection = () => {
    return (
        <section className="section" style={{ backgroundColor: 'var(--color-secondary)' }}>
            <div className="container">
                <div className="text-center mb-md">
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Who Are You?</h2>
                    <p style={{ color: 'var(--color-text-light)' }}>Select your profile to get started.</p>
                </div>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '2rem',
                    flexWrap: 'wrap'
                }}>
                    {/* Customer Card */}
                    <div style={{
                        backgroundColor: 'white',
                        padding: '3rem',
                        borderRadius: 'var(--border-radius)',
                        textAlign: 'center',
                        flex: '1',
                        minWidth: '300px',
                        maxWidth: '400px',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
                    }}>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>I need a repair</h3>
                        <p style={{ color: 'var(--color-text-light)', marginBottom: '2rem' }}>
                            Find a technician near you and book a repair slot instantly.
                        </p>
                        <Link to="/signup" className="btn btn-primary" style={{ width: '100%', display: 'inline-block' }}>Find a Technician</Link>
                    </div>

                    {/* Technician Card */}
                    <div style={{
                        backgroundColor: 'var(--color-primary)',
                        color: 'white',
                        padding: '3rem',
                        borderRadius: 'var(--border-radius)',
                        textAlign: 'center',
                        flex: '1',
                        minWidth: '300px',
                        maxWidth: '400px',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                    }}>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>I am a Technician</h3>
                        <p style={{ color: '#cccccc', marginBottom: '2rem' }}>
                            Join our network, receive jobs, and grow your business.
                        </p>
                        <Link to="/signup" className="btn btn-secondary" style={{ width: '100%', backgroundColor: 'transparent', color: 'white', borderColor: 'white', display: 'inline-block' }}>
                            Join Network
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UserSelection;
