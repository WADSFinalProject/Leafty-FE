import LineChart from "@components/Cards/LineChart";
import WidgetContainer from "../../components/Cards/WidgetContainer";
import StutsContainer from "../../components/Cards/StutsContainer";
import AwaitingLeaves from '@assets/AwaitingDryLeaves.svg';
import ExpiredDryLeaves from '@assets/ExpiredDryLeaves.svg';
import ProcessedLeaves from '@assets/In-ProcessLeaves.svg';
import TotalDryLeaves from '@assets/TotalDryLeaves.svg';
import PieChart from "../../components/Cards/PieChart";
import { motion } from "framer-motion";
import TableComponent from '@components/LeavesTables/TableComponent';
import trash from '@assets/icons/trash.svg';
import IPI from '@assets/icons/IPI.svg';
import If from '@assets/icons/Wat.svg';
import Exc from '@assets/icons/Exc.svg';
import { useNavigate } from "react-router-dom";

function DryLeavesOverview() {
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
            label: "In-Processed Leaves",
            value: "243",
            unit: "Kg",
            color: "#79B2B7",
            icon: ProcessedLeaves,
            delay: 1.25
        },
        {
            label: "Awaiting Dry Leaves",
            value: "243",
            unit: "Kg",
            color: "#D2D681",
            icon: AwaitingLeaves,
            delay: 1
        },
        {
            label: "Expired Dry Leaves",
            value: "250",
            unit: "Kg",
            color: "#0F7275",
            icon: ExpiredDryLeaves,
            delay: 1.5
        },
        {
            label: "Total Collected Dry Leaves",
            value: "1500",
            unit: "Kg",
            color: "#94C3B3",
            icon: TotalDryLeaves,
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

    const navigate = useNavigate();

    return (
        <div className="flex flex-row gap-2">
            <div className="w-3/4">
                <WidgetContainer className=" flex-col flex-auto">
                    <LineChart xAxisLabel="Time" yAxisLabel="Values" datasets={datasets} />
                </WidgetContainer>
                <div className="flex flex-row gap-2">
                    <div className="flex-auto w-2/5">
                        <div className="flex items-center justify-between mb-0">
                            <span className="font-bold text-xl">Recently Gained Dry Leaves</span>
                            <button
                                className="text-[#94C3B3]"
                                onClick={() => navigate("/company/dryleaves", { replace: true })}
                            >
                                See all
                            </button>
                        </div>
                        <WidgetContainer className={"w-fit"} >
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
                            />
                        </WidgetContainer>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <div className="grid grid-cols-2 gap-2">
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
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.35, delay: 2 }}
                        className="flex"
                    >
                        <WidgetContainer container={false} className="flex w-fit h-fit p-5">
                            <PieChart labels={Pielabels} data={Piedata} />
                        </WidgetContainer>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

export default DryLeavesOverview;
