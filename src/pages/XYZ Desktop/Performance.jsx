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
import axios from 'axios';
import { API_URL } from "../../App"; // Adjust the import path to your configuration file

const Performance = () => {
  const [centraUsers, setCentraUsers] = useState([]);
  const [harborUsers, setHarborUsers] = useState([]);
  const [wetLeavesStats, setWetLeavesStats] = useState({
    awaiting: 0,
    processed: 0,
    wasted: 0,
    total: 0
  });

  useEffect(() => {
    fetchUsers().then(data => {
      console.log("Fetched users:", data); // Log all fetched users
      const centra = data.filter(user => user.RoleID === 1);
      const harbor = data.filter(user => user.RoleID === 2);
      console.log("Centra users:", centra); // Log filtered Centra users
      console.log("Harbor users:", harbor); // Log filtered Harbor users
      setCentraUsers(centra);
      setHarborUsers(harbor);
    }).catch(error => {
      console.error("Error fetching users:", error); // Log any errors during fetching
    });

    fetchWetLeaves().then(data => {
      const stats = {
        awaiting: 0,
        processed: 0,
        wasted: 0,
        total: 0
      };

      data.forEach(leaf => {
        stats.total += leaf.Weight;
        if (leaf.Status === 'Awaiting') {
          stats.awaiting += leaf.Weight;
        } else if (leaf.Status === 'Processed') {
          stats.processed += leaf.Weight;
        } else if (leaf.Status === 'Expired') {
          stats.wasted += leaf.Weight;
        }
      });

      console.log("Wet leaves stats:", stats); // Log wet leaves stats
      setWetLeavesStats(stats);
    }).catch(error => {
      console.error("Error fetching wet leaves:", error); // Log any errors during fetching
    });
  }, []);

  const fetchUsers = async () => {
    const response = await fetch(`${API_URL}/user/get`);
    const data = await response.json();
    return data;
  };

  const fetchWetLeaves = async () => {
    const response = await axios.get(`${API_URL}/wetleaves/get`);
    return response.data;
  };

  return (
    <div className="container mx-auto w-full flex gap-2 flex-col">
      <div className="flex flex-wrap gap-4 justify-stretch">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.35, delay: 1 }}
          className="flex-grow flex-shrink lg:basis-1/5 basis-1/2"
        >
          <StatsContainer
            label="Awaiting Leaves"
            value={wetLeavesStats.awaiting}
            unit="Kg"
            description=""
            color="#C0CD30"
            modal={false}
            frontIcon={AwaitingLeaves}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.35, delay: 1.25 }}
          className="flex-grow flex-shrink lg:basis-1/5 basis-1/2"
        >
          <StatsContainer
            label="Processed Leaves"
            value={wetLeavesStats.processed}
            unit="Kg"
            description=""
            color="#79B2B7"
            modal={false}
            frontIcon={ProcessedLeaves}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.35, delay: 1.5 }}
          className="flex-grow flex-shrink lg:basis-1/5 basis-1/2"
        >
          <StatsContainer
            label="Wasted Leaves"
            value={wetLeavesStats.wasted}
            unit="Kg"
            description=""
            color="#0F7275"
            modal={false}
            frontIcon={ExpiredWetLeaves}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.35, delay: 1.75 }}
          className="flex-grow flex-shrink lg:basis-1/5 basis-1/2"
        >
          <StatsContainer
            label="Total Wet Leaves"
            value={wetLeavesStats.total}
            unit="Kg"
            description=""
            color="#0F7275"
            modal={false}
            frontIcon={TotalCollectedWet}
          />
        </motion.div>
      </div>
      <span className='font-bold text-xl'>Map Distribution</span>
      <WidgetContainer padding={false}>
        <PerformanceMap setShowMap={() => {}} setAddressDetails={() => {}} />
      </WidgetContainer>
      <div className='flex gap-2 flex-row'>
        <div className='flex flex-col w-1/2'>
          <div className='flex justify-between items-center mb-2'>
            <span className='text-xl font-semibold'>Centra List</span>
            <span className='text-md text-[#94C3B3]'>See all</span>
          </div>
          <div className='flex flex-col gap-2'>
            {centraUsers.slice(0, 3).map(user => (
              <LongUser key={user.UserID} Atis={user.Username} Mailis={user.Email} Phonis={user.Phone} centra />
            ))}
          </div>
        </div>
        <div className='flex flex-col w-1/2'>
          <MarkerDetails centra wet_leaves={200} dry_leaves={200} powder={100} packages={10} />
          <div className='flex justify-between items-center mt-2'>
            <span className='text-xl font-semibold'>Harbor List</span>
          </div>
          <div className='flex flex-col gap-2'>
            {harborUsers.map(user => (
              <LongUser key={user.UserID} Atis={user.Username} Mailis={user.Email} Phonis={user.Phone} harbor />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Performance;
