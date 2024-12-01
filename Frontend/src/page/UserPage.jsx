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
  const [loanValue, setLoanValue] = useState(0);  // Total loan value (sum of loanOriginAmounts)
  const [parsedUser, setParsedUser] = useState(null); // User state
  const [loans, setLoans] = useState([]); // To store multiple loans data
  const [error, setError] = useState(null); // To handle any errors
  const [userId, setUserId] = useState(null); // To store the user ID
  const [totalMonthlyPayment, setTotalMonthlyPayment] = useState(0); // To store total monthly payment


  const navigate = useNavigate(); // Initialize useNavigate hook

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

  // Function to handle button click and navigate to the LoanPayment page
  const handlePaymentRedirect = () => {
    navigate('/LoanPayment'); // This will navigate to the LoanPayment page
  };

  const handleRedirect = () => {
    navigate('/AutoPay'); // This will navigate to the LoanPayment page
  };

  // Function to handle loan row click and navigate to the LoanPayment page
  const handleLoanClick = () => {
    navigate('/LoanPayment'); // This will navigate to the LoanPayment page
  };

  // Function to calculate the next payment date (1 month from the loan's start date)
  function calculateNextPaymentDate(startDate) {
    const start = new Date(startDate); // Convert the loan's creation date to a Date object
    start.setMonth(start.getMonth() + 1); // Add one month to the start date for the next payment
    return start;
  }

  // Function to calculate the monthly payment using the mortgage formula
  function calculateMonthlyPayment(principal, annualRate, years) {
    const monthlyRate = annualRate / 12 / 100; // Convert annual rate to monthly rate and percentage to decimal
    const totalPayments = years * 12; // Total number of payments (months)
    const monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / (Math.pow(1 + monthlyRate, totalPayments) - 1);
    return monthlyPayment.toFixed(2); // Return the monthly payment rounded to 2 decimal places
  }
  function calculateTotalMonthlyPayment(loans) {
    return loans.reduce((total, loan) => {
      const nextPaymentAmount = calculateMonthlyPayment(loan.loanOriginAmount, loan.interestRate, 30);  // Assuming 30 years term
      return total + parseFloat(nextPaymentAmount); // Add to total
    }, 0);
  }
  useEffect(() => {
    if (userId) {
      const url = `http://localhost:8080/loan/account/${userId}`;
      axios
        .get(url)
        .then((response) => {
          setLoans(response.data);
          const totalDue = response.data.reduce((acc, loan) => acc + loan.loanOriginAmount, 0);
          setLoanValue(totalDue);  // Set total loan value
  
          // Calculate total monthly payment using the new function
          const totalPayment = calculateTotalMonthlyPayment(response.data);
          setTotalMonthlyPayment(totalPayment);  // Set total monthly payment
        })
        .catch((error) => {
          console.error("Error fetching loan data:", error);
          setError(error.message || 'An error occurred while fetching loan data');
        });
    }
  }, [userId]);
  
  return (
    <>
      {renderHeader()}
      <div>
      <Container className="spreadsheet-container">
        <header className="header">
          <h1>Hello {parsedUser ? parsedUser.User : 'Loading...'}</h1> {/* Conditionally rendering user name */}
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
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Loan ID</th>
              <th>Origin Amount</th>
              <th>Amount Left</th>
              <th>Interest Rate</th>
              <th>Date Created</th>
              <th>Payment Date</th> {/* Column for next payment date */}
              <th>Payment Amount</th> {/* Column for next payment amount */}
            </tr>
          </thead>
          <tbody>
            {loans.length > 0 ? (
              loans.map((loan) => {
                const nextPaymentDate = calculateNextPaymentDate(loan.created_at); // Calculate next payment date
                const nextPaymentAmount = calculateMonthlyPayment(loan.loanOriginAmount, loan.interestRate, 30); 

                return (
                  <tr
                    key={loan.loan_id}
                    style={{ cursor: 'pointer' }}
                    onClick={handleLoanClick} // Clicking on the loan row also redirects to the LoanPayment page
                  >
                    <td>{loan.loan_id}</td>
                    <td>${loan.loanOriginAmount.toFixed(2)}</td>
                    <td>${loan.loanOriginAmount.toFixed(2)}</td>
                    <td>{loan.interestRate}%</td>
                    <td>{new Date(loan.created_at).toLocaleDateString()}</td>
                    <td>{nextPaymentDate.toLocaleDateString()}</td> {/* Display Next Payment Date */}
                    <td>${nextPaymentAmount}</td> {/* Display Next Payment Amount */}
                  </tr>
                );
              })
            ) : error ? (
              <tr>
                <td colSpan="7" className="text-center text-danger">{error}</td> {/* Adjust colspan to 7 */}
              </tr>
            ) : (
              <tr>
                <td colSpan="7" className="text-center">Loading loan data...</td> {/* Adjust colspan to 7 */}
              </tr>
            )}
          </tbody>
        </Table>

        <Row className="mb-3 justify-content-center"> {/* Row to hold the buttons */}
          <Col xs="auto" className="text-center">  {/* Use xs="auto" to make each button size to its content */}
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

