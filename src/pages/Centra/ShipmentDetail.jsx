import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Profilepic from '../../assets/Profilepic.svg';
import NotificationBell from "../../assets/NotificationBell.svg";
import Return from '../../components/Return';
import PowderLogo from '../../assets/PowderDetail.svg';
import ExpiredIn from '../../components/ExpiredIn';
import LeavesDetail from '../../components/LeavesDetail';
import LeavesType from '../../components/LeavesType';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import WetLeavesNavbar from "../../assets/WetLeavesLogo.svg";
import DryLeavesNavbar from "../../assets/DryLeavesLogo.svg";
import DashCentra from "../../assets/icons/bottombar/dashboard_centra.svg";
import WetLeavesActive from "../../assets/icons/bottombar/wetleaves_active.svg";
import DryLeavesActive from "../../assets/icons/bottombar/dryleaves_actives.svg";
import PowderNavbar from "../../assets/PowderLogo.svg";
import ShipmentNavbar from "../../assets/ShipmentLogo.svg";
import PowderActive from "../../assets/icons/bottombar/powder_active.svg";
import ShipmentActive from "../../assets/icons/bottombar/shipment_active.svg";
import ShipmentLogo from '../../assets/ShipmentDetail.svg';
import PackageCount from '../../assets/Packagecount.svg';
import Date from '../../assets/Date.svg';
import WidgetContainer from '../../components/Cards/WidgetContainer';
import ShipmentWeight from '../../assets/ShipmentWeight.svg';
import Courier from '../../assets/Courier.svg';
import Address from '../../assets/Address.svg';
import ShipmentReceipt from '../../assets/ShipmentReceipt.svg';
import Download from '../../assets/Download.svg';
import Upload from '../../assets/Upload.svg';
import Open from '../../assets/Open.svg';


function ShipmentDetail() {
    const { code } = useParams();
    const [value, setValue] = useState("");
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const ShipmentText = `Expedition #${code}`;

    return (
        <>
    
                <div className='flex justify-center'>
                    <img src={ShipmentLogo} alt="Profile" style={{ maxWidth: '100px' }} className='w-full h-auto' />

                </div>
                <div className="flex flex-col items-center">

                    <span className="font-montserrat text-16px font-semibold tracking-02em text-center">
                        {ShipmentText}
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

                <div className='p-2'>
                    <WidgetContainer borderRadius="20px">
                        <div className="flex justify-around">
                            <div className="flex flex-col">
                                <span className='font-montserrat text-16px font-semibold tracking-02em  pb-2 ml-1'>Powder</span>
                                <div className='flex pb-2'>
                                    <img src={Date} alt="Profile" style={{ maxWidth: '100px' }} className='w-6 h-6 mr-2' />
                                    <span className="font-montserrat text-16px font-semibold tracking-02em text-center">3 Packages</span>
                                </div>
                                <div className='flex pb-2'>
                                    <img src={ShipmentWeight} alt="Profile" style={{ maxWidth: '100px' }} className='w-6 h-6 mr-2' />
                                    <span className="font-montserrat text-16px font-semibold tracking-02em text-center">30 Kg</span>
                                </div>
                                <div className='flex pb-2'>
                                    <img src={Courier} alt="Profile" style={{ maxWidth: '100px' }} className='w-6 h-6 mr-2' />
                                    <span className="font-montserrat text-16px font-semibold tracking-02em text-center">Courier - JNE</span>
                                </div>
                            </div>

                            <div className="flex flex-col">

                                <span className='font-montserrat text-16px font-semibold tracking-02em pb-2 ml-1'>Centra</span>
                                <div className='flex pb-2'>
                                    <img src={Address} alt="Address" style={{ maxWidth: '100px' }} className='w-4 h-7' />
                                    <span className=' font-montserrat text-16px font-semibold tracking-02em text-center ml-2'>Unit 1</span>
                                </div>

                                <div className='flex pb-2'>
                                    <img src={Address} alt="Address" style={{ maxWidth: '100px' }} className='w-4 h-7' />
                                    <span className=' font-montserrat text-16px font-semibold tracking-02em text-center ml-2'>Jl.Address</span>
                                </div>
                            </div>


                        </div>
                    </WidgetContainer>
                </div>

                <div className='p-2'>
                    <WidgetContainer borderRadius='20px'>
                        <span className='font-montserrat text-16px font-semibold tracking-02em ml-3'>
                            Reception
                        </span>
                        <div className='flex flex-wrap items-center mt-4'>
                            <WidgetContainer borderRadius='rounded-lg' border={false} backgroundColor="#DEE295" className='flex items-center ml-3 mb-4'>
                                <img src={ShipmentReceipt} alt="Profile" className='w-24 h-auto' />
                            </WidgetContainer  >
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

        </>
        

    )
}

export default ShipmentDetail;