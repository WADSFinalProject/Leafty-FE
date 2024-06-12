import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import WidgetContainer from '../components/Cards/WidgetContainer';

const Countdown = ({ receivedTime, color, image }) => {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const targetTime = new Date(receivedTime);
      const difference = targetTime - now;

      if (difference > 0) {
        const hours = Math.floor(difference / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        setTimeLeft(`${hours}h${minutes}m`);
      } else {
        setTimeLeft('0h0m');
      }
    };

    calculateTimeLeft();
    const timerId = setInterval(calculateTimeLeft, 60000);

    return () => clearInterval(timerId);
  }, [receivedTime]);

  return (
    <div className="flex justify-end">
      <WidgetContainer 
        borderRadius="20px" 
        border={false} 
        backgroundColor={color} 
        className="w-28 sm:w-32 md:w-36 max-w-sm"
      >
        <div className="flex justify-center items-center mr-1 gap-2">
          <span className="font-montserrat text-xs font-medium leading-14 tracking-normal text-center truncate flex items-center">
            {timeLeft}
          </span>
          <img src={image} alt="Countdown" className="w-4 h-4" /> 
        </div>
      </WidgetContainer>
    </div>
  );
};

Countdown.propTypes = {
  receivedTime: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default Countdown;
