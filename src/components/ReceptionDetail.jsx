import React from 'react'; 
import WidgetContainer from './Cards/WidgetContainer';
import ShipmentReceipt from '../assets/ShipmentReceipt.svg';
import Download from '../assets/Download.svg';
import Upload from '../assets/Upload.svg';
import Open from '../assets/Open.svg';

const ReceptionDetail = () => {
    return (
        <div className='p-2'>
            <WidgetContainer borderRadius='20px'>
                <span className='font-montserrat text-16px font-semibold tracking-02em ml-3'>
                    Reception
                </span>
                <div className='flex flex-wrap items-center mt-4'>
                    <WidgetContainer borderRadius='rounded-lg' border={false} backgroundColor="#DEE295" className='flex items-center ml-3 mb-4'>
                        <img src={ShipmentReceipt} alt="Profile" className='w-24 h-auto' />
                    </WidgetContainer>
                    <div className='flex flex-col ml-3'>
                        <span className='font-montserrat text-16px font-semibold tracking-02em'>Your Receipt is Ready!</span>
                        <span>Receipt - Expedition</span>
                        <span>#012345.pdf</span>
                        <div className='flex gap-2 mt-2'>
                            <img src={Download} alt="Download" className='w-auto h-auto' />
                            <img src={Upload} alt="Upload" className='w-auto h-auto' />
                            <img src={Open} alt="Open" className='w-auto h-auto' />
                        </div>
                    </div>
                </div>
            </WidgetContainer>
        </div>
    );
};

export default ReceptionDetail;
