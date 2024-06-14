import React from 'react';
import WidgetContainer from '../components/Cards/WidgetContainer';
import Status from '../assets/Status.svg';
import WeightLogo from '../assets/Weight.svg';
import DateIcon from '../assets/Date.svg';

const LeavesDetail = ({ date, time, weight }) => {
    // Function to format date to dd MM YYYY HH:mm format
    const formatDate = (inputDate) => {
        const dateObj = new Date(inputDate);
        const day = String(dateObj.getDate()).padStart(2, '0');
        const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Month is 0-based
        const year = dateObj.getFullYear();
        const hours = String(dateObj.getHours()).padStart(2, '0');
        const minutes = String(dateObj.getMinutes()).padStart(2, '0');
        return `${day}/${month}/${year} ${hours}:${minutes}`;
    };

    const formattedDateTime = formatDate(date);

    return (
        <div>
            <span className="font-montserrat font-medium text-xs leading-4 ml-2">Expired DateTime</span>
            <WidgetContainer borderRadius="20px" backgroundColor="#FDFDFD" className="flex justify-start">
                <img src={DateIcon} alt="Date" className='w-6 h-auto mr-1' />
                <div className='mt-0.5'>
                    <span className="font-montserrat font-semibold text-base">{formattedDateTime}</span>
                </div>
            </WidgetContainer>

            <div className='flex justify-between mt-4 gap-1 '>
                <WidgetContainer borderRadius="20px" backgroundColor="#D4965D80" border={false} className="flex pe-16">
                    <img src={Status} alt="Status" className='w-6 h-auto mr-1' />
                    <span className="font-montserrat font-medium text-xs leading-4 text-orange-500 mt-1">Processed</span>
                </WidgetContainer>

                <WidgetContainer borderRadius="20px" border={false} backgroundColor="#FDFDFD" className="flex pe-16">
                    <img src={WeightLogo} alt="Weight" className='w-6 h-auto mr-1' />
                    <span className="font-montserrat font-semibold text-base leading-4 mt-2 ">{weight}</span>
                </WidgetContainer>
            </div>
        </div>
    );
}

export default LeavesDetail;
