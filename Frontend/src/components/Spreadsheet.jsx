import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Spreadsheet.css'; // Import your CSS file here
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';

function Spreadsheet() {
  const [users, setUsers] = useState([]);  // All users (excluding admins)
  const [loans, setLoans] = useState([]);  // Loans data
  const [admin, setAdmin] = useState({
    username: [],
    totalLoan: [],
    numberOfLoans: [],
    userId: []
  });

  const [overlayVisible, setOverlayVisible] = useState(false);  // State to control overlay visibility
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });  // Track mouse position
  const [tooltipContent, setTooltipContent] = useState('');  // Store the tooltip content
  const [hoveredColumn, setHoveredColumn] = useState(null);  // State to track the hovered column
  const navigate = useNavigate();

  // Fetch all users
  useEffect(() => {
    axios.get('http://localhost:8080/admin/users')  // Change this to the correct endpoint for users
      .then((response) => {
        // Filter out users with ROLE "ADMIN"
        const filteredUsers = response.data.filter(user => user.role !== 'ADMIN');
        setUsers(filteredUsers);  // Store only non-admin users
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  // Fetch loan data
  useEffect(() => {
    axios.get('http://localhost:8080/admin/loans')
      .then((response) => {
        setLoans(response.data);  // Store loans data
      })
      .catch((error) => {
        console.error('Error fetching loan data:', error);
      });
  }, []);

  // Merge user data with loan data
  useEffect(() => {
    if (users.length > 0 && loans.length > 0) {
      const loanData = loans.reduce((acc, loan) => {
        if (!acc[loan.userId]) {
          acc[loan.userId] = { totalLoan: 0, numberOfLoans: 0 };
        }
        acc[loan.userId].totalLoan += loan.loanOriginAmount;
        acc[loan.userId].numberOfLoans += 1;
        return acc;
      }, {});

      const username = [];
      const totalLoan = [];
      const numberOfLoans = [];
      const userId = [];

      users.forEach((user) => {
        username.push(user.userName);
        userId.push(user.userId);

        // Check if the user has loans or not
        if (loanData[user.userId]) {
          totalLoan.push(loanData[user.userId].totalLoan);
          numberOfLoans.push(loanData[user.userId].numberOfLoans);
        } else {
          totalLoan.push(0);  // No loans
          numberOfLoans.push(0);  // No loans
        }
      });

      setAdmin({
        username,
        totalLoan,
        numberOfLoans,
        userId
      });
    }
  }, [users, loans]);

  // Handle click on User ID or Customer Name to navigate to UserInfo page
  const handleUserClick = (userId) => {
    navigate(`/userInfo/${userId}`);  // Navigate to UserInfo page with userId
  };

  // Handle click on Outstanding Loans or Total Due to navigate to FullLoan page
  const handleClickableCellClick = (userId) => {
    navigate(`/fullLoan/${userId}`);  // Navigate to FullLoan page with userId
  };

  // Handle mouse move to update mouse position
  const handleMouseMove = (event) => {
    setMousePos({ x: event.clientX, y: event.clientY });
  };

  // Trigger overlay visibility on hover for specific columns
  const handleColumnHover = (columnType, index) => {
    setHoveredColumn(index);
    if (columnType === 'loans') {
      setTooltipContent("Click to view loan details");
    } else if (columnType === 'total') {
      setTooltipContent("Click to view loan details");
    } else if (columnType === 'userId') {
      setTooltipContent("Click to view customer details");
    } else if (columnType === 'username') {
      setTooltipContent("Click to view customer details");
    }
    setOverlayVisible(true);
  };

  // Hide overlay when mouse leaves column
  const handleMouseLeave = () => {
    setOverlayVisible(false);
    setHoveredColumn(null);
  };

  return (
    <div onMouseMove={handleMouseMove}>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Customer Name</th>
            <th>Outstanding Loans</th>
            <th>Total Due</th>
          </tr>
        </thead>
        <tbody>
          {admin.username.length > 0 ? (
            admin.username.map((username, index) => (
              <tr key={index}>
                {/* User ID Column with Hover Tooltip */}
                <td
                  onClick={() => handleUserClick(admin.userId[index])}  // Navigate to UserInfo page
                  onMouseEnter={() => handleColumnHover('userId', index)}  // Show tooltip
                  onMouseLeave={handleMouseLeave}  // Hide tooltip
                  style={{ cursor: 'pointer'}}
                >
                  {admin.userId[index]}
                </td>

                {/* Customer Name Column with Hover Tooltip */}
                <td
                  onClick={() => handleUserClick(admin.userId[index])}  // Navigate to UserInfo page
                  onMouseEnter={() => handleColumnHover('username', index)}  // Show tooltip
                  onMouseLeave={handleMouseLeave}  // Hide tooltip
                  style={{ cursor: 'pointer'}}
                >
                  {username}
                </td>

                {/* Outstanding Loans Column */}
                <td
                  onMouseEnter={() => handleColumnHover('loans', index)}  // Trigger tooltip for "Outstanding Loans"
                  onMouseLeave={handleMouseLeave}  // Hide tooltip
                  onClick={() => handleClickableCellClick(admin.userId[index])}  // Keep this clickable
                  style={{ cursor: 'pointer' }}
                >
                  {admin.numberOfLoans[index] > 0 ? admin.numberOfLoans[index] : 'No loans'}
                </td>

                {/* Total Due Column */}
                <td
                  onMouseEnter={() => handleColumnHover('total', index)}  // Trigger tooltip for "Total Due"
                  onMouseLeave={handleMouseLeave}  // Hide tooltip
                  onClick={() => handleClickableCellClick(admin.userId[index])}  // Keep this clickable
                  style={{ cursor: 'pointer' }}
                >
                  ${admin.totalLoan[index] > 0 ? admin.totalLoan[index] : '0'}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No data available</td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Overlay for tooltip */}
      {overlayVisible && hoveredColumn !== null && (
        <div
          className="overlay-tooltip"
          style={{
            left: mousePos.x + 15,  // Position to the right of the mouse
            top: mousePos.y + 10,   // Slightly below the mouse
          }}
        >
          {tooltipContent}
        </div>
      )}
    </div>
  );
}

export default Spreadsheet;
