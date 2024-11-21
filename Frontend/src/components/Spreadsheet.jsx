import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Spreadsheet.css'; // Import your CSS file here
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import AdminForm from './AdminForm';

function Spreadsheet() {

  const adminUsername = sessionStorage.getItem('adminUsername');
  const adminPassword = sessionStorage.getItem('adminPassword');
  const authHeader = {
    'Authorization': `Basic ${btoa(adminUsername + ':' + adminPassword)}`
  };
  
  const [showForm, setShowForm] = useState(false); // State to toggle the form visibility
  const [user, setUser] = useState([]); // For storing user data
  const [data, setData] = useState([]); // For storing userIds
  const [info, setInfo] = useState([]); // For storing userIds
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch loan data from the backend
    axios
      .get('http://localhost:8080/admin/loans', { headers: authHeader }) // Include auth header
      .then((response) => {
        const loanData = response.data; // Assuming response.data is an array of loan objects
        
        // Extract userId from each loan and store in an array
        const userIdsArray = loanData.map((loan) => loan.userId);
        setData(userIdsArray); // Store the userIds array in state
        setUser(loanData); // Store the full loan data if needed
        setLoading(false); // Set loading to false
      })
      .catch((error) => {
        console.error('Error fetching loan data:', error); // Log any errors
        setError('Error fetching loan data. Please check credentials and CORS settings.');
        setLoading(false);
      });
  }, [])

 
  const uniqueUsername = [...new Set(data)];

  const url = `http://localhost:8080/user/` + uniqueUsername; 
  
  useEffect(() => {
    axios
      .get(url,{ headers: authHeader })
      .then((response) => {
        const eo = response.data; 
        console.log(eo)
        setInfo(eo); 
        setLoading(false); 
      })
      .catch((error) => {
        console.error('Error fetching loan data:', error); 
        setLoading(false); 
      });
  }, []); 
  

  const handleRowClick = (loanId) => {
    window.location.href = `./fullLoan?id=${loanId}`; // Navigate to full loan details
  };

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Outstanding Loans</th>
            <th>Total Due</th>
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
                onClick={() => handleRowClick(loan.loan_id)} // Make rows clickable
                className="clickable-row"
                style={{ cursor: 'pointer' }}
              >
                <td>{loan.userId}</td>
                <td>${loan.amountLeftToPay}</td>
                <td>${loan.loanOriginAmount}</td>
              </tr>
            ))
          )}
          <tr>
            <td colSpan={6}>
              <div className="d-grid gap-2">
                <Button
                  className="mb-2"
                  onClick={() => setShowForm(!showForm)} // Toggle visibility of the AdminForm
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

      {/* The pop-up (admin form) */}
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
