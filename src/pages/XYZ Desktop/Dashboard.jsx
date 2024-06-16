import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import WidgetContainer from '@components/Cards/WidgetContainer';
import BarChart from '@components/Cards/BarChart';
import StatsContainer from "@components/Cards/StatsContainer";
import LongContainer from "@components/Cards/LongContainer";
import PieChart from "@components/Cards/PieChart";
import box from "@assets/PackageBox.svg";
import PowderStats from "@assets/PowderStats.svg";
import TruckStats from "@assets/TruckStats.svg";
import WetLeavesStats from "@assets/WetLeavesStats.svg";
import axios from 'axios'; // Ensure you have axios installed and imported
import { API_URL } from "../../App";

function Dashboard() {
    const [collapsed, setCollapsed] = useState(false);
    const [tabletMode, setTabletMode] = useState(false);
    const [currentFilter, setCurrentFilter] = useState("All Time");
    const [statistics, setStatistics] = useState({
        sum_wet_leaves: 0,
        sum_dry_leaves: 0,
        sum_flour: 0,
        sum_shipment_quantity: 0
    });
    const [unreceivedPackages, setUnreceivedPackages] = useState([]);

    const Pielabels = ['Wet Leaves', 'Dry Leaves', 'Flour'];
    const Piedata = [statistics.sum_wet_leaves, statistics.sum_dry_leaves, statistics.sum_flour];
    const Bartitle = 'Total Production';
    const Barlabels = ['Wet Leaves', 'Dry Leaves', 'Flour'];
    const Bardata = [statistics.sum_wet_leaves, statistics.sum_dry_leaves, statistics.sum_flour];

    useEffect(() => {
        const tabletMediaQuery = window.matchMedia('(max-width: 1024px)');

        const handleScreenChange = (e) => {
            console.log("Screen size changed, updating collapsed and tabletMode states", e.matches);
            setCollapsed(e.matches);
            setTabletMode(e.matches);
        };

        console.log("Adding event listener for tablet media query");
        handleScreenChange(tabletMediaQuery);
        tabletMediaQuery.addListener(handleScreenChange);

        return () => {
            console.log("Removing event listener for tablet media query");
            tabletMediaQuery.removeListener(handleScreenChange);
        };
    }, []);

    useEffect(() => {
        const fetchStatistics = async () => {
            try {
                console.log("Fetching statistics from API");
                const response = await axios.get(`${API_URL}/statistics/all`);
                console.log("Statistics fetched successfully:", response.data);
                setStatistics(response.data);
            } catch (error) {
                console.error('Error fetching statistics:', error);
            }
        };

        const fetchShipments = async () => {
            try {
                console.log("Fetching shipments from API");
                const response = await axios.get(`${API_URL}/shipment/get`);
                console.log("Shipments fetched successfully:", response.data);
                const unreceived = response.data
                    .filter(shipment => shipment.ShipmentDate && !shipment.Rescalled_Weight && !shipment.Rescalled_Date)
                    .sort((a, b) => new Date(a.ShipmentDate) - new Date(b.ShipmentDate))
                    .slice(0, 3); // Limit to only 3
                setUnreceivedPackages(unreceived);
            } catch (error) {
                console.error('Error fetching shipments:', error);
            }
        };

        fetchStatistics();
        fetchShipments();
    }, []);

    return (
        <>
            <motion.div initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35, delay: 0.5 }} className="flex flex-col justify-stretch gap-2 xl:flex-row items-center">
                <div className="container h-full md:max-w-2xl xl:max-w-4xl">
                    <WidgetContainer title="Total Production" container={false}>
                        <BarChart title={Bartitle} labels={Barlabels} data={Bardata} />
                    </WidgetContainer>
                </div>
                <div className="container h-full md:max-w-2xl xl:max-w-sm">
                    <WidgetContainer>
                        <PieChart labels={Pielabels} data={Piedata} container={false} />
                    </WidgetContainer>
                </div>
            </motion.div>

            <div className="grid grid-flow-row lg:grid-flow-col gap-4">
                <motion.div initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.35, delay: 1 }}>
                    <StatsContainer label="Total Flour" value={statistics.sum_flour} unit="Kg" description="" color={"#C0CD30"} dashboardStats={PowderStats} />
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.35, delay: 1.25 }}>
                    <StatsContainer label="Total Wet Leaves" value={statistics.sum_wet_leaves} unit="Kg" description="" color={"#79B2B7"} dashboardStats={WetLeavesStats} />
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.35, delay: 1.5 }}>
                    <StatsContainer label="Total Shipments" value={statistics.sum_shipment_quantity} icon_unit={box} description="" color={"#0F7275"} dashboardStats={TruckStats} truck={true} />
                </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35, delay: 2 }} className="flex flex-col gap-2">
                <span className="text-xl font-bold">
                    Unreceived Packages
                </span>
                {unreceivedPackages.map((item, index) => (
                    <LongContainer
                        key={index}
                        showWeight={!tabletMode}
                        packageCount={item.ShipmentQuantity}
                        weightValue={item.Rescalled_Weight}
                        dateValue={item.ShipmentDate}
                        expeditionId={item.ShipmentID}
                    />
                ))}
            </motion.div>
        </>
    );
}

export default Dashboard;

