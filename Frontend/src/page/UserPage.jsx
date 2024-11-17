import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import axios from 'axios';

import UserLoanForm from '../components/UserLoanForm'; // Import the UserLoanForm component
import './UserPage.css'; // Import your CSS file
import Header from '../components/Header';
import UserHeader from '../components/UserHeader';

function UserPage() {
  const [show1, setShow1] = useState(false); // For showing the UserLoanForm modal
  const [loanValue, setLoanValue] = useState(10000);  // Initial loan value
  const [parsedUser, setParsedUser] = useState(null); // User state
  const [loans, setLoans] = useState([]); // To store multiple loans data
  const [error, setError] = useState(null); // To handle any errors
  const [userId, setUserId] = useState(null); // To store the user ID

  // Handle opening and closing of Loan Payment modal
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  // Handle row click to show the Loan Payment Form
  const handleRowClick = (loanAmount) => {
    setLoanValue(loanAmount); // Set the loan amount to the clicked row's amount
    setShow1(true); // Open the Loan Payment modal
  };

  // Get user session from sessionStorage
  useEffect(() => {
    const user = sessionStorage.getItem('userSession');
    if (user) {
      const parsed = JSON.parse(user);
      setParsedUser(parsed);  // Set parsed user in state
    } else {
      console.log("No user session found.");
    }
  }, []);

  useEffect(() => {
    const userSession = sessionStorage.getItem('userSession');
    if (userSession) {
      const parsedUser = JSON.parse(userSession);
      console.log("Parsed user data:", parsedUser);
      if (parsedUser && parsedUser.account_id) {  // Checking for 'account_id'
        setUserId(parsedUser.account_id);  // Use account_id if userId is missing
        console.log("User ID set to account_id:", parsedUser.account_id);
      } else {
        console.error("User ID or account_id is missing in the session data.");
      }
    } else {
      console.log("No user session available.");
    }
  }, []);

  // Fetch loan data when userId is available
  useEffect(() => {
    if (userId) {
      const url = `http://localhost:8080/loan/account/${userId}`;
      console.log("Making request to URL:", url); // Log the URL being used

      axios
        .get(url)
        .then((response) => {
          console.log("Loan data fetched:", response.data); // Log the response data
          setLoans(response.data); // Store multiple loans data in state
        })
        .catch((error) => {
          console.error("Error fetching loan data:", error);
          setError(error.message || 'An error occurred while fetching loan data');
        });
    }
  }, [userId]);

  return (
    <>
      {localStorage.getItem('userSession') || sessionStorage.getItem('userSession') ? <UserHeader /> : <Header />}
      
      <div>
        <Container className="spreadsheet-container">
          <header className="header">
            <h1>Hello {parsedUser ? parsedUser.User : 'Loading...'}</h1> {/* Conditionally rendering user name */}
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
                
                <th>Loan ID</th>
                <th>Loan Origin Amount</th>
                <th>Interest Rate</th>
                <th>Date Created</th>
                <th>Date Updated</th>
              </tr>
            </thead>
            <tbody>
              {loans.length > 0 ? (
                loans.map((loan, index) => (
                  <tr 
                    key={loan.loan_id} 
                    onClick={() => handleRowClick(loan.loanOriginAmount)} 
                    className="clickable-row" 
                    style={{ cursor: 'pointer' }}
                  >
                    
                    <td>{loan.loan_id}</td>
                    <td>${loan.loanOriginAmount.toFixed(2)}</td>
                    <td>{loan.interestRate}%</td>
                    <td>{new Date(loan.created_at).toLocaleDateString()}</td>
                    <td>{new Date(loan.updatedAt).toLocaleDateString()}</td>
                  </tr>
                ))
              ) : error ? (
                <tr>
                  <td colSpan="6" className="text-center text-danger">{error}</td>
                </tr>
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">Loading loan data...</td>
                </tr>
              )}
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
