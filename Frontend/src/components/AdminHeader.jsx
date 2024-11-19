import React, { useEffect, useState } from 'react';
import { Container, Nav, Navbar, Dropdown } from 'react-bootstrap';

import './AdminHeader.css';

function AdminHeader() {
  const [parsedAdmin, setParsedAdmin] = useState(null);

  useEffect(() => {
    const admin = sessionStorage.getItem('adminSession');
    console.log('Stored admin session:', admin); // Log the raw admin data

    if (admin) {
      const parsed = JSON.parse(admin);
      console.log('Parsed admin data:', parsed); // Log the parsed admin object
      setParsedAdmin(parsed); // Set parsed admin in state
    }
  }, []);

  // Handle logout functionality
  const handleLogout = () => {
    sessionStorage.clear(); // Clear the session data
    window.location.href = '/SignIn'; // Redirect to sign-in page
  };

  return (
    <Navbar className="adminheader">
      <Container fluid className="d-flex justify-content-between align-items-center">
        <Navbar.Brand style={{ textAlign: 'auto' }}>
          <img src="./commerce-bank.svg" className="navbar-logo" alt="Commerce Bank Logo" />
          <span className="brand-name">Commerce Bank</span>
        </Navbar.Brand>
        <Nav className="ms-auto">
          <Nav.Link href="/home" style={{ color: 'white' }}>Home</Nav.Link>

          {/* Display the username if parsedAdmin exists */}
          {parsedAdmin ? (
            parsedAdmin.Admin ? (
              // Dropdown for the admin
              <Dropdown align="end" className="admin-dropdown">
                <Dropdown.Toggle variant="link" id="admin-dropdown" style={{ color: 'white' }}>
                  {parsedUser.Admin} {/* Display the admin username */}
                </Dropdown.Toggle>

                <Dropdown.Menu className="dropdown-menu">
                  {/* Dropdown items */}
                  <Dropdown.Item href="/admin">Payment</Dropdown.Item>
                  <Dropdown.Item href="/settings">Profile</Dropdown.Item>
                  <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Nav.Link href="/SignIn" style={{ color: 'white' }}>
                No user found {/* If the 'Admin' property doesn't exist */}
              </Nav.Link>
            )
          ) : (
            <Nav.Link href="/SignIn" style={{ color: 'white' }}>
              Sign In {/* If no admin is found in sessionStorage */}
            </Nav.Link>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default AdminHeader;