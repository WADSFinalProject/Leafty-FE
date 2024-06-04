import { animate, motion, useAnimationControls } from "framer-motion";
import LongContainer from "../../components/Cards/ShipmentLongContainer";
import Shipments from '../../assets/Shipments.svg';
import CircularButton from '../../components/CircularButton';
import InputField from '../../components/InputField';
import InnerPlugins from '../../assets/InnerPlugins.svg';
import SearchLogo from '../../assets/SearchLogo.svg';
import WidgetContainer from '../../components/Cards/WidgetContainer';


const reception_data = Array(11).fill({ items: "a" });

function XYZShipmentList(){
    return <>
        <div className="mt-4  flex justify-center items-center gap-3"> 
            <InputField icon = {SearchLogo} placeholder={"Search"} className={"max-w-none"}/>


            <div className='ml-1'>
                <WidgetContainer backgroundColor="#94C3B3" borderRadius="20px" border={false}>
                    <img src={InnerPlugins} alt="InnerPlugins" className='w-8 h-8 ' />
                </WidgetContainer>
            </div> 
      </div>

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

export default XYZShipmentList;