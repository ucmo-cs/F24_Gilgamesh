import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Spreadsheet.css'; // Import your CSS file here
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';

function Spreadsheet() {
  const [user, setUser] = useState([]);
  const [data, setData] = useState([]);
  const [info, setInfo] = useState([]);
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

  // Fetch loan data and user IDs on component mount
  useEffect(() => {
    axios.get('http://localhost:8080/admin/loans')
      .then((response) => {
        const loanData = response.data;
        const userIdsArray = loanData.map((loan) => loan.userId);
        setData([...new Set(userIdsArray)]);
        setUser(loanData);
      })
      .catch((error) => {
        console.error('Error fetching loan data:', error);
      });
  }, []);

  // Fetch additional user info based on unique userId
  useEffect(() => {
    if (data.length > 0) {
      const fetchUserInfo = async () => {
        try {
          const userInfoPromises = data.map(userId =>
            axios.get(`http://localhost:8080/user/${userId}`).then((response) => response.data)
          );

          const allUserInfo = await Promise.all(userInfoPromises);
          setInfo(allUserInfo);

          const username = allUserInfo.map(user => user.userName);
          const totalLoan = allUserInfo.map(user =>
            user.loans.reduce((sum, loan) => sum + loan.loanOriginAmount, 0)
          );
          const numberOfLoans = allUserInfo.map(user => user.loans.length);
          const userId = allUserInfo.map(user => user.userId);

          setAdmin({
            username,
            totalLoan,
            numberOfLoans,
            userId
          });

          localStorage.setItem('userInfo', JSON.stringify(allUserInfo));
        } catch (error) {
          console.error('Error fetching user info:', error);
        }
      };

      fetchUserInfo();
    }
  }, [data]);

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
      setTooltipContent("Click to view outstanding loan details");
    } else if (columnType === 'total') {
      setTooltipContent("Click to view total due details");
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
                  {admin.numberOfLoans[index]}
                </td>

                {/* Total Due Column */}
                <td
                  onMouseEnter={() => handleColumnHover('total', index)}  // Trigger tooltip for "Total Due"
                  onMouseLeave={handleMouseLeave}  // Hide tooltip
                  onClick={() => handleClickableCellClick(admin.userId[index])}  // Keep this clickable
                  style={{ cursor: 'pointer' }}
                >
                  ${admin.totalLoan[index]}
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
