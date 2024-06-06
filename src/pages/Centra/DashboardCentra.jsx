import React, { useState } from 'react';
import Graph from '../../components/Graph';
import WarningSign from '../../assets/WarningSign.svg';
import WidgetContainer from '../../components/Cards/WidgetContainer';
import FilterDashboard from "../../components/filterDashboard"
import StatsContainer from '../../components/Cards/StatsContainer';
import WetLeaves from '../../assets/WetLeaves.svg';
import DryLeaves from "../../assets/DryLeaves.svg";
import Powder from "../../assets/Powder.svg";
import PackageSent from "../../assets/PackangeSent.svg";
import Box from "../../assets/PackageBox.svg";
import Fab from '@mui/material/Fab';


function DashboardCentra() {

  const statsData = [
    { label: "Wet Leaves", value: 243, unit: "Kg", frontIcon: WetLeaves, modal: false, color: "#79B2B7" },
    { label: "Dry Leaves", value: 243, unit: "Kg", frontIcon: DryLeaves, modal: false, color: "#D2D681" },
    { label: "Powder", value: 243, unit: "Kg", frontIcon: Powder, modal: false, color: "#0F7275" },
    { label: "Packages Sent", value: 243, icon_unit: Box, frontIcon: PackageSent, modal: false, color: "#A0C2B5" }
  ];

  const LastActivity = [
    { message: "A batch of wet leaves are about to expire in 1 hour" },
    { message: "A batch of wet leaves are about to expire in 1 hour" },
    { message: "A batch of wet leaves are about to expire in 1 hour" }
  ];

  const [tabletMode, setTabletMode] = useState(false);

  return (
    <>

      <FilterDashboard tablet={tabletMode} />


      <WidgetContainer>
        <Graph />
      </WidgetContainer>


      <div className='grid grid-cols-2 gap-4'>
        {statsData.map((stat, index) => (
          <StatsContainer
            key={index}
            label={stat.label}
            value={stat.value}
            unit={stat.unit}
            frontIcon={stat.frontIcon}
            icon_unit={stat.icon_unit}
            modal={stat.modal}
            color={stat.color}
            round={"lg"}
          />
        ))}
      </div>
      {/* <div >
        <LeavesInfo leavesData={leavesData} />
      </div> */}
      <div className=''>
        <span className="font-semibold text-base font-montserrat leading-5 tracking-tighter text-left ">Last Activity</span>

      </div>
      <div className='grid gap-y-1'>
        {LastActivity.map((data, index) => (
          <WidgetContainer key={index}>
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
