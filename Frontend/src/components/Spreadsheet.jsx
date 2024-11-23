import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Spreadsheet.css'; // Import your CSS file here
import Table from 'react-bootstrap/Table';

import AdminMakeUser from '../components/AdminMakeUser';
import AdminMakeLoan from '../components/AdminMakeLoan';

function Spreadsheet() {
  
  const [user, setUser] = useState([]); // For storing loan data
  const [data, setData] = useState([]); // For storing userIds
  const [info, setInfo] = useState([]); // For storing user info based on userId
  const [admin, setAdmin] = useState({
    username: [],
    totalLoan: [],
    numberOfLoans: [],
    userId: []
  }); // Initialize admin state properly

  // Fetch loan data and user IDs on component mount
  useEffect(() => {
    axios
      .get('http://localhost:8080/admin/loans') // Include auth header
      .then((response) => {
        const loanData = response.data; // Assuming response.data is an array of loan objects

        // Extract userId from each loan and store in an array
        const userIdsArray = loanData.map((loan) => loan.userId);
        setData([...new Set(userIdsArray)]); // Store the userIds array in state
        setUser(loanData); // Store the full loan data if needed
      })
      .catch((error) => {
        console.error('Error fetching loan data:', error); // Log any errors
      });
  }, []);

  // Fetch additional user info based on unique userId
  useEffect(() => {
    if (data.length > 0) {
      const fetchUserInfo = async () => {
        try {
          // Loop through each userId and fetch corresponding user data
          const userInfoPromises = data.map(userId =>
            axios.get(`http://localhost:8080/user/${userId}`).then((response) => response.data)
          );

          // Wait for all user info to be fetched
          const allUserInfo = await Promise.all(userInfoPromises);
          setInfo(allUserInfo); // Store all user info

          // Now, extract the required data from allUserInfo
          const username = allUserInfo.map(user => user.userName); // Assuming `userName` is the field for username
          const totalLoan = allUserInfo.map(user => 
            user.loans.reduce((sum, loan) => sum + loan.loanOriginAmount, 0) // Calculate sum of all loans for each user
          );
          const numberOfLoans = allUserInfo.map(user => user.loans.length); // Count number of loans for each user
          const userId = allUserInfo.map(user => user.userId); // Extract userId for each user

          setAdmin({
            username,
            totalLoan,
            numberOfLoans,
            userId // Add userId to admin state
          }); // Storing extracted data in admin state

          // Save user info to localStorage
          localStorage.setItem('userInfo', JSON.stringify(allUserInfo));
        } catch (error) {
          console.error('Error fetching user info:', error);
        }
      };

      fetchUserInfo(); 
    }
  }, [data]);
  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>User ID</th> {/* New column for User ID */}
            <th>Customer Name</th>
            <th>Outstanding Loans</th>
            <th>Total Due</th>
          </tr>
        </thead>
        <tbody>
          {admin.username.length > 0 ? (
            // Loop through the admin data to fill the table rows
            admin.username.map((username, index) => (
              <tr key={index}>
                <td>{admin.userId[index]}</td> {/* Displaying userId */}
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
