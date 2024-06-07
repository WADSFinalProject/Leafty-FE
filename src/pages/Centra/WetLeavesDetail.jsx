import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Profilepic from '../../assets/Profilepic.svg';
import NotificationBell from "../../assets/NotificationBell.svg";
import Return from '../../components/Return';
import WetLeavesLogo from '../../assets/WetLeavesDetail.svg';
import ExpiredIn from '../../components/ExpiredIn';
import LeavesDetail from '../../components/LeavesDetail';
import LeavesType from '../../components/LeavesType';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import WetLeavesNavbar from "../../assets/WetLeavesLogo.svg";
import DryLeavesLogo from "../../assets/DryLeavesLogo.svg";
import DashCentra from "../../assets/icons/bottombar/dashboard_centra.svg";
import WetLeavesActive from "../../assets/icons/bottombar/wetleaves_active.svg";
import DryLeavesActive from "../../assets/icons/bottombar/dryleaves_actives.svg";
import PowderLogo from "../../assets/PowderLogo.svg";
import ShipmentLogo from "../../assets/ShipmentLogo.svg";
import PowderActive from "../../assets/icons/bottombar/powder_active.svg";
import ShipmentActive from "../../assets/icons/bottombar/shipment_active.svg";

function WetLeavesDetail(){

    const expired = "1 Hour 05 Minutes";
    const date ="23-21-2024";
    const time ="15:59";
    const weight = "30 KG";
    const leavesText = "Wet Leaves #232120";
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

    return(
      <>
        
            

                <LeavesType imageSrc={WetLeavesLogo} text={leavesText} />
                <ExpiredIn expired={expired} />
                <LeavesDetail date={date} time={time} weight={weight} />
                
            
        
      </>
        
    )
}

export default WetLeavesDetail;