import { Outlet, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import dashboard from '@assets/icons/sidebar/dashboard.svg';
import dry_leaves from '@assets/icons/sidebar/dry_leaves.svg';
import leaves_distribution from '@assets/icons/sidebar/leaves_distribution.svg';
import performance from '@assets/icons/sidebar/performance.svg';
import pickup from '@assets/icons/sidebar/pickup.svg';
import powder from '@assets/icons/sidebar/powder.svg';
import reception from '@assets/icons/sidebar/reception.svg';
import shipment from '@assets/icons/sidebar/shipment.svg';
import wet_leaves from '@assets/icons/sidebar/wet_leaves.svg';
import leafty_Logo from '@assets/LeaftyLogo.svg';
import profile_pic from '@assets/icons/sidebar/profile_pic.svg';
import { motion } from "framer-motion";
import axios from "axios";
import { API_URL } from "../../App";
import Profile from "@components/Profile";
import LoadingBackdrop from "../../components/LoadingBackdrop";
import AuthApi from "../../AuthApi";
import addNotification, { Notifications } from 'react-push-notification';

function DashboardLayout({ CURRENT_USER }) {
    const [shipments, setShipments] = useState([]);
    const [collapsed, setCollapsed] = useState(false);
    const [userData, setUserData] = useState({ Username: "Error", Email: "Error" });
    const [loading, setLoading] = useState(true);
    const [title, setTitle] = useState("Dashboard"); // State to hold the title
    const navigate = useNavigate();

    const Auth = useContext(AuthApi);

    async function handle() {
        setLoading(true);
        try {
            const response = await axios.delete(API_URL + "/delete_session")
            if (response) {
                Auth.setAuth(false);
                navigate('/');
            }
            return false
        } catch (error) {
            console.error("Error while deleting session:", error);
            console.error(err.response.data);    // ***
            console.error(err.response.status);  // ***
            console.error(err.response.headers);
            return false

        }
    }


    const getUser = async () => {
        try {
            console.log("this is user id: " + CURRENT_USER);
            if (CURRENT_USER) {
                const response = await axios.get(API_URL + `/user/get_user/${CURRENT_USER}`);
                console.log(response.data);
                return response.data;
            } else {
                console.error('User ID not found');
                return null;
            }
        } catch (error) {
            console.error('Error calling backend function', error);
            return null;
        }
    };

    useEffect(() => {
        const fetchShipments = async () => {
            try {
                const response = await axios.get(`${API_URL}/shipment/get`);
                setShipments(response.data);
                console.log(response.data);

                // Check for null values in the response data
                const hasNullValues = response.data.some(shipment =>
                    Object.values(shipment).some(value => value === null)
                );

                if (hasNullValues) {
                    addNotification({
                        title: 'Information',
                        subtitle: 'Unclaimed Shipments',
                        message: 'One or more shipments have not been claimed',
                        duration: 10000
                    });
                }
            } catch (error) {
                console.error("Error fetching shipments:", error);
            }
        };

        fetchShipments();
    }, [API_URL]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await getUser();
                if (userData) {
                    setUserData(userData);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [CURRENT_USER]);

    // Function to handle menu item click
    const handleMenuItemClick = (path, itemTitle) => {
        navigate(path, { replace: true });
        setTitle(itemTitle); // Update the title based on the clicked item
    };

    if (loading) {
        return <LoadingBackdrop />;
    }

    return (
        <div className="dashboard flex justify-evenly items-center w-screen h-screen overflow-hidden gap-4 sm:p-6 max-w-screen">
            <div>
                <Notifications position = {'bottom-right'}/>
            </div>
            <motion.div initial={{ x: -250 }} transition={{ duration: 0.5, type: "spring" }} animate={{ x: 0 }} className="hidden sm:block">
                <Sidebar collapsed={collapsed} className="sidebar" backgroundColor="#94c3b3" color="#94c3b3">
                    <Menu
                        menuItemStyles={{
                            button: ({ level, active, disabled }) => ({
                                "&:hover": {
                                    backgroundColor: "#94c3b3 !important",
                                },
                            }),
                        }}
                    >
                        <MenuItem style={{ backgroundColor: "#94c3b3" }} className={`flex ${collapsed ? 'justify-start' : 'justify-center'}`} disabled={true} icon={<img src={leafty_Logo} alt="Leafty Logo" />}>
                            <span className="text-3xl" style={{ fontFamily: "LT-Saeada", color: "#417679" }}>{collapsed ? '' : 'Leafty'}</span>
                        </MenuItem>
                        <div className="flex flex-col justify-center items-center my-4">
                            <img src={profile_pic} alt="Profile Pic" />
                            {!collapsed && (
                                <div className="flex flex-col justify-center items-center my-2">
                                    <span className="font-bold text-2xl">{userData.Username}</span>
                                    <span className="text-md">{userData.Email}</span>
                                </div>
                            )}
                        </div>
                        {/* Menu items with onClick handler to update title */}
                        <MenuItem icon={<img src={dashboard} alt="Dashboard Icon" />} onClick={() => handleMenuItemClick("/company/dashboard", "Dashboard")}> Dashboard </MenuItem>
                        <SubMenu className={"flex justify-center flex-col"} label="Leaves Distribution" icon={<img src={leaves_distribution} alt="Leaves Distribution Icon" />}>
                            <MenuItem style={{ backgroundColor: "#94c3b3" }} icon={<img src={wet_leaves} alt="Wet Leaves Icon" />} onClick={() => handleMenuItemClick("/company/wetleaves", "Wet Leaves")}> Wet Leaves</MenuItem>
                            <MenuItem style={{ backgroundColor: "#94c3b3" }} icon={<img src={dry_leaves} alt="Dry Leaves Icon" />} onClick={() => handleMenuItemClick("/company/dryleaves", "Dry Leaves")}> Dry Leaves </MenuItem>
                            <MenuItem style={{ backgroundColor: "#94c3b3" }} icon={<img src={powder} alt="Powder Icon" />} onClick={() => handleMenuItemClick("/company/powder", "Powder")}> Powder </MenuItem>
                        </SubMenu>
                        <MenuItem icon={<img src={shipment} alt="Shipment Icon" />} onClick={() => handleMenuItemClick("/company/shipment", "Shipment")}> Shipment </MenuItem>
                        {/* <MenuItem icon={<img src={pickup} alt="Pickup Icon" />} onClick={() => handleMenuItemClick("/company/pickup", "Pickup")}> Pickup </MenuItem> */}
                        {/* <MenuItem icon={<img src={reception} alt="Reception Icon" />} onClick={() => handleMenuItemClick("/company/reception/centra", "Reception")}> Reception </MenuItem> */}
                        <MenuItem icon={<img src={performance} alt="Performance Icon" />} onClick={() => handleMenuItemClick("/company/performance", "Performance")}> Performance </MenuItem>
                    </Menu>
                </Sidebar>
            </motion.div>
            <motion.div initial={{ x: 750 }} transition={{ duration: 1.5, type: "spring" }} animate={{ x: 0 }} className="flex flex-col border w-full h-full bg-base-100 justify-stretch gap-2 p-2 sm:p-6 overflow-y-auto no-scrollbar w-fit sm:rounded-2xl">
                <div className="flex flex-row justify-around items-center sm:justify-between">
                    <span className="text-3xl font-bold">{title}</span>
                    <div className="flex gap-4 flex-row items-center">
                        <Profile Username={userData.Username} handleLogout = {handle} />
                    </div>
                </div>
                <Outlet />
            </motion.div>
        </div>
    );
}

export default DashboardLayout;
