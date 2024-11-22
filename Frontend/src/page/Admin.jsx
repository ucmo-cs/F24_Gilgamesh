import React, { useState, useEffect } from 'react';
import Spreadsheet from '../components/Spreadsheet';
import './Admin.css'; // Import your CSS file here
import Header from '../components/Header';
import UserHeader from '../components/UserHeader';
import AdminHeader from '../components/AdminHeader';
import { Button } from 'react-bootstrap';

import AdminMakeUser from '../components/AdminMakeUser';
import AdminMakeLoan from '../components/AdminMakeLoan';

const Admin = () => {
  const [parsedUser, setParsedUser] = useState(null);
  const [showMakeUserForm, setShowMakeUserForm] = useState(false);
  const [showMakeLoanForm, setShowMakeLoanForm] = useState(false);

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

  const handleMakeUserClick = () => {
    setShowMakeUserForm(true);
    setShowMakeLoanForm(false); // Ensure the other form is hidden
  };

  const handleMakeLoanClick = () => {
    setShowMakeLoanForm(true);
    setShowMakeUserForm(false); // Ensure the other form is hidden
  };

  return (
    <>
      {renderHeader()}
      <div className="admin-container">
        {/* Display welcome message only if parsedUser is available */}
        {parsedUser && parsedUser.role === 'ADMIN' && (
          <h1 className="admin-title">Welcome, {parsedUser.User}</h1>
        )}

        <Spreadsheet />

        <div className="button-container">
          {/* Button to show AdminMakeUser form */}
          <Button variant="primary" onClick={handleMakeUserClick}>
            Admin Make User
          </Button>

          {/* Button to show AdminMakeLoan form */}
          <Button variant="secondary" onClick={handleMakeLoanClick}>
            Admin Make Loan
          </Button>
        </div>

        {/* Conditionally render the forms based on button clicks */}
        {showMakeUserForm && <AdminMakeUser />}
        {showMakeLoanForm && <AdminMakeLoan />}
      </div>
    </>
  );
};

export default Admin;
