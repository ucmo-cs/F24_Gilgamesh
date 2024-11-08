
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './page/Home';
import SignIn from './page/SignIn';
import User from './page/UserPage';
import Admin from './page/Admin';
import Theme from './components/Theme';
import ResetPassword from './page/resetPassword';
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
      <Header />
      
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/user" element={<User />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </div>
      
      <Footer />
      <Theme />
    </Router>
  );
}

export default App;
