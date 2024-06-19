import React, { useState, useEffect } from 'react';
import { useNavigate, Outlet, useLocation, Link } from 'react-router-dom';
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
import Return from '../../components/Return';
import axios from 'axios';
import LoadingCircle from "@components/LoadingCircle"
import { API_URL } from '../../App';
import AuthApi from '../../AuthApi';
import logout from "@assets/logout.svg";
import LoadingBackdrop from '../../components/LoadingBackdrop';

function CentraLayout(CURRENT_USER) {
    const [value, setValue] = useState("Dashboard"); // Initialize state with "Dashboard"
    const navigate = useNavigate();
    const location = useLocation();
    const [showReturn, setShowReturn] = useState(false);
    const UserID = CURRENT_USER.CURRENT_USER;
    const Auth = React.useContext(AuthApi);
    const [loading, setLoading]=useState(false);
    
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

    // async function handleWhoAmI() {
    //     try {
    //       const response = await axios.get(API_URL + "/whoami");
    //       if (response && response.data) {
    //         console.log(response.data.user_id);
    //         setUserID(response.data.user_id);
    //         return true;
    //       } else {
    //         console.error("No response or response data");
    //         return false;
    //       }
    //     } catch (error) {
    //       console.error("Error while checking session:", error);
    //       return false;
    //     }
    //   }

    // useEffect(() => {
    //     let intervalId;

    //     async function checkUserID() {
    //         const success = await handleWhoAmI();
    //         if (!success) {
    //             intervalId = setTimeout(checkUserID, 5000); // Retry after 5 seconds if not successful
    //         }
    //     }

    //     checkUserID();

    //     return () => {
    //         if (intervalId) {
    //             clearTimeout(intervalId);
    //         }
    //     };
    // }, []);

    // Ensure correct tab selection on page refresh
    useEffect(() => {
        const pathname = location.pathname;
        const hasDetail = pathname.includes('detail');
        setShowReturn(hasDetail);

        if (hasDetail) {
            if (pathname.includes('wet-leaves/detail')) {
                setReturnDestination("/centra/Wet%20Leaves");
            } else if (pathname.includes('dry-leaves/detail')) {
                setReturnDestination("/centra/Dry%20Leaves");
            } else if (pathname.includes('powderdetail')) {
                setReturnDestination("/centra/Powder");
            } else if (pathname.includes('shipment')) {
                setReturnDestination("/centra/Shipment/ShipmentOrder");
            }
        }
    }, [location.pathname]); // Update when location.pathname changes

    const navbarContent = [
        {
            itemActive: WetLeavesLogo,
            item: WetLeavesActive,
            label: "Wet Leaves"
        },
        {
            itemActive: DryLeavesLogo,
            item: DryLeavesActive,
            label: "Dry Leaves"
        },
        {
            itemActive: null,
            item: (
                <div className="absolute left-1/2 transform -translate-x-1/2 bottom-0 border-[#94c3b3] border-8 rounded-full bg-gray-100 w-20 h-20 flex items-center justify-center">
                    <img src={DashCentra} className="w-10 h-10" alt="Dashboard" />
                </div>
            ),
            value: "Dashboard"
        },
        {
            itemActive: PowderLogo,
            item: PowderActive,
            label: "Powder"
        },
        {
            itemActive: ShipmentLogo,
            item: ShipmentActive,
            label: "Shipment"
        },
    ];

    const handleChange = (event, newValue) => {
        if (newValue) {
            setValue(newValue);
            if (newValue.toLowerCase() === "shipment") {
                navigate("shipment/shipmentorder");
            } else {
                navigate(newValue.toLowerCase()); // Navigate to the lowercase value (assuming route names are lowercase)
            }
        } else {
            setValue("Dashboard");
            navigate("dashboard");
        }
    };

    if (UserID === null) {
        return <LoadingCircle />; // or a loading indicator
    }

    console.log(UserID);

    return (
        <div className="flex flex-col items-center justify-center px-4 pb-8 overflow-y-auto overflow-x-hidden">
            <div className="bg-[#F9F9F9] max-w-screen-md w-full h-full flex flex-col p-4 m-4 gap-4 no-scrollbar">
                <div className='flex justify-between items-center'>
                    <div className="flex items-center gap-3">
                        <span className='font-bold text-3xl'>{value}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        {/* <img src={NotificationBell} alt="Notification" className='w-8 h-8' /> */}
                        
                        <img src={logout} alt="Profile" onClick = {handle} className='w-12 h-12 rounded-full' />
                        
                    </div>
                </div>
                <Outlet context={UserID} />
                <div className="flex justify-center">
                    <BottomNavigation
                        className="fixed bottom-0 w-screen justify-center"
                        value={value}
                        onChange={handleChange}
                        style={{ background: "#94C3B3", zIndex: 1200 }} // Ensure navbar is above other content
                    >
                        {navbarContent.map(({ label, item, itemActive, value: navValue }) => (
                            <BottomNavigationAction
                                key={navValue || label}
                                value={navValue || label}
                                icon={navValue === "Dashboard" ? item : <img src={value === (navValue || label) ? item : itemActive} alt={label} />}
                                disableRipple={true}
                                label={navValue === "Dashboard" ? "" : label}
                                sx={{
                                    '& .MuiBottomNavigationAction-label': {
                                        fontSize: '0.9rem', // Default font size for mobile
                                        '&.Mui-selected': {
                                            fontSize: '0.9rem', // Ensure the selected label also has the appropriate font weight
                                        },
                                        '@media (min-width:600px)': { // Adjust font size for larger screens
                                            fontSize: '0.9rem',
                                            '&.Mui-selected': {
                                                fontSize: '0.9rem',
                                            },
                                        },
                                        '@media (max-width:600px)': { // Adjust font size for mobile screens
                                            fontSize: label && label.includes('Leaves') ? '0.5rem' : '0.75rem',
                                            '&.Mui-selected': {
                                                fontSize: label && label.includes('Leaves') ? '0.5rem' : '0.75rem',
                                            },
                                        },
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
}

export default CentraLayout;
