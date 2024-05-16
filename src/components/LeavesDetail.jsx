import React from 'react';
import WidgetContainer from '../components/Cards/WidgetContainer';
import Date from '../assets/Date.svg';
import Status from '../assets/Status.svg';
import WeightLogo from '../assets/Weight.svg';


const LeavesDetail = ({ date, time, weight }) => {
    return (
        <div>
            <span className="font-montserrat font-medium text-xs leading-4 ml-2">Processed Date</span>
            <WidgetContainer borderRadius="20px" backgroundColor="#FDFDFD" className="flex justify-start">
                <img src={Date} alt="Date" className='w-6 h-auto mr-1' />
                <div className='mt-0.5'>
                    <span className="font-montserrat font-semibold text-base leading-4">{date}</span>
                    <span className="font-montserrat font-semibold text-base leading-4 ml-4">{time}</span>
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