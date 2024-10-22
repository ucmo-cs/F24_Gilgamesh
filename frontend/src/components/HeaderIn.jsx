import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Nav, Navbar } from 'react-bootstrap';
import './HeaderIn.css';

function HeaderIn() {
  return (
    <div className="container">
      <Navbar className="sticky-header">
        <Container className="d-flex justify-content-between align-items-center">
          <Navbar.Brand style={{ textAlign: 'auto' }}>
            <img src="./commerce-bank.svg" className="navbar-logo" alt="Commerce Bank Logo" />
            <span className="brand-name">Commerce Bank</span>
          </Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/SignIn">SignIn</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default HeaderIn;
