import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <section className="section" style={{
            textAlign: 'center',
            padding: '8rem 0',
            background: 'linear-gradient(180deg, #ffffff 0%, #f5f5f5 100%)'
        }}>
            <div className="container">
                <h1 style={{
                    fontSize: '3.5rem',
                    fontWeight: '800',
                    marginBottom: '1.5rem',
                    letterSpacing: '-1px',
                    lineHeight: '1.1'
                }}>
                    Phone dropped in staircase? <br />
                    <span style={{ color: 'var(--color-text-light)' }}>We fix it on doorstep</span>
                </h1>
                <p style={{
                    fontSize: '1.25rem',
                    color: 'var(--color-text-light)',
                    maxWidth: '600px',
                    margin: '0 auto 3rem auto'
                }}>
                    Fast, reliable, and secure repairs for all major brands.
                    We bring the shop to you.
                </p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <Link to="/signup" className="btn btn-primary">Book a Repair</Link>
                </div>
            </div>
        </section>
    );
};

export default Hero;
