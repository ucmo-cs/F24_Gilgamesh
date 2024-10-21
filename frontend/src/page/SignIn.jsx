import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import HeaderIn from '../components/HeaderIn'; // Changed NavBarUser to HeaderIn
import Header from '../components/Header'; // Using Header for non-authenticated users

const SignIn = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    rememberMe: false,
  });
  
  const navigate = useNavigate();

  const handleInput = (event) => {
    const { name, value, type, checked } = event.target;
    setValues(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    axios.post('http://localhost:8080/api/v1/users/auth', values)
      .then(response => {
        const userData = response.data;
        if (values.rememberMe) {
          localStorage.setItem('userSession', JSON.stringify(userData));
        } else {
          sessionStorage.setItem('userSession', JSON.stringify(userData));
        }
        navigate('/UserHome');
      })
      .catch(err => console.log(err));
  };

  const [user, setUser] = useState(null);
  useEffect(() => {
    const storedUserSession = localStorage.getItem('userSession') || sessionStorage.getItem('userSession');
    if (storedUserSession) {
      setUser(JSON.parse(storedUserSession));
    }
  }, []);
  
  const navBar = localStorage.getItem('userSession') || sessionStorage.getItem('userSession') ? <HeaderIn /> : <Header />;
  
  const greyColor = 'rgba(128, 128, 128, 0.8)';
  const hoverGreyColor = 'rgba(169, 169, 169, 1)';

  return (
    <>
      {navBar}
      <div className="login-container d-flex align-items-center justify-content-center min-vh-100">
        <div 
          className="modal-content rounded-4 shadow"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.4)', // Set background to 0.4 opacity
            border: '0.5px solid #007bff', // Change this to your desired border color
            borderRadius: '0.5rem', // Adjust radius if needed
          }}
        >
          <div className="modal-header p-5 pb-4 border-bottom-0">
            <h1 className="fw-bold mb-0 fs-2 text-light">Sign In to your account</h1>
            <button 
              type="button" 
              className="btn-close" 
              aria-label="Close" 
              onClick={() => navigate('/')}
              style={{
                color: greyColor, // Brighter grey for the close button
                opacity: 1, // Make sure it’s fully opaque
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = hoverGreyColor} // Change on hover to a lighter grey
              onMouseLeave={(e) => e.currentTarget.style.color = greyColor} // Change back on leave
            ></button>
          </div>

          <div className="modal-body p-5 pt-0">
            <form onSubmit={handleSubmit}>
              <div className="form-floating mb-3">
                <input
                  type="email"
                  name="email"
                  className="form-control rounded-3"
                  placeholder="name@example.com"
                  onChange={handleInput}
                  required
                />
                <label htmlFor="floatingInput" style={{ color: greyColor }}>Email address</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="password"
                  name="password"
                  className="form-control rounded-3"
                  placeholder="Password"
                  onChange={handleInput}
                  required
                />
                <label htmlFor="floatingPassword" style={{ color: greyColor }}>Password</label>
              </div>
              <div className="mb-3">
                <input
                  type="checkbox"
                  name="rememberMe"
                  className="input"
                  onChange={handleInput}
                />
                <label className="label" htmlFor="rememberMe" style={{ color: greyColor }}>Keep me signed in</label>
              </div>
              <button className="w-100 mb-2 btn btn-lg rounded-3 btn-primary" type="submit">Sign In</button>
              <small className="text-body-secondary" style={{ color: greyColor }}>
                Don't have an account? <Link to="/signup" style={{ color: '#007bff' }}>Sign up</Link>
              </small>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
