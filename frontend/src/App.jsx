import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import UserSelection from './components/UserSelection';
import Footer from './components/Footer';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import NewOrder from './pages/NewOrder';
import Complaints from './pages/Complaints';
import ProtectedRoute from './components/ProtectedRoute';
import Contact from './pages/Contact';

const Home = () => (
  <>
    <Hero />
    <Features />
    <UserSelection />
  </>
);

function AppContent() {
  const location = useLocation();
  const hideFooterPaths = ['/dashboard', '/new-order', '/complaints'];
  const showFooter = !hideFooterPaths.some(path => location.pathname.startsWith(path));

  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/new-order"
          element={
            <ProtectedRoute>
              <NewOrder />
            </ProtectedRoute>
          }
        />
        <Route
          path="/complaints"
          element={
            <ProtectedRoute>
              <Complaints />
            </ProtectedRoute>
          }
        />
      </Routes>
      {showFooter && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
