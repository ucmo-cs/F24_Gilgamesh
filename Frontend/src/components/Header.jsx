import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import './Header.css';

function Header() {
  return (
    <Navbar className="header">
      <Container fluid className="d-flex justify-content-between align-items-center">
        <Navbar.Brand style={{ textAlign: 'auto' }}>
          <img src="./commerce-bank.svg" className="navbar-logo" alt="Commerce Bank Logo" />
          <span className="brand-name">Commerce Bank</span>
        </Navbar.Brand>
        <Nav className="ms-auto">
        <Nav.Link href="/home" style={{ color: 'white' }}>Home</Nav.Link> {/* Example color: Dodger Blue */}
            <Nav.Link href="/SignIn" style={{ color: 'white' }}>Sign In</Nav.Link> {/* Example color: Tomato */}
</Nav>
      </Container>
    </Navbar>
  );
}

export default Header;
