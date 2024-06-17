import { useEffect, useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import WidgetContainer from '../../components/Cards/WidgetContainer';
import BarChart from '../../components/Cards/BarChart';
import StatsContainer from "../../components/Cards/StatsContainer";
import { motion } from "framer-motion";
import PieChart from "../../components/Cards/PieChart";
import LongUser from "../../components/Cards/LongUser";
import box from "../../assets/PackageBox.svg";
import axios from 'axios';
import { API_URL } from '../../App.jsx';
import { useOutletContext } from "react-router";


function DashboardAdmin() {
    const user_id = useOutletContext()
    const [collapsed, setCollapsed] = useState(false);
    const [tabletMode, setTabletMode] = useState(false);
    const [users, setUsers] = useState([]);
    const [shipments, setShipments] = useState([]);
    const [statistics, setStatistics] = useState({
        sum_wet_leaves: 0,
        sum_dry_leaves: 0,
        sum_flour: 0,
        sum_shipment_quantity: 0,
        rescalled_packages_count: 0,
        unscalled_packages_count: 0
    });

    const Pielabels = ['Wet Leaves', 'Dry Leaves', 'Powder'];
    const Piedata = [statistics.sum_wet_leaves, statistics.sum_dry_leaves, statistics.sum_flour];
    const Bartitle = 'Total Production';
    const Barlabels = ['01/12', '01/13', '01/14', '01/15', '01/16', '01/17', '01/18'];
    const Bardata = [1200, 1500, 1100, 1700, 1300, 1900, 1400];

    useEffect(() => {
        console.log("user:"+user_id)
        const tabletMediaQuery = window.matchMedia('(max-width: 1024px)');

        const handleScreenChange = (e) => {
            setCollapsed(e.matches);
            setTabletMode(e.matches);
        };

        handleScreenChange(tabletMediaQuery);
        tabletMediaQuery.addListener(handleScreenChange);

        return () => {
            tabletMediaQuery.removeListener(handleScreenChange);
        };
    }, []);

    useEffect(() => {
        const fetchShipments = async () => {
            try {
                const response = await axios.get(`${API_URL}/shipment/get`);
                setShipments(response.data);
            } catch (error) {
                console.error('Error fetching shipments:', error);
            }
        };

        fetchShipments();
    }, []);

    useEffect(() => {
        const calculateStatistics = () => {
            const unscalledPackagesCount = shipments.filter(shipment => !shipment.Rescalled_Weight).length;

            setStatistics(prevStats => ({
                ...prevStats,
                unscalled_packages_count: unscalledPackagesCount,
            }));
        };

        calculateStatistics();
    }, [shipments]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${API_URL}/user/get`);
                const users = Array.isArray(response.data) ? response.data : response.data.users;
                const filteredUsers = users.filter(user => user.role.RoleName === 'Unverified' || user.role.RoleName === 'Rejected');
                const mappedUsers = filteredUsers.map(user => ({
                    userid: user.UserID,
                    username: user.Username,
                    email: user.Email,
                    phone: user.PhoneNumber.toString(),
                    role: user.role.RoleName,
                }));
                setUsers(mappedUsers);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    useEffect(() => {
        const fetchStatistics = async () => {
            try {
                const response = await axios.get(`${API_URL}/statistics/all`);
                setStatistics(response.data);
            } catch (error) {
                console.error('Error fetching statistics:', error);
            }
        };

        fetchStatistics();
    }, []);

    return (
        <>
            <motion.div initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35, delay: 0.5 }} className="flex flex-col justify-stretch gap-2 xl:flex-row items-center">
                <div className="container h-full md:max-w-2xl xl:max-w-4xl">
                    <WidgetContainer title="Total Production">
                        <BarChart title={Bartitle} labels={Barlabels} data={Bardata} />
                    </WidgetContainer>
                </div>
                <div className="container h-full md:max-w-2xl xl:max-w-sm">
                    <WidgetContainer>
                        <PieChart labels={Pielabels} data={Piedata} />
                    </WidgetContainer>
                </div>
            </motion.div>

            <div className="grid grid-flow-row lg:grid-flow-col gap-4">
                <motion.div initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.35, delay: 1 }}>
                    <StatsContainer label="Today's Production" value={statistics.sum_flour} unit="Kg" description="Since Yesterday" color={"#C0CD30"} />
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.35, delay: 1.25 }}>
                    <StatsContainer label="Wet Leaves Collected" value={statistics.sum_wet_leaves} unit="Kg" description="Total Wet Leaves" color={"#79B2B7"} />
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.35, delay: 2 }}>
                    <StatsContainer label="Unscaled Pickups" value={statistics.unscalled_packages_count} icon_unit={box} description="Scale Your Pickup!" color={"#0F7275"} />
                </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35, delay: 2.25 }} className="flex flex-col gap-2">
                <span className="text-xl font-bold">
                    Unapproved User
                </span>
                {users.map((user) => (
                    <LongUser
                        key={user.userid}
                        showWeight={!tabletMode}
                        Atis={user.username}
                        Mailis={user.email}
                        Phonis={user.phone}
                        UserId={user.userid}
                    />
                ))}
            </motion.div>
        </>
    );
}

export default DashboardAdmin;
