import React, { useState } from 'react';
import axios from 'axios';
import './SignIn.css';

function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to the backend
      const response = await axios.post('http://localhost:8080/login/login', {
        userId: username,
        password: password,
        role: role,
      });

      // Display success message and role from the response
      setMessage(response.data); // Backend should respond with "Login successful" and role
    } catch (error) {
      // Display error message if login fails
      setMessage(error.response ? error.response.data : 'An error occurred');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="modal-content">
        <h1>Sign In</h1>
        
        {/* Username Input */}
        <div className="form-floating">
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="form-control"
            required
          />
          <label htmlFor="username">Username</label>
        </div>

        {/* Password Input */}
        <div className="form-floating">
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="form-control"
            required
          />
          <label htmlFor="password">Password</label>
        </div>

        {/* Role Input */}
        <div className="form-floating">
          <input
            type="text"
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="Role"
            className="form-control"
            required
          />
          <label htmlFor="role">Role</label>
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary">
          Login
        </button>

        {/* Message Display */}
        {message && <p className="text-body-secondary">{message}</p>}
      </form>
    </div>
  );
}

export default SignIn;
