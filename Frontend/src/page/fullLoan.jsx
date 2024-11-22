import { useLocation } from 'react-router-dom';

function fullLoan() {
  const location = useLocation();
  const { userId } = location.state || {};  // Get userId from passed state (if available)

  // Now you can use userId in your component, e.g., to fetch data for that user
  console.log(userId);

  return (
    <div>
      <h1>Full Loan Page</h1>
      {/* Your component content here */}
    </div>
  );
}

export default fullLoan;
