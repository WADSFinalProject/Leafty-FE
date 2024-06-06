import React from 'react';

const CircularButton = ({ imageUrl, backgroundColor, onClick }) => {
  return (
    <button
      style={{ backgroundColor }}
      onClick={onClick}
      className="rounded-full p-2"
    >
      <img src={imageUrl} alt="button icon" className="w-8 h-8" />
    </button>
  );
};

export default CircularButton;
