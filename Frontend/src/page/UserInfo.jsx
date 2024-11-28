import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function UserInfo() {
  const { userId } = useParams();  // Get userId from the URL
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    // Fetch user data based on userId
    axios.get(`http://localhost:8080/user/${userId}`)
      .then((response) => {
        setUserInfo(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user info:', error);
      });
  }, [userId]);

  return (
    <div>
      {userInfo ? (
        <div>
          <h2>User Info for {userInfo.userName}</h2>
          <p>User ID: {userInfo.userId}</p>
          {/* Display other user info here */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default UserInfo;
