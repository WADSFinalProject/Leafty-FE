import React from 'react';
import { Link } from 'react-router-dom';
import ReturnLogo from'../assets/Return.svg';
const Return = ({ destination }) => {
    return (
        <Link to={destination}>
            <img src={ReturnLogo} alt="Return" className='w-6 h-6   ' />
        </Link>
    );
};

export default Return;
