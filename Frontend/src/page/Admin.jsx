import React, { useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';  // Import useNavigate hook
import Spreadsheet from '../components/Spreadsheet';
import './Admin.css'; // Import your CSS file here

import Header from '../components/Header';
import AdminHeader from '../components/AdminHeader';

const Admin = () => {
  const navigate = useNavigate();  // Get the navigate function
  const isAdminLoggedIn = localStorage.getItem('adminSession') || sessionStorage.getItem('adminSession');

  // Redirect to SignIn if no admin session exists
  useEffect(() => {
    if (!isAdminLoggedIn) {
      navigate('/user');  // Redirect to SignIn page if not logged in as admin
    }
  }, [isAdminLoggedIn, navigate]);

  return (
    <div>
      {/* Only show AdminHeader if logged in as admin */}
      {isAdminLoggedIn ? (
        <AdminHeader />
      ) : (
        <Header />  // Regular header for non-logged-in or regular user
      )}

      <div className="admin-container">
        <div className="box">
          <Spreadsheet />
        </div>
      </div>
    </div>
  );
}

export default Admin;