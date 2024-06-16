import { useState, useEffect } from 'react';
import 'daisyui/dist/full.css';
import { motion } from "framer-motion";
import StatsContainer from "@components/Cards/StatsContainer";
import VerifiedPackages from '@assets/VerifiedPackages.svg';
import DeparturedPackages from '@assets/DeparturedPackages.svg';
import RescalledPackages from '@assets/RescalledPackages.svg';
import TotalPackagesReceived from '@assets/TotalPackagesReceived.svg';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import LongContainer from '@components/Cards/LongContainer';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
import axios from 'axios'; // Ensure you have axios installed and imported
import { API_URL } from "../../App"; // Adjust the import according to your project structure

function Shipment() {
    const [shipments, setShipments] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(8);

    const handlePageClick = (newPage) => {
        setCurrentPage(newPage);
    };

    const calculateItemsPerPage = () => {
        const pageHeight = window.innerHeight;
        const itemHeight = 70;
        const headerHeight = 100;
        const footerHeight = 100;
        const availableHeight = pageHeight - headerHeight - footerHeight;
        const calculatedItems = Math.floor(availableHeight / itemHeight);
        setItemsPerPage(calculatedItems);
    };

    useEffect(() => {
        calculateItemsPerPage();
        window.addEventListener('resize', calculateItemsPerPage);
        return () => window.removeEventListener('resize', calculateItemsPerPage);
    }, []);

    useEffect(() => {
        const fetchShipments = async () => {
            try {
                const response = await axios.get(`${API_URL}/shipment/get`);
                // Fetch details for each FlourID in each shipment
                const updatedShipments = await Promise.all(response.data.map(async (shipment) => {
                    const flourDetails = await Promise.all(shipment.FlourIDs.map(async (flourID) => {
                        const flourResponse = await axios.get(`${API_URL}/flour/get/${flourID}`);
                        return {
                            FlourID: flourID,
                            Flour_Weight: flourResponse.data.Flour_Weight // Assuming API response structure
                        };
                    }));

                    // Calculate the total ShipmentWeight as the sum of Flour_Weight
                    const totalFlourWeight = flourDetails.reduce((sum, flour) => sum + flour.Flour_Weight, 0);

                    const courierResponse = await axios.get(`${API_URL}/courier/get/${shipment.CourierID}`);
                    const courierName = courierResponse.data.CourierName;

                    return {
                        ...shipment,
                        ShipmentWeight: totalFlourWeight,
                        CourierName: courierName
                    };
                }));
                setShipments(updatedShipments)
            } catch (error) {
                console.error('Error fetching shipments:', error);
            }
        };

        fetchShipments();
    }, []);

    const offset = currentPage * itemsPerPage;
    const currentPageData = shipments.slice(offset, offset + itemsPerPage);
    const pageCount = Math.ceil(shipments.length / itemsPerPage);

    const stats = [
        {
            label: "Verified Packages",
            value: "",
            unit: "Kg",
            color: "#C0CD30",
            icon: VerifiedPackages,
            delay: 1
        },
        {
            label: "Departured Packages",
            value: "",
            unit: "Kg",
            color: "#79B2B7",
            icon: DeparturedPackages,
            delay: 1.25
        },
        {
            label: "Rescalled Packages",
            value: "",
            unit: "Kg",
            color: "#0F7275",
            icon: RescalledPackages,
            delay: 1.5
        },
        {
            label: "Total Packages Received",
            value: "",
            unit: "Kg",
            color: "#0F7275",
            icon: TotalPackagesReceived,
            delay: 1.75
        }
    ];

    function formatDate(dateString) {
        if (!dateString) return "Not Delivered";
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Date(dateString);
        return "    "+date.toLocaleDateString(undefined, options);
    }

    
    return (
        <div className="container mx-auto w-full">
            <span className="text-xl font-bold">
                Shipment
            </span>
            <div className='flex flex-col gap-2'>
                {currentPageData.map((item, index) => (
                    <motion.div
                        key={item.ShipmentID}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        <LongContainer
                            showWeight={true}
                            weightValue={item.ShipmentWeight}
                            packageCount={item.ShipmentQuantity}
                            dateValue={formatDate(item.ShipmentDate)}
                            expeditionId={item.ShipmentID}
                        />
                    </motion.div>
                ))}
            </div>
            <div className="flex justify-between items-center mt-4 gapMapping">
                <button
                    onClick={() => handlePageClick(currentPage - 1)}
                    disabled={currentPage === 0}
                    className="cursor-pointer greening-paginator"
                >
                    <IoIosArrowBack size={24} />
                </button>
                <div className="greening-paginator">
                    Page {currentPage + 1} of {pageCount}
                </div>
                <button
                    onClick={() => handlePageClick(currentPage + 1)}
                    disabled={currentPage + 1 === pageCount}
                    className="cursor-pointer greening-paginator"
                >
                    <IoIosArrowForward size={24} />
                </button>
            </div>
            <div className="flex flex-wrap gap-4 justify-stretch">
                {stats.map((stat, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.1, delay: stat.delay }}
                        className="flex-grow flex-shrink lg:basis-1/5 basis-1/2"
                    >
                        <StatsContainer
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
            </div>
        </div>
    );
}

export default Shipment;
