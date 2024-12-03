// Theme.jsx
import React from 'react';
import './Theme.css'; // Ensure this path is correct

const Theme = () => {
  return (
    <div className="area">
      <div className="circles">
        <ul>
          {Array.from({ length: 20 }).map((_, index) => (
            <li key={index}></li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Theme;
