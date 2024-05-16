import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Profilepic from '../../assets/Profilepic.svg';
import NotificationBell from "../../assets/NotificationBell.svg";
import WidgetContainer from '../../components/Cards/WidgetContainer';
import SearchLogo from '../../assets/SearchLogo.svg';
import CircularButton from '../../components/CircularButton';
import WetLeavesLogo from '../../assets/WetLeaves.svg';
import Countdown from '../../components/Countdown';
import InnerPlugins from '../../assets/InnerPlugins.svg';
import Plus from '../../assets/Plus.svg';
import CountdownIcon from  '../../assets/Countdown.svg';
import ExpiredWarningIcon from'../../assets/ExpiredWarning.svg';
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
import ShipmentActive from"../../assets/icons/bottombar/shipment_active.svg";



function WetLeaves() {

    const data = [
        { time: "01h05m", color: "#79B2B7", image: CountdownIcon, weight: "30 Kg", code: "W232120" },
        { time: "01h45m", color: "#79B2B7", image: CountdownIcon, weight: "20 Kg", code: "W267760" },
        { time: "Expired", color: "#D45D5D", image: ExpiredWarningIcon, weight: "40 Kg", code: "W543210" }
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
      

  return (
    <div className="w-screen flex flex-col items-center justify-center px-4 pb-8 overflow-y-auto no-scrollbar overflow-x-hidden" >
      <div className="bg-[#F9F9F9] max-w-screen-md w-full h-full flex flex-col p-4 m-4 gap-4 overflow-hidden">
        <div className='flex justify-between items-center '>
                    <span className='font-bold text-3xl'>Wet Leaves</span>
                    <div className="flex items-center gap-2">
                    <img src={NotificationBell} alt="Notification" className='w-8 h-8' />
                    <img src={Profilepic} alt="Profile" className='w-8 h-8 rounded-full' />
                    </div>
        </div>

        <div className="mt-4  flex justify-center items-center gap-3"> 
            <WidgetContainer borderRadius="20px" className="flex items-center flex-grow">
                <div className='flex justify-start items-center gap-4'>
                <img src={SearchLogo} alt="SearchLogo" className="w-8 h-8" />
                <span className="text-green-900 text-sm font-medium leading-tight py-1 px-2 rounded font-sans">
                    Search
                </span>
                </div>
            </WidgetContainer>

            <div className='ml-1'>
                <WidgetContainer backgroundColor="#94C3B3" borderRadius="20px" border={false}>
                <img src={InnerPlugins} alt="InnerPlugins" className='w-8 h-auto ' />
                </WidgetContainer>
            </div>
        </div>

        
        {data.map((item) => (
            <div key={item.code} className=' flex justify-between'>
                <WidgetContainer borderRadius="10px" className="w-full flex items-center">
                <Link to="/wetleavesdetail">
                    <CircularButton imageUrl={WetLeavesLogo} backgroundColor="#94C3B3" />
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
                    <Countdown time={item.time} color={item.color} image={item.image} />
                </div>
                </WidgetContainer>
            </div>
            ))}



        <div className="flex justify-end">
            <Link to="/wetleavesdetail">
                <CircularButton imageUrl={Plus} backgroundColor="#94C3B3" />
            </Link>
        </div>


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
  );
}

export default WetLeaves;
