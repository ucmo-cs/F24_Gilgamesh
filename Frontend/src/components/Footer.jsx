// Footer.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Footer.css'; // Import your custom CSS for footer styling

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-wrapper">
        <p className="footer-text">
          &copy; {new Date().getFullYear()} All rights reserved.
        </p>
        <div className="footer-links">
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms of Service</a>
          <a href="/signin">Sign In</a>
          <a href="/reset-password" className="reset password link">Reset Password</a>
        </div>
        <p>
          Customer Service: <a href="tel:+1234567890">+1 (222) 333-4567</a>
          &nbsp;|&nbsp; {/* Optional separator */}
          Email: <a href="mailto:support@example.com">commerce@example.com</a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
