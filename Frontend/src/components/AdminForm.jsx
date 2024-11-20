import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useState } from 'react'; // Import useState
import './AdminForm.css';

function AdminForm() {
  // Step 1: Set up state to track form fields
  const [userId, setUserId] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanOriginAmount, setLoanAmount] = useState('');
  

  // Step 2: Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Step 3: Create the data object to send to the server
    const formData = {
      userId,
      interestRate,
      loanOriginAmount,
    };

    // Step 4: Send the form data to the backend via a POST request
    fetch('http://localhost:8080/loan', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Indicate that we are sending JSON
      },
      body: JSON.stringify(formData), // Send the form data as JSON
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert('Form submitted successfully');
          // Optionally reset the form or close the modal after submission
          setUserId('');
          setInterestRate('');
          setLoanAmount('');
        } else {
          alert('Error submitting form');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('There was an error submitting the form');
      });
  };

  return (
    <Form className="admin-form d-flex flex-column" style={{ height: '100%' }} onSubmit={handleSubmit}>
      {/* User ID */}
      <Form.Group className="mb-3" controlId="formGridName">
        <Form.Label>User ID</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)} // Track the value of the field
          required
        />
      </Form.Group>

      {/* Interest Rate */}
      <Form.Group as={Col} controlId="formGridInterestRate">
        <Form.Label>Interest Rate</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter Interest Rate"
          value={interestRate}
          onChange={(e) => setInterestRate(e.target.value)} // Track the value of the field
          required
        />
      </Form.Group>

      {/* Loan Amount */}
      <Form.Group className="mb-3" controlId="formGridLoanAmount">
        <Form.Label>Loan Amount</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter Loan Amount"
          value={loanOriginAmount}
          onChange={(e) => setLoanAmount(e.target.value)} // Track the value of the field
          required
        />
      </Form.Group>

      {/* Submit Button */}
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default AdminForm;
