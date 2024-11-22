import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import './Spreadsheet.css';
import AdminForm from './AdminForm';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function Spreadsheet() {
  const [showForm, setShowForm] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Initialize navigate

  // Fetch data from backend when the component mounts
  useEffect(() => {
    const fetchData = () => {
      fetch('http://localhost:8080/admin/loans')
        .then(response => response.json())
        .then(data => {
          setData(data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          setLoading(false);
        });
    };

    fetchData();

    const intervalId = setInterval(fetchData, 10000); // Fetch every 10 seconds
    return () => clearInterval(intervalId);
  }, []);

  const handleRowClick = (loan_id) => {
    // Use navigate to go to the fullLoan page with the loan ID as a query param
    navigate(`/fullLoan?id=${loan_id}`);
  };

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Loan ID</th>
            <th>Customer Name</th>
            <th>Date Taken Out</th>
            <th>Amount Due</th>
            <th>Original Amount</th>
            <th>Interest Rate</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="6">Loading...</td>
            </tr>
          ) : (
            data.map((loan) => (
              <tr
                key={loan.loan_id}
                onClick={() => handleRowClick(loan.loan_id)} // Row click handler
                className="clickable-row"
                style={{ cursor: 'pointer' }}
              >
                <td>{loan.loan_id}</td>
                <td>{loan.userId}</td>
                <td>{loan.created_at}</td>
                <td>${loan.amountLeftToPay}</td>
                <td>${loan.loanOriginAmount}</td>
                <td>{loan.interestRate}%</td>
              </tr>
            ))
          )}
          <tr>
            <td colSpan={6}>
              <div className="d-grid gap-2">
                <Button
                  className="mb-2"
                  onClick={() => setShowForm(!showForm)} // Toggle AdminForm visibility
                  variant="primary"
                  size="lg"
                  active
                >
                  Admin Form
                </Button>
              </div>
            </td>
          </tr>
        </tbody>
      </Table>

      {showForm && (
        <div className="admin-form-popup">
          <div className="admin-form-container">
            <AdminForm />
            <Button
              variant="secondary"
              onClick={() => setShowForm(false)} // Close the form
              className="close-btn"
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Spreadsheet;
