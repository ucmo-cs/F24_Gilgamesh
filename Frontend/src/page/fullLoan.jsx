import React from 'react';
import { useLocation } from 'react-router-dom';

function FullLoan() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const loanId = queryParams.get('id');

  return (
    <div>
      <h1>Full Loan Details for Loan ID: {loanId}</h1>
      {/* Render the loan details here */}
    </div>
  );
}

export default FullLoan;
