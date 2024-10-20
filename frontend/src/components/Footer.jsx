
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const handleBackToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

function Footer() {
  return (
    <footer className="footer" style={{ textAlign: 'center', padding: '3rem 0', backgroundColor: 'rgba(0, 0, 0, 0.2)', backdropFilter: 'blur(15px)', color: '#ffffff' }}>
      
      <p className="footer-text" style={{ margin: '0.5rem 0', fontSize: '1rem' , color: '#fffff0' }}>
        &copy; {new Date().getFullYear()} GameBox. All rights reserved.
      </p>
      
      <div className="footer-links" style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '3rem' }}>
        <a href="/privacy" style={{ color: '#ffffff', textDecoration: 'none' }}>Privacy Policy</a>
        <a href="/terms" style={{ color: '#ffffff', textDecoration: 'none' }}>Terms of Service</a>
        <a href="/signin" style={{ color: '#007BFF', textDecoration: 'none' }}>Login</a>
        <a href="/signup" style={{ color: '#007BFF', textDecoration: 'none' }}>Sign Up</a>
      </div>
      
      <button 
        className="back-to-top" 
        style={{ backgroundColor: '#2D923B', color: '#ffffff', padding: '0.5rem 1rem', border: 'none', borderRadius: '25px', cursor: 'pointer', marginTop: '1rem' }}
        onClick={(e) => { e.preventDefault(); handleBackToTop(); }}
      >
        Back to top
      </button>
     
    </footer>
  );
}

export default Footer;
