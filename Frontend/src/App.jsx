
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Header from './components/Header';
import UserHeader from './components/UserHeader';

import Footer from './components/Footer';
import Home from './page/Home';
import SignIn from './page/SignIn';
import User from './page/UserPage';
import Admin from './page/Admin';
import Theme from './components/Theme';
import ResetPassword from './page/resetPassword';
import PrivacyPolicy from './page/PrivacyPolicy';
import TermsOfService from './page/TermsOfService';
import fullLoan from './page/fullLoan';
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
  return (
    <Router>
      <ScrollToTop /> {/* This will scroll to top on route change */}
      
      
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/user" element={<User/>} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/setting" element={<UserSetting/>} />
          <Route path="/settings" element={<AdminSettings/>} />
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
