import React, { useState, useEffect } from 'react';
import './Home.css'; 
import Header from '../components/Header';
import UserHeader from '../components/UserHeader';
import AdminHeader from '../components/AdminHeader';

const Home = () => {
  // State to store the parsed user data
  const [parsedUser, setParsedUser] = useState(null);

  
  useEffect(() => {
    const storedUserSession = localStorage.getItem('userSession') || sessionStorage.getItem('userSession');
    if (storedUserSession) {
      setParsedUser(JSON.parse(storedUserSession)); // Set user data if it exists
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
    return <Header />; // Default header for unauthenticated users
  };

  return (
    <>
      {renderHeader()} {/* Dynamically render the correct header */}
      <div className="home-container"> {/* Add the class for styling */}
        <h1>Welcome to F24_Gilgamesh Project</h1>
      </div>
    </>
  );
};

export default Home;
