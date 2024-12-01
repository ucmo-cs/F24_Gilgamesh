import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap'; // Import Row and Col from react-bootstrap
import axios from 'axios';
import './AdminMakeLoan.css';

const AdminMakeLoan = () => {
  const [loanData, setLoanData] = useState({
    loanOriginAmount: '',
    interestRate: 5,
    userId: '', // User ID input field
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoanData({
      ...loanData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post('http://localhost:8080/loan', loanData)
      .then((response) => {
        console.log('Loan created:', response.data);
        setSuccessMessage('Loan created successfully!');
        setErrorMessage('');
      })
      .catch((error) => {
        console.error('Error creating loan:', error);
        setErrorMessage('Failed to create loan. Please try again.');
        setSuccessMessage('');
      });
  };

  return (
    <div className="admin-make-loan-form">
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

        {/* Row for Email and Phone Number */}
        <Row>
          <Col md={6}>
            {/* Email field */}
            <Form.Group controlId="formEmail">
              <Form.Label>User Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter user email"
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            {/* Phone Number field */}
            <Form.Group controlId="formPhoneNumber">
              <Form.Label>User Phone Number</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter user phone number"
                required
              />
            </Form.Group>
          </Col>
        </Row>

        {/* Date field */}
        <Form.Group controlId="formDate">
          <Form.Label>Date</Form.Label>
          <Form.Control type="date" required />
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
