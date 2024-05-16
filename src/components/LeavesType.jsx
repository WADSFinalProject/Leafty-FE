import React from 'react';
import WidgetContainer from '../components/Cards/WidgetContainer';

const LeavesType = ({ imageSrc, text }) => {
    return (
        <div className='flex flex-col items-center justify-center mt-4'>
            <div className='flex justify-center'>
                <WidgetContainer backgroundColor="#A0C2B5" borderRadius="20px" className="flex-shrink flex items-center justify-center p-9 sm:p-8 gap-4 sm:gap-6 border border-transparent border-opacity-0 rounded-l-20 w-300">
                    <img
                        src={imageSrc}
                        alt="Wet Leaves"
                        className="max-w-full h-auto" 
                    />
                </WidgetContainer>
            </div>
            <span className="block text-center mt-2 font-montserrat font-semibold text-lg leading-6 tracking-tighter">{text}</span>
        </div>
    );
}

export default LeavesType;
