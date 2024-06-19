import LineChart from "@components/Cards/LineChart";
import WidgetContainer from "../../components/Cards/WidgetContainer";
import StutsContainer from "../../components/Cards/StutsContainer";
import PowderProduced from '@assets/PowderProduced.svg';
import InProcessPowder from '@assets/In-ProcessPowder.svg';
import UnpackagedPowder from '@assets/UnpackagedPowder.svg';
import PackagedPowder from '@assets/PackagedPowder.svg';
import PieChart from "../../components/Cards/PieChart";
import { motion } from "framer-motion";
import TableComponent from '@components/LeavesTables/TableComponent';
import trash from '@assets/icons/trash.svg';
import IPI from '@assets/icons/IPI.svg';
import If from '@assets/icons/Wat.svg';
import Exc from '@assets/icons/Exc.svg';
import { useState } from 'react';

function PowderOverview() {
    const data = [
        { status: "Awaiting", id: 1, name: 'Kennan', weight: 10, date: '17/06/2024 13:05' },
        { status: "Awaiting", id: 2, name: 'John Doe', weight: 10, date: '17/06/2024 13:05' },
        { status: "Awaiting", id: 3, name: 'John Doe', weight: 10, date: '17/06/2024 13:05' },
        { status: "Thrown", id: 4, name: 'John Doe', weight: 10, date: '17/06/2024 13:05' },
        { status: "Expired", id: 5, name: 'John Doe', weight: 10, date: '17/06/2024 13:05' },
    ];
    const datasets = [
        {
            label: 'LLeaves',
            data: [210, 520, 430, 640, 150],
            backgroundColor: '#0F7275',
            borderColor: '#0F7275',
            pointBackgroundColor: '#DAEDE6',
        },
        {
            label: 'WLeaves',
            data: [450, 240, 530, 620, 210],
            backgroundColor: '#C0CD30',
            borderColor: '#C0CD30',
            pointBackgroundColor: '#EDF390',
        },
    ];

    const header = '';

    const columns = [
        { field: 'status', header: 'Status' },
        { field: 'id', header: 'Batch Id' },
        { field: 'name', header: 'Centra Name' },
        { field: 'weight', header: 'Weight' },
    ];

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

        return (
            <div
                style={{
                    backgroundColor,
                    color: textColor,
                    width: '150px',
                    height: '35px'
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

    const Pielabels = ['Wet Leaves', 'Dry Leaves', 'Powder'];
    const Piedata = [100, 200, 700];

    return (
        <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-2">
                <WidgetContainer className=" flex-col flex-auto w-10/12 h-full">
                    <LineChart xAxisLabel="Time" yAxisLabel="Values" datasets={datasets}  />
                </WidgetContainer>
                <div className="grid grid-cols-2 gap-2  ">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.35, delay: stat.delay }}
                            className="flex"
                        >
                            <StutsContainer
                                row={true}
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
            <div className="flex flex-row gap-2">
                <div className="flex-auto w-3/5">
                    <div className="flex items-center justify-between mb-0">
                        <span className="font-bold text-xl">Recently Gained Powder</span>
                        <span className="text-[#94C3B3]">See all</span>
                    </div>
                    <WidgetContainer>
                        <TableComponent 
                            data={data} 
                            header={header} 
                            columns={columns} 
                            ColorConfig={statusBodyTemplate} 
                            admin={false} 
                            paginator={false} 
                            rows={5} 
                            showFilter={false} 
                            showSearch={false}
                            widihmin={'45rem'}
                            action = {false} 
                        />
                    </WidgetContainer>
                </div>
                <WidgetContainer className="flex-auto w-2/12 h-full">
                    <PieChart labels={Pielabels} data={Piedata} />
                </WidgetContainer>
            </div>
        </div>
    );
}

export default PowderOverview;
