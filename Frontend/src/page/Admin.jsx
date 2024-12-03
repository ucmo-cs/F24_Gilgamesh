import React, { useState, useEffect } from 'react';
import Spreadsheet from '../components/Spreadsheet';
import './Admin.css'; // Import your CSS file here
import Header from '../components/Header';
import UserHeader from '../components/UserHeader';
import AdminHeader from '../components/AdminHeader';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';

import AdminMakeLoan from '../components/AdminMakeLoan';
import AdminMakeUser from '../components/AdminMakeUser';
import Footer from '../components/Footer';

const Admin = () => {
  const [parsedUser, setParsedUser] = useState(null);
  const [showModal, setShowModal] = useState(false); // State to handle modal visibility
  const [modalType, setModalType] = useState(''); // State to determine which modal to show
  const [showForm, setShowForm] = useState(false); // State to toggle the form visibility
  const [showFormUser, setShowFormUser] = useState(false); // State to toggle the form visibility

  useEffect(() => {
    // Get user data from sessionStorage or localStorage
    const userSession = sessionStorage.getItem('userSession');
    if (userSession) {
      setParsedUser(JSON.parse(userSession)); // Set parsedUser state
    }
  }, []);

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

  // Function to handle showing the modal with different content
  const handleShowModal = (type) => {
    setModalType(type);
    setShowModal(true);
  };

  // Function to handle closing the modal
  const handleCloseModal = () => {
    setShowModal(false);
    setModalType('');
  };

  return (
    <>
      {renderHeader()}
      <div className="admin-container">
        {/* Display welcome message only if parsedUser is available */}
        {parsedUser && parsedUser.role === 'ADMIN' && (
          <h1 className="admin-title">Welcome, {parsedUser.User}</h1>
        )}
        <Container>
          <Spreadsheet />
          <Row className="mt-auto justify-content-center">
            <Col className="text-center">
              {/* Button to trigger Make Loan Modal */}
              <Button  variant="primary" onClick={() => setShowForm(!showForm)} className="ms-2">
                Make Loan
              </Button>
              {/* Button to trigger Make User Modal */}
              <Button variant="success" onClick={() => setShowFormUser(!showFormUser)} className="ms-2">
                Make User
              </Button>
            </Col>
          </Row>

          
          {/* The pop-up (admin form) */}
          {showForm && (
            <div className="admin-form-popup">
              <div className="adminLoan-form-container">
                <AdminMakeLoan />
                <Button
                  variant="secondary"
                  onClick={() => setShowForm(false)} // Close the form
                  className="close-btn"
                >
                  Close
                </Button>
              </div>
            </div>
          )}

          {showFormUser && (
            <div className="adminUser-form-popup">
              <div className="adminUser-form-container">
                <AdminMakeUser />
                <Button
                  variant="secondary"
                  onClick={() => setShowFormUser(false)} // Close the form
                  className="close-btn"
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default Admin;
