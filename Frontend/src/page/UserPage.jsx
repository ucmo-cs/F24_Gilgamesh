import React, { useState, useEffect } from 'react';
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
import Header from '../components/Header';
import UserHeader from '../components/UserHeader';

function UserPage() {
  const [show, setShow] = useState(false);  // For showing the UserForm modal
  const [show1, setShow1] = useState(false); // For showing the UserLoanForm modal
  const [loanValue, setLoanValue] = useState(10000);  // Initial loan value
  const [open, setOpen] = useState(false); // To toggle the admin form visibility
  const [parsedUser, setParsedUser] = useState(null); // User state

  // Handle opening and closing of Loan Payment modal
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  // Handle row click to show the Loan Payment Form
  const handleRowClick = (loanAmount) => {
    setLoanValue(loanAmount); // Set the loan amount to the clicked row's amount
    setShow1(true); // Open the Loan Payment modal
  };

  useEffect(() => {
    const user = sessionStorage.getItem('userSession');
    console.log('Stored user session:', user);  // Log the raw user data

    if (user) {
      const parsed = JSON.parse(user);
      console.log('Parsed user data:', parsed);  // Log the parsed user object
      setParsedUser(parsed);  // Set parsed user in state
    }
  }, []);

  return (
    <>
      {localStorage.getItem('userSession') || sessionStorage.getItem('userSession') ? <UserHeader /> : <Header />}
      
      <div>
        <Container className="spreadsheet-container">
          <header className="header">
            <h1>Hello {parsedUser ? parsedUser.User : 'Loading...'}</h1> {/* Added conditional rendering */}
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
              <tr onClick={() => handleRowClick(596000)} className="clickable-row" style={{ cursor: 'pointer' }}>
                <td>1</td>
                <td>Joe</td>
                <td>11/6/2024</td>
                <td>$596,000</td>
                <td>$1,000,000</td>
                <td>5%</td>
              </tr>
            </tbody>
          </Table>

          {/* Button Row */}
          <Row className="mt-auto justify-content-center">
            <Col className="text-center">
              <Button variant="secondary" onClick={handleShow1} className="ms-2">
                Pay Loan
              </Button>
            </Col>
          </Row>
        </Container>

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
    </>
  );
}

export default UserPage;
