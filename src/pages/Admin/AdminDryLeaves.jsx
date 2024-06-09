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
import LeavesPopup from '@components/Popups/LeavesPopup';

const header = 'Recently Gained Dry Leaves';

const columns = [
  { field: 'id', header: 'Batch Id' },
  { field: 'name', header: 'Centra Name' },
  { field: 'weight', header: 'Weight' },
  { field: 'date', header: 'Date' },
  { field: 'expiration', header: 'Expiration Date' },
  { field: 'status', header: 'Status' }
];

const stats = [
  {
    label: "Wasted Leaves",
    value: "250",
    unit: "Kg",
    color: "#0F7275",
    icon: ExpiredWetLeaves,
    delay: 1
  },
  {
    label: "Awaiting Leaves",
    value: "243",
    unit: "Kg",
    color: "#C0CD30",
    icon: AwaitingLeaves,
    delay: 1.25
  },
  {
    label: "Processed Leaves",
    value: "243",
    unit: "Kg",
    color: "#79B2B7",
    icon: ProcessedLeaves,
    delay: 1.5
  },
  {
    label: "Total Dry Leaves",
    value: "1500",
    unit: "Kg",
    color: "#0F7275",
    delay: 1.75
  }
];

const AdminDryLeaves = () => {
  const [data, setData] = useState([]);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [editable, setEditable] = useState(false);
  const leavesModalRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/dryleaves/get/`);
        const processedData = await Promise.all(response.data.map(async item => ({
          id: item.DryLeavesID,
          name: await getUser(item.UserID),
          weight: item.Processed_Weight + " Kg",
          date: formatDate(item.ReceivedTime),
          expiration: formatDate(addMonth(item.ReceivedTime)),
          status: "Awaiting" // Assuming status is a part of the response
        })));
        setData(processedData);
      } catch (error) {
        console.error('Error fetching dry leaves data', error);
      }
    };

    fetchData();

    // Clean up
    return () => {
      setData([]);
    };
  }, []);

  const getUser = async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/user/get_user/${userId}`);
      return response.data.Username;
    } catch (error) {
      console.error('Error fetching user data', error);
      return 'Unknown User';
    }
  };

  const formatDate = (dateString) => {
    return dayjs(dateString).format('MM/DD/YYYY HH:mm');
  };

  const addMonth = (dateString) => {
    return dayjs(dateString).add(1, 'month').format('MM/DD/YYYY HH:mm');
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
    if (leavesModalRef.current) {
      leavesModalRef.current.showModal();
    }
  };

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

  const handleEditSubmit = async (updatedData) => {
    try {
      const { id, name, weight, date, expiration } = updatedData;
      await axios.put(`${API_URL}/dryleaves/update/${id}`, {
        UserID: await getUserID(name), // Function to get user ID from name
        Processed_Weight: weight.replace(' Kg', ''),
        ReceivedTime: new Date(date).toISOString(),
        ExpirationTime: new Date(expiration).toISOString(),
      });

      // Update the local state
      setData((prevData) =>
        prevData.map((item) =>
          item.id === id ? { ...item, name, weight, date, expiration } : item
        )
      );
      leavesModalRef.current.close();
      setEditable(false);
    } catch (error) {
      console.error('Error updating dry leaves data', error);
    }
  };

  const getUserID = async (username) => {
    try {
      const response = await axios.get(`${API_URL}/user/get_user_id/${username}`);
      return response.data.UserID;
    } catch (error) {
      console.error('Error fetching user ID', error);
      return null;
    }
  };

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
          dry_leaves={true}
          leavesid={selectedRowData.id}
          editable={editable}
          onSubmit={handleEditSubmit}
        />
      )}
    </div>
  );
};

export default AdminDryLeaves;