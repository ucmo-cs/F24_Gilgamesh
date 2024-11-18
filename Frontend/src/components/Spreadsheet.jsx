import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import React, { useState, useEffect } from 'react';
import Collapse from 'react-bootstrap/Collapse';
import './Spreadsheet.css'; // Import your CSS file here
import AdminForm from './AdminForm';

function Spreadsheet() {
  // State for controlling the collapse button
  const [open, setOpen] = useState(false);

  // Handle row click to open Google (or redirect to full loan page)
  const handleRowClick = () => {
    window.location.href = "./fullLoan"; // Redirects to full loan page
  };

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from backend when the component mounts
  useEffect(() => {
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
  }, []); // Empty dependency array means this runs only once on mount

  return (
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
          // Loop through data array and render rows for each loan
          data.map((loan) => (
            <tr key={loan.loan_id} onClick={handleRowClick} className="clickable-row" style={{ cursor: 'pointer' }}>
              <td>{loan.loan_id}</td>
              <td>{loan.customerName}</td> {/* Assuming customerName exists in the response */}
              <td>{loan.created_at}</td> {/* Assuming dateTakenOut exists in the response */}
              <td>${loan.amountDue}</td> {/* Assuming amountDue exists in the response */}
              <td>${loan.loanOriginAmount}</td> {/* Assuming originalAmount exists in the response */}
              <td>{loan.interestRate}%</td> {/* Assuming interestRate exists in the response */}
            </tr>
          ))
        )}
        <tr>
          <td colSpan={6}>
            <div className="d-grid gap-2">
              <Button 
                className="mb-2" 
                onClick={() => setOpen(!open)} 
                aria-controls="example-collapse-text"
                aria-expanded={open} 
                variant="primary" 
                size="lg" 
                active>
                Admin Form
              </Button>
              {' '}
              <Collapse in={open}>
                <div>
                  <AdminForm />
                </div>
              </Collapse>
            </div>
          </td>
        </tr>
      </tbody>
    </Table>
  );
}

export default Spreadsheet;
