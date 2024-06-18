import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from React Router
import { motion } from "framer-motion";
import LongContainer from '@components/Cards/LongContainer';
import 'daisyui/dist/full.css';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io'; // Import arrow icons from react-icons
import axios from 'axios';
import { API_URL } from "../../App"; // Adjust the import according to your project structure
import '../../style/PaginatorColoring.css';
import search from "../../assets/SearchLogo.svg";

function Pickup() {
    const [shipments, setShipments] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(8); // Default value\
    const [searchTerm, setSearchTerm] = useState('');

    const navigate = useNavigate(); // Initialize useNavigate

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

    const filteredShipments = shipments.filter(shipment => {
        const searchTermLower = searchTerm.toLowerCase();
        const shipmentIDMatch = shipment.ShipmentID.toString().includes(searchTerm.replace(/#/i, ''));
        // const shipmentWeightMatch = shipment.Rescalled_Weight.toString().includes(searchTermLower.replace(/ kg/i, ''));
        const shipmentDateMatch = formatDate(shipment.ShipmentDate).toLowerCase().includes(searchTermLower);
        const shipmentAmountMatch = shipment.ShipmentQuantity.toString().includes(searchTermLower.replace(/ packages/i, ''));
        return shipmentIDMatch || shipmentAmountMatch || shipmentDateMatch;
    });

    const handleShipmentClick = (shipment) => {
        navigate(`/company/shipmentdetails`, { state: { shipment } }); // Navigate to ShipmentDetails with shipment data
    };

    const offset = currentPage * itemsPerPage;
    const currentPageData = filteredShipments.slice(offset, offset + itemsPerPage);
    const pageCount = Math.ceil(filteredShipments.length / itemsPerPage);
    const header = "Shipment";

    function formatDate(dateString) {
        if (!dateString) return "Not Delivered";
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Date(dateString);
        return "    "+date.toLocaleDateString(undefined, options);
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
                            packageCount={item.ShipmentQuantity}
                            weightValue={item.Rescalled_Weight}
                            dateValue={formatDate(item.ShipmentDate) || "Not Delivered"}
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
