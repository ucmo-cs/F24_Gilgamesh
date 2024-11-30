import React, { useEffect, useState } from 'react';
import { Container, Nav, Navbar, Dropdown } from 'react-bootstrap';

import './AdminHeader.css';

function AdminHeader() {
 
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

  // Handle logout functionality
  const handleLogout = () => {
    sessionStorage.clear();  // Clear the session data
  };

  return (
    <Navbar className="userheader">
      <Container fluid className="d-flex justify-content-between align-items-center">
        <Navbar.Brand style={{ textAlign: 'auto' }}>
          <img src="../commerce-bank.svg" className="navbar-logo" alt="Commerce Bank Logo" />
          <span className="brand-name">Commerce Bank</span>
        </Navbar.Brand>
        <Nav className="ms-auto">
          <Nav.Link href="/home" style={{ color: 'white' }}>Home</Nav.Link>
          {parsedUser ? (
            parsedUser.User ? (
              
              <Dropdown align="end" className="user-dropdown">
                <Dropdown.Toggle variant="link" id="user-dropdown" style={{ color: 'white' }}>
                  {parsedUser.User} 
                </Dropdown.Toggle>

                <Dropdown.Menu className="dropdown-menu">
                  
                  <Dropdown.Item href="/settings">Profile</Dropdown.Item>
                  <Dropdown.Item href="/admin">Management </Dropdown.Item>
                
                  <Dropdown.Item href="/home" onClick={handleLogout}>Logout</Dropdown.Item> 
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Nav.Link href="/SignIn" style={{ color: 'white' }}>
                No user found 
              </Nav.Link>
            )
          ) : (
            <Nav.Link href="/SignIn" style={{ color: 'white' }}>
              Sign In 
            </Nav.Link>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default AdminHeader;