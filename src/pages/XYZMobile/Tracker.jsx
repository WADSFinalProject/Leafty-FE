import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Profilepic from '../../assets/Profilepic.svg';
import NotificationBell from "../../assets/NotificationBell.svg";
import Return from '../../components/Return';
import ShipmentLogo from '../../assets/ShipmentDetail.svg';
import PackageCount from '../../assets/Packagecount.svg';
import Date from '../../assets/Date.svg';
import WidgetContainer from '../../components/Cards/WidgetContainer';
import ShipmentWeight from '../../assets/ShipmentWeight.svg';
import Courier from '../../assets/Courier.svg';
import Address from '../../assets/Address.svg';
import VerticalStepper from '../../components/VerticalStepper';
import HarborReception from '../../components/HarborReception';
import VerificationWait from '../../components/VerificationWait';
import ReceptionDetail from '../../components/ReceptionDetail';
import CircularButton from '../../components/CircularButton';
import Shipments from '../../assets/Shipments.svg';
import XYZPopup from '../../components/Popups/XYZPopup';


function Tracker() {
    const [selectedData, setSelectedData] = useState(null);
    const handleButtonClick = () => {
        console.log('Selected Item:', )
        
        document.getElementById('XYZPopup').showModal();
      };
    return (
        <>
            <WidgetContainer borderRadius="20px">
                <div className='flex justify-center'>
                    <div className='flex justify-center mr-2'>
                        <button onClick={() => handleButtonClick()}>
                            <CircularButton imageUrl={Shipments} backgroundColor="#C0CD30" />
                        </button>
                        
                    </div>
                    <div className="flex flex-col ml-3 mt-1">

                        <span className="font-montserrat text-16px font-semibold tracking-02em ">
                            Expedition #0123456
                        </span>
                        <div className="flex space-x-2">
                            <img src={PackageCount} alt="Profile" style={{ maxWidth: '100px' }} className='w-5 h-auto' />
                            <span className="font-montserrat text-14px font-semibold tracking-02em text-center">
                                3 Packages
                            </span>
                            <img src={Date} alt="Profile" style={{ maxWidth: '100px' }} className='w-6 h-auto' />
                            <span className="font-montserrat text-14px font-semibold tracking-02em text-center ">
                                22/07/2024
                            </span>
                        </div>
                    </div>
                </div>


                
            </WidgetContainer>
            <VerticalStepper></VerticalStepper>
            
        <XYZPopup

    
        />
      

        </>
        

    )
}

export default Tracker;
