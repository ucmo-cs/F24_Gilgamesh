import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import UserForm from '../components/UserForm'; // Import your UserForm component
import UserLoanForm from '../components/UserLoanForm'; // Import the UserLoanForm component
import './UserPage.css'; // Import your CSS file

function UserPage() {
  const [show, setShow] = useState(false);  // For showing the UserForm modal
  const [show1, setShow1] = useState(false); // For showing the UserLoanForm modal
 
  const [loanValue, setLoanValue] = useState(10000);  // Initial loan value

  // Handle opening and closing of User Form modal
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Handle opening and closing of Loan Payment modal
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  return (
    <div>
      <Container className="spreadsheet-container">
        <header className="header">
          <h1>Hello User</h1>
        </header>

        {/* Display Loan Value */}
        <Row className="mb-2 justify-content-center">
          <Col xs lg="12" className="text-center">
            <h3>Total Due: ${loanValue}</h3>
          </Col>
        </Row>

        {/* Header Row with Loan Information */}
        <Row className="mb-2 justify-content-center">
          <Col xs={2} lg={2} className="not text-center header-col">Loan Number</Col>
          <Col xs={2} lg={2} className="not text-center header-col">Given</Col>
          <Col xs={2} lg={2} className="not text-center header-col">Interest</Col>
          <Col xs={2} lg={2} className="not text-center header-col">Paid</Col>
          <Col xs={2} lg={2} className="not text-center header-col">Amount Left</Col>
        </Row>

        {/* Data Rows for Loan Information */}
        {Array.from({ length: 2 }, (_, rowIndex) => (
          <Row key={rowIndex} className="mb-2 justify-content-center table-row">
            <Col xs={2} lg={2} className="not text-center">Data</Col>
            <Col xs={2} lg={2} className="not text-center col-with-border">Data</Col>
            <Col xs={2} lg={2} className="not text-center col-with-border">Data</Col>
            <Col xs={2} lg={2} className="not text-center col-with-border">Data</Col>
            <Col xs={2} lg={2} className="not text-center">Data</Col>
          </Row>
        ))}

        {/* Button Row */}
        <Row className="mt-auto justify-content-center">
          <Col className="text-center">
            <Button variant="primary" onClick={handleShow}>
              Change Info
            </Button>
            <Button variant="secondary" onClick={handleShow1} className="ms-2">
              Pay Loan
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
      </Modal>

      {/* Modal for Loan Payment Form */}
      <Modal show={show1} onHide={handleClose1} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title>Loan Payment Form</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex flex-column" style={{ height: '60vh' }}>
          <UserLoanForm loanValue={loanValue} setLoanValue={setLoanValue} />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default UserPage;
