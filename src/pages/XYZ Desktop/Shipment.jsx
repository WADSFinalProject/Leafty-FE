import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from React Router
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
import search from "../../assets/SearchLogo.svg";

function Shipment() {
    const [shipments, setShipments] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(8);
    const [searchTerm, setSearchTerm] = useState('');

    const navigate = useNavigate(); // Initialize useNavigate

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
                const updatedShipments = await Promise.all(response.data.map(async (shipment) => {
                    const flourDetails = await Promise.all(shipment.FlourIDs.map(async (flourID) => {
                        const flourResponse = await axios.get(`${API_URL}/flour/get/${flourID}`);
                        return {
                            FlourID: flourID,
                            Flour_Weight: flourResponse.data.Flour_Weight // Assuming API response structure
                        };
                    }));

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

    const handleShipmentClick = (shipment) => {
        navigate(`/company/shipmentdetails`, { state: { shipment } }); // Navigate to ShipmentDetails with shipment data
    };

    const offset = currentPage * itemsPerPage;

    const filteredShipments = shipments.filter(shipment => {
        const searchTermLower = searchTerm.toLowerCase();
        const courierMatch = shipment.CourierName.toLowerCase().includes(searchTermLower);
        const shipmentIDMatch = shipment.ShipmentID.toString().includes(searchTerm.replace(/#/i, ''));
        const shipmentWeightMatch = shipment.ShipmentWeight.toString().includes(searchTermLower.replace(/ kg/i, ''));
        const shipmentDateMatch = formatDate(shipment.ShipmentDate).toLowerCase().includes(searchTermLower);
        const shipmentAmountMatch = shipment.ShipmentQuantity.toString().includes(searchTermLower.replace(/ packages/i, ''));
        return courierMatch || shipmentIDMatch || shipmentWeightMatch || shipmentAmountMatch || shipmentDateMatch;
    });

    const currentPageData = filteredShipments.slice(offset, offset + itemsPerPage);
    const pageCount = Math.ceil(filteredShipments.length / itemsPerPage);
    const header = "Shipment";

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
        return date.toLocaleDateString(undefined, options);
    }

    return (
        <div className="container mx-auto w-full">
            <div className="flex flex-row justify-between m-0 items-center">
                <h3 className="text-xl font-bold">{header}</h3>
                <div className="table-header-actions flex flex-row gap-4 items-center justify-center">
                    <label className="input input-bordered flex items-center gap-2 input-md">
                        <img src={search} className="w-4 h-4" alt="search" />
                        <input 
                            type="text" 
                            placeholder="Search by Courier Name or Expedition#ID" 
                            value={searchTerm} 
                            onChange={e => setSearchTerm(e.target.value)} 
                            className="grow"
                        />
                    </label>
                </div>
            </div>
            <div className='flex flex-col gap-2'>
                {currentPageData.map((item, index) => (
                    <motion.div
                        key={item.ShipmentID}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        onClick={() => handleShipmentClick(item)} // Handle click event
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
