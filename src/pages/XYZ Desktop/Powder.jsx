import { useState, useEffect } from 'react';
import 'daisyui/dist/full.css';
import { motion } from "framer-motion";
import StatsContainer from "@components/Cards/StatsContainer";
import TableComponent from '@components/LeavesTables/TableComponent';
import trash from '@assets/icons/trash.svg';
import IPI from '@assets/icons/IPI.svg';
import If from '@assets/icons/Wat.svg';
import Exc from '@assets/icons/Exc.svg';
import PowderProduced from '@assets/PowderProduced.svg';
import InProcessPowder from '@assets/In-ProcessPowder.svg';
import UnpackagedPowder from '@assets/UnpackagedPowder.svg';
import PackagedPowder from '@assets/PackagedPowder.svg';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import axios from 'axios';  // Ensure you have axios installed and imported
import { API_URL } from "../../App"; // Adjust the import path to your configuration file
import dayjs from 'dayjs';
import LoadingStatic from '../../components/LoadingStatic';

const header = 'Recently Gained Powder'; // Example header

const columns = [
  { field: 'status', header: 'Status' },
  { field: 'id', header: 'Batch Id' },
  { field: 'name', header: 'Centra Name' },
  { field: 'weight', header: 'Weight' },
  { field: 'expiration', header: 'Expiration Date' },
];

const Powder = () => {

  const [flour, setFlour] = useState([]);
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({
    awaiting: 0,
    processed: 0,
    wasted: 0,
    total: 0
  });
  const [ContentLoaded, setContentLoaded] = useState(false); 
  useEffect(() => {
    const fetchFlour = async () => {
      try {
        const [flourResponse, usersResponse] = await Promise.all([
          axios.get(`${API_URL}/flour/get`),
          axios.get(`${API_URL}/user/get`)
        ]);
  
        const flourData = flourResponse.data;
        const currentDate = new Date();
        const stats = {
          awaiting: 0,
          processed: 0,
          wasted: 0,
          total: 0
        };
  
        flourData.forEach(item => {
          stats.total += item.Flour_Weight;
  
          if (item.Status === 'Thrown' || (new Date(item.Expiration) < currentDate)) {
            stats.wasted += item.Flour_Weight;
          } else if (item.Status === 'Awaiting') {
            stats.awaiting += item.Flour_Weight;
          } else if (item.Status === 'Processed') {
            stats.processed += item.Flour_Weight;
          }
        });
  
        setFlour(flourData);
        setUsers(usersResponse.data);
        setStats(stats);
        setContentLoaded(true);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error state or logging as necessary
      }
    };
  
    fetchFlour();
  }, []);
  

  const formatDate = (dateString) => {
    return dayjs(dateString).format('MM/DD/YYYY HH:mm');
  };

  const addMonth = (dateString) => {
    return dayjs(dateString).add(1, 'month').format('MM/DD/YYYY HH:mm');
  };

  const mergedData = flour.map(leaf => {
    const user = users.find(u => u.UserID === leaf.UserID);
    return {
      id: leaf.FlourID,
      name: user ? user.Username : 'Unknown',
      weight: leaf.Flour_Weight,
      status: new Date(leaf.Expiration) < new Date() ? "Expired" : leaf.Status,
      expiration: formatDate(leaf.Expiration),
    };
  });

  mergedData.sort((a, b) => {
    if (a.status < b.status) {
      return -1;
    }
    if (a.status > b.status) {
      return 1;
    }
    return 0;
  });

  const statusBodyTemplate = (rowData) => {
    let backgroundColor;
    let textColor;
    let logo;


    const currentTime = new Date();
    const isExpired = new Date(rowData.expiration) < currentTime;

    if (rowData.status === "Awaiting") {
      if (isExpired) {
        backgroundColor = hexToRGBA("#D45D5D", 0.5);
        textColor = "#D45D5D";
        logo = <img src={Exc} alt="Logo" style={{ width: '20px', height: '20px' }} />;
      } else {
        backgroundColor = hexToRGBA("#A0C2B5", 0.5);
        textColor = "#79B2B7";
        logo = <img src={IPI} alt="Logo" style={{ width: '20px', height: '20px' }} />;
      }
    }
    else if (rowData.status === "Expired") {
      backgroundColor = hexToRGBA("#D45D5D", 0.5);
      textColor = "#D45D5D";
      logo = <img src={Exc} alt="Logo" style={{ width: '20px', height: '20px' }} />;
    }
    else if (rowData.status === "Processed") {
      backgroundColor = hexToRGBA("D4965D", 0.5);
      textColor = "#E28834";
      logo = <img src={If} alt="Logo" style={{ width: '20px', height: '20px' }} />;
    } else if (rowData.status === "Thrown") {
      backgroundColor = hexToRGBA("9E2B2B", 0.5);
      textColor = "#9E2B2B";
      logo = <img src={trash} alt="Logo" style={{ width: '20px', height: '20px' }} />;
    } else {
      backgroundColor = "inherit";
      textColor = "#000000";
    }

    const dynamicWidth = "150px";
    const dynamicHeight = "35px";

    return (
      <div
        style={{
          backgroundColor,
          color: textColor,
          width: dynamicWidth,
          height: dynamicHeight
        }}
        className="flex items-center justify-center rounded-md overflow-hidden"
      >
        <div className="flex items-center gap-2">
          <span>{rowData.status === "Awaiting" && (new Date(rowData.expiration) < new Date()) ? "Expired" : rowData.status}</span>
          {logo}
        </div>
      </div>
    );
  };

  const hexToRGBA = (hex, opacity) => {
    hex = hex.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };

  return (
    <div className="container mx-auto w-full h-screen flex items-center justify-center">
    {!ContentLoaded && (
      <div className="fixed inset-0 flex items-center justify-center">
        <LoadingStatic />
      </div>
    )} 
    {ContentLoaded && (
    <div className="container mx-auto w-full">
      <TableComponent data={mergedData} header={header} columns={columns} ColorConfig={statusBodyTemplate} admin={false} />
      <div className="flex flex-wrap gap-4 justify-stretch">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.35, delay: 1 }}
          className="flex-grow flex-shrink lg:basis-1/5 basis-1/2"
        >
          <StatsContainer
            label="Ready Powder"
            value={stats.awaiting}
            unit="Kg"
            description=""
            color="#C0CD30"
            modal={false}
            frontIcon={PowderProduced}
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
            label="Packaged Powder"
            value={stats.processed}
            unit="Kg"
            description=""
            color="#79B2B7"
            modal={false}
            frontIcon={PackagedPowder}
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
            label="Thrown Powder"
            value={stats.wasted}
            unit="Kg"
            description=""
            color="#0F7275"
            modal={false}
            frontIcon={UnpackagedPowder}
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
            label="Total Produced Powder"
            value={stats.total}
            unit="Kg"
            description=""
            color="#0F7275"
            modal={false}
            frontIcon={InProcessPowder}
          />
        </motion.div>
      </div>
      </div>
      )}
    </div>
  );
};

export default Powder;