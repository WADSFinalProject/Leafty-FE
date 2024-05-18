import { animate, motion, useAnimationControls } from "framer-motion";
import LongContainer from "../../components/Cards/LongContainer";

const reception_data = Array(11).fill({ items: "a" });

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
                    <LongContainer />
                </motion.div>
            ))}
        </div>
    </>
}

export default HarborReception;
