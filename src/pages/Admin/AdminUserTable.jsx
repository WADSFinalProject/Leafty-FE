import { useState, useEffect } from 'react';
import 'daisyui/dist/full.css';
import { animate, motion, useAnimationControls } from "framer-motion";
import TableComponent from '../../components/LeavesTables/TableComponent';

const data = [
  { userid: "#12345", username: 'example123', email: 'example@gmail.com', phone: '0855-1234-5678', role: "Centra" },
  { userid: "#12345", username: 'example123', email: 'example@gmail.com', phone: '0855-1234-5678', role: "XYZ" },
  { userid: "#12345", username: 'example123', email: 'example@gmail.com', phone: '0855-1234-5678', role: 'Harbor' },
  { userid: "#12345", username: 'example123', email: 'example@gmail.com', phone: '0855-1234-5678', role: "XYZ" },
  { userid: "#12345", username: 'example123', email: 'example@gmail.com', phone: '0855-1234-5678', role: "Centra" },
  { userid: "#12345", username: 'example123', email: 'example@gmail.com', phone: '0855-1234-5678', role: "Harbor" },
  { userid: "#12345", username: 'example123', email: 'example@gmail.com', phone: '0855-1234-5678', role: "Harbor" },
  { userid: "#12345", username: 'example123', email: 'example@gmail.com', phone: '0855-1234-5678', role: "XYZ" },
  { userid: "#12345", username: 'example123', email: 'example@gmail.com', phone: '0855-1234-5678', role: "Centra" },
  { userid: "#12345", username: 'example123', email: 'example@gmail.com', phone: '0855-1234-5678', role: "Harbor" },
  { userid: "#12345", username: 'example123', email: 'example@gmail.com', phone: '0855-1234-5678', role: "Centra" },
  { userid: "#12345", username: 'example123', email: 'example@gmail.com', phone: '0855-1234-5678', role: "XYZ" },
  { userid: "#12345", username: 'example123', email: 'example@gmail.com', phone: '0855-1234-5678', role: "Harbor" },
  { userid: "#12345", username: 'example123', email: 'example@gmail.com', phone: '0855-1234-5678', role: "XYZ" },
];

const header = 'User Management';

const columns = [
  { field: 'userid', header: 'User Id' },
  { field: 'username', header: 'Username' },
  { field: 'email', header: 'Email' },
  { field: 'phone', header: 'Phone Number' },
  { field: 'role', header: 'Role' },
];

const AdminUserTable = () => {
  const hexToRGBA = (hex, opacity) => {
    hex = hex.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };

  const RoleBodyTemplate = (rowData) => {
    let backgroundColor;
    let textColor;

    switch (rowData.role) {
      case "Centra":
        backgroundColor = hexToRGBA("#0F727580", 0.5);
        textColor = "#000000";
        break;
      case "Harbor":
        backgroundColor = hexToRGBA("#C0CD30", 0.5);
        textColor = "#000000"; 
        break;
      case "XYZ":
        backgroundColor = hexToRGBA("#94C3B380", 0.5);
        textColor = "#000000"; 
        break;
      default:
        backgroundColor = "inherit"; // Use default background color
        textColor = "#000000"; // Default text color
    }

    const dynamicWidth = "100px";  // Example width, adjust according to your needs
    const dynamicHeight = "35px";  // Example height, adjust according to your needs

    return (
      <div
        style={{
          backgroundColor,
          color: textColor,
          width: dynamicWidth,
          height: dynamicHeight
        }}
        className="flex items-center justify-center rounded-3xl overflow-hidden"
      >
        <div className="flex items-center">
          <span>{rowData.role}</span>
        </div>
      </div>
    );
  };

  const [collapsed, setCollapsed] = useState(false);
  const [tabletMode, setTabletMode] = useState(false);
  const [currentFilter, setCurrentFilter] = useState("All Time");

  return (
    <div className="container mx-auto w-full">
      <TableComponent data={data} header={header} columns={columns} ColorConfig={RoleBodyTemplate} admin={true} rows={10} depends='role'/>
    </div>
  );
};

export default AdminUserTable;
