import React from 'react';
import { Link } from 'react-router-dom';
import ReturnLogo from'../assets/ReturnWhite.svg';
const ReturnWhite = ({ destination }) => {
    return (
        <Link to={destination}>
            <img src={ReturnLogo} alt="Return" className='w-auto h-auto   ' />
        </Link>
    );
};

export default ReturnWhite;
