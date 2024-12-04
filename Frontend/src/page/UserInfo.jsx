import './UserInfo.css';
import UserForm from "../components/UserForm";
import UserAccountForm from "../components/UserAccountForm";  // Import the account form
import { useState, useEffect } from 'react';
import axios from 'axios'; 
import Header from '../components/Header';
import UserHeader from '../components/UserHeader';
import AdminHeader from '../components/AdminHeader';
import { useParams } from 'react-router-dom';  // Import useParams to get userId from the URL

function UserInfo() {
  const { userId } = useParams();  // Get userId from the URL parameter
  const [parsedUser, setParsedUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);  // Track profile editing state
  const [isAccountEditing, setIsAccountEditing] = useState(false);  // Track account info editing state

  // Fetch user data from the API using the userId
  useEffect(() => {
    if (userId) {
      axios.get(`http://localhost:8080/user/${userId}`)  // Replace with your actual API endpoint
        .then((response) => {
          setParsedUser(response.data);  // Set the user data from the API response
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
        });
    } else {
      console.log('No userId found.');
    }
  }, [userId]);

  // Set edit mode to true when the user wants to edit profile info
  const handleEditClick = () => {
    setIsEditing(true); 
  };

  // Set edit mode to false when the user cancels profile editing
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
    
        return <AdminHeader />;
      
    
  };

  return (
    <>
      {renderHeader()} 

      <div className="user-info-wrapper">
        {/* User Profile Info Section */}
        <div className="userInfo-settings-container">
          {!isEditing && <h1 className="userInfo-settings-title">Profile Information</h1>}

          {!isEditing ? (
            <div className="user-info-display">
              <p><strong>Account ID:</strong> {parsedUser.userId || 'Loading...'}</p>
              <p><strong>Username:</strong> {parsedUser.userName || 'Loading...'}</p>
              <p><strong>Email:</strong> {parsedUser.email || 'Loading...'}</p>
              <p><strong>Number:</strong> {parsedUser.phoneNumber || 'Loading...'}</p>
              <p><strong>Role:</strong> {parsedUser.role || 'Loading...'}</p>
              <p><strong>Date Created:</strong> {parsedUser.created_at || 'Loading...'}</p>
              <button className="btn6 btn-primary" onClick={handleEditClick}>Edit Information</button>
            </div>
          ) : (
            <div className="userInfo-form-container">
              <UserForm parsedUser={parsedUser} /> {/* Pass parsedUser to the form */}
              <button className="cancel-btn12" onClick={handleCancelClick}>×</button>
            </div>
          )}
        </div>

        {/* Account Info Section */}
        <div className="user-info-container">
          {!isAccountEditing && <h1 className="userInfo-settings-title">Account Information</h1>}

          {!isAccountEditing ? (
            <div className="user-info-display">
              <p><strong>Routing Number:</strong> {parsedUser.routingNumber || 'Loading...'}</p>
              <p><strong>Bank Number:</strong> {parsedUser.bankAccountNumber || 'Loading...'}</p>
              <button className="btn5 btn-secondary" onClick={handleAccountEditClick}>Edit Account Info</button>
            </div>
          ) : (
            <div className="userInfo-form-container">
              <UserAccountForm handleSubmit={handleAccountSubmit} /> {/* Pass the submit handler */}
              <button className="cancel-btn15" onClick={handleAccountCancelClick}>×</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default UserInfo;
