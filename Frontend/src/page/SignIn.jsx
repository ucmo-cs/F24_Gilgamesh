import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SignIn.css';

function SignIn() {
  const [values, setValues] = useState({
    username: '',
    password: '',
    
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Handle input change for form fields
  const handleInput = (event) => {
    const { name, value, type, checked } = event.target;
    setValues((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    
    axios
      .post('http://localhost:8080/api/v1/users/auth', values)
      .then((response) => {
        const userData = response.data;
        if (values.rememberMe) {
          localStorage.setItem('userSession', JSON.stringify(userData));
        } else {
          sessionStorage.setItem('userSession', JSON.stringify(userData));
        }
        navigate('/UserHome');
      })
      .catch((err) => {
        console.error(err);
        setMessage('Login failed. Please check your credentials.');
      });
  };

  // Check for existing user session
  useEffect(() => {
    const storedUserSession =
      localStorage.getItem('userSession') || sessionStorage.getItem('userSession');
    if (storedUserSession) {
      navigate('/UserHome');
    }
  }, [navigate]);

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="modal-content">
        <h1>Sign In</h1>

        {/* Username Input */}
        <div className="form-floating">
          <input
            type="text"
            id="username"
            name="username"
            value={values.username}
            onChange={handleInput}
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
            name="password"
            value={values.password}
            onChange={handleInput}
            placeholder="Password"
            className="form-control"
            required
          />
          <label htmlFor="password">Password</label>
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
