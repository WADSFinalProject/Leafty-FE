import React, { useEffect, useState } from 'react';
import Graph from '../../components/Graph';
import WarningSign from '../../assets/WarningSign.svg';
import WidgetContainer from '../../components/Cards/WidgetContainer';
import FilterDashboard from "../../components/filterDashboard";
import StatsContainer from '../../components/Cards/StatsContainer';
import WetLeaves from '../../assets/WetLeaves.svg';
import DryLeaves from "../../assets/DryLeaves.svg";
import Powder from "../../assets/Powder.svg";
import PackageSent from "../../assets/PackangeSent.svg";
import Box from "../../assets/PackageBox.svg";
import Fab from '@mui/material/Fab';
import { useOutletContext } from 'react-router';
import { motion } from 'framer-motion';

import { API_URL } from '../../App';
import axios from 'axios';

function DashboardCentra() {
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  const UserID = useOutletContext();
  const [sumWetLeaves, setSumWetLeaves] = useState("---");
  const [sumDryLeaves, setSumDryLeaves] = useState("---");
  const [sumFlour, setSumFlour] = useState("---");
  const [sumShipmentQuantity, setSumShipmentQuantity] = useState("---");

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_URL}/centra/statistics/${UserID}`);
      const data = response.data;
      setSumWetLeaves(data.sum_wet_leaves);
      setSumDryLeaves(data.sum_dry_leaves);
      setSumFlour(data.sum_flour);
      setSumShipmentQuantity(data.sum_shipment_quantity);
    } catch (error) {
      console.error('Error fetching statistics data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [UserID]);

  const statsData = [
    { label: "Wet Leaves", value: sumWetLeaves, unit: "Kg", frontIcon: WetLeaves, modal: false, color: "#79B2B7" },
    { label: "Dry Leaves", value: sumDryLeaves, unit: "Kg", frontIcon: DryLeaves, modal: false, color: "#D2D681" },
    { label: "Powder", value: sumFlour, unit: "Kg", frontIcon: Powder, modal: false, color: "#0F7275" },
    { label: "Packages Sent", value: sumShipmentQuantity, icon_unit: Box, frontIcon: PackageSent, modal: false, color: "#A0C2B5" }
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
      <motion.div initial="hidden" animate="visible"
        variants={fadeUpVariants}
        transition={{ duration: 0.5, delay: 0.1 }}>
        <WidgetContainer>
          <Graph /> 
        </WidgetContainer>
      </motion.div>

      <div className='grid grid-cols-2 gap-4'>
        {statsData[0].value !== "---" && statsData.map((stat, index) => (
          <motion.div
            key={index}
            initial="hidden"
            animate="visible"
            variants={fadeUpVariants}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <StatsContainer
              label={stat.label}
              value={stat.value}
              unit={stat.unit}
              frontIcon={stat.frontIcon}
              icon_unit={stat.icon_unit}
              modal={stat.modal}
              color={stat.color}
              round={"lg"}
            />
          </motion.div>
        ))}
      </div>
      {/* <div className=''>
        <span className="font-semibold text-base font-montserrat leading-5 tracking-tighter text-left ">Last Activity</span>
      </div> */}
      {/* <div className='grid gap-y-1'>
        {LastActivity.map((data, index) => (
          <WidgetContainer key={index}>
            <div className='flex items-center'>
              <img src={WarningSign} alt="warning" className='w-10 h-auto ml-1' />
              <span className='ml-4'>{data.message}</span>
            </div>
          </WidgetContainer>
        ))}
      </div> */}
    </>
  );
}

export default DashboardCentra;