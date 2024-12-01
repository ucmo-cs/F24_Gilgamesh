import React, { useState, useEffect } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook for routing
import 'bootstrap/dist/css/bootstrap.min.css';
import './UserSetupAutoPay.css'; 
import Header from '../components/Header';
import UserHeader from '../components/UserHeader';
import AdminHeader from '../components/AdminHeader';
import Footer from '../components/Footer';

function UserSetupAutoPay() {
  const [values, setValues] = useState({
    loanId: '', 
    amount: '',
    date: '',
    paymentMethod: 'Credit Card', // Default to 'Credit Card'
  });

  const [parsedUser, setParsedUser] = useState(null); // User state
  const [formSubmitted, setFormSubmitted] = useState(false); // State to track form submission
  const [userId, setUserId] = useState(null); // User ID state

  const navigate = useNavigate(); // Initialize useNavigate hook for navigation

  // Fetch user data from sessionStorage
  useEffect(() => {
    const userSession = sessionStorage.getItem('userSession');
    if (userSession) {
      const parsed = JSON.parse(userSession);
      setParsedUser(parsed); // Set parsed user data in state
      setUserId(parsed.account_id); // Set the user ID if available
    } else {
      console.log("No user session found.");
    }
  }, []);

  // Handle input change
  const handleInput = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true); // Mark form as submitted

    // Optionally, you can log or show the submitted values
    console.log('Form Submitted:', values);
  };

  // Function to handle back navigation
  const handleBack = () => {
    navigate('/user'); // Navigate to the /user page
  };

  // Function to render header based on the user's role
  const renderHeader = () => {
    if (parsedUser) {
      if (parsedUser.role === 'ADMIN') {
        return <AdminHeader />;
      } if (parsedUser.role === 'USER') {
        return <UserHeader />;
      }
    }
    return <Header />;
  };

  return (
    <>
      {renderHeader()}
      <div className="centered-container">
        {/* Back Button */}
        <Button variant="secondary" onClick={handleBack} className="mb-2">
          Back
        </Button>

        {!formSubmitted ? (
          <Form className="user-form" onSubmit={handleSubmit}>
            {/* Row for Loan Number and Payment Amount */}
            <Row>
              <Col sm={6}>
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
              </Col>
              <Col sm={6}>
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
              </Col>
            </Row>

            {/* Row for Payment Date and Payment Method */}
            <Row>
              <Col sm={6}>
                <Form.Group className="mb-3" controlId="formGridPaymentDate">
                  <Form.Label>Payment Date</Form.Label>
                  <Form.Control 
                    type="date" 
                    name="date" 
                    value={values.date} 
                    onChange={handleInput} 
                  />
                </Form.Group>
              </Col>
              <Col sm={6}>
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
              </Col>
            </Row>

            {/* Submit Button */}
            <Button variant="primary" type="submit">
              Submit Payment
            </Button>
          </Form>
        ) : (
          <div className="alert alert-success" >
            <strong>Form Submitted Successfully!</strong>
            <pre>{JSON.stringify(values, null, 2)}</pre>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default UserSetupAutoPay;
