import './UserInfo.css';
import UserForm from "../components/UserForm";
import UserAccountForm from "../components/UserAccountForm";  // Import the account form
import { useState, useEffect } from 'react';
import axios from 'axios'; 
import Header from '../components/Header';
import UserHeader from '../components/UserHeader';
import AdminHeader from '../components/AdminHeader';
import { useParams, useNavigate } from 'react-router-dom';  // Import useNavigate to navigate programmatically

function UserInfo() {
  const { userId } = useParams();  // Get userId from the URL parameter
  const navigate = useNavigate();  // Initialize the useNavigate hook for programmatic navigation
  const [parsedUser, setParsedUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);  // Track profile editing state
  const [isAccountEditing, setIsAccountEditing] = useState(false);  // Track account info editing state
  
  useEffect(() => { 
    const userSession = sessionStorage.getItem('userSession');
    
    if (userSession) {
      const parsed = JSON.parse(userSession);
      
      // Remove the 'User' property from parsed object if it exists
      delete parsed.User;
      
      // Set 'User' to the value of 'userId' from URL
      parsed.User = userId;  // Set the userId (from URL) as the 'User' property
      
      // Optionally update sessionStorage if you want to keep the modified data
      sessionStorage.setItem('userSession', JSON.stringify(parsed));
      console.log("Updated session: ", JSON.stringify(parsed));
      
      // Store the modified parsed object in state (with the 'User' property set to userId)
      setParsedUser(parsed);
    } else {
      console.log("No user session available.");
    }
  }, [userId]);

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
    // When the cancel button is clicked, restore the 'User' value in session storage
    const userSession = sessionStorage.getItem('userSession');
    if (userSession) {
      const parsed = JSON.parse(userSession);
      parsed.User = userId;  // Restore the 'User' value from userId (URL parameter)
      
      // Update sessionStorage with the restored 'User' value
      sessionStorage.setItem('userSession', JSON.stringify(parsed));
      console.log("Restored session: ", JSON.stringify(parsed));

      // Update the state with the modified session data
      setParsedUser(parsed);
    }

    // Reset editing mode
    setIsEditing(false);  // Return to viewing mode

    // Navigate back to /admin route
    navigate('/admin');
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
              <p><strong>Account ID:</strong> {parsedUser.userId || 'NULL'}</p>
              <p><strong>Username:</strong> {parsedUser.userName || 'NULL'}</p>
              <p><strong>Email:</strong> {parsedUser.email || 'NULL'}</p>
              <p><strong>Number:</strong> {parsedUser.phoneNumber || 'NULL'}</p>
              <p><strong>Role:</strong> {parsedUser.role || 'NULL'}</p>
              <p><strong>Date Created:</strong> {parsedUser.created_at || 'NULL'}</p>
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
              <p><strong>Routing Number:</strong> {parsedUser.routingNumber || 'NULL'}</p>
              <p><strong>Bank Number:</strong> {parsedUser.bankAccountNumber || 'NULL'}</p>
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
