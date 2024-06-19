import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import 'daisyui/dist/full.css';
import TableComponent from '@components/LeavesTables/TableComponent';
import trash from '@assets/icons/trash.svg';
import IPI from '@assets/icons/IPI.svg';
import If from '@assets/icons/Wat.svg';
import Exc from '@assets/icons/Exc.svg';
import AwaitingLeaves from '@assets/AwaitingLeaves.svg';
import ExpiredWetLeaves from '@assets/ExpiredLeavesWet.svg';
import ProcessedLeaves from '@assets/ProcessedLeaves.svg';
import TotalCollectedWet from '@assets/TotalCollectedWet.svg';
import { API_URL } from '../../App';
import {motion} from "framer-motion"
import dayjs from 'dayjs';
import LoadingStatic from "@components/LoadingStatic"
import LeavesPopup from '@components/Popups/LeavesPopup';
import StatsContainer from "@components/Cards/StatsContainer";

const header = 'Recently Gained Wet Leaves';

const columns = [
  { field: 'status', header: 'Status' },
  { field: 'id', header: 'Batch Id' },
  { field: 'name', header: 'Centra Name' },
  { field: 'weight', header: 'Weight' },
  { field: 'expiration', header: 'Expiration Date' },
];

const WetLeaves = () => {
  const [data, setData] = useState([]);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    awaiting: 0,
    processed: 0,
    wasted: 0,
    total: 0,
  });

  const leavesModalRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [wetLeavesResponse, usersResponse] = await Promise.all([
          axios.get(`${API_URL}/wetleaves/get`),
          axios.get(`${API_URL}/user/get`),
        ]);

        const users = usersResponse.data.reduce((acc, user) => {
          acc[user.UserID] = user.Username;
          return acc;
        }, {});

        const stats = {
          awaiting: 0,
          processed: 0,
          wasted: 0,
          total: 0,
        };

        const processedData = wetLeavesResponse.data.map(item => {
          const isExpired = new Date(item.Expiration) < new Date();
          if (item.Status === 'Processed') {
            stats.processed += item.Weight;
          } else if (isExpired || item.Status === "Thrown") {
            stats.wasted += item.Weight;
          } else if (item.Status === 'Awaiting') {
            stats.awaiting += item.Weight;
          }
          stats.total += item.Weight;

          return {
            id: item.WetLeavesID,
            name: users[item.UserID] || 'Unknown User',
            weight: item.Weight,
            expiration: formatDate(item.Expiration),
            expiredDate: item.Expiration,
            status: item.Status,
          };
        });

        setData(processedData);
        setStats(stats);
      } catch (error) {
        console.error('Error fetching wet leaves data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateString) => {
    return dayjs(dateString).format('MM/DD/YYYY HH:mm');
  };

  const handleDetailsClick = (rowData) => {
    setSelectedRowData(rowData);
    if (leavesModalRef.current) {
      setTimeout(() => leavesModalRef.current.showModal(), 100);
    }
  };

  const statusBodyTemplate = (rowData) => {
    let backgroundColor;
    let textColor;
    let logo;

    const currentTime = new Date();
    const isExpired = new Date(rowData.expiredDate) < currentTime;

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

  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <LoadingStatic />
    </div>;
  }

  return (
    <div className="container mx-auto w-full">
      <TableComponent
        data={data}
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
            label="Processed Leaves"
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
            label="Wasted Leaves"
            value={stats.wasted || "0"}
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
            value={stats.total || "0"}
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
          status={selectedRowData.status}
          weight={selectedRowData.weight}
          centra_name={selectedRowData.name}
          expiredDate={selectedRowData.expiredDate}
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
