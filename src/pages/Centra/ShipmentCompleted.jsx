import React, { useState } from 'react';
import { Link ,Outlet} from 'react-router-dom';
import WidgetContainer from '../../components/Cards/WidgetContainer';
import SearchLogo from '../../assets/SearchLogo.svg';
import CircularButton from '../../components/CircularButton';
import Countdown from '../../components/Countdown';
import InnerPlugins from '../../assets/InnerPlugins.svg';
import "../../style/TabView.css";
import Shipments from '../../assets/Shipments.svg';
import Arrived from '../../assets/Arrived.svg';
import InputField from '../../components/InputField';



function ShipmentCompleted(){
    const Completed = [
        { time: "Arrived", color: "#DEE295", image: Arrived, weight: "15 Kg", code: "O123456" },

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
                        {Completed.map((item, index) => (
                            <div key={`completed_${index}`} className=' flex justify-between mt-3'>
                                <WidgetContainer borderRadius="10px" className="w-full flex items-center">
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
                                    <div className="flex ml-auto items-center">
                                        <Countdown time={item.time} color={item.color} image={item.image} />
                                    </div>
                                </WidgetContainer>
                            </div>
                        ))}
                        </>
    )

}

export default ShipmentCompleted;
