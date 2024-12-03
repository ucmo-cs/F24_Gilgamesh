import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './fullLoan.css';
import { Table } from 'react-bootstrap';

import '../components/AdminHeader.css';
import AdminHeader from '../components/AdminHeader';
import Footer from '../components/Footer';

// Reusing the functions from UserPage
function calculateNextPaymentDate(startDate) {
  const start = new Date(startDate); // Convert the loan's creation date to a Date object
  start.setMonth(start.getMonth() + 1); // Add one month to the start date for the next payment
  return start;
}

function calculateMonthlyPayment(principal, annualRate, years) {
  const monthlyRate = annualRate / 12 / 100; // Convert annual rate to monthly rate and percentage to decimal
  const totalPayments = years * 12; // Total number of payments (months)
  const monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / (Math.pow(1 + monthlyRate, totalPayments) - 1);
  return monthlyPayment.toFixed(2); // Return the monthly payment rounded to 2 decimal places
}

function calculatePayoffDate(principal, monthlyPayment, interestRate) {
  const monthlyRate = interestRate / 12 / 100; // Convert annual rate to monthly rate
  let remainingBalance = principal; // Start with the principal
  let months = 0; // Track the number of months

  while (remainingBalance > 0) {
    const interestPayment = remainingBalance * monthlyRate; // Calculate the interest for the month
    const principalPayment = monthlyPayment - interestPayment; // Calculate how much of the monthly payment goes to the principal
    remainingBalance -= principalPayment; // Reduce the remaining balance
    months++; // Increment month count

    if (remainingBalance < 0) {
      remainingBalance = 0; // To prevent negative balance
    }
  }

  // Add the months to the loan's start date to calculate the payoff date
  const payoffDate = new Date();
  payoffDate.setMonth(payoffDate.getMonth() + months);
  return payoffDate;
}

function FullLoan() {
  const { userId } = useParams();  // Get the userId from the URL
  const [userData, setUserData] = useState(null);
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true); // To track if the data is still loading
  const navigate = useNavigate();  // Hook to allow navigation

  useEffect(() => {
    // Fetch user data based on userId (if needed)
    axios.get(`http://localhost:8080/user/${userId}`)
      .then((response) => {
        setUserData(response.data);
        console.log('User data fetched:', response.data);  // Debug log
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });

    // Fetch loans for the specific userId
    axios.get(`http://localhost:8080/admin/user/${userId}/loans`)
      .then((response) => {
        setLoans(response.data);
        console.log('Loans fetched:', response.data);  // Debug log
        setLoading(false);  // Mark loading as false once data is fetched
      })
      .catch((error) => {
        console.error('Error fetching loans:', error);
        setLoading(false);  // Stop loading even if there's an error
      });
  }, [userId]);

  // Handle back button click
  const handleBackClick = () => {
    navigate(-1);  // Navigate back to the previous page
  };

  return (
    <>
      <AdminHeader />
      <div className="loan-container">
        <h1> Loan Details For {userId}</h1>
        {/* Show table of loans */}
        <h3>Loans:</h3>
        {loading ? (
          <p>Loading loans...</p>
        ) : (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Loan ID</th>
                <th>Amount Left to Pay</th>
                <th>Original Amount</th>
                <th>Interest Rate</th>
                <th>Date Taken Out</th>
                <th>Payment Date</th>
                <th>Payment Amount</th>
                <th>Payoff Date</th> {/* New column for Payoff Date */}
              </tr>
            </thead>
            <tbody>
              {loans.length === 0 ? (
                <tr>
                  <td colSpan="8">No loans available for this user.</td> {/* Adjust colspan for new column */}
                </tr>
              ) : (
                loans.map((loan) => {
                  const nextPaymentDate = calculateNextPaymentDate(loan.created_at); // Calculate next payment date
                  const nextPaymentAmount = calculateMonthlyPayment(loan.loanOriginAmount, loan.interestRate, 30); // Calculate monthly payment
                  const payoffDate = calculatePayoffDate(loan.loanOriginAmount, nextPaymentAmount, loan.interestRate); // Calculate payoff date

                  return (
                    <tr key={loan.loan_id}>
                      <td>{loan.loan_id}</td>
                      <td>${loan.amountLeftToPay}</td>
                      <td>${loan.loanOriginAmount}</td>
                      <td>{loan.interestRate}%</td>
                      <td>{loan.created_at ? new Date(loan.created_at).toLocaleDateString() : 'N/A'}</td>
                      <td>{nextPaymentDate.toLocaleDateString()}</td> {/* Display Payment Date */}
                      <td>${nextPaymentAmount}</td> {/* Display Payment Amount */}
                      <td>{payoffDate.toLocaleDateString()}</td> {/* Display Payoff Date */}
                    </tr>
                  );
                })
              )}
            </tbody>
          </Table>
        )}
        {/* Back button */}
        <button onClick={handleBackClick} className="back-button">
          Back
        </button>
      </div>
      <Footer />
    </>
  );
}

export default FullLoan;
