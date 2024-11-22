import React, { useState, useEffect } from 'react';
import './PrivacyPolicy.css'; 
import Header from '../components/Header';
import UserHeader from '../components/UserHeader';
import AdminHeader from '../components/AdminHeader';

function PrivacyPolicy() {
  // State to store parsed user data
  const [parsedUser, setParsedUser] = useState(null);

  // useEffect hook to fetch user session data
  useEffect(() => {
    const storedUserSession = localStorage.getItem('userSession') || sessionStorage.getItem('userSession');
    if (storedUserSession) {
      setParsedUser(JSON.parse(storedUserSession)); // Set the user data if session exists
    }
  }, []); // Empty dependency array ensures it runs only once

  // Render header based on user role
  const renderHeader = () => {
    if (parsedUser) {
      if (parsedUser.role === 'ADMIN') {
        return <AdminHeader />;
      } else if (parsedUser.role === 'USER') {
        return <UserHeader />;
      }
    }
    return <Header />; // Default header for unauthenticated users
  };

  return (
    <>
      {renderHeader()} {/* Dynamically render the correct header */}
      <div className="privacy-policy-container">
        <div className="privacy-policy-box">
          <h1>Privacy Policy</h1>
          <p>Welcome to our Privacy Policy page. Here we explain how we handle your personal information:</p>
          
          <h2>Information Collection</h2>
          <p>We collect personal data, such as your name, email address, and other relevant details when you register or use our services.</p>
          
          <h2>How We Use Your Information</h2>
          <p>Your data is used to improve our services, provide customer support, and communicate with you about important updates.</p>
          
          <h2>Data Protection</h2>
          <p>We take necessary measures to protect your personal information, including encryption and secure storage.</p>
          
          <p>If you have any questions, feel free to contact us at support@example.com.</p>
        </div>
      </div>
    </>
  );
}

export default PrivacyPolicy;
