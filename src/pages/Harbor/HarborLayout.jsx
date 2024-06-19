import React, { useState } from 'react';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import NotificationBell from "../../assets/NotificationBell.svg";
import Profilepic from '../../assets/icons/sidebar/profile_pic.svg';
import home from "../../assets/icons/bottombar/dashboard_mobile.svg";
import homeActive from "../../assets/icons/bottombar/dashboard_mobile_active.svg";
import reception from "../../assets/icons/bottombar/reception.svg";
import receptionActive from "../../assets/icons/bottombar/reception_active.svg";
import scan from "../../assets/icons/scan.svg";
import "../../style/BottomNavigation.css";
import { Outlet, useNavigate, Link, useLocation } from "react-router-dom";
import "../../style/mobile.css"
import { animate, motion, useAnimationControls } from "framer-motion";
import AuthApi from '../../AuthApi';
import logout from "@assets/logout.svg"
import axios from 'axios';
import { API_URL } from '../../App';
import LoadingBackdrop from '../../components/LoadingBackdrop';

const HarborLayout = () => {
    const [value, setValue] = useState("Dashboard");
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(false);

    const Auth = React.useContext(AuthApi);

    async function handle() {
        setLoading(true);
        try {
            const response = await axios.delete(API_URL + "/delete_session")
            if (response) {
                Auth.setAuth(false);
                navigate('/');
            }
            return false
        } catch (error) {
            console.error("Error while deleting session:", error);
            console.error(err.response.data);    // ***
            console.error(err.response.status);  // ***
            console.error(err.response.headers);
            return false

        }
    }

    const navbarContent = [
        {
            item: home,
            itemActive: homeActive,
            label: "Dashboard"
        },
        {
            item: (
                <div className="absolute left-1/2 transform -translate-x-1/2 bottom-0 border-[#94c3b3] border-8 rounded-full bg-gray-100 w-20 h-20 flex items-center justify-center">
                    <img src={scan} className="w-10 h-10" alt="scan" />
                </div>
            ),
            itemActive: (
                <div className="absolute left-1/2 transform -translate-x-1/2 bottom-0 border-[#94c3b3] border-8 rounded-full bg-gray-100 w-20 h-20 flex items-center justify-center">
                    <img src={scan} className="w-10 h-10" alt="scan" />
                </div>
            ),
            label: null,
        },
        {
            item: reception,
            itemActive: receptionActive,
            label: "Reception"
        },
    ];

    const handleChange = (event, newValue) => {
        if (newValue) {
            setValue(newValue);
            navigate(newValue);
        }
        else navigate("Scanner");
    };

    return (
        <div className="flex flex-col items-center justify-center px-4 pb-8 overflow-y-auto overflow-x-hidden">
            <div className="bg-[#F9F9F9] max-w-screen-md w-full h-full flex flex-col p-4 m-4 gap-4 no-scrollbar">
                <div className='flex justify-between items-center'>
                    <span className='font-bold text-3xl'>{value}</span>
                    <div className="flex items-center gap-2">
                        {/* <img src={NotificationBell} alt="Notification" className='' style={{ width: "30px", height: "30px" }} /> */}
                        <button onClick = {handle}><img src={logout} alt="Profile" className='w-12 h-12 rounded-full' /></button>

                    </div>
                </div>
                <Outlet />
                <div className="flex justify-center">
                    <BottomNavigation className="fixed bottom-0 w-screen justify-center" value={value} onChange={handleChange} style={{ background: "#94C3B3" }}>
                        {navbarContent.map(({ label, item, itemActive }) => (
                            <BottomNavigationAction
                                key={label || 'scan'}
                                label={label}
                                value={label}
                                icon={label === null ? item : <img src={value === label ? item : itemActive} alt={label} />}
                                disableRipple={true}
                                sx={{
                                    '& .MuiBottomNavigationAction-label': {
                                        fontSize: '0.75rem', // Adjust the font size as needed
                                        '&.Mui-selected': {
                                            fontSize: '0.75rem' // Ensure the selected label also has the smaller font size
                                        }
                                    }
                                }}
                            />
                        ))}
                    </BottomNavigation>
                </div>
            </div>
            {loading && <LoadingBackdrop />}
        </div>
    );
};

export default HarborLayout;