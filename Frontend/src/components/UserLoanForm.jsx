import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import './UserloanForm.css'; // Ensure to reuse the styling

function UserPaymentForm() {
  return (
    <Form className="user-form d-flex flex-column" style={{ height: '100%' }}>
      
      {/* Loan Number */}
      <Form.Group className="mb-3" controlId="formGridLoanNumber">
        <Form.Label>Loan Number</Form.Label>
        <Form.Control type="text" placeholder="Enter loan number" />
      </Form.Group>

      {/* Payment Amount */}
      <Form.Group className="mb-3" controlId="formGridPaymentAmount">
        <Form.Label>Payment Amount</Form.Label>
        <Form.Control type="number" placeholder="Enter payment amount" />
      </Form.Group>

      {/* Payment Date */}
      <Form.Group className="mb-3" controlId="formGridPaymentDate">
        <Form.Label>Payment Date</Form.Label>
        <Form.Control type="date" />
      </Form.Group>

      {/* Payment Method */}
      <Form.Group className="mb-3" controlId="formGridPaymentMethod">
        <Form.Label>Payment Method</Form.Label>
        <Form.Control as="select">
          <option>Choose...</option>
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
  );
}

export default UserPaymentForm;
