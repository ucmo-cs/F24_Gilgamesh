import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import './AdminMakeUser.css';
import axios from 'axios';

const AdminMakeUser = () => {
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [userData, setUserData] = useState({
    userType: 2,
    userId: '',
    userName: '',
    password: '',
    email: '',
    role: 'USER',
    phoneNumber: '',
  });

  // Handle input change for all fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  // Handle form submission to create a new user
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('User created:', userData);

    // Example: Send a POST request to create a new user
    axios
      .post('http://localhost:8080/api/accounts/account', userData)
      .then((response) => {
        console.log('User successfully created:', response.data);
        // Success handling
        setSuccessMessage('User created successfully!');
        setErrorMessage('');
      })
      .catch((error) => {
        console.error('Error creating user:', error);
        // Error handling
        setErrorMessage('Failed to create user. Please try again.');
        setSuccessMessage('');
      });
  };

  return (
    <div className="admin-make-user-form">
      
      <Form onSubmit={handleSubmit}>
        {/* User ID and Username fields */}
        <div className="form-row">
          <Form.Group controlId="formUserId">
            <Form.Label>User ID</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter user ID"
              name="userId"
              value={userData.userId}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formUserName">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              name="userName"
              value={userData.userName}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
        </div>

        {/* Email and Password fields */}
        <div className="form-row">
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              name="password"
              value={userData.password}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
        </div>

        {/* Phone and Role fields */}
        <div className="form-row">
          <Form.Group controlId="formPhoneNumber">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="tel"
              placeholder="Enter phone number"
              name="phoneNumber"
              value={userData.phoneNumber}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formRole">
            <Form.Label>Role</Form.Label>
            <Form.Control
              as="select"
              name="role"
              value={userData.role}
              onChange={handleInputChange}
              required
            >
              <option value="USER">USER</option>
              <option value="ADMIN">ADMIN</option>
            </Form.Control>
          </Form.Group>
        </div>

        {/* Submit Button */}
        <Button variant="primary" type="submit">
          Create User
        </Button>
      </Form>

      {/* Success/Error Message */}
      {successMessage && (
        <div className="alert alert-success" role="alert">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default AdminMakeUser;
