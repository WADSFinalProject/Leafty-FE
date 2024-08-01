import React from 'react';

const CustomCircleButton = ({ imageUrl, backgroundColor, onClick }) => {
  return (
    <button
      style={{
        backgroundColor,
        width: '2.5rem',  // Adjust size as needed
        height: '2.5rem', // Adjust size as needed
      }}
      onClick={onClick}
      className="flex items-center justify-center rounded-full p-1 md:p-3"
    >
      <img src={imageUrl} alt="button icon" className="w-5 h-5 md:w-7 md:h-7" />
    </button>
  );
};

export default CustomCircleButton;
