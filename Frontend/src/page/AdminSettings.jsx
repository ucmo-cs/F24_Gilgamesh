import './AdminSettings.css';
import UserForm from "../components/UserForm";
import { useState, useEffect } from 'react';
import axios from 'axios'; 
import Header from '../components/Header';
import UserHeader from '../components/UserHeader';
import AdminHeader from '../components/AdminHeader';
import Footer from '../components/Footer';

function AdminSettings() {
  const [parsedUser, setParsedUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // Track whether the form is in edit mode
  const [userId, setUserId] = useState(null);  // Declare userId state to hold the user ID

  // Fetch user session and data
  useEffect(() => {
    const userSession = sessionStorage.getItem('userSession');
    if (userSession) {
      const parsed = JSON.parse(userSession);
      setParsedUser(parsed);
      
      // Check if parsedUser has account_id and set the userId
      if (parsed && parsed.account_id) {
        setUserId(parsed.account_id);  // Set userId from account_id in session data
      } else {
        console.error("User ID or account_id is missing in the session data.");
      }
    } else {
      console.log("No user session available.");
    }
  }, []);

  // Set edit mode to true when the user wants to edit
  const handleEditClick = () => {
    setIsEditing(true); 
  };

  // Set edit mode to false when the user cancels editing
  const handleCancelClick = () => {
    setIsEditing(false); // Return to viewing mode
  };

  // Ensure parsedUser is loaded before rendering the form or user info
  if (!parsedUser) {
    return (
      <>
        <div className="admin-settings-container">
          <p>Loading user data...</p>
        </div>
      </>
    );
  }

  const renderHeader = () => {
    if (parsedUser) {
      if (parsedUser.role === 'ADMIN') {
        return <AdminHeader />;
      }
      if (parsedUser.role === 'USER') {
        return <UserHeader />;
      }
    }
    return <Header />;
  };

  return (
    <>
      {renderHeader()} 

      <div className="admin-settings-container">
        {/* Conditionally render the title based on isEditing */}
        {!isEditing && <h1 className="admin-settings-title">Profile Information</h1>}

        {/* Display user info or UserForm based on isEditing */}
        {!isEditing ? (
          <div className="admin-info-display">
            <p><strong>Username:</strong> {parsedUser.User || 'Loading...'}</p>
            <p><strong>Email:</strong> {parsedUser.email || 'Null'}</p>
            <p><strong>Number:</strong> {parsedUser.number || 'Null'}</p>
            <p><strong>Role:</strong> {parsedUser.role || 'Loading...'}</p>
            <button className="btn btn-primary" onClick={handleEditClick}>Edit Information</button>
          </div>
        ) : (
          <div className="admin-form-container">
            <UserForm parsedUser={parsedUser} /> {/* Pass parsedUser to the form */}
            {/* Cancel button as an X */}
            <button className="admin-cancel-btn" onClick={handleCancelClick}>
              × {/* This is the X character */}
            </button>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}

export default AdminSettings;
