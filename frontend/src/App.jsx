import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Router

import Header from './components/Header';
import Theme from './components/Theme';
import Footer from './components/Footer';

import Home from './page/Home'; // Ensure correct path
import SignIn from './page/SignIn'; // Ensure correct path
import Customer from './page/Customer'; // Ensure correct path
import Admin from './page/Admin'; // Ensure correct path

import './App.css';

function App() {
  return (
    <Router> 
      <>
      <Header /> 
     
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/customer" element={<Customer />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
        <Footer/>

        <Theme />
      </>
    </Router>
  );
}

export default App;
