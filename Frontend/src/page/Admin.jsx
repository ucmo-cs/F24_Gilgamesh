import React from 'react';
import Spreadsheet from '../components/Spreadsheet';
import { Modal,Button } from 'react-bootstrap';
import UserLoanForm from '../components/AdminForm';
import './Admin.css'; // Import your CSS file here
import AdminForm from '../components/AdminForm';


// Handle opening and closing of Loan Payment modal
const handleClose1 = () => setShow1(false);
const handleShow1 = () => setShow1(true);

const Admin = () => {
  return (
    <div className="admin-container">
      <div className="box">
        <Spreadsheet />
        <div>
        <Button variant="secondary" onClick={handleShow1} className="ms-2">
              Pay Loan
          </Button>
          {/* Modal for Loan Payment Form */}
          <Modal show={show1} onHide={handleClose1} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
           <Modal.Header closeButton>
          <Modal.Title>Loan Payment Form</Modal.Title>
         </Modal.Header>
        <Modal.Body className="d-flex flex-column" style={{ height: '60vh' }}>
          <UserLoanForm loanValue={AdminForm}  />
        </Modal.Body>
      </Modal>
          
         </div>  
      </div>
      
    </div>
  );
}




      
    

export default Admin
