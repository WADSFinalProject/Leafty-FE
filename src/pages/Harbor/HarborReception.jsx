import { animate, motion, useAnimationControls } from "framer-motion";
import LongContainer from "../../components/Cards/LongContainer";


const reception_data = Array(11).fill({
    showWeight: true,
    packageCount: 10,
    weightValue: 20,
    dateValue: "2024-06-13",
    expeditionId: "1234"
});
function HarborReception(){
    return <>
        <div className='flex flex-col gap-2'>
            {reception_data.map((item, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                    <LongContainer
                            packageCount={item.packageCount}
                            weightValue={item.weightValue}
                            dateValue={item.dateValue}
                            expeditionId={item.expeditionId}
                        />
                </motion.div>
            ))}
        </div>
    </>
}

export default HarborReception;
