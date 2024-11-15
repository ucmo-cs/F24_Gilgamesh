import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import './AdminForm.css';

function AdminForm() {

  
  return (
    <Form className="admin-form d-flex flex-column" style={{ height: '100%' }}>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridName" >
          <Form.Label>Customer Name</Form.Label>
          <Form.Control type="text" placeholder="Enter Name" />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter Email" />
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" controlId="formGridPhone">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control placeholder="(xxx)-xxx-xxxx" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formGridDate">
        <Form.Label>Date</Form.Label>
        <Form.Control type="date"placeholder="month/day/year" />
      </Form.Group>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridLoan">
          <Form.Label>Loan Amount</Form.Label>
          <Form.Control type='number'placeholder='$12345'/>
        </Form.Group>

        

        <Form.Group as={Col} controlId="formGridRate">
          <Form.Label>Interest Rate</Form.Label>
          <Form.Control placeholder='%x.x'/>
        </Form.Group>
      </Row>

      

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default AdminForm;
