import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Profilepic from '../../assets/Profilepic.svg';
import NotificationBell from "../../assets/NotificationBell.svg";
import WidgetContainer from '../../components/Cards/WidgetContainer';
import SearchLogo from '../../assets/SearchLogo.svg';
import CircularButton from '../../components/CircularButton';
import PowderLogo from '../../assets/Powder.svg'
import Countdown from '../../components/Countdown';
import InnerPlugins from '../../assets/InnerPlugins.svg';
import Plus from '../../assets/Plus.svg';
import CountdownIcon from '../../assets/Countdown.svg';
import ExpiredWarningIcon from '../../assets/ExpiredWarning.svg';
import ReadyIcon from '../../assets/ReadyIcon.svg';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import WetLeavesNavbar from "../../assets/WetLeavesLogo.svg";
import DryLeavesNavbar from "../../assets/DryLeavesLogo.svg";
import DashCentra from "../../assets/icons/bottombar/dashboard_centra.svg";
import WetLeavesActive from "../../assets/icons/bottombar/wetleaves_active.svg";
import DryLeavesActive from "../../assets/icons/bottombar/dryleaves_actives.svg";
import PowderNavbar from "../../assets/PowderLogo.svg";
import ShipmentLogo from "../../assets/ShipmentLogo.svg";
import PowderActive from "../../assets/icons/bottombar/powder_active.svg";
import ShipmentActive from "../../assets/icons/bottombar/shipment_active.svg";
import InputField from '../../components/InputField';



function Powder() {

  const data = [
    { time: "Ready ", color: "#C0CD30", image: ReadyIcon, weight: "20 Kg", code: "W543210" },
    { time: "Ready ", color: "#C0CD30", image: ReadyIcon, weight: "30 Kg", code: "W543210" }
  ];

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
      itemActive: ShipmentLogo,
      item: ShipmentActive,
      label: "Shipment"
    },
  ];


  return (
    <>
      <div className="mt-4  flex justify-center items-center gap-3"> 
            <InputField icon = {SearchLogo} placeholder={"Search"} className={"max-w-none"}/>


        <div className='ml-1'>
                <WidgetContainer backgroundColor="#94C3B3" borderRadius="20px" border={false}>
                    <img src={InnerPlugins} alt="InnerPlugins" className='w-8 h-8 ' />
                </WidgetContainer>
                </div> 
      </div>


      {
        data.map((item) => (
          <div key={item.code} className=' flex justify-between'>
            <WidgetContainer borderRadius="10px" className="w-full flex items-center ">
              <Link to="/powderdetail">
                <CircularButton imageUrl={PowderLogo} backgroundColor="#94C3B3" />
              </Link>
              <div className='flex flex-col ml-3'>
                <span className="font-montserrat text-base font-semibold leading-tight tracking-wide text-left">
                  {item.weight}
                </span>
                <span className='font-montserrat text-sm font-medium leading-17 tracking-wide text-left'>
                  {item.code}
                </span>
              </div>
              <div className="flex ml-auto items-center">
                <Countdown time={item.time} color={item.color} image={item.image} className="" />
              </div>
            </WidgetContainer>
          </div>
        ))
      }

      <div className="flex justify-end">
        <Link to="/wetleavesdetail">
          <CircularButton imageUrl={Plus} backgroundColor="#94C3B3" />
        </Link>
      </div>
    </>
  );
}

export default Powder;
