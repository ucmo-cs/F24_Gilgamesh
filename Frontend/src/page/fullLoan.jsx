import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './fullLoan.css';
import { Table } from 'react-bootstrap';

function FullLoan() {
  const { userId } = useParams();  // Get the userId from the URL
  const [userData, setUserData] = useState(null);
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true); // To track if the data is still loading

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

  return (
    <div className="loan-container">
      <h1>Full Loan Details for User ID: {userId}</h1>

      {/* Show user data */}
      {userData ? (
        <div>
          <h2>{userData.userName}</h2>
          <p>Total Loans: {loans.length}</p>
          <p>Total Due: ${loans.reduce((sum, loan) => sum + loan.loanOriginAmount, 0)}</p>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}

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
            </tr>
          </thead>
          <tbody>
            {loans.length === 0 ? (
              <tr>
                <td colSpan="4">No loans available for this user.</td>
              </tr>
            ) : (
              loans.map((loan) => (
                <tr key={loan.loan_id}>
                  <td>{loan.loan_id}</td>
                  <td>${loan.amountLeftToPay}</td>
                  <td>${loan.loanOriginAmount}</td>
                  <td>{loan.interestRate}%</td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default FullLoan;
