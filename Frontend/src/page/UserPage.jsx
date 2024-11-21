import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Modal, Table } from 'react-bootstrap';
import axios from 'axios';

import UserLoanForm from '../components/UserLoanForm'; // Import the UserLoanForm component
import './UserPage.css'; // Import your CSS file
import Header from '../components/Header';
import UserHeader from '../components/UserHeader';
import AdminHeader from '../components/AdminHeader';


function UserPage() {
  const [show1, setShow1] = useState(false); // For showing the UserLoanForm modal
  const [loanValue, setLoanValue] = useState(0);  // Total loan value (sum of loanOriginAmounts)
  const [parsedUser, setParsedUser] = useState(null); // User state
  const [loans, setLoans] = useState([]); // To store multiple loans data
  const [error, setError] = useState(null); // To handle any errors
  const [userId, setUserId] = useState(null); // To store the user ID

  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  const handleRowClick = (loanAmount) => {
    setLoanValue(loanAmount); // Set the loan amount to the clicked row's amount
    setShow1(true); // Open the Loan Payment modal
  };

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
      if (parsedUser && parsedUser.account_id) {
        setUserId(parsedUser.account_id);  // Use account_id if userId is missing
      } else {
        console.error("User ID or account_id is missing in the session data.");
      }
    }
  }, []);

  useEffect(() => {
    if (userId) {
      const url = `http://localhost:8080/loan/account/${userId}`;
      axios
        .get(url)
        .then((response) => {
          setLoans(response.data); // Store multiple loans data in state
          const totalDue = response.data.reduce((acc, loan) => acc + loan.loanOriginAmount, 0);
          setLoanValue(totalDue); // Set the total due loan amount
        })
        .catch((error) => {
          console.error("Error fetching loan data:", error);
          setError(error.message || 'An error occurred while fetching loan data');
        });
    }
  }, [userId]);
  const renderHeader = () => {
    if (parsedUser) {
      if (parsedUser.role === 'ADMIN') {
        return <AdminHeader />;
      } if(parsedUser.role === 'USER') {
        return <UserHeader />;
      }
    }
    return <Header />;
  };

  return (
    <>
    {renderHeader()} 
     

      <div>
        <Container className="spreadsheet-container">
          <header className="header">
            <h1>Hello {parsedUser ? parsedUser.User : 'Loading...'}</h1> {/* Conditionally rendering user name */}
          </header>

          {/* Display Total Due Loan Value */}
          <Row className="mb-2 justify-content-center">
            <Col xs lg="12" className="text-center">
              <h3>Total Due: ${loanValue.toFixed(2)}</h3>
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
                loans.map((loan) => (
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
                  <td colSpan="5" className="text-center text-danger">{error}</td>
                </tr>
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">Loading loan data...</td>
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

        <Modal
  show={show1}
  onHide={handleClose1}
  aria-labelledby="contained-modal-title-vcenter"
  centered
>
  <Modal.Header closeButton>
    <Modal.Title>Loan Payment Form</Modal.Title>
  </Modal.Header>
  <Modal.Body
    className="d-flex flex-column"
    style={{ height: '30vh', padding: '10px' }} // Adjust height here
  >
    <UserLoanForm loanValue={loanValue} setLoanValue={setLoanValue} />
  </Modal.Body>
</Modal>
      </div>
    </>
  );
}

export default UserPage;
