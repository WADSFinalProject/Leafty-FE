import { useState, useEffect } from 'react';
import 'daisyui/dist/full.css';
import { motion } from "framer-motion";
import StatsContainer from "@components/Cards/StatsContainer";
import AwaitingLeaves from '@assets/AwaitingLeaves.svg';
import ExpiredWetLeaves from '@assets/ExpiredLeavesWet.svg';
import ProcessedLeaves from '@assets/ProcessedLeaves.svg';
import TotalCollectedWet from '@assets/TotalCollectedWet.svg';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import LongContainer from '@components/Cards/LongContainer';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';

function Shipment() {
    const data = [
        { status: "Awaiting", id: 1, name: 'John Doe', weight: 10, date: '17/06/2024 13:05', expiration: "17/08/2024 13:05" },
        { status: "Awaiting", id: 2, name: 'John Doe', weight: 10, date: '17/06/2024 13:05', expiration: "17/07/2024 13:05" },
        { status: "Awaiting", id: 3, name: 'John Doe', weight: 10, date: '17/06/2024 13:05', expiration: "17/07/2024 13:05" },
        { status: "Thrown", id: 4, name: 'John Doe', weight: 10, date: '17/06/2024 13:05', expiration: "17/07/2024 13:05" },
        { status: "Expired", id: 5, name: 'John Doe', weight: 10, date: '17/06/2024 13:05', expiration: "17/07/2024 13:05" },
        { status: "Processed", id: 6, name: 'John Doe', weight: 10, date: '17/06/2024 13:05', expiration: "17/07/2024 13:05" },
        { status: "Awaiting", id: 7, name: 'John Doe', weight: 10, date: '17/06/2024 13:05', expiration: "17/08/2024 13:05" },
        { status: "Awaiting", id: 8, name: 'John Doe', weight: 10, date: '17/06/2024 13:05', expiration: "17/07/2024 13:05" },
        { status: "Awaiting", id: 9, name: 'John Doe', weight: 10, date: '17/06/2024 13:05', expiration: "17/07/2024 13:05" },
        { status: "Thrown", id: 10, name: 'John Doe', weight: 10, date: '17/06/2024 13:05', expiration: "17/07/2024 13:05" },
        { status: "Expired", id: 11, name: 'John Doe', weight: 10, date: '17/06/2024 13:05', expiration: "17/07/2024 13:05" },
        { status: "Processed", id: 12, name: 'John Doe', weight: 10, date: '17/06/2024 13:05', expiration: "17/07/2024 13:05" },
    ];

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

    const offset = currentPage * itemsPerPage;
    const currentPageData = data.slice(offset, offset + itemsPerPage);
    const pageCount = Math.ceil(data.length / itemsPerPage);

    const stats = [
        {
            label: "Awaiting Leaves",
            value: "243",
            unit: "Kg",
            color: "#C0CD30",
            icon: AwaitingLeaves,
            delay: 1
        },
        {
            label: "Processed Leaves",
            value: "243",
            unit: "Kg",
            color: "#79B2B7",
            icon: ProcessedLeaves,
            delay: 1.25
        },
        {
            label: "Wasted Leaves",
            value: "250",
            unit: "Kg",
            color: "#0F7275",
            icon: ExpiredWetLeaves,
            delay: 1.5
        },
        {
            label: "Total Wet Leaves",
            value: "1500",
            unit: "Kg",
            color: "#0F7275",
            icon: TotalCollectedWet,
            delay: 1.75
        }
    ];

    return (
        <div className="container mx-auto w-full">
            <span className="text-xl font-bold">
                Shipment
            </span>
            <div className='flex flex-col gap-2'>
                {currentPageData.map((item, index) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        <LongContainer
                            showWeight={true}
                            weightValue={item.weight}
                            dateValue={item.date}
                            expeditionId={item.id}
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
};

export default Shipment;
