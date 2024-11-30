import './UserInfo.css';
import UserForm from "../components/UserForm";
import { useState, useEffect } from 'react';
import axios from 'axios'; 
import Header from '../components/Header';
import UserHeader from '../components/UserHeader';
import AdminHeader from '../components/AdminHeader';
import { useParams } from 'react-router-dom';  // Import useParams to get userId from the URL

function Userinfo() {
  const { userId } = useParams();  // Get userId from the URL parameter
  const [parsedUser, setParsedUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // Track whether the form is in edit mode

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
      <div className="user-settings-container">
        <p>Loading user data...</p>
      </div>
    );
  }

  const renderHeader = () => {
    if (parsedUser) {
      if (parsedUser.role === 'ADMIN') {
        return <AdminHeader />;
      } if (parsedUser.role === 'USER') {
        return <UserHeader />;
      }
    }
    return <Header />;
  };

  return (
    <>
      {renderHeader()} 

      <div className="user-settings-container">
        {/* Conditionally render the title based on isEditing */}
        {!isEditing && <h1 className="user-settings-title">Profile Information</h1>}

        {/* Display user info or UserForm based on isEditing */}
        {!isEditing ? (
          <div className="user-info-display">
            <p><strong>Account ID:</strong> {parsedUser.userId || 'Loading...'}</p>
            <p><strong>Username:</strong> {parsedUser.userName || 'Loading...'}</p>
            <p><strong>Email:</strong> {parsedUser.email || 'Loading...'}</p>
            <p><strong>Number:</strong> {parsedUser.phoneNumber || 'Loading...'}</p>
            <p><strong>Role:</strong> {parsedUser.role || 'Loading...'}</p>
            <p><strong>Date Created:</strong> {parsedUser.created_at || 'Loading...'}</p>
            <button className="btn btn-primary" onClick={handleEditClick}>Edit Information</button>
          </div>
        ) : (
          <div className="user-form-container">
            <UserForm parsedUser={parsedUser} /> {/* Pass parsedUser to the form */}
            {/* Cancel button as an X */}
            <button className="cancel-btn" onClick={handleCancelClick}>
              × {/* This is the X character */}
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default Userinfo;
