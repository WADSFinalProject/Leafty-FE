import React, { useRef, useState, useEffect } from 'react';
import { Outlet, useNavigate } from "react-router-dom";
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import axios from 'axios';
import { API_URL } from '../../App';
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
import FilterDashboard from "@components/filterDashboard";
import Profile from "@components/Profile";
import Button from "@components/Button";
import Popup from '@components/Popups/Popup'; // Ensure the import path is correct

function AdminLayout(CURRENT_USER) {
    const [collapsed, setCollapsed] = useState(false);
    const [tabletMode, setTabletMode] = useState(false);
    const [title, setTitle] = useState("Dashboard");
    const navigate = useNavigate();
    const user_id = CURRENT_USER.CURRENT_USER;
    const [userData, setUserData] = useState({ Username: "Error", Email: "Error" });
    const modalRef = useRef(null);

    const getUser = async () => {
        try {
            if (user_id) {
                const response = await axios.get(API_URL + `/user/get_user/${user_id}`);
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
        const fetchData = async () => {
            const userData = await getUser();
            if (userData) {
                setUserData(userData);
            }
        };
        fetchData();
    }, []);

    const openModal = () => {
        if (modalRef.current) {
            modalRef.current.showModal();
        }
    };

    return (
        <div className="dashboard flex justify-evenly items-center w-screen h-screen overflow-hidden gap-4 sm:p-6 max-w-screen">
            <motion.div initial={{ x: -250 }} transition={{ duration: 2, type: "linear" }} animate={{ x: 0 }} className="hidden sm:block">
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
                        <MenuItem style={{ backgroundColor: "#94c3b3" }} className={`flex ${collapsed ? 'justify-start' : 'justify-center'}`} disabled={true} icon={<img src={leafty_Logo} alt="Leafty Logo" />}>
                            <span className="text-3xl" style={{ fontFamily: "LT-Saeada", color: "#417679" }}>{collapsed ? '' : 'Leafty'}</span>
                        </MenuItem>
                        <div className="flex flex-col justify-center items-center my-4">
                            <img src={profile_pic} alt="Profile" />
                            {!collapsed && (
                                <div className="flex flex-col justify-center items-center my-2">
                                    <span className="font-bold text-2xl">{userData.Username}</span>
                                    <span className="text-md">{userData.Email}</span>
                                </div>
                            )}
                        </div>
                        <MenuItem icon={<img src={dashboard} alt="Dashboard" />} onClick={() => navigate("/admin/dashboard", { replace: true })}> Dashboard </MenuItem>
                        <SubMenu className={"flex justify-center flex-col"} label="Leaves Distribution" icon={<img src={leaves_distribution} alt="Leaves Distribution" />}>
                            <MenuItem style={{ backgroundColor: "#94c3b3" }} icon={<img src={wet_leaves} alt="Wet Leaves" />} onClick={() => navigate("/admin/wet leaves", { replace: true })}> Wet Leaves</MenuItem>
                            <MenuItem style={{ backgroundColor: "#94c3b3" }} icon={<img src={dry_leaves} alt="Dry Leaves" />} onClick={() => navigate("/admin/dry leaves", { replace: true })}> Dry Leaves </MenuItem>
                            <MenuItem style={{ backgroundColor: "#94c3b3" }} icon={<img src={powder} alt="Powder" />} onClick={() => navigate("/admin/powder", { replace: true })}> Powder </MenuItem>
                        </SubMenu>
                        <MenuItem icon={<img src={shipment} alt="Shipment" />} onClick={() => navigate("/admin/shipment", { replace: true })}> Shipment </MenuItem>
                        <MenuItem icon={<img src={pickup} alt="Pickup" />} onClick={() => navigate("/admin/user management", { replace: true })}> User Management </MenuItem>
                        <MenuItem icon={<img src={reception} alt="Reception" />} onClick={() => navigate("/admin/user approval", { replace: true })}> User Approval </MenuItem>
                    </Menu>
                </Sidebar>
            </motion.div>
            <motion.div initial={{ x: 750 }} transition={{ duration: 1.5, type: "spring" }} animate={{ x: 0 }} className="flex flex-col border h-full bg-base-100 justify-stretch gap-2 p-2 sm:p-6 overflow-y-auto no-scrollbar w-full h-full sm:rounded-2xl">
                <div className="flex flex-row justify-around items-center sm:justify-between">
                    <span className="text-3xl font-bold">{title}</span>
                    <div className="flex gap-4 flex-row items-center">
                        <FilterDashboard tablet={tabletMode} />
                        <Profile Username = {userData.Username}/>
                        {/* <Button onClick={openModal} background="#0F7275" color="#F7FAFC" label="Open Leaves Modal" /> */}
                    </div>
                </div>
                <Outlet context={user_id}/>
            </motion.div>
            <Popup ref={modalRef} leavesid="errorModal" info={true} description = {"You are deleting a data. Are you sure?"} confirm = {true} />
        </div>
    );
}

export default AdminLayout;
