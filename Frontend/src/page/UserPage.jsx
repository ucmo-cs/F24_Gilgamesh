import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Table } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

import './UserPage.css'; // Import your CSS file
import Header from '../components/Header';
import UserHeader from '../components/UserHeader';
import AdminHeader from '../components/AdminHeader';
import Footer from '../components/Footer';

function UserPage() {
  const navigate = useNavigate(); // Initialize useNavigate hook

  // State for user data, loans, and loan related info
  const [user, setUser] = useState(null); // User state
  const [loans, setLoans] = useState([]); // To store multiple loans data
  const [loanValue, setLoanValue] = useState(0); // Total loan value (sum of loanOriginAmounts)
  const [totalMonthlyPayment, setTotalMonthlyPayment] = useState(0); // To store total monthly payment
  const [error, setError] = useState(null); // To handle any errors
  const [userId, setUserId] = useState(null); // To store the user ID

  // Fetch user from session storage
  useEffect(() => {
    const userSession = sessionStorage.getItem('userSession');
    if (userSession) {
      const parsedUser = JSON.parse(userSession);
      setUser(parsedUser);
      setUserId(parsedUser.account_id); // Set userId from parsed user data
    } else {
      console.log("No user session found.");
    }
  }, []); // Runs once when the component is mounted

  // Fetch loan data when userId is available
  useEffect(() => {
    if (userId) {
      const url = `http://localhost:8080/loan/account/${userId}`;
      axios
        .get(url)
        .then((response) => {
          setLoans(response.data); // Store loans data
          const totalDue = response.data.reduce((acc, loan) => acc + loan.loanOriginAmount, 0);
          setLoanValue(totalDue); // Set total loan value
          const totalPayment = calculateTotalMonthlyPayment(response.data);
          setTotalMonthlyPayment(totalPayment); // Set total monthly payment
        })
        .catch((error) => {
          console.error("Error fetching loan data:", error);
          setError(error.message || 'An error occurred while fetching loan data');
        });
    }
  }, [userId]); // Runs when userId changes

  // Render the header based on user role
  const renderHeader = () => {
    if (user) {
      if (user.role === 'ADMIN') {
        return <AdminHeader />;
      } if (user.role === 'USER') {
        return <UserHeader />;
      }
    }
    return <Header />;
  };

  // Calculate next payment date (1 month from loan start date)
  function calculateNextPaymentDate(startDate) {
    const start = new Date(startDate);
    start.setMonth(start.getMonth() + 1);
    return start;
  }

  // Calculate monthly payment using mortgage formula
  function calculateMonthlyPayment(principal, annualRate, years) {
    const monthlyRate = annualRate / 12 / 100;
    const totalPayments = years * 12;
    const monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / (Math.pow(1 + monthlyRate, totalPayments) - 1);
    return monthlyPayment.toFixed(2);
  }

  // Calculate total monthly payment for all loans
  function calculateTotalMonthlyPayment(loans) {
    return loans.reduce((total, loan) => {
      const nextPaymentAmount = calculateMonthlyPayment(loan.loanOriginAmount, loan.interestRate, 30);
      return total + parseFloat(nextPaymentAmount);
    }, 0);
  }

  // Function to handle loan row click and navigate to LoanPayment page
  const handleLoanClick = (loanId) => {
    navigate('/LoanPayment', { state: { loanId } });
  };

  // Function to handle button click and navigate to LoanPayment page
  const handlePaymentRedirect = () => {
    navigate('/LoanPayment');
  };

  return (
    <>
      {renderHeader()}
      <div>
        <Container className="spreadsheet-container">
          <header className="header">
            <h1>Hello {user ? user.User : 'Loading...'}</h1>
          </header>

          {/* Display Total Due Loan Value */}
          <Row className="mb-3 justify-content-center" style={{ color: 'white', display: 'flex', alignItems: 'center' }}>
            <Col xs="auto" className="total text-center">
              <h3>Total Due: ${loanValue.toFixed(2)}</h3>
            </Col>
            <Col xs="auto" className="total text-center">
              <h3>Monthly Due: ${totalMonthlyPayment.toFixed(2)}</h3>
            </Col>
          </Row>

          {/* Table for Loan Information */}
          <Table style={{ borderRadius: '10px', overflow: 'hidden' }} striped bordered hover>
            <thead>
              <tr>
                <th style={{ textAlign: 'center' }}>Loan ID</th>
                <th style={{ textAlign: 'center' }}>Origin Amount</th>
                <th style={{ textAlign: 'center' }}>Amount Left</th>
                <th style={{ textAlign: 'center' }}>Interest Rate</th>
                <th style={{ textAlign: 'center' }}>Date Created</th>
                <th style={{ textAlign: 'center' }}>Payment Date</th>
                <th style={{ textAlign: 'center' }}>Payment Amount</th>
              </tr>
            </thead>
            <tbody>
              {loans.length > 0 ? (
                loans.map((loan) => {
                  const nextPaymentDate = calculateNextPaymentDate(loan.created_at);
                  const nextPaymentAmount = calculateMonthlyPayment(loan.loanOriginAmount, loan.interestRate, 30);
                  return (
                    <tr key={loan.loan_id} style={{ cursor: 'pointer' }} onClick={() => handleLoanClick(loan.loan_id)}>
                      <td style={{ textAlign: 'center' }}>{loan.loan_id}</td>
                      <td style={{ textAlign: 'center' }}>${loan.loanOriginAmount.toFixed(2)}</td>
                      <td style={{ textAlign: 'center' }}>${loan.loanOriginAmount.toFixed(2)}</td>
                      <td style={{ textAlign: 'center' }}>{loan.interestRate}%</td>
                      <td style={{ textAlign: 'center' }}>{new Date(loan.created_at).toLocaleDateString()}</td>
                      <td style={{ textAlign: 'center' }}>{nextPaymentDate.toLocaleDateString()}</td>
                      <td style={{ textAlign: 'center' }}>${nextPaymentAmount}</td>
                    </tr>
                  );
                })
              ) : error ? (
                <tr>
                  <td colSpan="7" className="text-center text-danger">{error}</td>
                </tr>
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">Loading loan data...</td>
                </tr>
              )}
            </tbody>
          </Table>

          <Row className="mb-3 justify-content-center">
            <Col xs="auto" className="text-center">
              <Button variant="secondary" onClick={handlePaymentRedirect} className="ms-2">
                Pay Loan
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
      <Footer />
    </>
  );
}

export default UserPage;
