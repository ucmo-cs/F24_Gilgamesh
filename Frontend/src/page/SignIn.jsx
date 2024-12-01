import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import UserHeader from '../components/UserHeader';
import AdminHeader from '../components/AdminHeader';
import './SignIn.css';
import Footer from '../components/Footer';

function SignIn() {
  // Initial state for form inputs
  const [values, setValues] = useState({
    userId: '', // Ensure this matches the input field 'name'
    password: '',
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Handle input change for form fields
  const handleInput = (event) => {
    const { name, value } = event.target; // Only get name and value for non-checkbox fields
    setValues((prev) => ({
      ...prev,
      [name]: value, // Dynamically update the state based on input field name
    }));
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Make a POST request with the form values
    axios
      .post('http://localhost:8080/login/login', values)
      .then((response) => {
        const userData = response.data;

        if (userData.role === 'ADMIN') {
          // If the user is an ADMIN, save the credentials to sessionStorage
          sessionStorage.setItem('userSession', JSON.stringify(userData));
          navigate('/admin'); // Redirect to the Admin page
        } else if (userData.role === 'USER') {
          // For non-admin users
          sessionStorage.setItem('userSession', JSON.stringify(userData));
          navigate('/user');
        } else {
          // Handle the case where the role is not recognized
          console.error('Unknown role:', userData.role);
          setMessage('Unexpected role received.');
        }
      })
      .catch((err) => {
        console.error(err);
        setMessage('Login failed. Please check your credentials.');
      });
  };

  // State for user session data
  const [parsedUser, setParsedUser] = useState(null);

  useEffect(() => {
    const storedUserSession = localStorage.getItem('userSession') || sessionStorage.getItem('userSession');
    if (storedUserSession) {
      setParsedUser(JSON.parse(storedUserSession)); // Set user data if session exists
    }
  }, []);

  // Function to render the appropriate header based on session data
  const renderHeader = () => {
    if (parsedUser) {
      if (parsedUser.role === 'ADMIN') {
        return <AdminHeader />; // Render AdminHeader if user is an admin
      }
      if (parsedUser.role === 'USER') {
        return <UserHeader />; // Render UserHeader if user is a regular user
      }
    }
    return <Header />; // Default header if no session or user role is not recognized
  };

  return (
    <>
      {renderHeader()} {/* Render the appropriate header based on the session */}

      <div className="login-container">
        <form onSubmit={handleSubmit} className="modal-content">
          <h1>Sign In</h1>

          {/* User ID Input */}
          <div className="form-floating">
            <input
              type="text"
              id="userId" // Ensure this ID matches with the name
              name="userId" // Make sure the name matches the state key
              value={values.userId} // Bind value from state
              onChange={handleInput} // Update state on input change
              placeholder="Username"
              className="form-control"
              required
            />
            <label htmlFor="userId">Username</label>
          </div>

          {/* Password Input */}
          <div className="form-floating">
            <input
              type="password"
              id="password"
              name="password" // Ensure name matches state key
              value={values.password}
              onChange={handleInput}
              placeholder="Password"
              className="form-control"
              required
            />
            <label htmlFor="password">Password</label>
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn-btn-primary">
            Login
          </button>

          {/* Message Display */}
          {message && <p className="text-body-secondary">{message}</p>}
        </form>
      </div>
      <Footer/>
    </>
  );
}

export default SignIn;
