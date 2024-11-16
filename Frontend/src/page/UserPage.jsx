import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import Collapse from 'react-bootstrap/Collapse';

import UserForm from '../components/UserForm'; // Import your UserForm component
import UserLoanForm from '../components/UserLoanForm'; // Import the UserLoanForm component
import './UserPage.css'; // Import your CSS file

function UserPage() {
  const [show, setShow] = useState(false);  // For showing the UserForm modal
  const [show1, setShow1] = useState(false); // For showing the UserLoanForm modal
  const [loanValue, setLoanValue] = useState(10000);  // Initial loan value
  const [open, setOpen] = useState(false); // To toggle the admin form visibility

  // Handle opening and closing of User Form modal
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Handle opening and closing of Loan Payment modal
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  // Handle row click to show the Loan Payment Form
  const handleRowClick = (loanAmount) => {
    setLoanValue(loanAmount); // Set the loan amount to the clicked row's amount
    setShow1(true); // Open the Loan Payment modal
  };

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

        {/* Table for Loan Information */}
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Customer Name</th>
              <th>Date Taken Out</th>
              <th>Amount Due</th>
              <th>Original Amount</th>
              <th>Interest Rate</th>
            </tr>
          </thead>
          <tbody>
            {/* Row with onClick handler */}
            <tr onClick={() => handleRowClick(596000)} className="clickable-row" style={{ cursor: 'pointer' }}>
              <td>1</td>
              <td>Joe</td>
              <td>11/6/2024</td>
              <td>$596,000</td>
              <td>$1,000,000</td>
              <td>5%</td>
            </tr>
            {/* Additional rows can go here */}
            {/* Toggleable row for Admin Form */}
            <tr>
              <td colSpan={6}>
                <div className="d-grid gap-2">
                  <Collapse in={open}>
                    <div>
                      {/* Admin Form can go here */}
                    </div>
                  </Collapse>
                </div>
              </td>
            </tr>
          </tbody>
        </Table>

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
