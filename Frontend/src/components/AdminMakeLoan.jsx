// src/components/AdminMakeLoan.js

import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const AdminMakeLoan = () => {
  const [loanData, setLoanData] = useState({
    loanAmount: '',
    loanTerm: '',
    interestRate: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoanData({
      ...loanData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit logic for creating a loan
    console.log('Loan created:', loanData);
  };

  return (
    <div className="admin-make-loan-form">
      <h2>Create New Loan</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formLoanAmount">
          <Form.Label>Loan Amount</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter loan amount"
            name="loanAmount"
            value={loanData.loanAmount}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formLoanTerm">
          <Form.Label>Loan Term (in months)</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter loan term"
            name="loanTerm"
            value={loanData.loanTerm}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formInterestRate">
          <Form.Label>Interest Rate (%)</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter interest rate"
            name="interestRate"
            value={loanData.interestRate}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Create Loan
        </Button>
      </Form>
    </div>
  );
};

export default AdminMakeLoan;
