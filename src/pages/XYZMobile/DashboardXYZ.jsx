import React, { useEffect, useState } from 'react';
import XYZLayout from './XYZLayout';
import WidgetContainer from '../../components/Cards/WidgetContainer';
import LongContainer from '../../components/Cards/ShipmentLongContainer';
import { motion } from 'framer-motion';
import RescalledPackages from '../../assets/RescalledPackages.svg';
import ReceivedPowder from '../../assets/ReceivedPowder.svg';
import UnscalledPackages from '../../assets/UnscalledPackages.svg';
import "../../style/Dashboard.css";
import axios from 'axios';  // Ensure you have axios installed and imported
import { API_URL } from '../../App'; // Define your API URL in a constants file or directly

function DashboardXYZ() {
    const [shipments, setShipments] = useState([]);
    const [statistics, setStatistics] = useState({
        rescalled_packages_count: 0,
        unscalled_packages_count: 0,
        received_powder_count: 0 // Assuming you need this, otherwise remove it
    });

    useEffect(() => {
        const fetchShipments = async () => {
            try {
                console.log("Fetching all shipments from API");
                const response = await axios.get(`${API_URL}/shipment/get`);
                console.log("Shipments fetched successfully:", response.data);
                setShipments(response.data);
            } catch (error) {
                console.error('Error fetching shipments:', error);
            }
        };

        fetchShipments();
    }, []);

    useEffect(() => {
        const calculateStatistics = () => {
            const rescalledPackagesCount = shipments.filter(shipment => shipment.Rescalled_Weight).length;
            const unscalledPackagesCount = shipments.filter(shipment => !shipment.Rescalled_Weight).length;
            

            setStatistics({
                rescalled_packages_count: rescalledPackagesCount,
                unscalled_packages_count: unscalledPackagesCount,
                received_powder_count: 0 // Placeholder value, replace it with actual logic if needed
            });
        };

        calculateStatistics();
    }, [shipments]);

    return (
        <>
            <div className='flex items-center justify-between'>
                <motion.div className='flex items-center md:flex-row gap-2' initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }} >
                    <WidgetContainer className={"p-5 h-[13rem] md:h-full"}>
                        <div className='flex flex-row'>
                            <div className='flex flex-col'>
                                <span className="font-semibold text-gray-600">Rescalled Package</span>
                                <span className='font-montserrat text-xl font-semibold text-left'>{statistics.rescalled_packages_count}</span>
                            </div>
                            <img src={RescalledPackages} alt="RescalledPackages" className='place-self-start' />
                        </div>
                    </WidgetContainer>
                    <div className="flex flex-col md:flex-row gap-2 justify-around">
                        <WidgetContainer>
                            <div className='flex items-center gap-2 justify-between'>
                                <div className='flex flex-col'>
                                    <span className=' w-8 font-montserrat text-base font-semibold text-gray-600'>Received Powder</span>
                                    <span className='font-montserrat text-xl font-semibold'>{statistics.received_powder_count}</span>
                                </div>
                                <img src={ReceivedPowder} alt="ReceivedPowder" className='w-50 h-auto mr-3 ' />
                            </div>
                        </WidgetContainer>
                        <WidgetContainer>
                            <div className='flex items-center gap-2 justify-between'>
                                <div className='flex flex-col'>
                                    <span className='font-montserrat text-base font-semibold text-gray-600'>Unscalled Packages</span>
                                    <span className='font-montserrat text-xl font-semibold'>{statistics.unscalled_packages_count}</span>
                                </div>
                                <img src={UnscalledPackages} alt="UnscalledPackages" className='w-50 h-auto mr-1 mt-2' />
                            </div>
                        </WidgetContainer>
                    </div>
                </motion.div>
            </div>
            <span className="font-semibold text-base">Recent Re-scalled Shipment</span>
            <div className='flex flex-col gap-2'>
                {shipments.filter(shipment => shipment.Rescalled_Weight).map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        <LongContainer
                            packageCount={item.ShipmentQuantity}
                            weightValue={item.Rescalled_Weight}
                            dateValue={item.Rescalled_Date}
                            expeditionId={item.ShipmentID}
                        />
                    </motion.div>
                ))}
            </div>
        </>
    );
}

export default DashboardXYZ;
