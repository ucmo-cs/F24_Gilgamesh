  //sessionStorage.setItem('userSession', JSON.stringify(userData));
  //localStorage.setItem('userSession', JSON.stringify(userData));
   // Check for existing user session
  /*
  useEffect(() => {
    const storedUserSession =
      localStorage.getItem('userSession') || sessionStorage.getItem('userSession');
    if (storedUserSession) {
      navigate('/UserHome');
    }
  }, [navigate]);
  */


  import React, { useState, useEffect } from 'react';
  import axios from 'axios';
  import { useNavigate } from 'react-router-dom';
  import './SignIn.css';
  
  function SignIn() {
    // Initial state for form inputs
    const [values, setValues] = useState({
      userId: '', // Make sure this matches the input field 'name'
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
            navigate('/admin'); // Navigate to admin page if role is ADMIN
          } else if (userData.role === 'USER') {
            navigate('/user'); // Navigate to user page if role is USER
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
  
    return (
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
  

