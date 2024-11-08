import React from 'react';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
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
          {/* Use Link for internal routing */}
          <Link to="/privacy-policy">Privacy Policy</Link>
          <Link to="/terms-of-service">Terms of Service</Link>
          <Link to="/signin">Sign In</Link>
          <Link to="/reset-password" className="reset password link">Reset Password</Link>
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
