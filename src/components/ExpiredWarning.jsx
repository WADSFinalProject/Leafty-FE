import React from 'react';
import Rectangle from './Rectangle'; // Import the Rectangle component
import ExpiredWarningIcon from'../assets/ExpiredWarning.svg';

const ExpiredWarning = () => {
  return (
    <div className="ml-24">
      <Rectangle width="88px" height="30px" borderRadius="20px" background="#D45D5D" border={false}>
        <span className="font-montserrat text-xs font-medium leading-14 tracking-normal text-center">
          Expired
        </span>
        <img src={ExpiredWarningIcon} alt="ExpiredWarning" className='w-12 h-auto ml-1' /> 
      </Rectangle>
    </div>
  );
};

export default ExpiredWarning;
