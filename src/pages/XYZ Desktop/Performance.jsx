import { useState, useEffect } from 'react';
import 'daisyui/dist/full.css';
import { animate, motion, useAnimationControls } from "framer-motion";
import StatsContainer from "@components/Cards/StatsContainer";
import centra from '@assets/centra.svg'
import AwaitingLeaves from '@assets/AwaitingLeaves.svg';
import ExpiredWetLeaves from '@assets/ExpiredLeavesWet.svg';
import ProcessedLeaves from '@assets/ProcessedLeaves.svg';
import TotalCollectedWet from '@assets/TotalCollectedWet.svg';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import WidgetContainer from '../../components/Cards/WidgetContainer';
import MyMapComponent from '@components/MyMapComponents';
import LongContainer from '../../components/Cards/LongContainer';
import PerformanceMap from '../../components/PerformanceMap';
import MarkerDetails from '../../components/MarkerDetails';
import LongUser from '../../components/Cards/LongUser';

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

const Performance = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [tabletMode, setTabletMode] = useState(false);
    const [currentFilter, setCurrentFilter] = useState("All Time");
    const [showMap, setShowMap] = useState(false);
    const [addressDetails, setAddressDetails] = useState("");

    return (
        <div className="container mx-auto w-full flex gap-2 flex-col">
            <div className="flex flex-wrap gap-4 justify-stretch">
                {stats.map((stat, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.35, delay: stat.delay }}
                        className="flex-grow flex-shrink lg:basis-1/5 basis-1/2" // Ensure each item takes equal space
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
            <span className='font-bold text-xl'>Map Distribution</span>
            <WidgetContainer padding={false}><PerformanceMap setShowMap={setShowMap} setAddressDetails={setAddressDetails} /></WidgetContainer>
            <div className='flex gap-2 flex-row'>
                <div className='flex flex-col w-1/2'>
                    <div className='flex justify-between items-center mb-2'>
                        <span className='text-xl font-semibold'>Centra List</span>
                        <span className='text-md text-[#94C3B3]'>See all</span>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <LongUser Atis='test' Mailis={"test"} Phonis=''/>
                        <LongUser />
                        <LongUser />
                    </div>
                </div>
                <div className='flex flex-col w-1/2'>
                    {/* Marker Details */}
                    <MarkerDetails centra wet_leaves={200} dry_leaves={200} powder={100} packages={10}></MarkerDetails>
                    <div className='flex justify-between items-center mt-2'>
                        <span className='text-xl font-semibold'>Harbor</span>
                    </div>
                    <LongUser />
                </div>
            </div>
        </div>
    );
};

export default Performance;