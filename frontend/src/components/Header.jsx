import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Nav, Navbar } from 'react-bootstrap';

import "./Header.css" 
function Header() {
  return (
    <>
      <div className="container">
        <Navbar className="sticky-header">
          <Container className="d-flex justify-content-between align-items-center">
            <Navbar.Brand href="#home" style={{ textAlign: 'auto' }}>
              Commerce Bank
            </Navbar.Brand>
            <Nav className="ms-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Sign-In</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </div>
      
    </>
  );
}

export default Header;
