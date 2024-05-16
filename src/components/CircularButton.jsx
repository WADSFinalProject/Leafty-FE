import React from 'react';

const CircularButton = ({ imageUrl, backgroundColor }) => {
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
      className="rounded-full flex items-center justify-center focus:outline-none"
      style={buttonStyle}
    >
      <img src={imageUrl} alt="Button Image" style={imageStyle} />
    </button>
  );
};

export default CircularButton;
