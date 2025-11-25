import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav style={{
      borderBottom: '1px solid var(--color-border)',
      padding: '1rem 0',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(10px)',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ fontSize: '1.5rem', fontWeight: '800', letterSpacing: '-0.5px' }}>
          FoneTik
        </Link>
        <div style={{ display: 'flex', gap: '2rem' }}>
          <Link to="/" style={{ fontWeight: '500' }}>Home</Link>
          {token && <Link to="/dashboard" style={{ fontWeight: '500' }}>Dashboard</Link>}
          <Link to="/contact" style={{ fontWeight: '500', color: 'var(--color-text-light)' }}>Contact</Link>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          {token ? (
            <button onClick={handleLogout} className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" style={{ fontWeight: '500' }}>Login</Link>
              <Link to="/signup" className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
