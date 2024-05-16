import React from 'react';
import PropTypes from 'prop-types';

import WidgetContainer from '../components/Cards/WidgetContainer';

const Countdown = ({ time, color, image }) => {
  return (
    <div className="flex justify-end">
      <WidgetContainer borderRadius="20px" border={false} backgroundColor={color}>
        <div className='flex justify-end'>
          <span className="font-montserrat text-xs font-medium leading-14 tracking-normal text-center">
            {time}
          </span>
          <img src={image} alt="Countdown" className='w-4 h-auto ml-1' /> 
        </div>
      </WidgetContainer>
    </div>
  );
};

Countdown.propTypes = {
  time: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired, // Image source as a string
};

export default Countdown;
