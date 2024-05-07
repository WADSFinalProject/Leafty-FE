import React, { useState } from 'react';
import Profilepic from '../assets/icons/sidebar/profile_pic.svg';
import NotificationBell from "../assets/NotificationBell.svg";
import Rectangle from '../components/Rectangle';
import Date from '../assets/Date.svg';
import Truck from '../assets/Truck.svg';
import PackageBox from '../assets/PackageBoxs.svg';
import VerifiedPackages from '../assets/VerifiedPackages.svg';
import UnverifiedShipment from '../assets/UnverifiedShipment.svg';
import UnverifiedPackages from '../assets/UnverifiedPackages.svg';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import scan from "../assets/icons/scan.svg";
import "../style/BottomNavigation.css"


function DashboardHarbor() {
    const [value, setValue] = useState("");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (

        <div className="h-screen flex flex-col items-center">
            <div className="bg-[#F9F9F9] h-screen flex flex-col justify-between">
                <div className='flex justify-between items-center p-2'>
                    <span className='font-bold text-3xl'>Dashboard</span>
                    <div className="flex items-center gap-2">
                        {/* Notification Bell */}
                        <img src={NotificationBell} alt="Notification" className='' style={{ width: "30px", height: "30px" }} />

                        {/* Profile Picture */}
                        <img src={Profilepic} alt="Profile" className='' style={{ width: "30px", height: "30px" }} />
                    </div>
                </div>
                <div className='flex items-center justify-between'>
                    <div className='ml-4 flex items-center '>
                        <Rectangle width="135px" height="205px" borderRadius="20px">
                            <div className='flex flex-col items-center'>
                                <span className="font-montserrat text-base font-semibold leading-tight tracking-wide text-left mt-[-5px] text-gray-600">
                                    Verified Package
                                </span>

                                <span className='font-montserrat text-xl font-semibold leading-tight tracking-wide text-left mr-24'>
                                    30
                                </span>
                                <img src={VerifiedPackages} alt="VerifiedPackages" className='w-10 h-auto mr-20 mt-12' />
                            </div>
                        </Rectangle>

                        <div className='ml-2'>
                            <Rectangle width="200px" height="98px" borderRadius="20px" margin="7px">
                                <div className='flex items-center'>

                                    <div className='flex flex-col'>
                                        <span className='font-montserrat text-base font-semibold leading-tight tracking-wide text-left text-gray-600'>
                                            Unverified Shipment
                                        </span>
                                        <span className='font-montserrat text-xl font-semibold leading-tight tracking-wide text-left mt-1'>
                                            3
                                        </span>
                                    </div>
                                    <img src={UnverifiedShipment} alt="Unverified Shipment" className='w-50 h-auto mr-3 ' />
                                </div>
                            </Rectangle>


                            <Rectangle width="200px" height="98px" borderRadius="20px" margin="7px">
                                <div className='flex items-center'>

                                    <div className='flex flex-col'>
                                        <span className='font-montserrat text-base font-semibold leading-tight tracking-wide text-left text-gray-600'>
                                            Unverified Packages
                                        </span>
                                        <span className='font-montserrat text-xl font-semibold leading-tight tracking-wide text-left mt-1'>
                                            3
                                        </span>
                                    </div>
                                    <img src={UnverifiedPackages} alt="UnverifiedPackages" className='w-50 h-auto mr-1 mt-2' />
                                </div>
                            </Rectangle>

                        </div>
                    </div>
                </div>
                <span class="font-semibold text-base font-montserrat leading-5 tracking-tighter text-left ml-6 mt-4 mb-">
                    Recent Verified Shipment
                </span>

                <div className='ml-2 mb-28 '>

                    <Rectangle width="349px" height="64px" borderRadius="10px" margin="7px" >
                        <div className="flex items-center ">
                            <img src={Truck} alt="Truck" className='w-10 h-auto ml-3 ' />
                            <span className="font-montserrat text-base font-semibold leading-tight tracking-wide text-left ml-3">
                                Expedition
                                #0123456
                            </span>

                            <img src={PackageBox} alt="PackageBoxs" className='w-8 h-auto ml-3 ' />
                            <span className="font-montserrat text-xs font-semibold leading-tight tracking-wide text-left ml-2">
                                3
                            </span>

                            <img src={Date} alt="Date" className='w-8 h-auto ml-3 ' />
                            <span className="font-montserrat text-xs font-semibold leading-tight tracking-wide text-left ml-2">
                                22/07/2024
                            </span>

                        </div>

                    </Rectangle>

                    <Rectangle width="349px" height="64px" borderRadius="10px" margin="7px" >
                        <div className="flex items-center">
                            <img src={Truck} alt="Truck" className='w-10 h-auto ml-3 ' />
                            <span className="font-montserrat text-base font-semibold leading-tight tracking-wide text-left ml-3">
                                Expedition
                                #0123456
                            </span>

                            <img src={PackageBox} alt="PackageBoxs" className='w-8 h-auto ml-3 ' />
                            <span className="font-montserrat text-xs font-semibold leading-tight tracking-wide text-left ml-2">
                                3
                            </span>

                            <img src={Date} alt="Date" className='w-8 h-auto ml-3 ' />
                            <span className="font-montserrat text-xs font-semibold leading-tight tracking-wide text-left ml-2">
                                22/07/2024
                            </span>

                        </div>

                    </Rectangle>

                    <Rectangle width="349px" height="64px" borderRadius="10px" margin="7px" >
                        <div className="flex items-center">
                            <img src={Truck} alt="Truck" className='w-10 h-auto ml-3 ' />
                            <span className="font-montserrat text-base font-semibold leading-tight tracking-wide text-left ml-3">
                                Expedition
                                #0123456
                            </span>

                            <img src={PackageBox} alt="PackageBoxs" className='w-8 h-auto ml-3 ' />
                            <span className="font-montserrat text-xs font-semibold leading-tight tracking-wide text-left ml-2">
                                3
                            </span>

                            <img src={Date} alt="Date" className='w-8 h-auto ml-3 ' />
                            <span className="font-montserrat text-xs font-semibold leading-tight tracking-wide text-left ml-2">
                                22/07/2024
                            </span>

                        </div>

                    </Rectangle>

                    <Rectangle width="349px" height="64px" borderRadius="10px" margin="7px" >
                        <div className="flex items-center">
                            <img src={Truck} alt="Truck" className='w-10 h-auto ml-3 ' />
                            <span className="font-montserrat text-base font-semibold leading-tight tracking-wide text-left ml-3">
                                Expedition
                                #0123456
                            </span>

                            <img src={PackageBox} alt="PackageBoxs" className='w-8 h-auto ml-3 ' />
                            <span className="font-montserrat text-xs font-semibold leading-tight tracking-wide text-left ml-2">
                                3
                            </span>

                            <img src={Date} alt="Date" className='w-8 h-auto ml-3 ' />
                            <span className="font-montserrat text-xs font-semibold leading-tight tracking-wide text-left ml-2">
                                22/07/2024
                            </span>

                        </div>

                    </Rectangle>

                    <Rectangle width="349px" height="64px" borderRadius="10px" margin="7px" >
                        <div className="flex items-center">
                            <img src={Truck} alt="Truck" className='w-10 h-auto ml-3 ' />
                            <span className="font-montserrat text-base font-semibold leading-tight tracking-wide text-left ml-3">
                                Expedition
                                #0123456
                            </span>

                            <img src={PackageBox} alt="PackageBoxs" className='w-8 h-auto ml-3 ' />
                            <span className="font-montserrat text-xs font-semibold leading-tight tracking-wide text-left ml-2">
                                3
                            </span>

                            <img src={Date} alt="Date" className='w-8 h-auto ml-3 ' />
                            <span className="font-montserrat text-xs font-semibold leading-tight tracking-wide text-left ml-2">
                                22/07/2024
                            </span>

                        </div>

                    </Rectangle>


                </div>  

            </div>
            <BottomNavigation className="fixed bottom-0 w-full" value={value} onChange={handleChange} style={{ background: "#94C3B3" }}>
                <BottomNavigationAction
                    label="Dashboard"
                    value="dashboard"
                    icon={<img src={PackageBox} />}
                />
                <BottomNavigationAction
                    disableRipple={true}
                    label=""
                    value="shipment_list2"
                    icon={<div style = {{top: "-40px"}} className="absolute left-1/2 transform -translate-x-1/2 border-[#94c3b3] border-8 rounded-full bg-gray-100 w-20 h-20 flex items-center justify-center">
                        <img src={scan} className="w-10 h-10" />
                    </div>
                    }
                />
                <BottomNavigationAction
                    label="Shipment List"
                    value="shipment_list"
                    icon={<FavoriteIcon />}
                />
            </BottomNavigation>
        </div>
    );
}

export default DashboardHarbor;