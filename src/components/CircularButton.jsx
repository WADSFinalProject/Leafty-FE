import React from 'react';

const CircularButton = ({ imageUrl, backgroundColor, fixed = false, className }) => {
  const buttonSize = 'calc(10px + 2em)'; 

  const buttonStyle = {
    backgroundColor: backgroundColor,
    padding: '8px', 
    width: buttonSize,
    height: buttonSize,
  };

  const imageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'contain', 
    borderRadius: '50%',
  };

  return (
    <button
      className={`rounded-full ${fixed ? "fixed":"flex"} items-center justify-center focus:outline-none ${className}`}
      style={buttonStyle}
    >
      <img src={imageUrl} alt="Button Image" style={imageStyle} />
    </button>
  );
};

export default CircularButton;
