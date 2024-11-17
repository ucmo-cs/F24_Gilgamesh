import React from 'react';
import './PrivacyPolicy.css'; 
import Header from '../components/Header';
import UserHeader from '../components/UserHeader';



function PrivacyPolicy() {
  const navBar = localStorage.getItem('userSession') || sessionStorage.getItem('userSession') ? <UserHeader /> : <Header />;
  return (
    <>
    {navBar} 
      <div style={{ padding: '20px' }}>
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
    
    </>
    
  );
}

export default PrivacyPolicy;