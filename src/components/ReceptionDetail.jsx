import React from 'react';
import WidgetContainer from './Cards/WidgetContainer';
import ShipmentReceipt from '../assets/ShipmentReceipt.svg';
import Upload from '../assets/icons/upload.svg';
import Download from "@assets/icons/download.svg";
import Open from "@assets/icons/open_file.svg";
import ReceptionFile from './ReceptionFile';

const ReceptionDetail = ({harbor = false, centra = false}) => {
    return (
            <WidgetContainer borderRadius='20px'>
                <span className='font-montserrat text-16px font-semibold'>
                    Reception
                </span>
                <div className='flex flex-wrap items-center gap-4 justify-between'>
                    {harbor ? <ReceptionFile harbor = {harbor}/> : <></>}
                    {centra ? <ReceptionFile centra = {centra}/> : <></>}
                </div>
            </WidgetContainer>
       
    );
};

export default ReceptionDetail;
