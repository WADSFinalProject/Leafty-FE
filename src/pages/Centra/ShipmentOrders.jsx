import React, { useState } from 'react';
import WidgetContainer from '../../components/Cards/WidgetContainer';
import CircularButton from '../../components/CircularButton';
import Countdown from '../../components/Countdown';
import CountdownIcon from '../../assets/Countdown.svg';
import "../../style/TabView.css";
import Shipments from '../../assets/Shipments.svg';
import ShipmentPopup from '../../components/Popups/ShipmentPopup';
import ShipmentLogo from '../../assets/ShipmentDetail.svg';
import AccordionUsage from '../../components/AccordionUsage';

function ShipmentOrders() {
    const [selectedData, setSelectedData] = useState(null);
    const Orders = [
        { time: "Packing", color: "#79B2B7", image: CountdownIcon, weight: "15 Kg", code: "O123486" , detailImage: ShipmentLogo,},

    ];
    const handleButtonClick = (item) => {
        setSelectedData(item);
        document.getElementById('ShipmentPopup').showModal();
      };

      const accordions = [
        {
          summary: 'Ordered shipment',
          details: () => (
            <>
             {Orders.map((item, index) => (
                <div key={`order_${index}`} className=' flex justify-between  p-1'>
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
        }
        
      ];
    
    return (
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

export default ShipmentOrders;
