import React, { useState, useEffect } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './UserLoanPaymentPage.css';
import Header from '../components/Header';
import UserHeader from '../components/UserHeader';
import AdminHeader from '../components/AdminHeader';
import Footer from '../components/Footer';
import axios from 'axios';

function UserLoanPaymentPage() {
  const [values, setValues] = useState({
    loanId: '',
    amount: '',
    date: '',
    paymentMethod: 'Credit Card', // Default to 'Credit Card'
  });

  const [parsedUser, setParsedUser] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [userId, setUserId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const userSession = sessionStorage.getItem('userSession');
    if (userSession) {
      const parsed = JSON.parse(userSession);
      setParsedUser(parsed);
      setUserId(parsed.account_id);
    } else {
      console.log('No user session found.');
    }
  }, []);

  const handleInput = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post('http://localhost:8080/payment', values)
      .then((response) => {
        setFormSubmitted(true);
        console.log('Form Submitted:', values);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleBack = () => {
    navigate('/user');
  };

  const renderHeader = () => {
    if (parsedUser) {
      if (parsedUser.role === 'ADMIN') {
        return <AdminHeader />;
      }
      if (parsedUser.role === 'USER') {
        return <UserHeader />;
      }
    }
    return <Header />;
  };

  return (
    <>
      {renderHeader()}
      <div className="centered-container">
        <Button variant="secondary" onClick={handleBack} className="mb-2">
          Back
        </Button>

        {!formSubmitted ? (
          <Form className="user-form" onSubmit={handleSubmit}>
            <Row>
              <Col sm={6}>
                <Form.Group className="mb-3" controlId="formGridLoanNumber">
                  <Form.Label style={{ color: 'white' }}>Loan Number</Form.Label>
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
                  <Form.Label style={{ color: 'white' }}>Payment Amount</Form.Label>
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

            <Row>
              <Col sm={6}>
                <Form.Group className="mb-3" controlId="formGridPaymentDate">
                  <Form.Label style={{ color: 'white' }}>Payment Date</Form.Label>
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
                  <Form.Label style={{ color: 'white' }}>Payment Method</Form.Label>
                  <Form.Control
                    as="select"
                    name="paymentMethod"
                    value={values.paymentMethod}
                    onChange={handleInput}
                  >
                    <option>Credit Card</option>
                    <option>Bank Transfer</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>

            {values.paymentMethod === 'Credit Card' && (
              <div className="payment-method-fields">
                <Row>
                  <Col sm={6}>
                    <Form.Group className="mb-3" controlId="formGridCardholderName">
                      <Form.Label style={{ color: 'white' }}>Cardholder's Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter cardholder name"
                        name="cardholderName"
                        onChange={handleInput}
                      />
                    </Form.Group>
                  </Col>

                  <Col sm={6}>
                    <Form.Group className="mb-3" controlId="formGridCardNumber">
                      <Form.Label style={{ color: 'white' }}>Card Number</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter card number"
                        name="cardNumber"
                        onChange={handleInput}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col sm={6}>
                    <Form.Group className="mb-3" controlId="formGridCardExpiry">
                      <Form.Label style={{ color: 'white' }}>Expiration Date</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="MM/YY"
                        name="expiryDate"
                        onChange={handleInput}
                      />
                    </Form.Group>
                  </Col>

                  <Col sm={6}>
                    <Form.Group className="mb-3" controlId="formGridCardCVV">
                      <Form.Label style={{ color: 'white' }}>CVV</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter CVV"
                        name="cvv"
                        onChange={handleInput}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </div>
            )}

            {values.paymentMethod === 'Bank Transfer' && (
              <Row>
                <Col sm={6}>
                  <Form.Group className="mb-3" controlId="formGridBankName">
                    <Form.Label style={{ color: 'white' }}>Bank Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your bank name"
                      name="bankName"
                      onChange={handleInput}
                    />
                  </Form.Group>
                </Col>
                <Col sm={6}>
                  <Form.Group className="mb-3" controlId="formGridAccountNumber">
                    <Form.Label style={{ color: 'white' }}>Account Number</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your account number"
                      name="accountNumber"
                      onChange={handleInput}
                    />
                  </Form.Group>
                </Col>
              </Row>
            )}

            <Button variant="primary" type="submit">
              Submit Payment
            </Button>
          </Form>
        ) : (
          <div className="alert alert-success">
            <strong>Form Submitted Successfully!</strong>
            <pre>{JSON.stringify(values, null, 2)}</pre>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default UserLoanPaymentPage;

