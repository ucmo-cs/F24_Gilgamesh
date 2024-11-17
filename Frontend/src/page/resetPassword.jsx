import React, { useState } from 'react';
import './ResetPassword.css'; // Import the CSS for reset password styling
import Header from '../components/Header';
import UserHeader from '../components/UserHeader';

const ResetPassword = () => {
  const [username, setUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReset = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match!');
      return;
    }

    if (newPassword.length < 6) {
      setMessage('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);
    setMessage('');

    // Simulate reset process
    setTimeout(() => {
      setMessage('Password reset successful!');
      setLoading(false);
      setUsername('');
      setNewPassword('');
      setConfirmPassword('');
    }, 2000);
  };
  const navBar = localStorage.getItem('userSession') || sessionStorage.getItem('userSession') ? <UserHeader /> : <Header />;
  return (

    <>
    {navBar} 
    <div>
      <div className="theme-background"></div> {/* Background */}
      <div className="reset-password-container">
        <h2>Reset Your Password</h2>
        <form className="reset-password-form" onSubmit={handleReset}>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label>New Password:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />

          <label>Confirm New Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
    </>
    
  );
};

export default ResetPassword;