import React, { useState } from 'react';
import HarborLayout from './HarborLayout';
import WidgetContainer from '../../components/Cards/WidgetContainer';
import LongContainer from '../../components/Cards/LongContainer';
import { motion } from 'framer-motion';
import VerifiedPackages from '../../assets/VerifiedPackages.svg';
import UnverifiedShipment from '../../assets/UnverifiedShipment.svg';
import UnverifiedPackages from '../../assets/UnverifiedPackages.svg';
import "../../style/Dashboard.css";



function DashboardHarbor() {
    const data = Array(5).fill({ items: "a" });
    const [value, setValue] = useState("Dashboard");

    return <>
        <div className='flex items-center justify-between'>
            <motion.div className='flex items-center md:flex-row gap-2' initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }} >
                <WidgetContainer className={"p-5 h-[13rem] md:h-full"}>
                    <div className='flex flex-row'>
                        <div className='flex flex-col'>
                            <span className="font-semibold text-gray-600">Verified Package</span>
                            <span className='font-montserrat text-xl font-semibold text-left'>30</span>
                        </div>
                        <img src={VerifiedPackages} alt="VerifiedPackages" className='place-self-start' />
                    </div>
                </WidgetContainer>
                <div className="flex flex-col md:flex-row gap-2 justify-around">
                    <WidgetContainer>
                        <div className='flex items-center gap-2 justify-between'>
                            <div className='flex flex-col'>
                                <span className=' w-8 font-montserrat text-base font-semibold text-gray-600'>Unverified Shipment</span>
                                <span className='font-montserrat text-xl font-semibold'>3</span>
                            </div>
                            <img src={UnverifiedShipment} alt="Unverified Shipment" className='w-50 h-auto mr-3 ' />
                        </div>
                    </WidgetContainer>
                    <WidgetContainer>
                        <div className='flex items-center gap-2 justify-between'>
                            <div className='flex flex-col'>
                                <span className='font-montserrat text-base font-semibold text-gray-600'>Unverified Packages</span>
                                <span className='font-montserrat text-xl font-semibold'>3</span>
                            </div>
                            <img src={UnverifiedPackages} alt="UnverifiedPackages" className='w-50 h-auto mr-1 mt-2' />
                        </div>
                    </WidgetContainer>
                </div>
            </motion.div>
        </div>
        <span className="font-semibold text-base">Recent Verified Shipment</span>
        <div className='flex flex-col gap-2'>
            {data.map((item, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                    <LongContainer />
                </motion.div>
            ))}
        </div>
    </>
}

export default DashboardHarbor;
