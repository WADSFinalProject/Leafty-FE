import React from 'react';
import { Link } from 'react-router-dom'; // Make sure to import Link if you're using it
import WidgetContainer from '../components/Cards/WidgetContainer';
import CircularButton from '../components/CircularButton';
import Countdown from '../components/Countdown';
import WetLeavesLogo from '../assets/WetLeaves.svg';

const WetLeavesStatus = ({ weight, series, time, countdownColor, imageUrl, widgetBorderColor }) => {
    return (
        <div className='mt-2 flex justify-between'>
            <WidgetContainer borderRadius="10px" className="w-full flex items-center" borderColor={widgetBorderColor}>
                <Link to="/wetleavesdetail">
                    <CircularButton imageUrl={imageUrl || WetLeavesLogo} backgroundColor="#94C3B3" />
                </Link>
                <div className='flex flex-col ml-3'>
                    <span className="font-montserrat text-base font-semibold leading-tight tracking-wide text-left">
                        {weight}
                    </span>
                    <span className='font-montserrat text-sm font-medium leading-17 tracking-wide text-left'>
                        {series}
                    </span>
                </div>
                <div className="flex ml-auto items-center">
                    <Countdown time={time || "01h05m"} color={countdownColor || "#79B2B7"} />
                </div>
            </WidgetContainer>
        </div>
    );
}

export default WetLeavesStatus;
