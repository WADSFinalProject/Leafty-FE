import { useState, useEffect } from 'react';
import 'daisyui/dist/full.css';
import { animate, motion, useAnimationControls } from "framer-motion";
import StatsContainer from "../components/Cards/StatsContainer";
import TableComponent from '../components/TableComponent';
import { hexToRgb } from '@mui/material';
import trash from '../assets/icons/trash.svg';
import IPI from '../assets/icons/IPI.svg';
import If from '../assets/icons/Wat.svg';
import Exc from '../assets/icons/Exc.svg';
import AwaitingLeaves from '../assets/AwaitingLeaves.svg';
import ExpiredWetLeaves from '../assets/ExpiredLeavesWet.svg';
import ProcessedLeaves from '../assets/ProcessedLeaves.svg';
import TotalCollectedWet from '../assets/TotalCollectedWet.svg';
import "primereact/resources/themes/lara-light-cyan/theme.css";

const data = [
  { status: "Awaiting", id: 1, name: 'John Doe', weight: 10, date: '17/06/2024 13:05', expiration: "17/08/2024 13:05" },
  { status: "Awaiting", id: 2, name: 'John Doe', weight: 10, date: '17/06/2024 13:05', expiration: "17/07/2024 13:05" },
  { status: "Awaiting", id: 3, name: 'John Doe', weight: 10, date: '17/06/2024 13:05', expiration: "17/07/2024 13:05" },
  { status: "Thrown", id: 4, name: 'John Doe', weight: 10, date: '17/06/2024 13:05', expiration: "17/07/2024 13:05" },
  { status: "Expired", id: 5, name: 'John Doe', weight: 10, date: '17/06/2024 13:05', expiration: "17/07/2024 13:05" },
  { status: "Processed", id: 6, name: 'John Doe', weight: 10, date: '17/06/2024 13:05', expiration: "17/07/2024 13:05" },
  { status: "Awaiting", id: 1, name: 'John Doe', weight: 10, date: '17/06/2024 13:05', expiration: "17/08/2024 13:05" },
  { status: "Awaiting", id: 2, name: 'John Doe', weight: 10, date: '17/06/2024 13:05', expiration: "17/07/2024 13:05" },
  { status: "Awaiting", id: 3, name: 'John Doe', weight: 10, date: '17/06/2024 13:05', expiration: "17/07/2024 13:05" },
  { status: "Thrown", id: 4, name: 'John Doe', weight: 10, date: '17/06/2024 13:05', expiration: "17/07/2024 13:05" },
  { status: "Expired", id: 5, name: 'John Doe', weight: 10, date: '17/06/2024 13:05', expiration: "17/07/2024 13:05" },
  { status: "Processed", id: 6, name: 'John Doe', weight: 10, date: '17/06/2024 13:05', expiration: "17/07/2024 13:05" },
];


const header = 'Recently Gained Powder'; // Example header

const columns = [
  { field: 'status', header: 'Status' },
  { field: 'id', header: 'Batch Id' },
  { field: 'name', header: 'Centra Name' },
  { field: 'weight', header: 'Weight' },
  { field: 'date', header: 'Date' },
  { field: 'expiration', header: 'Expiration Date' },
];

const stats = [
  {
    label: "Awaiting Leaves",
    value: "243",
    unit: "Kg",
    color: "#C0CD30",
    icon: AwaitingLeaves,
    delay: 1
  },
  {
    label: "Processed Leaves",
    value: "243",
    unit: "Kg",
    color: "#79B2B7",
    icon: ProcessedLeaves,
    delay: 1.25
  },
  {
    label: "Wasted Leaves",
    value: "250",
    unit: "Kg",
    color: "#0F7275",
    icon: ExpiredWetLeaves,
    delay: 1.5
  },
  {
    label: "Total Wet Leaves",
    value: "1500",
    unit: "Kg",
    color: "#0F7275",
    icon: TotalCollectedWet,
    delay: 1.75
  }
];
const WetLeaves = () => {
  const statusBodyTemplate = (rowData) => {
    let backgroundColor;
    let textColor;
    let logo;
    let width;

    // Determine background color and text color based on status
    switch (rowData.status) {
      case "Awaiting":
        backgroundColor = hexToRGBA("#A0C2B5", 0.5);
        textColor = "#79B2B7";
        logo = <img src={IPI} alt="Logo" style={{ width: '20px', height: '20px', }} />;

        break;
      case "Processed":
        backgroundColor = hexToRGBA("D4965D", 0.5);
        textColor = "#E28834"; // White text color
        logo = <img src={If} alt="Logo" style={{ width: '20px', height: '20px', }} />;
        break;
      case "Expired":
        backgroundColor = hexToRGBA("#D45D5D", 0.5);
        textColor = "#D45D5D"; // White text color
        logo = <img src={Exc} alt="Logo" style={{ width: '20px', height: '20px', }} />;
        break;
      case "Thrown":
        backgroundColor = hexToRGBA("9E2B2B", 0.5);
        textColor = "#9E2B2B"; // White text color
        logo = <img src={trash} alt="Logo" style={{ width: '20px', height: '20px', }} />;
        break;
      default:
        backgroundColor = "inherit"; // Use default background color
        textColor = "#000000"; // Default text color
    }

    const dynamicWidth = "150px";  // Example width, adjust according to your needs
    const dynamicHeight = "35px";  // Example height, adjust according to your needs

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

  const [collapsed, setCollapsed] = useState(false);
  const [tabletMode, setTabletMode] = useState(false);
  const [currentFilter, setCurrentFilter] = useState("All Time");

  return (
    <div className="container mx-auto w-full">
      <TableComponent data={data} header={header} columns={columns} ColorConfig={statusBodyTemplate} />
      <div className="flex flex-wrap gap-4 justify-stretch">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, delay: stat.delay }}
            className="flex-grow flex-shrink lg:basis-1/5 basis-1/2" // Ensure each item takes equal space
          >
            <StatsContainer
              label={stat.label}
              value={stat.value}
              unit={stat.unit}
              description=""
              color={stat.color}
              modal={false}
              frontIcon={stat.icon}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default WetLeaves;