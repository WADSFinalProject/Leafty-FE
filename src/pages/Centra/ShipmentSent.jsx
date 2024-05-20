import React, { useState } from 'react';
import { Link ,Outlet} from 'react-router-dom';
import WidgetContainer from '../../components/Cards/WidgetContainer';
import SearchLogo from '../../assets/SearchLogo.svg';
import CircularButton from '../../components/CircularButton';
import Countdown from '../../components/Countdown';
import InnerPlugins from '../../assets/InnerPlugins.svg';
import "../../style/TabView.css";
import Shipments from '../../assets/Shipments.svg';
import Delivered from '../../assets/Delivered.svg';
import Verified from '../../assets/Verified.svg';
import Rescalling from '../../assets/Rescalling.svg';
import InputField from '../../components/InputField';



function ShipmentSent(){
    const Send = [
        { time: "Delivered", color: "#79B2B7", image: Delivered, weight: "15 Kg", code: "O123456" },
        { time: "Verified", color: "#C0CD30", image: Verified, weight: "15 Kg", code: "O123456" },
        { time: "Re-Scalling", color: "#D45D5D", image: Rescalling, weight: "15 Kg", code: "O123456" },
    ]
    return(
        <>
        <div className="mt-4  flex justify-center items-center gap-3"> 
                            <InputField icon = {SearchLogo} placeholder={"Search"} className={"max-w-none"}/>


                            <div className='ml-1'>
                                <WidgetContainer backgroundColor="#94C3B3" borderRadius="20px" border={false}>
                                    <img src={InnerPlugins} alt="InnerPlugins" className='w-8 h-8 ' />
                                </WidgetContainer>
                            </div> 
                        </div>
                        {Send.map((item, index) => (
                            <div key={`send_${index}`} className=' flex justify-between mt-3'>
                                <WidgetContainer borderRadius="10px" className="w-full flex items-center ">
                                    <Link to="/shipmentdetail">
                                        <CircularButton imageUrl={Shipments} backgroundColor="#C0CD30" />
                                    </Link>
                                    <div className='flex flex-col ml-3'>
                                        <span className="font-montserrat text-base font-semibold leading-tight tracking-wide text-left">
                                            {item.weight}
                                        </span>
                                        <span className='font-montserrat text-sm font-medium leading-17 tracking-wide text-left'>
                                            {item.code}
                                        </span>
                                    </div>
                                    <div className="flex ml-auto items-center max-w-22 justify-items-center">
                                        <Countdown time={item.time} color={item.color} image={item.image} />
                                    </div>
                                </WidgetContainer>
                            </div>
                        ))}
                        </>
    )

}

export default ShipmentSent;
