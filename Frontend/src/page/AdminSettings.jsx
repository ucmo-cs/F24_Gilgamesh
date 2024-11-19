import './AdminSettings.css'; 
import Header from '../components/Header';
import AdminHeader from '../components/AdminHeader'; // Admin-specific header
import AdminForm from "../components/AdminForm"; // Admin-specific form component
import { useState, useEffect } from 'react';
import axios from 'axios'; // Ensure axios is imported

function AdminSetting() {
  const [parsedAdmin, setParsedAdmin] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // Track whether the form is in edit mode
  const [adminId, setAdminId] = useState(null);  // Declare adminId state to hold the admin ID
 

  useEffect(() => {
    const adminSession = sessionStorage.getItem('adminSession'); // Updated to adminSession
    if (adminSession) {
      const parsed = JSON.parse(adminSession);
      setParsedAdmin(parsed);
      
      // Check if parsedAdmin has account_id and set the adminId
      if (parsed && parsed.account_id) {
        setAdminId(parsed.account_id); // Set adminId from account_id in session data
      } else {
        console.error("Admin ID or account_id is missing in the session data.");
      }
    } else {
      console.log("No admin session available.");
    }
  }, []);

  const handleEditClick = () => {
    setIsEditing(true); // Set edit mode to true when the admin wants to edit
  };

  const handleCancelClick = () => {
    setIsEditing(false); // Set edit mode to false when the admin cancels editing
  };

  return (
    <>
      {localStorage.getItem('adminSession') || sessionStorage.getItem('adminSession') ? (
        <AdminHeader /> // Show Admin Header if session exists
      ) : (
        <Header /> // Show default Header if no session
      )}
      
      <div className="admin-setting-container">
        {!isEditing && <h1 className="admin-setting-title">Admin Settings</h1>}

        {/* Display admin info or AdminForm based on isEditing */}
        {!isEditing ? (
          <div className="admin-info-display">
            <p><strong>Admin Username:</strong> {parsedAdmin ? parsedAdmin.username : 'Loading...'}</p>
            <p><strong>Email:</strong> {parsedAdmin ? parsedAdmin.email : 'Loading...'}</p>
            <p><strong>Phone Number:</strong> {parsedAdmin ? parsedAdmin.phone : 'Loading...'}</p>
            <p><strong>Role:</strong> {parsedAdmin ? parsedAdmin.role : 'Loading...'}</p>
            <button className="btn btn-primary" onClick={handleEditClick}>Edit Information</button>
          </div>
        ) : (
          <div className="admin-form-container">
            <AdminForm parsedAdmin={parsedAdmin} />
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

export default AdminSetting;