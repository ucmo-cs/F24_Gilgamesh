import React from 'react';
import Spreadsheet from '../components/Spreadsheet';
import './Admin.css'; // Import your CSS file here
import Header from '../components/Header';
import UserHeader from '../components/UserHeader';


const Admin = () => {
  return (
    <>
    {localStorage.getItem('userSession') || sessionStorage.getItem('userSession') ? <UserHeader /> : <Header />}
    <div className="admin-container">
      <div className="box">
        <Spreadsheet />
      </div>

    </div>
    </>
  );
}

export default Admin