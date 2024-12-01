import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';



import UserLoanPaymentPage from './page/UserloanPaymentPage';
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

import FullLoan from './page/fullLoan';
import UserInfo from './page/UserInfo';


function ScrollToTop() {
  const location = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on route change
  }, [location]);

  return null; // No UI, just side effect
}

function App() {

  return (
    <Router> {/* Wrap everything inside the Router */}
      <div className="sides">
        <div className="left-sidebar">
          {/* Left sidebar content */}
          Left Sidebar
        </div>

        <div className="main-content">
          <ScrollToTop /> {/* Keep ScrollToTop inside Router */}
          
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
            <Route path="/fullLoan/:userId" element={<FullLoan />} />
            <Route path="/userInfo/:userId" element={<UserInfo />} />
            <Route path="/LoanPayment" element={<UserLoanPaymentPage />} />
          </Routes>  
          
        </div>
        
        <div className="right-sidebar">
          {/* Right sidebar content */}
          Right Sidebar
        </div>
        <Theme />
      </div>
      
    </Router> 
    

    
  );
}

export default App;
