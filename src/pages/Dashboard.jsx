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
        <div className="dashboard flex justify-evenly items-center w-screen h-screen overflow-hidden gap-4 sm:p-6 max-w-screen">
            {/* Sidebar */}
            <motion.div initial={{
                x: -250
            }}
                transition={{
                    duration: 2.5,
                    type: "linear"
                }} animate={{ x: 0 }} className="hidden sm:block">
                <Sidebar collapsed={collapsed} className="sidebar" backgroundColor="#94c3b3" color="#94c3b3">
                    <Menu
                        menuItemStyles={{
                            button: ({ level, active, disabled }) => {
                                return {
                                    "&:hover": {
                                        backgroundColor: "#94c3b3 !important",
                                    },
                                };
                            },
                        }}
                    >
                        <MenuItem style={{ backgroundColor: "#94c3b3" }} className={`flex ${collapsed ? 'justify-start' : 'justify-center'}`} disabled={true} icon={<img src={leafty_Logo} />}><span className="text-3xl" style={{ fontFamily: "LT-Saeada", color: "#417679" }}>{collapsed ? '' : 'Leafty'}</span></MenuItem>
                        <div className="flex flex-col justify-center items-center my-4">
                            <img src={profile_pic} />
                            {collapsed ? (
                                null // If collapsed is true, render nothing
                            ) : (
                                // Company Name & Email
                                <div className="flex flex-col justify-center items-center">
                                    <span className="font-bold text-2xl">XYZ</span>
                                    <span className="text-md">xyzcompany@xyz.com</span>
                                </div>
                            )}
                        </div>
                        <MenuItem icon={<img src={dashboard} />}> Dashboard </MenuItem>
                        <SubMenu className={"flex justify-center flex-col"} label="Leaves Distribution" icon={<img src={leaves_distribution} />}>
                            <MenuItem style={{ backgroundColor: "#94c3b3" }} icon={<img src={wet_leaves} />}> Wet Leaves</MenuItem>
                            <MenuItem style={{ backgroundColor: "#94c3b3" }} icon={<img src={dry_leaves} />}> Dry Leaves </MenuItem>
                            <MenuItem style={{ backgroundColor: "#94c3b3" }} icon={<img src={powder} />}> Powder </MenuItem>
                        </SubMenu>
                        <MenuItem icon={<img src={shipment} />}> Shipment </MenuItem>
                        <MenuItem icon={<img src={pickup} />}> Pickup </MenuItem>
                        <MenuItem icon={<img src={reception} />}> Reception </MenuItem>
                        <MenuItem icon={<img src={performance} />}> Performance </MenuItem>
                    </Menu>
                </Sidebar>
            </motion.div>
            <motion.div initial={{
                x: 750
            }}
                transition={{
                    duration: 2.5,
                    type: "spring"
                }} animate={{ x: 0 }} className="flex flex-col bg-white border h-full justify-stretch gap-2 p-2 sm:p-6 overflow-y-auto no-scrollbar sm:rounded-2xl">
                <div className="flex flex-row justify-around items-center sm:justify-between">
                    <span className="text-3xl font-bold">Dashboard</span>
                    <div className="flex gap-4 flex-row items-center">
                        <FilterDashboard tablet = {tabletMode}/>
                        <Profile />
                    </div>
                </div>
                <div className="flex flex-col justify-stretch gap-2 xl:flex-row items-center">
                    <div className=" container h-full md:max-w-2xl xl:max-w-4xl"><WidgetContainer title="Total Production">
                        <BarChart />
                    </WidgetContainer></div>    
                    <div className=" container h-full md:max-w-2xl xl:max-w-sm"><WidgetContainer>
                        <PieChart />
                    </WidgetContainer></div>
                </div>

                <div className="grid grid-flow-row lg:grid-flow-col gap-4">
                    <StatsContainer label="Today's Production" value="150" unit="Kg" description="Since Yesterday" color={"#C0CD30"} />
                    <StatsContainer label="Wet Leaves Collected" value="300" unit="Kg" description="Since Yesterday" color={"#79B2B7"} />
                    <StatsContainer label="Unscaled Pickups" value="3" unit="" description="Scale Your Pickup!" color={"#0F7275"} />
                </div>

                <span className="text-xl font-bold">
                    Unscaled Pickups
                </span>

                <div className="flex flex-col gap-2">
                    <LongContainer showWeight={!tabletMode}></LongContainer>
                    <LongContainer showWeight={!tabletMode}></LongContainer>
                    <LongContainer showWeight={!tabletMode}></LongContainer>
                </div>

                {/* <button onClick={() => { setCollapsed(!collapsed) }}>aaa</button> */}
            </motion.div>
        </div>
    </>
}

export default Dashboard;