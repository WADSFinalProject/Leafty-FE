import { useEffect, useState } from "react";
// import Sidebar from '../components/Sidebar';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import WidgetContainer from '../components/Cards/WidgetContainer';
import BarChart from '../components/Cards/BarChart';
import dashboard from '../assets/icons/sidebar/dashboard.svg';
import dry_leaves from '../assets/icons/sidebar/dry_leaves.svg';
import leaves_distribution from '../assets/icons/sidebar/leaves_distribution.svg';
import performance from '../assets/icons/sidebar/performance.svg';
import pickup from '../assets/icons/sidebar/pickup.svg';
import powder from '../assets/icons/sidebar/powder.svg';
import reception from '../assets/icons/sidebar/reception.svg';
import shipment from '../assets/icons/sidebar/shipment.svg';
import wet_leaves from '../assets/icons/sidebar/wet_leaves.svg';
import leafty_Logo from '../assets/LeaftyLogo.svg';
import profile_pic from '../assets/icons/sidebar/profile_pic.svg';
import StatsContainer from "../components/Cards/StatsContainer";
import { animate, motion, useAnimationControls } from "framer-motion";
import LongContainer from "../components/Cards/LongContainer";
import PieChart from "../components/Cards/PieChart";
import FilterDashboard from "../components/filterDashboard"
import Profile from "../components/Profile";


function Dashboard() {
    const [collapsed, setCollapsed] = useState(false);
    const [tabletMode, setTabletMode] = useState(false);
    const [currentFilter, setCurrentFilter] = useState("All Time");

    useEffect(() => {
        const tabletMediaQuery = window.matchMedia('(max-width: 1024px)');

        // Function to update 'collapsed' state based on the current screen width
        const handleScreenChange = (e) => {
            setCollapsed(e.matches);
            setTabletMode(e.matches); // Set collapsed to true if matches tablet width, otherwise false
        };

        // Call handleScreenChange initially to set the initial state
        handleScreenChange(tabletMediaQuery);

        // Add event listener for changes in screen size
        tabletMediaQuery.addListener(handleScreenChange);

        // Clean up by removing event listener when component unmounts
        return () => {
            tabletMediaQuery.removeListener(handleScreenChange);
        };
    }, []);

    return <>
        <motion.div initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, delay: 0.5 }} className="flex flex-col justify-stretch gap-2 xl:flex-row items-center">
            <div className=" container h-full md:max-w-2xl xl:max-w-4xl"><WidgetContainer title="Total Production">
                <BarChart />
            </WidgetContainer></div>
            <div className=" container h-full md:max-w-2xl xl:max-w-sm"><WidgetContainer>
                <PieChart />
            </WidgetContainer></div>
        </motion.div>

        <div className="grid grid-flow-row lg:grid-flow-col gap-4">
            <motion.div initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35, delay: 1 }}>
                <StatsContainer label="Today's Production" value="150" unit="Kg" description="Since Yesterday" color={"#C0CD30"} />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35, delay: 1.25 }}>
                <StatsContainer label="Wet Leaves Collected" value="300" unit="Kg" description="Since Yesterday" color={"#79B2B7"} />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35, delay: 1.5 }}>
                <StatsContainer label="Unscaled Pickups" value="3" unit="" description="Scale Your Pickup!" color={"#0F7275"} />
            </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, delay: 2 }} className="flex flex-col gap-2">
            <span className="text-xl font-bold">
                Unscaled Pickups
            </span>
            <LongContainer showWeight={!tabletMode}></LongContainer>
            <LongContainer showWeight={!tabletMode}></LongContainer>
            <LongContainer showWeight={!tabletMode}></LongContainer>
        </motion.div>
    </>
}

export default Dashboard;