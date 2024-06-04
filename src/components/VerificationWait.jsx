import React from 'react'; 
import WidgetContainer from './Cards/WidgetContainer';

const VerificationWait = () => {
    return (
        <div className='p-2'>
            <WidgetContainer borderRadius='20px'>
                <span className='font-montserrat text-lg font-semibold tracking-wide ml-3'>
                    Waiting for Verification
                </span>                       
                <span className='font-montserrat text-sm font-medium leading-4 tracking-wide ml-3 mt-1'>
                    Your Receipt is Ready!
                </span>                       
                <div className="w-full max-w-20 ml-3 mt-4">
                    <WidgetContainer backgroundColor="#79B2B7" borderRadius="13.5px" border={false}>
                        <p className="flex justify-items-center font-montserrat text-xs font-semibold leading-4 tracking-wide text-gray-100 ml-1.5">
                            Contact
                        </p>
                    </WidgetContainer>
                </div>
            </WidgetContainer>
        </div>
    );
};

export default VerificationWait;
