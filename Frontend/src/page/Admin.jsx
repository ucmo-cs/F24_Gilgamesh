import React, { useState, useEffect } from 'react';
import Spreadsheet from '../components/Spreadsheet';
import './Admin.css'; // Import your CSS file here
import Header from '../components/Header';
import UserHeader from '../components/UserHeader';
import AdminHeader from '../components/AdminHeader';

const Admin = () => {
  const [parsedUser, setParsedUser] = useState(null);

  useEffect(() => {
    // Get user data from sessionStorage or localStorage
    const userSession = sessionStorage.getItem('userSession'); // Or use localStorage
    if (userSession) {
      setParsedUser(JSON.parse(userSession)); // Set parsedUser state
    }
  }, []);

  const renderHeader = () => {
    if (parsedUser) {
      if (parsedUser.role === 'ADMIN') {
        return <AdminHeader />;
      }
      if (parsedUser.role === 'USER') {
        return <UserHeader />;
      }
    }
    return <Header />; // Default header if no user or role is detected
  };

  return (
    <>
      {renderHeader()}
      <div className="admin-container">
        <div className="box">
          <Spreadsheet />
        </div>
      </div>
    </>
  );
}

export default Admin;
