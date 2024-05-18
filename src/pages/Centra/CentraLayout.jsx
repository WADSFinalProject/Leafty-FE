import React, { useState } from 'react';
import Profilepic from '../../assets/Profilepic.svg';
import NotificationBell from "../../assets/NotificationBell.svg";
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import WetLeavesLogo from "../../assets/WetLeavesLogo.svg";
import DryLeavesLogo from "../../assets/DryLeavesLogo.svg";
import DashCentra from "../../assets/icons/bottombar/dashboard_centra.svg";
import WetLeavesActive from "../../assets/icons/bottombar/wetleaves_active.svg";
import DryLeavesActive from "../../assets/icons/bottombar/dryleaves_actives.svg";
import PowderLogo from "../../assets/PowderLogo.svg";
import ShipmentLogo from "../../assets/ShipmentLogo.svg";
import PowderActive from "../../assets/icons/bottombar/powder_active.svg";
import ShipmentActive from "../../assets/icons/bottombar/shipment_active.svg";
import { Navigate, Outlet, useNavigate } from 'react-router-dom';


function CentraLayout() {
    const navigate = useNavigate();

    const navbarContent = [
        {
            key: 'wet-leaves',
            itemActive: WetLeavesLogo,
            item: WetLeavesActive,
            label: "Wet Leaves"
        },
        {
            key: 'dry-leaves',
            itemActive: DryLeavesLogo,
            item: DryLeavesActive,
            label: "Dry Leaves"
        },
        {
            key: 'dashboard-centra',
            item:
                <div className="absolute left-1/2 transform -translate-x-1/2 bottom-0 border-[#94c3b3] border-8 rounded-full bg-gray-100 w-20 h-20 flex items-center justify-center">
                    <img src={DashCentra} className="w-10 h-10" />
                </div>,
            itemActive: null,
            label: null,
        },
        {
            key: 'powder',
            itemActive: PowderLogo,
            item: PowderActive,
            label: "Powder"
        },
        {
            key: 'shipment',
            itemActive: ShipmentLogo,
            item: ShipmentActive,
            label: "Shipment"
        },

    ];
    const handleChange = (event, newValue) => {
        setValue(newValue ? newValue : "Dashboard");
        navigate(newValue ? newValue : "Dashboard");
    };
    const [value, setValue] = useState("Dashboard");
    const [key, setKey] = useState("");

    return <>
        <div className="w-screen flex flex-col items-center justify-center px-4 pb-8 overflow-y-auto no-scrollbar overflow-x-hidden">
            <div className="bg-[#F9F9F9] max-w-screen-md w-full h-full flex flex-col p-4 m-4 gap-4 overflow-hidden">
                <div className='flex justify-between items-center '>
                    <span className='font-bold text-3xl'>{value}</span>
                    <div className="flex items-center gap-2">
                        <img src={NotificationBell} alt="Notification" className='w-8 h-8' />
                        <img src={Profilepic} alt="Profile" className='w-8 h-8 rounded-full' />
                    </div>
                </div>
                <Outlet />
                <div className="flex justify-center">
                    <BottomNavigation className="fixed bottom-0 w-screen justify-center " value={value} onChange={handleChange} style={{ background: "#94C3B3" }}>
                        {navbarContent.map(({ key, label, item, itemActive }) => (
                            <BottomNavigationAction
                                key={key} // Ensure each item has a unique key
                                label={label}
                                value={label}
                                icon={label === null ? item : <img src={value === label ? item : itemActive}></img>}
                                disableRipple={label === null ? true : false}
                            />
                        ))}
                    </BottomNavigation>
                </div>
            </div>
        </div>
    </>
}

export default CentraLayout;