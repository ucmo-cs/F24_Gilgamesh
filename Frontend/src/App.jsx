import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Header from './components/Header';
import UserHeader from './components/UserHeader';
import AdminHeader from './components/AdminHeader';

import Footer from './components/Footer';
import Home from './page/Home';
import SignIn from './page/SignIn';
import User from './page/UserPage';
import Admin from './page/Admin';
import Theme from './components/Theme';
import ResetPassword from './page/resetPassword';
import PrivacyPolicy from './page/PrivacyPolicy';
import TermsOfService from './page/TermsOfService';

import UserSetting from './page/UserSetting';
import AdminSettings from './page/AdminSettings';
import './App.css';

function ScrollToTop() {
  const location = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on route change
  }, [location]);

  return null; // No UI, just side effect
}

function App() {
  const [parsedUser, setParsedUser] = useState(null);

  useEffect(() => {
    const user = sessionStorage.getItem('userSession');
    if (user) {
      const parsed = JSON.parse(user);
      setParsedUser(parsed);  // Set parsed user in state
    }
  }, []);

  // Conditionally render the header based on user role
  const renderHeader = () => {
    if (parsedUser) {
      if (parsedUser.role === 'ADMIN') {
        return <AdminHeader />;
      } if(parsedUser.role === 'USER') {
        return <UserHeader />;
      }
    }
    return <Header />;
    
  };

  return (
    <Router>
      <ScrollToTop /> {/* This will scroll to top on route change */}
      
      {renderHeader()}  {/* Conditionally render the appropriate header */}
      
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/user" element={<User />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/setting" element={<UserSetting />} />
          <Route path="/settings" element={<AdminSettings />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
        </Routes>
      </div>

      <Footer />
      <Theme />
    </Router>
  );
}

export default App;
