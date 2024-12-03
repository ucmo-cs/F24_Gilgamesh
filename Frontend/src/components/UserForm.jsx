import React, { useState, useEffect } from 'react'; // Import useEffect correctly
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import './UserForm.css'; // Make sure your custom styles are imported here
import axios from 'axios';

function UserForm() {
  // Form state to hold values of each input (excluding routing and bank account numbers)
  const [newEmail, setNewEmail] = useState('');
  const [newPhoneNumber, setNewPhoneNumber] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [parsedUser, setParsedUser] = useState(null);
  const [userId, setUserId] = useState(null); // Declare userId state

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
  }, []); // This will run once after the component is mounted

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create an object to hold the form data (excluding routing and bank account numbers)
    const accountInfo = {
      newEmail,
      newPhoneNumber,
      newPassword,
    };

    // Process each field and make the appropriate API request
    try {
      if (accountInfo.newEmail) {
        await axios.post('http://localhost:8080/reset/email-reset', {
          userId: userId,
          newEmail: accountInfo.newEmail,
        });
        alert("Email updated successfully!");
      }

      if (accountInfo.newPhoneNumber) {
        await axios.post('http://localhost:8080/reset/phoneNumber-reset', {
          userId: userId,
          newPhoneNumber: accountInfo.newPhoneNumber,
        });
        alert("Phone number updated successfully!");
      }

      if (accountInfo.newPassword) {
        await axios.post('http://localhost:8080/reset/password-reset', {
          userId: userId,
          newPassword: accountInfo.newPassword,
        });
        alert("Password updated successfully!");
      }
    } catch (error) {
      console.error('Error updating account info:', error);
      alert('Failed to update account info.');
    }
  };

  return (
    <Form className="user-form d-flex flex-column" style={{ color: 'white' }} onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formGridEmail">
        <Form.Label className="form-label">Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formGridPhone">
        <Form.Label className="form-label">Phone</Form.Label>
        <Form.Control
          type="tel"
          placeholder="Enter phone number"
          value={newPhoneNumber}
          onChange={(e) => setNewPhoneNumber(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formGridPassword">
        <Form.Label className="form-label">Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </Form.Group>

      <Button style={{ width: "50%" }} className="submit" variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default UserForm;
