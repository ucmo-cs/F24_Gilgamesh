import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import './UserForm.css'; // Make sure your custom styles are imported here

function UserForm() {
  return (
    <Form className="user-form d-flex flex-column" style={{ color: 'white' }}>
      <Form.Group className="mb-3" controlId="formGridName">
        <Form.Label className="form-label">Name</Form.Label> {/* Apply custom label styles */}
        <Form.Control type="text" placeholder="Enter name" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formGridEmail">
        <Form.Label className="form-label">Email</Form.Label> {/* Apply custom label styles */}
        <Form.Control type="email" placeholder="Enter email" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formGridPhone">
        <Form.Label className="form-label">Phone</Form.Label> {/* Apply custom label styles */}
        <Form.Control type="tel" placeholder="Enter phone number" />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default UserForm;
