import React, { useState, useEffect } from 'react';
import './TermsOfService.css';
import Header from '../components/Header';
import UserHeader from '../components/UserHeader';
import AdminHeader from '../components/AdminHeader';
import Footer from  '../components/Footer';

function TermsOfService() {
  // State to store the user data
  const [parsedUser, setParsedUser] = useState(null);

  // useEffect to get the user data from session or local storage
  useEffect(() => {
    const storedUserSession = localStorage.getItem('userSession') || sessionStorage.getItem('userSession');
    if (storedUserSession) {
      setParsedUser(JSON.parse(storedUserSession)); // Set the user data if available
    }
  }, []);

  // Render the appropriate header based on user role
  const renderHeader = () => {
    if (parsedUser) {
      if (parsedUser.role === 'ADMIN') {
        return <AdminHeader />;
      } else if (parsedUser.role === 'USER') {
        return <UserHeader />;
      }
    }
    return <Header />;
  };

  return (
    <>
      {renderHeader()} {/* This will now render the correct header */}
      <div className="terms-container">
        <div className="terms-box">
          <h1>Terms of Service</h1>
          <p>These are the terms and conditions for using our services. By accessing our website or using our services, you agree to these terms:</p>
          
          <h2>Acceptance of Terms</h2>
          <p>By using our services, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>
          
          <h2>Account Responsibility</h2>
          <p>You are responsible for maintaining the confidentiality of your account information and for any activities that occur under your account.</p>
          
          <h2>Termination</h2>
          <p>We reserve the right to terminate your account or restrict access if you violate any of these terms.</p>
          
          <h2>Limitation of Liability</h2>
          <p>We are not responsible for any indirect, incidental, or consequential damages arising from your use of our services.</p>
          
          <p>If you have any questions, please reach out to us at support@example.com.</p>
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default TermsOfService;
