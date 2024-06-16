import React, { useState } from 'react';
import WidgetContainer from '../../components/Cards/WidgetContainer';
import CircularButton from '../../components/CircularButton';
import Countdown from '../../components/Countdown';
import "../../style/TabView.css";
import Shipments from '../../assets/Shipments.svg';
import Arrived from '../../assets/Arrived.svg';
import ShipmentPopup from '../../components/Popups/ShipmentPopup';
import AccordionUsage from '../../components/AccordionUsage';
import ShipmentStatus from '../../components/ShipmentStatus';


function ShipmentCompleted() {
    const Completed = [
        { time: "Arrived", color: "#DEE295", image: Arrived, weight: "15 Kg", code: "O123457" },

    ]
    const handleButtonClick = (item) => {
        setSelectedData(item);
        setTimeout(() => {
            document.getElementById('ShipmentPopup').showModal();
        }, 5);
    };
    const [selectedData, setSelectedData] = useState(null);
    const accordions = [
        {
            summary: 'Completed Shipment',
            details: () => (
                <>
                    {Completed.map((item, index) => (
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
                                    <ShipmentStatus arrived />
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

            <AccordionUsage accordions={accordions} className="mt-3" />
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

export default ShipmentCompleted;
