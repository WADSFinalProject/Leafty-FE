import React, { useState } from 'react';
import { Link ,Outlet} from 'react-router-dom';
import CircularButton from '../../components/CircularButton';
import Plus from '../../assets/Plus.svg';
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
import "../../style/TabView.css";
import Arrived from '../../assets/Arrived.svg';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

function Shipment() {

    

    const Completed = [
        { time: "Arrived", color: "#DEE295", image: Arrived, weight: "15 Kg", code: "O123456" },

    ]
    const [value, setValue] = useState("");
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const navbarContent = [
        {
            key: 'wet-leaves',
            itemActive: WetLeavesNavbar,
            item: WetLeavesActive,
            label: "Wet Leaves"
        },
        {
            key: 'dry-leaves',
            itemActive: DryLeavesNavbar,
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
            itemActive: PowderNavbar,
            item: PowderActive,
            label: "Powder"
        },
        {
            key: 'shipment',
            itemActive: ShipmentNavbar,
            item: ShipmentActive,
            label: "Shipment"
        },
    ];


    return (
        <>
            <div className="custom-tabview">
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="Orders" component={Link} to="ShipmentOrder" />
                            <Tab label="Sent" component={Link} to="ShipmentSent" />
                            <Tab label="Completed" component={Link} to="ShipmentCompleted" />
                        </Tabs>
                    </Box>
                    <Outlet />
                </Box>
                
            </div>


            <div className="flex justify-end">
                <Link to="/wetleavesdetail">
                    <CircularButton imageUrl={Plus} backgroundColor="#94C3B3" />
                </Link>
            </div>

            {/* <div className="flex justify-center">
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
            </div> */}
        </>
    );
}

export default Shipment;
