import React, { useState } from 'react';
import Profilepic from '../../assets/Profilepic.svg';
import NotificationBell from "../../assets/NotificationBell.svg";
import Graph from '../../components/Graph';
import WarningSign from '../../assets/WarningSign.svg';
import InnerPlugins from '../../assets/InnerPlugins.svg';
import WidgetContainer from '../../components/Cards/WidgetContainer';
import LeavesInfo from '../../components/LeavesInfo';
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
import FilterDashboard from "../../components/filterDashboard"

function DashboardCentra() {
  const leavesData = [
    { image: 'WetLeaves', label: 'Wet Leaves', amount: 243 },
    { image: 'DryLeaves', label: 'Dry Leaves', amount: 243 },
    { image: 'Powder', label: 'Powder', amount: 243 },
    { image: 'PackageSent', label: 'Package Sent', amount: 150 }
  ];
  const LastActivity = [
    { message: "A batch of wet leaves are about to expire in 1 hour" },
    { message: "A batch of wet leaves are about to expire in 1 hour" },
    { message: "A batch of wet leaves are about to expire in 1 hour" }
  ];

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

  const [tabletMode, setTabletMode] = useState(false);


  return (
    <>
      <div className='mt-5 '>
        <FilterDashboard tablet={tabletMode} />


        <WidgetContainer>
          <Graph />
        </WidgetContainer>

      </div>
      <div >
        <LeavesInfo leavesData={leavesData} />
      </div>
      <div className=''>
        <span className="font-semibold text-base font-montserrat leading-5 tracking-tighter text-left ">Last Activity</span>

      </div>
      <div className='grid gap-y-1'>
        {LastActivity.map((data, index) => (
          <WidgetContainer className="flex justify-start" key={index}>
            <div className='flex items-center'>
              <img src={WarningSign} alt="warning" className='w-10 h-auto ml-1' />
              <span className='ml-4'>{data.message}</span>
            </div>

          </WidgetContainer>
        ))}
      </div>
    </>
  );
}

export default DashboardCentra;
