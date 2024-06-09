import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import LongContainer from '@components/Cards/LongContainer';
import 'daisyui/dist/full.css';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io'; // Import arrow icons from react-icons
import '../../style/PaginatorColoring.css'

function Pickup() {
    const data = [
        { id: 1, name: 'John Doe', packageCount: 5, weight: 10, date: '17/06/2024 13:05', expiration: "17/08/2024 13:05" },
        { id: 2, name: 'John Doe', packageCount: 3, weight: 8, date: '17/06/2024 13:05', expiration: "17/07/2024 13:05" },
        { id: 3, name: 'John Doe', packageCount: 7, weight: 15, date: '17/06/2024 13:05', expiration: "17/07/2024 13:05" },
        { id: 4, name: 'John Doe', packageCount: 2, weight: 5, date: '17/06/2024 13:05', expiration: "17/07/2024 13:05" },
        { id: 5, name: 'John Doe', packageCount: 4, weight: 12, date: '17/06/2024 13:05', expiration: "17/07/2024 13:05" },
        { id: 6, name: 'John Doe', packageCount: 6, weight: 20, date: '17/06/2024 13:05', expiration: "17/07/2024 13:05" },
        { id: 7, name: 'John Doe', packageCount: 5, weight: 10, date: '17/06/2024 13:05', expiration: "17/08/2024 13:05" },
        { id: 8, name: 'John Doe', packageCount: 3, weight: 8, date: '17/06/2024 13:05', expiration: "17/07/2024 13:05" },
        { id: 9, name: 'John Doe', packageCount: 7, weight: 15, date: '17/06/2024 13:05', expiration: "17/07/2024 13:05" },
        { id: 10, name: 'John Doe', packageCount: 2, weight: 5, date: '17/06/2024 13:05', expiration: "17/07/2024 13:05" },
        { id: 11, name: 'John Doe', packageCount: 4, weight: 12, date: '17/06/2024 13:05', expiration: "17/07/2024 13:05" },
        { id: 12, name: 'John Doe', packageCount: 6, weight: 20, date: '17/06/2024 13:05', expiration: "17/07/2024 13:05" },
    ];

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

    const offset = currentPage * itemsPerPage;
    const currentPageData = data.slice(offset, offset + itemsPerPage);
    const pageCount = Math.ceil(data.length / itemsPerPage);

    return (
        
        <div className="container mx-auto w-full">
            <span className="text-xl font-bold">
                Unscaled Pickups
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
                            packageCount={item.packageCount}
                            weightValue={item.weight}
                            dateValue={item.date}
                            expeditionId={item.id}
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