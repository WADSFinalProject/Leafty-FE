import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import 'daisyui/dist/full.css';
import TableComponent from '@components/LeavesTables/TableComponent';
import trash from '@assets/icons/trash.svg';
import IPI from '@assets/icons/IPI.svg';
import If from '@assets/icons/Wat.svg';
import Exc from '@assets/icons/Exc.svg';
import LoadingStatic from '../../components/LoadingStatic';
import LeavesPopup from '@components/Popups/LeavesPopup';
import { API_URL } from '../../App';
import dayjs from 'dayjs';

const header = 'Recently Gained Dry Leaves';

const columns = [
  { field: 'id', header: 'Batch Id' },
  { field: 'name', header: 'Centra Name' },
  { field: 'weight', header: 'Weight' },
  { field: 'expiration', header: 'Expiration Date' },
  { field: 'status', header: 'Status' }
];

const AdminDryLeaves = () => {
  const [data, setData] = useState([]);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [editable, setEditable] = useState(false);
  const [loading, setLoading] = useState(true);
  const leavesModalRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [leavesResponse, usersResponse] = await Promise.all([
          axios.get(`${API_URL}/dryleaves/get/`),
          axios.get(`${API_URL}/user/get`)
        ]);

        const users = usersResponse.data.reduce((acc, user) => {
          acc[user.UserID] = user.Username;
          return acc;
        }, {});

        const processedData = leavesResponse.data.map(item => ({
          id: item.DryLeavesID,
          name: users[item.UserID] || 'Unknown User',
          weight: `${item.Processed_Weight}`,
          expiration: formatDate(item.Expiration),
          expiredDate: item.Expiration,
          status: item.Status,
        }));

        setData(processedData);
      } catch (error) {
        console.error('Error fetching dry leaves data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateString) => {
    return dayjs(dateString).format('MM/DD/YYYY HH:mm');
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/dryleaves/delete/${id}`);
      setData(data.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error deleting dry leaves data', error);
    }
  };

  const handleDetailsClick = (rowData) => {
    setSelectedRowData(rowData);
    setEditable(false);
    if (leavesModalRef.current) {
      leavesModalRef.current.showModal();
    }
  };

  const handleEditClick = (rowData) => {
    setSelectedRowData(rowData);
    setEditable(true);
    console.log(rowData)
    if (leavesModalRef.current) {
      leavesModalRef.current.showModal();
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
          height: dynamicHeight,
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
        className="rounded-md overflow-hidden"
      >
        <div className="flex items-center justify-center gap-2">
          <span>{rowData.status === "Awaiting" && (new Date(rowData.expiredDate) < new Date()) ? "Expired" : rowData.status}</span>
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
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <LoadingStatic />
      </div>
    );
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
          key={selectedRowData.id} // Add key to force re-render
          weight={selectedRowData.weight}
          centra_name={selectedRowData.name}
          expiredDate={selectedRowData.expiredDate}
          ref={leavesModalRef}
          dry_leaves={true}
          status={selectedRowData.status}
          leavesid={selectedRowData.id}
          editable={editable}
        />
      )}
    </div>
  );
};

export default AdminDryLeaves;
