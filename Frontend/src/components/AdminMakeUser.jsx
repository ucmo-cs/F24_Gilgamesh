// src/components/AdminMakeUser.js

import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import "./AdminMakeUser.css"

const AdminMakeUser = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit logic for creating a user
    console.log('User created:', userData);
  };

  return (
    <div className="admin-make-user-form">
      <h2>Create New User</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            name="username"
            value={userData.username}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
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
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Create User
        </Button>
      </Form>
    </div>
  );
};

export default AdminMakeUser;
