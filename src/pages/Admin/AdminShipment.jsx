import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { motion } from "framer-motion";
import LongContainer from '@components/Cards/LongContainer';
import 'daisyui/dist/full.css';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
import axios from 'axios'; // Ensure you have axios installed and imported
import { API_URL } from "../../App"; // Adjust the import according to your project structure
import '../../style/PaginatorColoring.css';
import LoadingStatic from "@components/LoadingStatic"

function AdminShipment() {
    const [shipments, setShipments] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(8);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); // Initialize useNavigate

    const handlePageClick = (newPage) => {
        setCurrentPage(newPage);
    };

    const calculateItemsPerPage = useCallback(() => {
        const pageHeight = window.innerHeight;
        const itemHeight = 70;
        const headerHeight = 100;
        const footerHeight = 100;
        const availableHeight = pageHeight - headerHeight - footerHeight;
        const calculatedItems = Math.floor(availableHeight / itemHeight);
        setItemsPerPage(calculatedItems);
    }, []);

    useEffect(() => {
        calculateItemsPerPage();
        window.addEventListener('resize', calculateItemsPerPage);
        return () => window.removeEventListener('resize', calculateItemsPerPage);
    }, [calculateItemsPerPage]);

    useEffect(() => {
        const fetchShipments = async () => {
            try {
                const [shipmentsResponse, couriersResponse, flourResponse] = await Promise.all([
                    axios.get(`${API_URL}/shipment/get/`),
                    axios.get(`${API_URL}/courier/get`),
                    axios.get(`${API_URL}/flour/get`),
                ]);

                const couriers = couriersResponse.data.reduce((acc, courier) => {
                    acc[courier.CourierID] = courier.CourierName;
                    return acc;
                }, {});

                const flourData = flourResponse.data.reduce((acc, flour) => {
                    acc[flour.FlourID] = flour.Flour_Weight;
                    return acc;
                }, {});

                const updatedShipments = shipmentsResponse.data.map(shipment => {
                    const totalFlourWeight = shipment.FlourIDs.reduce((sum, flourID) => sum + (flourData[flourID] || 0), 0);
                    const courierName = couriers[shipment.CourierID] || 'Unknown Courier';
                    return {
                        ...shipment,
                        ShipmentWeight: totalFlourWeight,
                        CourierName: courierName,
                    };
                });

                setShipments(updatedShipments);
            } catch (error) {
                console.error('Error fetching shipments:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchShipments();
    }, []);

    const offset = currentPage * itemsPerPage;
    const currentPageData = shipments.slice(offset, offset + itemsPerPage);
    const pageCount = Math.ceil(shipments.length / itemsPerPage);

    function formatDate(dateString) {
        if (!dateString) return "Not Delivered";
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Date(dateString);
        return "    " + date.toLocaleDateString(undefined, options);
    }

    if (loading === true) {
        return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <LoadingStatic />
      </div>
    }

    const handleButtonClick = (item) => {
        navigate(`/admin/shipmentdetails`, { state: { shipment: item } }); // Navigate to AdminShipmentDetails with shipment data
    };

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
                        onClick={() => handleButtonClick(item)} // Handle click event
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
        </div>
    );
}

export default AdminShipment;
