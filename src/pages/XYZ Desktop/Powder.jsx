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

const header = 'Recently Gained Powder'; // Example header

const columns = [
  { field: 'status', header: 'Status' },
  { field: 'id', header: 'Batch Id' },
  { field: 'name', header: 'Centra Name' },
  { field: 'weight', header: 'Weight' },
  { field: 'date', header: 'Date' },
  { field: 'expiration', header: 'Expiration Date' },
];

<<<<<<< Updated upstream
const Powder = () => {
  const [flour, setFlour] = useState([]);
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({
    awaiting: 0,
    processed: 0,
    wasted: 0,
    total: 0
  });

  useEffect(() => {
    const fetchFlour = async () => {
      try {
        const flourResponse = await axios.get(`${API_URL}/flour/get`);
        const usersResponse = await axios.get(`${API_URL}/user/get`);
        setFlour(flourResponse.data);
        setUsers(usersResponse.data);

        // Calculate statistics
        const stats = {
          awaiting: 0,
          processed: 0,
          wasted: 0,
          total: 0
        };

        flourResponse.data.forEach(item => {
          stats.total += item.Processed_Weight;
          if (item.Status === 'Awaiting') {
            stats.awaiting += item.Processed_Weight;
          } else if (item.Status === 'Processed') {
            stats.processed += item.Processed_Weight;
          } else if (item.Status === 'Expired') {
            stats.wasted += item.Processed_Weight;
          }
        });

        setStats(stats);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchFlour();
  }, []);

  const mergedData = flour.map(item => {
    const user = users.find(u => u.UserID === item.UserID);
    return {
      id: item.FlourID,
      name: user ? user.Username : 'Unknown',
      weight: item.Flour_Weight,
      date: item.ReceivedTime,
      status: item.Status,
      expiration: item.Expiration,
    };
  });

=======
const stats = [
  {
    label: "Powder Produced",
    value: "243",
    unit: "Kg",
    color: "#C0CD30",
    icon: PowderProduced,
    delay: 1
  },
  {
    label: "In-Process Powder",
    value: "243",
    unit: "Kg",
    color: "#79B2B7",
    icon: InProcessPowder,
    delay: 1.25
  },
  {
    label: "Unpackaged Powder",
    value: "250",
    unit: "Kg",
    color: "#0F7275",
    icon: UnpackagedPowder,
    delay: 1.5
  },
  {
    label: "Packaged Powder",
    value: "1500",
    unit: "Kg",
    color: "#0F7275",
    icon: PackagedPowder,
    delay: 1.75
  }
];
const Powder = () => {
>>>>>>> Stashed changes
  const statusBodyTemplate = (rowData) => {
    let backgroundColor;
    let textColor;
    let logo;

    // Determine background color and text color based on status
    switch (rowData.status) {
      case "Awaiting":
        backgroundColor = hexToRGBA("#A0C2B5", 0.5);
        textColor = "#79B2B7";
        logo = <img src={IPI} alt="Logo" style={{ width: '20px', height: '20px' }} />;
        break;
      case "Processed":
        backgroundColor = hexToRGBA("D4965D", 0.5);
        textColor = "#E28834";
        logo = <img src={If} alt="Logo" style={{ width: '20px', height: '20px' }} />;
        break;
      case "Expired":
        backgroundColor = hexToRGBA("#D45D5D", 0.5);
        textColor = "#D45D5D";
        logo = <img src={Exc} alt="Logo" style={{ width: '20px', height: '20px' }} />;
        break;
      case "Thrown":
        backgroundColor = hexToRGBA("9E2B2B", 0.5);
        textColor = "#9E2B2B";
        logo = <img src={trash} alt="Logo" style={{ width: '20px', height: '20px' }} />;
        break;
      default:
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
          <span>{rowData.status}</span>
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
            label="Powder Produced"
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
            label="In-Process Powder"
            value={stats.processed}
            unit="Kg"
            description=""
            color="#79B2B7"
            modal={false}
            frontIcon={InProcessPowder}
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
            label="Unpackaged Powder"
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
            label="Packaged Powder"
            value={stats.total}
            unit="Kg"
            description=""
            color="#0F7275"
            modal={false}
            frontIcon={PackagedPowder}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Powder;