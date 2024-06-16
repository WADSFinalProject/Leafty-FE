import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import LongContainer from '@components/Cards/LongContainer';
import 'daisyui/dist/full.css';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io'; // Import arrow icons from react-icons
import axios from 'axios';
import { API_URL } from "../../App"; // Adjust the import according to your project structure
import '../../style/PaginatorColoring.css';

function Pickup() {
    const [shipments, setShipments] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(8); // Default value

    const handlePageClick = (event) => {
        setCurrentPage(event.selected);
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
                const unscaledShipments = response.data.filter(shipment => shipment.Rescalled_Weight === null && shipment.Rescalled_Date === null);
                setShipments(unscaledShipments);
            } catch (error) {
                console.error('Error fetching shipments:', error);
            }
        };

        fetchShipments();
    }, []);

    const offset = currentPage * itemsPerPage;
    const currentPageData = shipments.slice(offset, offset + itemsPerPage);
    const pageCount = Math.ceil(shipments.length / itemsPerPage);

    return (
        <div className="container mx-auto w-full">
            <span className="text-xl font-bold">
                Unscaled Pickups
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
                            packageCount={item.ShipmentQuantity}
                            weightValue={item.Rescalled_Weight}
                            dateValue={item.ShipmentDate}
                            expeditionId={item.ShipmentID}
                        />
                    </motion.div>
                ))}
            </div>
            <div className="flex justify-between items-center mt-4 gapMapping">
                <button 
                    onClick={() => handlePageClick({ selected: currentPage - 1 })}
                    disabled={currentPage === 0}
                    className="cursor-pointer greening-paginator"
                >
                    <IoIosArrowBack size={24} />
                </button>
                <div className="greening-paginator">
                    Page {currentPage + 1} of {pageCount}
                </div>
                <button 
                    onClick={() => handlePageClick({ selected: currentPage + 1 })}
                    disabled={currentPage + 1 === pageCount}
                    className="cursor-pointer greening-paginator"
                >
                    <IoIosArrowForward size={24} />
                </button>
            </div>
        </div>
    );
}

export default Pickup;
