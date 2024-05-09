import React, { useState } from 'react';
import Profilepic from '../assets/icons/sidebar/profile_pic.svg';
import NotificationBell from "../assets/NotificationBell.svg";
import home from "../assets/icons/bottombar/dashboard_mobile.svg";
import homeActive from "../assets/icons/bottombar/dashboard_mobile_active.svg";
import reception from "../assets/icons/bottombar/reception.svg";
import receptionActive from "../assets/icons/bottombar/reception_active.svg";
import PackageBox from '../assets/PackageBoxs.svg';
import VerifiedPackages from '../assets/VerifiedPackages.svg';
import UnverifiedShipment from '../assets/UnverifiedShipment.svg';
import UnverifiedPackages from '../assets/UnverifiedPackages.svg';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import WidgetContainer from '../components/Cards/WidgetContainer';
import FavoriteIcon from '@mui/icons-material/Favorite';
import scan from "../assets/icons/scan.svg";
import "../style/BottomNavigation.css"
import LongContainer from '../components/Cards/LongContainer';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import "../style/Dashboard.css"


function DashboardHarbor() {
    const navigate = useNavigate();

    const navbarContent = [
        {
            item: home,
            itemActive: homeActive,
            label: "Dashboard"
        },
        {
            item:
                <div className="absolute left-1/2 transform -translate-x-1/2 bottom-0 border-[#94c3b3] border-8 rounded-full bg-gray-100 w-20 h-20 flex items-center justify-center">
                    <img src={scan} className="w-10 h-10" />
                </div>,
            itemActive: null,
            label: null,
        },
        {
            item: reception,
            itemActive: receptionActive,
            label: "Reception"
        },
    ]
    const [value, setValue] = useState("");

   const data = [
        {item: "a"},
        {item: "a"},
        {item: "a"},
        {item: "a"},
        {item: "a"},
    ] 

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <div className="w-screen flex flex-col items-center justify-center px-4 pb-8 overflow-y-auto no-scrollbar overflow-x-hidden">
                <div className="bg-[#F9F9F9] max-w-screen-md w-full h-full flex flex-col p-4 m-4 gap-4 overflow-hidden">
                    <div className='flex justify-between items-center'>
                        <span className='font-bold text-3xl'>Dashboard</span>
                        <div className="flex items-center gap-2">
                            {/* Notification Bell */}
                            <img src={NotificationBell} alt="Notification" className='' style={{ width: "30px", height: "30px" }} />

                            {/* Profile Picture */}
                            <img src={Profilepic} alt="Profile" className='' style={{ width: "30px", height: "30px" }} />
                        </div>
                    </div>
                    <div className='flex items-center justify-between'>
                        <motion.div className='flex items-center md:flex-row gap-2'  initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.5}} >
                            <WidgetContainer className={"p-5 h-[13rem] md:h-full"}>
                                <div className='flex flex-row'>
                                    <div className='flex flex-col'>
                                        <span className="font-semibold text-gray-600">
                                            Verified Package
                                        </span>
                                        <span className='font-montserrat text-xl font-semibold text-left'>
                                            30
                                        </span>
                                    </div>
                                    <img src={VerifiedPackages} alt="VerifiedPackages" className='place-self-start' />
                                </div>
                                
                            </WidgetContainer>
                            <div className="flex flex-col md:flex-row gap-2 justify-around">
                                <WidgetContainer >
                                    <div className='flex items-center gap-2 justify-between'>
                                        <div className='flex flex-col'>
                                            <span className=' w-8 font-montserrat text-base font-semibold text-gray-600'>
                                                Unverified Shipment
                                            </span>
                                            <span className='font-montserrat text-xl font-semibold'>
                                                3
                                            </span>
                                        </div>
                                        <img src={UnverifiedShipment} alt="Unverified Shipment" className='w-50 h-auto mr-3 ' />
                                    </div>
                                </WidgetContainer>
                                <WidgetContainer>
                                    <div className='flex items-center gap-2 justify-between'>
                                        <div className='flex flex-col'>
                                            <span className='font-montserrat text-base font-semibold text-gray-600'>
                                                Unverified Packages
                                            </span>
                                            <span className='font-montserrat text-xl font-semibold'>
                                                3
                                            </span>
                                        </div>
                                        <img src={UnverifiedPackages} alt="UnverifiedPackages" className='w-50 h-auto mr-1 mt-2' />
                                    </div>
                                </WidgetContainer>
                            </div>
                        </motion.div>
                    </div>
                    <span className="font-semibold text-base">
                        Recent Verified Shipment
                    </span>
                    <div className='flex flex-col gap-2'>
                            {data.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    <LongContainer />
                                </motion.div>
                            ))}
                    </div>

                    <div className="flex justify-center">
                        <BottomNavigation className="fixed bottom-0 w-screen justify-center w-full" value={value} onChange={handleChange} style={{ background: "#94C3B3" }}>
                            {navbarContent.map(({ label, item, itemActive }) => {
                                return <BottomNavigationAction
                                    label={label}
                                    value={label}
                                    icon={label === null ? item : <img src={value === label ? item : itemActive}></img>}
                                    // disableRipple={label === null ? true : false}
                                    disableRipple = {true}
                                />
                            })}
                        </BottomNavigation>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DashboardHarbor;