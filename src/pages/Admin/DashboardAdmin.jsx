import { useEffect, useMemo, useState } from "react";
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
import LoadingBackdrop from "../../components/LoadingBackdrop.jsx";
import LoadingStatic from "@components/LoadingStatic.jsx";

function DashboardAdmin() {
    const user_id = useOutletContext()
    const [collapsed, setCollapsed] = useState(false);
    const [tabletMode, setTabletMode] = useState(false);
    const [users, setUsers] = useState([]);
    const [shipments, setShipments] = useState([]);
    const [unscaled, setUnscaled] = useState(0); // Corrected state variable name
    const [statistics, setStatistics] = useState({
        sum_wet_leaves: 0,
        sum_dry_leaves: 0,
        sum_flour: 0,
        sum_shipment_quantity: 0,
    });
    const [loading, setLoading] = useState(true);
    const Pielabels = ['Wet Leaves', 'Dry Leaves', 'Powder'];
    const Piedata = [statistics.sum_wet_leaves, statistics.sum_dry_leaves, statistics.sum_flour];
    const Bartitle = 'Total Production';
    const Barlabels = ["Wet Leaves", "Dry Leaves", "Powder"];
    const Bardata = [statistics.sum_wet_leaves, statistics.sum_dry_leaves, statistics.sum_flour];


    useEffect(() => {
        const fetchData = async () => {
            try {
                const [shipmentsResponse, usersResponse, statisticsResponse] = await Promise.all([
                    axios.get(`${API_URL}/shipment/get`),
                    axios.get(`${API_URL}/user/get`),
                    axios.get(`${API_URL}/statistics/all_no_format`)
                ]);

                setShipments(shipmentsResponse.data);

                const usersData = Array.isArray(usersResponse.data) ? usersResponse.data : usersResponse.data.users;
                const filteredUsers = usersData.filter(user => user.role.RoleName === 'Unverified');
                const mappedUsers = filteredUsers.slice(0, 3).map(user => ({
                    userid: user.UserID,
                    username: user.Username,
                    email: user.Email,
                    phone: user.PhoneNumber.toString(),
                    role: user.role.RoleName,
                }));
                setUsers(mappedUsers);

                setStatistics(statisticsResponse.data);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
        setLoading(false);
    }, []);

    const unscaledPackagesCount = useMemo(() => {
        return shipments.filter(shipment => !shipment.Rescalled_Weight).length;
    }, [shipments]);

    useEffect(() => {
        setUnscaled(unscaledPackagesCount);
    }, [unscaledPackagesCount]);

    if (loading) {
        return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <LoadingStatic />
        </div>
    }

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
                    <StatsContainer label="Unscaled Pickups" value={unscaled} icon_unit={box} description="Scale Your Pickup!" color={"#0F7275"} />
                </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35, delay: 2.25 }} className="flex flex-col gap-2">
                {users && <span className="text-xl font-bold">
                    Unapproved User
                </span>}
                {users.map((user) => (
                    <LongUser
                        user
                        
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
