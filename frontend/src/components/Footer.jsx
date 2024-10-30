import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Footer.css'; // Assuming you save the above CSS as Footer.css

function App() {
  return (
      <footer className="footer">
        <p className="footer-text">
          &copy; {new Date().getFullYear()}  All rights reserved.
        </p>
        <div className="footer-links">
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms of Service</a>
          <a href="/signin">Sign In</a>
          <a href="/reset-password" className="reset password link">Reset Password</a>
          </div>
          <div className="footer-contact">
  <p>
    Customer Service: <a href="tel:+1234567890">+1 (222) 333-4567</a>
    &nbsp;|&nbsp; {/* Optional separator */}
    Email: <a href="mailto:support@example.com">commerce@example.com</a>
  </p>
</div>
      </footer>
  );
}

export default App;
