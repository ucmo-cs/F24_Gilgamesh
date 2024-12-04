import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import './UserAccountForm.css';

function UserAccountForm() {
  // State hooks for the account form
  const [routingNumber, setRoutingNumber] = useState('');
  const [bankNumber, setBankNumber] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const userSession = sessionStorage.getItem('userSession');
    if (userSession) {
      const parsed = JSON.parse(userSession); // Parse the session data

      // Check if parsed user session contains account_id and set the userId
      if (parsed && parsed.User) {
        setUserId(parsed.User); // Set userId from account_id in session data
      } else {
        console.error('User ID or account_id is missing in the session data.');
      }
    } else {
      console.log('No user session available.');
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  // Handle form submission
  const onSubmit = async (e) => {
    e.preventDefault();

    // Don't make API calls if both fields are empty
    if (!routingNumber && !bankNumber) {
      alert('Please enter at least one of the fields (Routing Number or Bank Number).');
      return;
    }

    // Prepare the data for the API requests
    let successMessages = []; // Initialize an array to store success messages
    const accountInfo = { userId: userId };

    try {
      // Check and add Routing Number to the request data if it exists
      if (routingNumber) {
        accountInfo.newRoutingNumber = routingNumber;
        const response = await axios.post('http://localhost:8080/reset/routingNumber-reset', accountInfo);
        if (response.status === 200) {
          successMessages.push('Routing Number updated successfully!'); // Add success message to array
          setRoutingNumber(''); // Clear the routing number field after successful submission
        }
      }

      // Check and add Bank Number to the request data if it exists
      if (bankNumber) {
        accountInfo.newBankAccountNumber = bankNumber;
        const response = await axios.post('http://localhost:8080/reset/bankAccountNumber-reset', accountInfo);
        if (response.status === 200) {
          successMessages.push('Bank Account Number updated successfully!'); // Add success message to array
          setBankNumber(''); // Clear the bank account number field after successful submission
        }
      }

      // Show all success messages in one alert if there are any
      if (successMessages.length > 0) {
        alert(successMessages.join("\n")); // Join messages with a newline
      }

    } catch (error) {
      console.error(error);
      alert('Error updating the information');
    }
  };

  return (
    <Form className="account-form-container d-flex flex-column" style={{ color: 'white' }} onSubmit={onSubmit}>
      <Form.Group className="input-group mb-3" controlId="formGridRoutingNumber">
        <Form.Label className="input-label">Routing Number</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Routing Number"
          value={routingNumber}
          onChange={(e) => setRoutingNumber(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="input-group mb-3" controlId="formGridBankNumber">
        <Form.Label className="input-label">Bank Number</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Bank Number"
          value={bankNumber}
          onChange={(e) => setBankNumber(e.target.value)}
        />
      </Form.Group>

      <div className="button-container" style={{ display: 'flex', justifyContent: 'center' }}>
        <Button className="submit-btn" style={{ width: '50%' }} variant="primary" type="submit">
          Submit
        </Button>
      </div>
    </Form>
  );
}

export default UserAccountForm;
