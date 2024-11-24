import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';  // useParams hook to get dynamic route params
import axios from 'axios';
import Header from '../components/Header';
import UserHeader from '../components/UserHeader';
import AdminHeader from '../components/AdminHeader';
import { Container } from 'react-bootstrap';
import './fullLoan.css';


function FullLoan() {
  const { userId } = useParams();  // Get the userId from the URL
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8080/user/${userId}`)
      .then((response) => {
        setUserData(response.data);  // Set the user data based on userId
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, [userId]);  // Re-run this effect if the userId changes

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
    
    <div className='loan-container'>
        
      <h1>Full Loan Details for User ID: {userId}</h1>
      {userData ? (
        <div>
          <h2>{userData.userName}</h2>
          <p>Total Loans: {userData.loans.length}</p>
          <p>Total Due: ${userData.loans.reduce((sum, loan) => sum + loan.loanOriginAmount, 0)}</p>
          {/* Add more details about the loans or user info here */}
        
        </div>
      ) : (
        <p>Loading user data...</p>  // Show loading message while data is fetched
      )}
    </div>
  );
}

export default FullLoan;
