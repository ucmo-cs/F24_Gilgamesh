import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import './Header.css';

function Header() {
  return (
    <Navbar className="header">
      <Container className="d-flex justify-content-between align-items-center">
        <Navbar.Brand style={{ textAlign: 'auto' }}>
          <img src="./commerce-bank.svg" className="navbar-logo" alt="Commerce Bank Logo" />
          <span className="brand-name">Commerce Bank</span>
        </Navbar.Brand>
        <Nav className="ms-auto">
  <Nav.Link href="/home" className="nav-link-custom">Home</Nav.Link>
  <Nav.Link href="/SignIn" className="nav-link-custom">Sign In</Nav.Link>
</Nav>
      </Container>
    </Navbar>
  );
}

export default Header;
