import React, { useState, useEffect } from 'react';
import Spreadsheet from '../components/Spreadsheet';
import './Admin.css'; // Import your CSS file here
import Header from '../components/Header';
import UserHeader from '../components/UserHeader';
import AdminHeader from '../components/AdminHeader';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';

import AdminMakeLoan from '../components/AdminMakeLoan';
import AdminMakeUser from '../components/AdminMakeUser';

const Admin = () => {
  const [parsedUser, setParsedUser] = useState(null);
  const [showModal, setShowModal] = useState(false); // State to handle modal visibility
  const [modalType, setModalType] = useState(''); // State to determine which modal to show

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
              <Button variant="primary" onClick={() => handleShowModal('makeLoan')} className="ms-2">
                Make Loan
              </Button>
              {/* Button to trigger Make User Modal */}
              <Button variant="success" onClick={() => handleShowModal('makeUser')} className="ms-2">
                Make User
              </Button>
            </Col>
          </Row>

          {/* Modal for Make Loan and Make User */}
          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>{modalType === 'makeLoan' ? 'Create Loan' : 'Create User'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {/* Conditionally render the correct component based on modalType */}
              {modalType === 'makeLoan' ? (
                <AdminMakeLoan />
              ) : (
                <AdminMakeUser />
              )}
            </Modal.Body>
            
          </Modal>
        </Container>
      </div>
    </>
  );
};

export default Admin;
