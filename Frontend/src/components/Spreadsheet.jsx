import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Spreadsheet.css'; // Import your CSS file here
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';  // Import useNavigate hook

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

  const navigate = useNavigate();  // Initialize navigate hook

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

  // Handle row click
  const handleRowClick = (userId) => {
    navigate(`/fullLoan/${userId}`);  // Navigate to FullLoan page with userId
  };

  return (
    <div>
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
              <tr
                key={index}
                onClick={() => handleRowClick(admin.userId[index])}  // Handle click event
                style={{ cursor: 'pointer' }}  // Change cursor to pointer on hover
              >
                <td>{admin.userId[index]}</td>
                <td>{username}</td>
                <td>{admin.numberOfLoans[index]}</td>
                <td>${admin.totalLoan[index]}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No data available</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}

export default Spreadsheet;
