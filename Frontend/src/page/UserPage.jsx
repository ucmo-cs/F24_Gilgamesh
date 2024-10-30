import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import UserForm from '../components/UserForm'; // Adjust the path as necessary
import './UserPage.css'; // Import your CSS file here

function UserPage() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
     
      <Container className="spreadsheet-container">
      <header className="header">
      <h1>User Page Header</h1>
        </header>
        {/* Header Row */}
        <Row className="mb-2 justify-content-center">
          <Col xs lg="2" className="text-center">Header 1</Col>
          <Col xs lg="2" className="text-center">Header 2</Col>
          <Col xs lg="2" className="text-center">Header 3</Col>
          <Col xs lg="2" className="text-center">Header 4</Col>
        </Row>

        <Row className="flex-grow-1 justify-content-center align-items-center">
          {Array.from({ length: 2 }, (_, rowIndex) => (
            <Row key={rowIndex} className="mb-2 justify-content-center"> 
              <Col xs lg="2" className="text-center">Data {rowIndex + 1} - 1</Col>
              <Col xs lg="2" className="text-center">Data {rowIndex + 1} - 2</Col>
              <Col xs lg="2" className="text-center">Data {rowIndex + 1} - 3</Col>
              <Col xs lg="2" className="text-center">Data {rowIndex + 1} - 4</Col>
            </Row>
          ))}
        </Row>

        <Row className="mt-auto justify-content-center">
          <Col className="text-center">
            <Button variant="primary" onClick={handleShow}>
              Open User Form
            </Button>
          </Col>
        </Row>
      </Container>

      {/* Modal for User Form */}
      <Modal show={show} onHide={handleClose} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title>User Form</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex flex-column" style={{ height: '60vh' }}>
          <UserForm />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default UserPage;
