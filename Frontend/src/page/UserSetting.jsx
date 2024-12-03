import './UserSetting.css';
import UserForm from "../components/UserForm";
import UserAccountForm from "../components/UserAccountForm"; // Import the new Account Form
import { useState, useEffect } from 'react';

import Header from '../components/Header';
import UserHeader from '../components/UserHeader';
import AdminHeader from '../components/AdminHeader';
import Footer from '../components/Footer';

function UserSetting() {
  const [parsedUser, setParsedUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // Track whether the form is in edit mode
  const [userId, setUserId] = useState(null);  // Declare userId state to hold the user ID
  const [isAccountEditing, setIsAccountEditing] = useState(false); // Track account info editing state
  
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

  // Set edit mode to true when the user wants to edit profile info
  const handleEditClick = () => {
    setIsEditing(true); 
  };

  // Set edit mode to false when the user cancels editing
  const handleCancelClick = () => {
    setIsEditing(false); // Return to viewing mode
  };

  // Set edit mode to true for account info
  const handleAccountEditClick = () => {
    setIsAccountEditing(true); 
  };

  // Set edit mode to false for account info
  const handleAccountCancelClick = () => {
    setIsAccountEditing(false); // Return to viewing mode
  };

  // Handle the submitted account info and make API request
  const handleAccountSubmit = (accountInfo) => {
    // Here you would typically send this data to the server to update the user's account info
    console.log('Account Info Submitted:', accountInfo);

    // Mock successful update response
    setIsAccountEditing(false);
  };

  // Ensure parsedUser is loaded before rendering the form or user info
  if (!parsedUser) {
    return (
      <div className="user-settings-container">
        <p>Loading user data...</p>
      </div>
    );
  }

  const renderHeader = () => {
    if (parsedUser) {
      if (parsedUser.role === 'ADMIN') {
        return <AdminHeader />;
      } if(parsedUser.role === 'USER') {
        return <UserHeader />;
      }
    }
    return <Header />;
  };

  return (
    <>
      {renderHeader()} 
      
      <div className="user-settings-wrapper">
        {/* User Profile Info Section */}
        <div className="user-settings-container">
          {!isEditing && <h1 className="user-settings-title">Profile Information</h1>}
          
          {!isEditing ? (
            <div className="user-settings-display">
              <p><strong>Username:</strong> {parsedUser.User || 'Loading...'}</p>
              <p><strong>Email:</strong> {parsedUser.email || 'Loading...'}</p>
              <p><strong>Number:</strong> {parsedUser.number || 'Loading...'}</p>
              <p><strong>Role:</strong> {parsedUser.role || 'Loading...'}</p>
              <button className="btn btn-primary" onClick={handleEditClick}>Edit Information</button>
            </div>
          ) : (
            <div className="user-form-container">
              <UserForm parsedUser={parsedUser} /> {/* Pass parsedUser to the form */}
              <button className="cancel-btn" onClick={handleCancelClick}>×</button>
            </div>
          )}
        </div>

        {/* Account Info Section */}
        <div className="user-settings-container">
          {!isAccountEditing && <h1 className="user-settings-title">Account Information</h1>}
          
          {!isAccountEditing ? (
            <div className="ad-info-display">
              <p><strong>Routing Number:</strong> {parsedUser.Rounting || 'Loading...'}</p>
              <p><strong>Bank Number:</strong> {parsedUser.BankAccount || 'Loading...'}</p>
              <button className="btn btn-secondary" onClick={handleAccountEditClick}>Edit Account Info</button>
            </div>
          ) : (
            <div className="user-form-container">
              <UserAccountForm handleSubmit={handleAccountSubmit} /> {/* Pass the submit handler */}
              <button className="cancel-btn2" onClick={handleAccountCancelClick}>×</button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default UserSetting;
