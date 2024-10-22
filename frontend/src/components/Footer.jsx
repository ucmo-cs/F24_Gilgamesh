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
          <a href="/signin">SignIn</a>
        </div>
      </footer>
  );
}

export default App;
