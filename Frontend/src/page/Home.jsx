import React from 'react';
import './Home.css'; 
import Header from '../components/Header';
  import UserHeader from '../components/UserHeader';

const Home = () => {
  const navBar = localStorage.getItem('userSession') || sessionStorage.getItem('userSession') ? <UserHeader /> : <Header />;
  return (
    <>
    {navBar}
    <div className="home-container"> {/* Add the class for styling */}
      <h1>Welcome to F24_Gilgamesh Project</h1>
      
      
    </div>
    
    </>

    
  );
};

export default Home;

