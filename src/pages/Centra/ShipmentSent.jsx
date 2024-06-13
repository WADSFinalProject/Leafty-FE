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
import ShipmentPopup from '../../components/Popups/ShipmentPopup';
import AccordionUsage from '../../components/AccordionUsage';


function ShipmentSent(){
    const Delivery = [
        { time: "Delivered", color: "#79B2B7", image: Delivered, weight: "15 Kg", code: "O123454" },
    ]
    const Verify = [        
        { time: "Verified", color: "#C0CD30", image: Verified, weight: "15 Kg", code: "O123453" },
    ]
    const Rescalled = [
        { time: "Re-Scalling", color: "#D45D5D", image: Rescalling, weight: "15 Kg", code: "O123452" },
    ]
    const handleButtonClick = (item) => {
        setSelectedData(item);
        document.getElementById('ShipmentPopup').showModal();
      };
    const [selectedData, setSelectedData] = useState(null);
    const accordions = [
        {
          summary: 'Delivered Shipment',
          details: () => (
            <>
             {Delivery.map((item, index) => (
                <div key={`completed_${index}`} className=' flex justify-between p-1'>
                    <WidgetContainer borderRadius="10px" className="w-full flex items-center">
                        <button onClick={() => handleButtonClick(item)}>
                            <CircularButton imageUrl={Shipments} backgroundColor="#C0CD30" />
                        </button>
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
          ),
          defaultExpanded: true,
        },
        {
            summary: 'Verified Shipment',
            details: () => (
              <>
               {Verify.map((item, index) => (
                  <div key={`completed_${index}`} className=' flex justify-between p-1'>
                      <WidgetContainer borderRadius="10px" className="w-full flex items-center">
                          <button onClick={() => handleButtonClick(item)}>
                              <CircularButton imageUrl={Shipments} backgroundColor="#C0CD30" />
                          </button>
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
            ),
            defaultExpanded: false,
          }
        ,
        {
            summary: 'Re-scalled Shipment',
            details: () => (
              <>
               {Rescalled.map((item, index) => (
                  <div key={`completed_${index}`} className=' flex justify-between p-1'>
                      <WidgetContainer borderRadius="10px" className="w-full flex items-center">
                          <button onClick={() => handleButtonClick(item)}>
                              <CircularButton imageUrl={Shipments} backgroundColor="#C0CD30" />
                          </button>
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
            ),
            defaultExpanded: false,
          }
            
        
      ];
    return(
        <>
        <AccordionUsage accordions={accordions} className="mt-3"/>
                         {selectedData && (
                <ShipmentPopup
                code={selectedData.code}
                time={selectedData.time}
                weight={selectedData.weight}
                date={selectedData.date}
                imageSrc={selectedData.detailImage}
               
                />
            )}
                        </>
    )

}

export default ShipmentSent;
