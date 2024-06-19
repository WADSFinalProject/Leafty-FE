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
import dayjs from 'dayjs';
import LoadingStatic from "@components/LoadingStatic"
import LeavesPopup from '@components/Popups/LeavesPopup';

const header = 'Recently Gained Wet Leaves';

const columns = [
  { field: 'id', header: 'Batch Id' },
  { field: 'name', header: 'Centra Name' },
  { field: 'weight', header: 'Weight' },
  { field: 'expiration', header: 'Expiration Date' },
  { field: 'status', header: 'Status' }
];



const AdminWetLeaves = () => {
  const [data, setData] = useState([]);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [editable, setEditable] = useState(false);
  const leavesModalRef = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Set loading to true when fetching data
        const [response, usersResponse] = await Promise.all([
          axios.get(`${API_URL}/wetleaves/get`),
          axios.get(`${API_URL}/user/get`)
        ]);

        const users = usersResponse.data.reduce((acc, user) => {
          acc[user.UserID] = user.Username;
          return acc;
        }, {});

        const processedData = response.data.map(item => ({
          id: item.WetLeavesID,
          name: users[item.UserID] || 'Unknown User',
          weight: item.Weight,
          expiration: formatDate(item.Expiration),
          status: item.Status,
        }));

        setData(processedData);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error('Error fetching wet leaves data', error);
        setLoading(false); // Ensure loading is set to false on error
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateString) => {
    return dayjs(dateString).format('MM/DD/YYYY HH:mm');
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/wetleaves/delete/${id}`);
      setData(data.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error deleting wet leaves data', error);
    }
  };

  const handleDetailsClick = (rowData) => {
    setSelectedRowData(rowData);
    setEditable(false);
    if (leavesModalRef.current) {
      setTimeout(leavesModalRef.current.showModal(), 100);
    }
  };

  const handleEditClick = (rowData) => {
    setSelectedRowData(rowData);
    setEditable(true);
    if (leavesModalRef.current) {
      setTimeout(leavesModalRef.current.showModal(), 100);
    }
  };

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

  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <LoadingStatic />
    </div>
  }

  return (
    <div className="container mx-auto w-full">
      <TableComponent
        data={data}
        header={header}
        columns={columns}
        ColorConfig={statusBodyTemplate}
        admin={true}
        rows={10}
        onDelete={handleDelete}
        onEditClick={handleEditClick}
        onDetailsClick={handleDetailsClick}
      />
      {selectedRowData && (
        <LeavesPopup
          weight={selectedRowData.weight}
          centra_name={selectedRowData.name}
          collectedDate={selectedRowData.date}
          expiredDate={selectedRowData.expiration}
          ref={leavesModalRef}
          wet_leaves={true}
          leavesid={selectedRowData.id}
          editable={editable}
        />
      )}
    </div>
  );
};

export default AdminWetLeaves;
