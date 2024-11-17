import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import './UserloanForm.css'; // Ensure to reuse the styling

function UserPaymentForm() {
  const [values, setValues] = useState({
    loanId: '', 
    amount: '',
    date: '',
    paymentMethod: 'Credit Card', // Default to 'Credit Card'
  });

  const [formSubmitted, setFormSubmitted] = useState(false); // State to track form submission

  // Handle input change
  const handleInput = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission (just for display)
  const handleSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true); // Mark form as submitted

    // Optionally, you can log or show the submitted values
    console.log('Form Submitted:', values);
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      {!formSubmitted ? (
        <Form className="user-form d-flex flex-column" style={{ width: '100%', maxWidth: '500px' }} onSubmit={handleSubmit}>
          
          {/* Loan Number */}
          <Form.Group className="mb-3" controlId="formGridLoanNumber">
            <Form.Label>Loan Number</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Enter loan number" 
              name="loanId" 
              value={values.loanId} 
              onChange={handleInput} 
            />
          </Form.Group>

          {/* Payment Amount */}
          <Form.Group className="mb-3" controlId="formGridPaymentAmount">
            <Form.Label>Payment Amount</Form.Label>
            <Form.Control 
              type="number" 
              placeholder="Enter payment amount" 
              name="amount" 
              value={values.amount} 
              onChange={handleInput} 
            />
          </Form.Group>

          {/* Payment Date */}
          <Form.Group className="mb-3" controlId="formGridPaymentDate">
            <Form.Label>Payment Date</Form.Label>
            <Form.Control 
              type="date" 
              name="date" 
              value={values.date} 
              onChange={handleInput} 
            />
          </Form.Group>

          {/* Payment Method */}
          <Form.Group className="mb-3" controlId="formGridPaymentMethod">
            <Form.Label>Payment Method</Form.Label>
            <Form.Control 
              as="select" 
              name="paymentMethod" 
              value={values.paymentMethod} 
              onChange={handleInput}
            >
              <option>Credit Card</option>
              <option>Bank Transfer</option>
              <option>Cash</option>
            </Form.Control>
          </Form.Group>

          {/* Submit Button */}
          <Button variant="primary" type="submit">
            Submit Payment
          </Button>
        </Form>
      ) : (
        <div className="alert alert-success" style={{ width: '100%', maxWidth: '500px' }}>
          <strong>Form Submitted Successfully!</strong>
          <pre>{JSON.stringify(values, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default UserPaymentForm;
