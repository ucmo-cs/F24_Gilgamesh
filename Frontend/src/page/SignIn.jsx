import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';  // Import Button from react-bootstrap
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
      <section className="text-center text-lg-start">
      
      <div className="card mb-3">
        <div className="row g-0 d-flex align-items-center">
          <div className="col-lg-4 d-none d-lg-flex left-side">
          
            <img 
              src=".\commerce-bank.svg" 
              
              className="w-100 rounded-t-5 rounded-tr-lg-0 rounded-bl-lg-5" 
            />
          </div>
          <div className="col-lg-8">
          
            <div className="card-body py-5 px-md-5">
            <h1 class="h1" style={{color: 'white'}}>Sign In</h1>
              <form onSubmit={handleSubmit}>
                <label className="form-label" htmlFor="userId" style={{ color: 'white' }}>Username</label>
                <div className="form-outline mb-4">
                  <input
                    type="text"
                    id="userId"
                    name="userId"
                    className="form-control"
                    value={values.userId}
                    onChange={handleInput}
                    placeholder="Username"
                    required
                  />
                </div>
    
                <label className="form-label" htmlFor="password" style={{ color: 'white' }}>Password</label>
                <div className="form-outline mb-4">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="form-control"
                    value={values.password}
                    onChange={handleInput}
                    placeholder="Password"
                    required
                  />
                </div>
    
                <Button
  variant="primary"
  type="submit"
  className="btn-block mb-4 btn-green"  // Add the custom class "btn-green"
>
  Sign In
</Button>
              </form>
    
              {/* Message display */}
              {message && <p className="text-body-secondary">{message}</p>}
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <Footer />
    
    </>
  );
}

export default SignIn;
