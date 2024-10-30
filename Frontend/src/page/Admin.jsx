import React from 'react';
import Spreadsheet from '../components/Spreadsheet';

import './Admin.css'; // Import your CSS file here

const Admin = () => {
  return (
    <div className="admin-container">
      <div className="box">
        <Spreadsheet />
      </div>
      
    </div>
  );
}

export default Admin;
