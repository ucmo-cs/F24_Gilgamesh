import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import Collapse from 'react-bootstrap/Collapse';
import './Spreadsheet.css'; // Import your CSS file here

function Spreadsheet() {
  // State for controlling the collapse button
  const [open, setOpen] = useState(false);

  // Handle row click to open Google
  const handleRowClick = () => {
    window.location.href = "./fullLoan"; // Redirects to Google
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Customer Name</th>
          <th>Date Taken Out</th>
          <th>Amount Due</th>
          <th>Original Amount</th>
          <th>Interest Rate</th>
        </tr>
      </thead>
      <tbody>
        {/* Row with onClick handler */}
        <tr onClick={handleRowClick} className="clickable-row" style={{ cursor: 'pointer' }}>
          <td>1</td>
          <td>Joe</td>
          <td>11/6/2024</td>
          <td>$596,000</td>
          <td>$1,000,000</td>
          <td>3%</td>
        </tr>
        <tr>
          <td colSpan={6}>
            <div className="d-grid gap-2">
              <Button 
                className="mb-2" 
                onClick={() => setOpen(!open)} 
                aria-controls="example-collapse-text"
                aria-expanded={open} 
                variant="primary" 
                size="lg" 
                active>
                Admin Form
              </Button>
              {' '}
              <Collapse in={open}>
                <div id="example-collapse-text">
                  Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
                  terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer
                  labore wes anderson cred nesciunt sapiente ea proident.
                </div>
              </Collapse>
            </div>
          </td>
        </tr>
      </tbody>
    </Table>
  );
}

export default Spreadsheet;
