import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ExpiredInLogo from '../assets/ExpiredIn.svg';
import WidgetContainer from '../components/Cards/WidgetContainer';

const ExpiredIn = ({ expirationDate }) => {
  const [timeLeft, setTimeLeft] = useState({ hours: '0h', minutes: '0m' });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const targetTime = new Date(expirationDate);
      const difference = targetTime - now;

      if (difference > 0) {
        const hours = Math.floor(difference / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        setTimeLeft({ hours: `${hours}h`, minutes: `${minutes}m` });
      } else {
        setTimeLeft({ hours: '0h', minutes: '0m' });
      }
    };

    calculateTimeLeft();
    const timerId = setInterval(calculateTimeLeft, 60000);

    return () => clearInterval(timerId);
  }, [expirationDate]);

  return (
    <div className='flex-grow '>
      <span className="font-montserrat font-medium text-xs leading-4 ml-2">Expires in</span>
      <WidgetContainer borderRadius="20px" backgroundColor="#FDFDFD" className="flex justify-start">
        <img src={ExpiredInLogo} alt="ExpiredIn" className='w-5 h-auto mr-1' />
        <span className="font-montserrat font-semibold text-base leading-4 mt-0.5">
           {timeLeft.hours}{timeLeft.minutes}
        </span>
      </WidgetContainer>
    </div>
  );
};

ExpiredIn.propTypes = {
  expirationDate: PropTypes.string.isRequired,
};

export default ExpiredIn;
