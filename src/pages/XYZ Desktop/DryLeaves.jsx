import { useState, useEffect, useRef } from 'react';
import LeavesPopup from "@components/Popups/LeavesPopup"
import 'daisyui/dist/full.css';
import { motion } from "framer-motion";
import StatsContainer from "@components/Cards/StatsContainer";
import TableComponent from '@components/LeavesTables/TableComponent';
import trash from '@assets/icons/trash.svg';
import IPI from '@assets/icons/IPI.svg';
import If from '@assets/icons/Wat.svg';
import Exc from '@assets/icons/Exc.svg';
import AwaitingLeaves from '@assets/AwaitingDryLeaves.svg';
import ExpiredDryLeaves from '@assets//ExpiredDryLeaves.svg';
import ProcessedLeaves from '@assets/In-ProcessLeaves.svg';
import TotalDryLeaves from '@assets/TotalDryLeaves.svg';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import LoadingStatic from '../../components/LoadingStatic';
import axios from 'axios';  // Ensure you have axios installed and imported
import dayjs from 'dayjs';
import { API_URL } from "../../App"; // Adjust the import path to your configuration file

const header = 'Recently Gained Dry Leaves'; // Example header

const columns = [
  { field: 'status', header: 'Status' },
  { field: 'id', header: 'Batch Id' },
  { field: 'name', header: 'Centra Name' },
  { field: 'weight', header: 'Weight' },
  { field: 'expiration', header: 'Expiration Date' },
];

const DryLeaves = () => {
  const [dryLeaves, setDryLeaves] = useState([]);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({
    awaiting: 0,
    processed: 0,
    wasted: 0,
    total: 0
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDryLeaves = async () => {
      try {
        const dryLeavesResponse = await axios.get(`${API_URL}/dryleaves/get`);
        const usersResponse = await axios.get(`${API_URL}/user/get`);
        setDryLeaves(dryLeavesResponse.data);
        setUsers(usersResponse.data);

        // Calculate statistics
        const stats = {
          awaiting: 0,
          processed: 0,
          wasted: 0,
          total: 0
        };

        dryLeavesResponse.data.forEach(leaf => {
          stats.total += leaf.Processed_Weight;
          if (new Date(leaf.Expiration) < new Date() && leaf.Status === 'Awaiting') {
            stats.wasted += leaf.Processed_Weight;
          } else if (leaf.Status === 'Processed') {
            stats.processed += leaf.Processed_Weight;
          } else if (leaf.Status === 'Awaiting') {
            stats.awaiting += leaf.Processed_Weight;
          }
        });

        setStats(stats);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // Move setLoading(false) inside the finally block
      }
    };

    fetchDryLeaves();
  }, []);


  const formatDate = (dateString) => {
    return dayjs(dateString).format('MM/DD/YYYY HH:mm');
  };

  const addMonth = (dateString) => {
    return dayjs(dateString).add(1, 'month').format('MM/DD/YYYY HH:mm');
  };


  const mergedData = dryLeaves.map(leaf => {
    const user = users.find(u => u.UserID === leaf.UserID);
    return {
      id: leaf.DryLeavesID,
      name: user ? user.Username : 'Unknown',
      weight: leaf.Processed_Weight,
      status: leaf.Status,
      expiration: formatDate(leaf.Expiration),
      expiredDate: leaf.Expiration,
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



  const leavesModalRef = useRef(null);

  const handleDetailsClick = (rowData) => {
    setSelectedRowData(rowData);
    if (leavesModalRef.current) {
      setTimeout(() => leavesModalRef.current.showModal(), 100);
    }
  };

  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <LoadingStatic />
    </div>;
  }

  return (
    <div className="container mx-auto w-full">
      <TableComponent data={mergedData} header={header} columns={columns} ColorConfig={statusBodyTemplate} admin={false} onDetailsClick={handleDetailsClick} />
      <div className="flex flex-wrap gap-4 justify-stretch">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.35, delay: 1 }}
          className="flex-grow flex-shrink lg:basis-1/5 basis-1/2"
        >
          <StatsContainer
            label="Awaiting Dry Leaves"
            value={stats.awaiting || "0"}
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
            label="In-Processed Leaves"
            value={stats.processed || "0"}
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
            label="Expired Dry Leaves"
            value={stats.wasted || "0"}
            unit="Kg"
            description=""
            color="#0F7275"
            modal={false}
            frontIcon={ExpiredDryLeaves}
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
            label="Total Collected Dry Leaves"
            value={stats.total || "0"}
            unit="Kg"
            description=""
            color="#0F7275"
            modal={false}
            frontIcon={TotalDryLeaves}
          />
        </motion.div>
      </div>
      {selectedRowData && (
        <LeavesPopup
          status={selectedRowData.status}
          weight={selectedRowData.weight}
          centra_name={selectedRowData.name}
          expiredDate={selectedRowData.expiredDate}
          ref={leavesModalRef}
          dry_leaves={true}
          leavesid={selectedRowData.id}
          editable={false}
        />
      )}
    </div>
  );
};

export default DryLeaves;