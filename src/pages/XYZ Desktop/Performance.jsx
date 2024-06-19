import { useState, useEffect } from 'react';
import 'daisyui/dist/full.css';
import { motion } from "framer-motion";
import StatsContainer from "@components/Cards/StatsContainer";
import AwaitingLeaves from '@assets/AwaitingLeaves.svg';
import ExpiredWetLeaves from '@assets/ExpiredLeavesWet.svg';
import ProcessedLeaves from '@assets/ProcessedLeaves.svg';
import TotalCollectedWet from '@assets/TotalCollectedWet.svg';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import WidgetContainer from '../../components/Cards/WidgetContainer';
import PerformanceMap from '../../components/PerformanceMap';
import MarkerDetails from '../../components/MarkerDetails';
import LongUser from '../../components/Cards/LongUser';
import WetLeavesLogo from '../../assets/WetLeavesPerformance.svg';
import DryLeavesLogo from '../../assets/DryLeavesPerformance.svg';
import PowderLogo from '../../assets/PowderPerformance.svg';
import ShipmentLogo from '../../assets/PackagePerformance.svg';
import box from "@assets/PackageBox.svg"
import axios from 'axios';
import { API_URL } from "../../App"; // Adjust the import path to your configuration file

const Performance = () => {
  const [centraUsers, setCentraUsers] = useState([]);
  const [harborUsers, setHarborUsers] = useState([]);
  const [statistics, setStatistics] = useState({
    sum_wet_leaves: 0,
    sum_dry_leaves: 0,
    sum_flour: 0,
    sum_shipment_quantity: 0
  })

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await axios.get(API_URL + "/statistics/all_no_format");
        setStatistics(response.data);
      } catch (error) {
        console.error("Error fetching statistics:", error);
      }
    };

    fetchStatistics();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.25 }}
      className="container mx-auto w-full flex gap-2 flex-col"
    >
      <div className="flex flex-wrap gap-4 justify-stretch">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.1 }}
          className="flex-grow flex-shrink lg:basis-1/5 basis-1/2"
        >
          <StatsContainer
            label="Wet Leaves Total"
            value={statistics.sum_wet_leaves}
            unit="Kg"
            description=""
            color="#C0CD30"
            modal={false}
            frontIcon={WetLeavesLogo}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.1 }}
          className="flex-grow flex-shrink lg:basis-1/5 basis-1/2"
        >
          <StatsContainer
            label="Dry Leaves Total"
            value={statistics.sum_dry_leaves}
            unit="Kg"
            description=""
            color="#79B2B7"
            modal={false}
            frontIcon={DryLeavesLogo}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.1 }}
          className="flex-grow flex-shrink lg:basis-1/5 basis-1/2"
        >
          <StatsContainer
            label="Powder Total"
            value={statistics.sum_flour}
            unit="Kg"
            description=""
            color="#0F7275"
            modal={false}
            frontIcon={PowderLogo}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.1 }}
          className="flex-grow flex-shrink lg:basis-1/5 basis-1/2"
        >
          <StatsContainer
            label="Packages Received"
            value={statistics.sum_shipment_quantity}
            icon_unit = {box}
            description=""
            color="#0F7275"
            modal={false}
            frontIcon={ShipmentLogo}
          />
        </motion.div>
      </div>
      <span className='font-bold text-xl'>Map Distribution</span>
      <WidgetContainer padding={false}>
        <PerformanceMap setShowMap={() => { }} setAddressDetails={() => { }} />
      </WidgetContainer>

    </motion.div>
  );
};

export default Performance;
