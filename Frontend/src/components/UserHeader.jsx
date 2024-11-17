import React, { useEffect, useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import './Header.css';

function UserHeader() {
  const [parsedUser, setParsedUser] = useState(null);

  useEffect(() => {
    const user = sessionStorage.getItem('userSession');
    console.log('Stored user session:', user);  // Log the raw user data
    
    if (user) {
      const parsed = JSON.parse(user);
      console.log('Parsed user data:', parsed);  // Log the parsed user object
      setParsedUser(parsed);  // Set parsed user in state
    }
  }, []);

  return (
    <Navbar className="header">
      <Container fluid className="d-flex justify-content-between align-items-center">
        <Navbar.Brand style={{ textAlign: 'auto' }}>
          <img src="./commerce-bank.svg" className="navbar-logo" alt="Commerce Bank Logo" />
          <span className="brand-name">Commerce Bank</span>
        </Navbar.Brand>
        <Nav className="ms-auto">
          <Nav.Link href="/home" style={{ color: 'white' }}>Home</Nav.Link>
          {/* Display the username if parsedUser exists */}
          {parsedUser ? (
            // Use parsedUser.User instead of parsedUser.username
            parsedUser.User ? (
              <Nav.Link href="/user" style={{ color: 'white' }}>
                {parsedUser.User} {/* Accessing the 'User' property */}
              </Nav.Link>
            ) : (
              <Nav.Link href="/SignIn" style={{ color: 'white' }}>
                No user found {/* If User property doesn't exist */}
              </Nav.Link>
            )
          ) : (
            <Nav.Link href="/SignIn" style={{ color: 'white' }}>
              Sign In {/* If no user is found in sessionStorage */}
            </Nav.Link>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default UserHeader;
