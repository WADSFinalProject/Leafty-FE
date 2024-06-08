import LineChart from "@components/Cards/LineChart"
import Graph from "../../components/Graph";
import WidgetContainer from "../../components/Cards/WidgetContainer";
import StatsContainer from "../../components/Cards/StatsContainer";
import AwaitingLeaves from '@assets/AwaitingLeaves.svg';
import ExpiredWetLeaves from '@assets/ExpiredLeavesWet.svg';
import ProcessedLeaves from '@assets/ProcessedLeaves.svg';
import TotalCollectedWet from '@assets/TotalCollectedWet.svg';
import PieChart from "../../components/Cards/PieChart";
import { animate, motion, useAnimationControls } from "framer-motion";
import ReceiptContainer from '@components/Cards/ReceiptContainer';
import LongContainer from "../../components/Cards/LongContainer";

function WetLeavesOverview() {
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

    const Pielabels = ['Wet Leaves', 'Dry Leaves', 'Powder'];
    const Piedata = [100, 200, 700];
    const reception_data = Array(11).fill({ items: "a" });

    return <>
        <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-2">
                <WidgetContainer className={"flex w-2/3 h-1/2"}><Graph /></WidgetContainer>
                <div className="grid grid-cols-2 gap-2 flex-1">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.35, delay: stat.delay }}
                            className="flex" // Ensure each item takes equal space
                        >
                            <StatsContainer
                                row = {true}
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
            <div className="flex justify-between flex-row gap-2">
                <div className="flex flex-col justify-center">
                    <div className="flex items-center justify-between">
                        <span className="font-bold text-xl">Recently Gained Wet Leaves</span>
                        <span className="text-[#94C3B3]">See all</span>
                    </div>
                    <div>
                        <div className='flex flex-row gap-2 flex-wrap justify-between h-full'>
                            <LongContainer />
                            <LongContainer />
                            <LongContainer />
                        </div>
                    </div>

                </div>
                <div className="flex items-center">
                    <div className=" container h-full"><WidgetContainer>
                        <PieChart labels={Pielabels} data={Piedata} />
                    </WidgetContainer></div>
                </div>
            </div>
        </div>
    </>
}

export default WetLeavesOverview;