import Header from './components/Header';
import Theme from './components/Theme'; 

import Home from './page/Home'; // Ensure correct path
import SignIn from './page/SignIn'; // Ensure correct path
import Customer from './page/Customer'; // Ensure correct path
import Admin from './page/Admin'; // Corrected the name from Customer to Admin
import { Routes, Route } from 'react-router-dom'; // Import for routing
import './App.css';

function App() {
  return (
    <>
      <Header />
      <Theme />
     
    </>
  );
}

export default App;
