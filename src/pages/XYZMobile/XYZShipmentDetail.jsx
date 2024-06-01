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

import HarborReception from '../../components/HarborReception';
import VerificationWait from '../../components/VerificationWait';
import ReceptionDetail from '../../components/ReceptionDetail';

function XYZShipmentDetail() {
    const [currentComponent, setCurrentComponent] = useState(2); 

    const handleNext = () => {
      setCurrentComponent(prevComponent => (prevComponent % 3) + 1); 
    };
  
    const handlePrevious = () => {
      setCurrentComponent(prevComponent => (prevComponent - 2 + 3) % 3 + 1); 
    };
    const containers = [
        { label: 'Centra Name' },
        { label: 'Harbor Name' },
        { label: 'Total Packages' }
      ];

    return (
        <div className="w-screen flex flex-col items-center justify-center px-4 pb-8 overflow-y-auto no-scrollbar overflow-x-hidden">
            <div className="bg-[#F9F9F9] max-w-screen-md w-full h-full flex flex-col p-4 m-4 gap-4 overflow-hidden">
                <div className='flex justify-between items-center '>
                    <div className="flex items-center mr-4">
                        <Return destination="/xyzmobile/dashboard" className="mr-2 text-sm" />
                        <span className='font-bold text-2xl ml-2'>Shipment</span>
                    </div>

                    <div className="flex items-center gap-2 ml-auto">
                        <img src={NotificationBell} alt="Notification" className='w-8 h-8' />
                        <img src={Profilepic} alt="Profile" className='w-8 h-8 rounded-full' />
                    </div>
                </div>
                <div className='flex justify-center'>
                    <img src={ShipmentLogo} alt="Profile" style={{ maxWidth: '100px' }} className='w-full h-auto' />

                </div>
                <div className="flex flex-col items-center">

                    <span className="font-montserrat text-16px font-semibold tracking-02em text-center">
                        Expedition #0123456
                    </span>
                    <div className="flex space-x-2">
                        <img src={PackageCount} alt="Profile" style={{ maxWidth: '100px' }} className='w-5 h-auto' />
                        <span className="font-montserrat text-16px font-semibold tracking-02em text-center">
                            3 Packages
                        </span>
                        <img src={Date} alt="Profile" style={{ maxWidth: '100px' }} className='w-6 h-auto' />
                        <span className="font-montserrat text-16px font-semibold tracking-02em text-center ">
                            22/07/2024
                        </span>
                    </div>
                </div>

                <div className='p-1'>
                    <WidgetContainer borderRadius="20px">
                        <div className="flex justify-around">
                            <div className="flex flex-col">
                                <span className='font-montserrat text-16px font-semibold tracking-02em  pb-2 ml-1'>Powder</span>
                                <div className='flex pb-1'>
                                    <img src={Date} alt="Profile" style={{ maxWidth: '100px' }} className='w-6 h-6 mr-2' />
                                    <span className="font-montserrat text-16px font-semibold tracking-02em text-center">3 Packages</span>
                                </div>
                                <div className='flex pb-1'>
                                    <img src={ShipmentWeight} alt="Profile" style={{ maxWidth: '100px' }} className='w-6 h-6 mr-2' />
                                    <span className="font-montserrat text-16px font-semibold tracking-02em text-center">30 Kg</span>
                                </div>
                                <div className='flex pb-1'>
                                    <img src={Courier} alt="Profile" style={{ maxWidth: '100px' }} className='w-6 h-6 mr-2' />
                                    <span className="font-montserrat text-16px font-semibold tracking-02em text-center">Courier - JNE</span>
                                </div>
                            </div>

                            <div className="flex flex-col">

                                <span className='font-montserrat text-16px font-semibold tracking-02em pb-2 ml-1'>Centra</span>
                                <div className='flex pb-1'>
                                    <img src={Address} alt="Address" style={{ maxWidth: '100px' }} className='w-4 h-7' />
                                    <span className=' font-montserrat text-16px font-semibold tracking-02em text-center ml-2'>Unit 1</span>
                                </div>

                                <div className='flex pb-1'>
                                    <img src={Address} alt="Address" style={{ maxWidth: '100px' }} className='w-4 h-7' />
                                    <span className=' font-montserrat text-16px font-semibold tracking-02em text-center ml-2'>Jl.Address</span>
                                </div>
                            </div>


                        </div>
                    </WidgetContainer>
                </div>

                <div className=''>
                   
                    {currentComponent === 2 && <VerificationWait />}
                    {currentComponent === 3 && <HarborReception title="Harbor Reception " containers={containers} />}
                    {currentComponent === 1 && <ReceptionDetail />}
                   
                    
                </div>
                <div className='p-2'>
                    <WidgetContainer borderRadius='20px'>
                        <span className='font-montserrat text-lg font-semibold tracking-wide ml-1'>
                            Re-scaling
                        </span>                       
                        <span className='font-montserrat text-sm font-medium leading-4 tracking-wide ml-1 '>
                            Input the re-scaled weight below
                        </span>                       
                        <div className="w-full max-w ml- mt-4">
                            <p className='font-montserrat text-xs font-medium leading-[14.63px] tracking-wide text-left ml-1'>Re-scalled weight</p>
                            <WidgetContainer backgroundColor="#94C3B380" borderRadius="13.5px"   borderWidth="2px" borderColor="#79B2B7" className='mt-2'>
                                
                                    <input
                                            type="text"
                                            className="w-full h-full bg-transparent border-none outline-none px-2"
                                            
                                        />
                              
                            </WidgetContainer>
                        </div>
                    </WidgetContainer>
                </div>
                <div className='flex justify-between items-center mt-auto p-4'>
                        <button 
                            onClick={handlePrevious} 
                            disabled={currentComponent === 2} 
                            className='font-montserrat text-sm font-medium leading-4 tracking-wide text-green-900 ml-3'
                        >
                            Previous
                        </button>
                        
                        <WidgetContainer backgroundColor="#0F7275" borderRadius="20px" border={false} className='w-full max-w-20 mr-2'>
                            <button 
                                onClick={handleNext} 
                                disabled={currentComponent === 1} 
                                className='flex justify-items-center font-montserrat text-xs font-semibold leading-4 tracking-wide text-gray-100 ml-4'
                            >
                                Next
                            </button>
                        </WidgetContainer>
                    </div>
            </div>
        </div>

    )
}

export default XYZShipmentDetail;