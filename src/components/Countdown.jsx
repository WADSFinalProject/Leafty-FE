import React from 'react';
import PropTypes from 'prop-types';
import WidgetContainer from '../components/Cards/WidgetContainer';

const Countdown = ({ time, color, image }) => {
  return (
    <div className="flex justify-end">
      <WidgetContainer 
        borderRadius="20px" 
        border={false} 
        backgroundColor={color} 
        className="w-28 sm:w-32 md:w-36  max-w-sm "  
      >
        <div className="flex justify-center items-center mr-1">
          <span className=" font-montserrat text-xs font-medium leading-14 tracking-normal text-center truncate flex items-center mr-2">
            {time}
          </span>
          <img src={image} alt="Countdown" className="w-4 h-auto " /> 
        </div>
      </WidgetContainer>
    </div>
  );
};

Countdown.propTypes = {
  time: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default Countdown;
