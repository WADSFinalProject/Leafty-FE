// LoadingCircle.js
import React from 'react';
import './LoadingCircle.css'; // You might need to define styles for the loading circle

function LoadingCircle() {
  return (
    <div className="loading-circle-container">
      <div className="loading-circle">
        {/* You can customize the loading spinner here */}
        <span class="loading loading-spinner loading-3xl" style={{color: "#0F7275"}}></span>
      </div>
    </div>
  );
}

export default LoadingCircle;
