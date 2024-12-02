import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import './UserForm.css'; // Make sure your custom styles are imported here

function UserAccountForm({ handleSubmit }) {
  // State hooks for the account form
  const [routingNumber, setRoutingNumber] = useState('');
  const [bankNumber, setBankNumber] = useState('');

  // Handle form submission
  const onSubmit = (e) => {
    e.preventDefault();
    const accountInfo = {
      routingNumber,
      bankNumber,
    };

    // Pass data back to the parent component (UserSetting)
    handleSubmit(accountInfo);
  };

  return (
    <Form className="user-form d-flex flex-column" style={{ color: 'white' }} onSubmit={onSubmit}>
      <Form.Group className="mb-3" controlId="formGridRoutingNumber">
        <Form.Label className="form-label">Routing Number</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Routing Number"
          value={routingNumber}
          onChange={(e) => setRoutingNumber(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formGridBankNumber">
        <Form.Label className="form-label">Bank Number</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Bank Number"
          value={bankNumber}
          onChange={(e) => setBankNumber(e.target.value)}
        />
      </Form.Group>

      <Button  style={{width:"50%"}} variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default UserAccountForm;
