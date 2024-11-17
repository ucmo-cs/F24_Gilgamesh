import React from 'react';
import './TermsOfService.css';
import Header from '../components/Header';
import UserHeader from '../components/UserHeader';

function TermsOfService() {
  const navBar = localStorage.getItem('userSession') || sessionStorage.getItem('userSession') ? <UserHeader /> : <Header />;
  return (
    <>
    {navBar} 
    <div style={{ padding: '20px' }}>
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
    </>
    
  );
}

export default TermsOfService;
