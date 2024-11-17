import './UserSetting.css';
import Header from '../components/Header';
import UserHeader from '../components/UserHeader';
import UserForm from "../components/UserForm";
import { useState, useEffect } from 'react';
import axios from 'axios'; // Make sure axios is imported

function UserSetting() {
  const [parsedUser, setParsedUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // Track whether the form is in edit mode
  const [userId, setUserId] = useState(null);  // Declare userId state to hold the user ID
  const [loans, setLoans] = useState([]); // State for storing loan data
  const [loanValue, setLoanValue] = useState(0); // State for total loan value
  const [error, setError] = useState(null); // For error handling

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

  const handleEditClick = () => {
    setIsEditing(true); // Set edit mode to true when the user wants to edit
  };

  const handleCancelClick = () => {
    setIsEditing(false); // Set edit mode to false when the user cancels editing
  };

  // Fetch loan data when userId is available
  useEffect(() => {
    if (userId) {
      const url = `http://localhost:8080/user/${userId}`;
      console.log("Making request to URL:", url); // Log the URL being used

      axios
        .get(url)
        .then((response) => {
          console.log("Loan data fetched:", response.data); // Log the response data
          setLoans(response.data); // Store multiple loans data in state

          // Calculate the total loan value (sum of all loanOriginAmount values)
          const totalDue = response.data.reduce((acc, loan) => acc + loan.loanOriginAmount, 0);
          setLoanValue(totalDue); // Set the total due loan amount
        })
        .catch((error) => {
          console.error("Error fetching loan data:", error);
          setError(error.message || 'An error occurred while fetching loan data');
        });
    }
  }, [userId]);

  return (
    <>
      {localStorage.getItem('userSession') || sessionStorage.getItem('userSession') ? (
        <UserHeader /> // Show User Header if session exists
      ) : (
        <Header /> // Show default Header if no session
      )}

      <div className="user-settings-container">
        <h1 className="user-settings-title">User Settings</h1>

        {/* Display user info or UserForm based on isEditing */}
        {!isEditing ? (
          <div className="user-info-display">
            <p><strong>Username:</strong> {parsedUser ? parsedUser.User : 'Loading...'}</p>
            <p><strong>Email:</strong> {parsedUser ? parsedUser.email : 'Loading...'}</p>
            <p><strong>Number:</strong> {parsedUser ? parsedUser.number : 'Loading...'}</p>
            <p><strong>Role:</strong> {parsedUser ? parsedUser.role : 'Loading...'}</p>
            <button className="btn btn-primary" onClick={handleEditClick}>Edit Information</button>
          </div>
        ) : (
          <div className="user-form-container">
            <UserForm parsedUser={parsedUser} />
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

export default UserSetting;
