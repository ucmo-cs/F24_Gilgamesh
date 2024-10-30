import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Theme from './components/Theme';
import Footer from './components/Footer';

import Home from './page/Home';
import SignIn from './page/SignIn';
import Customer from './page/Customer';
import Admin from './page/Admin';
import ResetPassword from './page/resetPassword';
import './App.css';

function App() {
  return (
    <Router>
      <Header />
      <Footer />
        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/customer" element={<Customer />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
    </Router>
  );
}

export default App;
