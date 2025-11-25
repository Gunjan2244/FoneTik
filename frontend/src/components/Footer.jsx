import React from 'react';

const Footer = () => {
    return (
        <footer id="contact" style={{
            backgroundColor: 'var(--color-primary)',
            color: 'white',
            padding: '4rem 0 2rem 0'
        }}>
            <div className="container">
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '2rem',
                    marginBottom: '3rem'
                }}>
                    <div>
                        <h4 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>FoneTik</h4>
                        <p style={{ color: '#999' }}>Professional phone repair services at your doorstep.</p>
                    </div>
                    <div>
                        <h4 style={{ fontSize: '1rem', marginBottom: '1.5rem' }}>Services</h4>
                        <ul style={{ listStyle: 'none', color: '#999' }}>
                            <li style={{ marginBottom: '0.5rem' }}><a href="#">Screen Repair</a></li>
                            <li style={{ marginBottom: '0.5rem' }}><a href="#">Battery Replacement</a></li>
                            <li style={{ marginBottom: '0.5rem' }}><a href="#">Water Damage</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 style={{ fontSize: '1rem', marginBottom: '1.5rem' }}>Company</h4>
                        <ul style={{ listStyle: 'none', color: '#999' }}>
                            <li style={{ marginBottom: '0.5rem' }}><a href="#">About Us</a></li>
                            <li style={{ marginBottom: '0.5rem' }}><a href="#">Careers</a></li>
                            <li style={{ marginBottom: '0.5rem' }}><a href="#">Contact</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 style={{ fontSize: '1rem', marginBottom: '1.5rem' }}>Legal</h4>
                        <ul style={{ listStyle: 'none', color: '#999' }}>
                            <li style={{ marginBottom: '0.5rem' }}><a href="#">Privacy Policy</a></li>
                            <li style={{ marginBottom: '0.5rem' }}><a href="#">Terms of Service</a></li>
                        </ul>
                    </div>
                </div>
                <div style={{
                    borderTop: '1px solid #333',
                    paddingTop: '2rem',
                    textAlign: 'center',
                    color: '#666',
                    fontSize: '0.9rem'
                }}>
                    &copy; {new Date().getFullYear()} FoneTik. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
