import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import AdminForm from '../components/AdminForm'; // Adjust the path as necessary
import './Spreadsheet.css'; // Import your CSS file here

function Spreadsheet() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <header className="header">
        <h1>Your Header</h1>
      </header>
      <Container className="spreadsheet-container d-flex flex-column" style={{ height: '100vh' }}>
        {/* Header Row */}
        <Row className="mb-2 justify-content-center">
          <Col xs={6} md={3} className="text-center">Header 1</Col>
          <Col xs={6} md={3} className="text-center">Header 2</Col>
          <Col xs={6} md={3} className="text-center">Header 3</Col>
          <Col xs={6} md={3} className="text-center">Header 4</Col>
        </Row>

        <Row className="flex-grow-1 justify-content-center align-items-center">
          {Array.from({ length: 10 }, (_, rowIndex) => (
            <Row key={rowIndex} className="mb-2 justify-content-center"> 
              <Col xs={6} md={3} className="text-center">Data {rowIndex + 1} - 1</Col>
              <Col xs={6} md={3} className="text-center">Data {rowIndex + 1} - 2</Col>
              <Col xs={6} md={3} className="text-center">Data {rowIndex + 1} - 3</Col>
              <Col xs={6} md={3} className="text-center">Data {rowIndex + 1} - 4</Col>
            </Row>
          ))}
        </Row>

        <Row className="mt-auto justify-content-center">
          <Col className="text-center">
            <Button variant="primary" onClick={handleShow}>
              Open Admin Form
            </Button>
          </Col>
        </Row>
      </Container>

      {/* Modal for Admin Form */}
      <Modal show={show} onHide={handleClose} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title>Admin Form</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex flex-column" style={{ height: '70vh', overflowY: 'auto' }}>
          <AdminForm />
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

export default Spreadsheet;
