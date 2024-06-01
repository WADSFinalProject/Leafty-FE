import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
// import { motion } from "framer-motion";
import axios from 'axios';
import { API_URL } from '../App';
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
import { animate, motion, useAnimationControls } from "framer-motion";
import FilterDashboard from "../components/filterDashboard"
import Profile from "../components/Profile";

function DashboardLayout() {
    const [collapsed, setCollapsed] = useState(false);
    const [tabletMode, setTabletMode] = useState(false);
    const [title, setTitle] = useState("Dashboard");
    const navigate = useNavigate();
    const [userData, setUserData] = useState({ Username: "Error", Email: "Error" });
    

    // async function handleWhoAmI() {
    //     try {
    //       const response = await axios.get(API_URL + "/whoami")
    //       console.log(response.data.user_id)
    //       if (response) {
    //         return response.data.user_id
    //       }
    //       return false
    //     } catch (error) {
    //       console.error("Error while checking session:", error);
    //       return false
     
    //     }
    // }

    // const getUser = async () => {
    //     try {
    //       const user_id = await handleWhoAmI();
    //       console.log("this is user id: " + user_id);
    //       if (user_id) {
    //         const response = await axios.get(API_URL + `/user/get_user/${user_id}`);
    //         console.log(response.data);
    //         return response.data; 
    //       } else {
    //         console.error('User ID not found');
    //         return null; 
    //       }
    //     } catch (error) {
    //       console.error('Error calling backend function', error);
    //       return null; 
    //     }
    // };
   
    // useEffect(() => {
    //     const fetchData = async () => {
    //         const userData = await getUser();
    //         if (userData) {
    //             setUserData(userData);
    //         }
    //     };
    //     fetchData();
    // }, []);

    

    return (
        <div className="dashboard flex justify-evenly items-center w-screen h-screen overflow-hidden gap-4 sm:p-6 max-w-screen">
          
            <motion.div initial={{
                x: -250
            }}
                transition={{
                    duration: 2,
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
                            {!collapsed && (
                                <div className="flex flex-col justify-center items-center my-2">
                                    <span className="font-bold text-2xl">{userData.Username}</span>
                                    <span className="text-md">{userData.Email}</span>
                                </div>
                            )}
                        </div>
                        <MenuItem icon={<img src={dashboard} />} onClick={() => navigate("/company/dashboard", {replace: true})}> Dashboard </MenuItem>
                        <SubMenu className={"flex justify-center flex-col"} label="Leaves Distribution" icon={<img src={leaves_distribution} />}>
                            <MenuItem style={{ backgroundColor: "#94c3b3" }} icon={<img src={wet_leaves} />} onClick={() => navigate("/company/wetleaves", {replace: true})}> Wet Leaves</MenuItem>
                            <MenuItem style={{ backgroundColor: "#94c3b3" }} icon={<img src={dry_leaves} />} onClick={() => navigate("/company/dryleaves", {replace: true})}> Dry Leaves </MenuItem>
                            <MenuItem style={{ backgroundColor: "#94c3b3" }} icon={<img src={powder} />} onClick={() => navigate("/company/powder", {replace: true})}> Powder </MenuItem>
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
                    duration: 1.5,
                    type: "spring"
                }} animate={{ x: 0 }} className="flex flex-col border h-full bg-base-100 justify-stretch gap-2 p-2 sm:p-6 overflow-y-auto no-scrollbar w-fit sm:rounded-2xl" >
                <div className="flex flex-row justify-around items-center sm:justify-between">
                    <span className="text-3xl font-bold">{title}</span>
                    <div className="flex gap-4 flex-row items-center">
                        <FilterDashboard tablet={tabletMode} />
                        <Profile />
                    </div>
                </div>
                <Outlet />
            </motion.div>
        </div>
    );
}

export default DashboardLayout;
