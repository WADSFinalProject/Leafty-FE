import React from 'react';
import WidgetContainer from './Cards/WidgetContainer';
import ShipmentReceipt from '../assets/ShipmentReceipt.svg';
import Upload from '../assets/icons/upload.svg';
import Download from "@assets/icons/download.svg";
import Open from "@assets/icons/open_file.svg";
import ReceptionFile from './ReceptionFile';
import QRPage from '../pages/QRPage';
const ReceptionDetail = ({harbor = false, centra = false}) => {
    return (
            <WidgetContainer borderRadius='20px' container = {false}>
                <div className='p-2'>
                        <WidgetContainer container={false} borderRadius='20px'>
                            <QRPage />
                        </WidgetContainer>
                    </div>
            </WidgetContainer>
       
    );
};

export default ReceptionDetail;
