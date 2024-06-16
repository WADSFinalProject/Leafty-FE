import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import 'daisyui/dist/full.css';
import { motion } from "framer-motion";
import StatsContainer from "@components/Cards/StatsContainer";
import TableComponent from '@components/LeavesTables/TableComponent';
import trash from '@assets/icons/trash.svg';
import IPI from '@assets/icons/IPI.svg';
import If from '@assets/icons/Wat.svg';
import Exc from '@assets/icons/Exc.svg';
import AwaitingLeaves from '@assets/AwaitingLeaves.svg';
import ExpiredWetLeaves from '@assets/ExpiredLeavesWet.svg';
import ProcessedLeaves from '@assets/ProcessedLeaves.svg';
import TotalCollectedWet from '@assets/TotalCollectedWet.svg';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import dayjs from 'dayjs';
import LeavesPopup from '@components/Popups/LeavesPopup';
import { API_URL } from "../../App"; // Adjust the import path to your configuration file

const header = 'Recently Gained Wet Leaves';

const columns = [
  { field: 'status', header: 'Status' },
  { field: 'id', header: 'Batch Id' },
  { field: 'name', header: 'Centra Name' },
  { field: 'weight', header: 'Weight' },
  { field: 'expiration', header: 'Expiration Date' },
];

const WetLeaves = () => {
  const [wetLeaves, setWetLeaves] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [stats, setStats] = useState({
    awaiting: 0,
    processed: 0,
    wasted: 0,
    total: 0
  });
  const leavesModalRef = useRef(null);

  const formatDate = (dateString) => {
    return dayjs(dateString).format('MM/DD/YYYY HH:mm');
  };

  const addMonth = (dateString) => {
    return dayjs(dateString).add(1, 'month').format('MM/DD/YYYY HH:mm');
  };

  const handleDetailsClick = (rowData) => {
    setSelectedRowData(rowData);
    if (leavesModalRef.current) {
      leavesModalRef.current.showModal();
    }
  };


  useEffect(() => {
    const fetchWetLeaves = async () => {
      try {
        const wetLeavesResponse = await axios.get(`${API_URL}/wetleaves/get`);
        const usersResponse = await axios.get(`${API_URL}/user/get`);
        setWetLeaves(wetLeavesResponse.data);
        setUsers(usersResponse.data);

        const stats = {
          awaiting: 0,
          processed: 0,
          wasted: 0,
          total: 0
        };

        wetLeavesResponse.data.forEach(leaf => {
          stats.total += leaf.Weight;
          if (leaf.Status === 'Awaiting') {
            stats.awaiting += leaf.Weight;
          } else if (leaf.Status === 'Processed') {
            stats.processed += leaf.Weight;
          } else if (leaf.Status === 'Expired') {
            stats.wasted += leaf.Weight;
          }
        });

        setStats(stats);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchWetLeaves();
  }, []);

  const mergedData = wetLeaves.map(leaf => {
    const user = users.find(u => u.UserID === leaf.UserID);
    return {
      id: leaf.WetLeavesID,
      name: user ? user.Username : 'Unknown',
      weight: leaf.Weight,
      status: leaf.Status,
      expiration: formatDate((leaf.ReceivedTime)),
    };
  });

  const statusBodyTemplate = (rowData) => {
    let backgroundColor;
    let textColor;
    let logo;

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
      <TableComponent
        data={mergedData}
        header={header}
        columns={columns}
        ColorConfig={statusBodyTemplate}
        admin={false}
        onDetailsClick={handleDetailsClick}
      />
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
            value={stats.awaiting}
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
            value={stats.processed}
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
            value={stats.wasted}
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
            value={stats.total}
            unit="Kg"
            description=""
            color="#0F7275"
            modal={false}
            frontIcon={TotalCollectedWet}
          />
        </motion.div>
      </div>
      {selectedRowData && (
        <LeavesPopup
          weight={selectedRowData.weight}
          centra_name={selectedRowData.name}
          collectedDate={selectedRowData.receivedTime}
          expiredDate={selectedRowData.expiration}
          ref={leavesModalRef}
          wet_leaves={true}
          leavesid={selectedRowData.id}
          editable={false}
        />
      )}
    </div>
  );
};

export default WetLeaves;
