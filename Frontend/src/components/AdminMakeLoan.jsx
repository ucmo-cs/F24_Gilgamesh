import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios'; // Import axios to make HTTP requests
import './AdminMakeLoan.css';


const AdminMakeLoan = () => {
  // Initial loanData state
  const [loanData, setLoanData] = useState({
    loanOriginAmount: '',
    interestRate: 5,
    userId: '', // User ID input field
  });

  const [successMessage, setSuccessMessage] = useState(''); // For success message
  const [errorMessage, setErrorMessage] = useState(''); // For error message

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoanData({
      ...loanData,
      [name]: value,
    });
  };

  // Handle form submission (making a POST request)
  const handleSubmit = (e) => {
    e.preventDefault();

    // Send POST request to create a loan
    axios
      .post('http://localhost:8080/loan', loanData) // Send loanData in the request body
      .then((response) => {
        console.log('Loan created:', response.data);
        setSuccessMessage('Loan created successfully!');
        setErrorMessage(''); // Reset error message on success
      })
      .catch((error) => {
        console.error('Error creating loan:', error);
        setErrorMessage('Failed to create loan. Please try again.');
        setSuccessMessage(''); // Reset success message on error
      });
  };

  return (
    <div className="admin-make-loan-form">
      
      {/* Loan creation form */}
      <Form onSubmit={handleSubmit}>
        {/* User ID field */}
        <Form.Group controlId="formUserId">
          <Form.Label>User ID</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter user ID"
            name="userId"
            value={loanData.userId}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        {/* Loan Amount field */}
        <Form.Group controlId="formLoanOriginAmount">
          <Form.Label>Loan Amount</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter loan amount"
            name="loanOriginAmount"
            value={loanData.loanOriginAmount}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        {/* Interest Rate field */}
        <Form.Group controlId="formInterestRate">
          <Form.Label>Interest Rate (%)</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter interest rate"
            name="interestRate"
            value={loanData.interestRate}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        {/* Submit Button */}
        <Button className="createLoan" variant="primary" type="submit">
          Create Loan
        </Button>
      </Form>
       {/* Display success or error message */}
       {successMessage && (
        <div className="alert alert-success" role="alert">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default AdminMakeLoan;
