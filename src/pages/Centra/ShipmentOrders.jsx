import React, { useState, useEffect } from 'react';
import WidgetContainer from '../../components/Cards/WidgetContainer';
import CircularButton from '../../components/CircularButton';
import Countdown from '../../components/Countdown';
import CountdownIcon from '../../assets/Countdown.svg';
import "../../style/TabView.css";
import Shipments from '../../assets/Shipments.svg';
import ShipmentPopup from '../../components/Popups/ShipmentPopup';
import ShipmentLogo from '../../assets/ShipmentDetail.svg';
import AccordionUsage from '../../components/AccordionUsage';
import { useOutletContext } from 'react-router';
import axios from 'axios';
import { API_URL } from '../../App';
import ShipmentStatus from '@components/ShipmentStatus';

function ShipmentOrders() {
    const [shipmentData, setShipmentData] = useState([]);
    const [selectedData, setSelectedData] = useState(null);
    const UserID = useOutletContext();

    useEffect(() => {
        const fetchShipments = async () => {
            try {
                const response = await axios.get(`${API_URL}/shipment/get_by_user/${UserID}`);
                console.log('Fetched shipments:', response.data);
                const shipments = response.data.filter(shipment => shipment.ShipmentDate === null); // Exclude shipments with a ShipmentDate

                // Fetch details for each FlourID in each shipment
                const updatedShipments = await Promise.all(shipments.map(async (shipment) => {
                    const flourDetails = await Promise.all(shipment.FlourIDs.map(async (flourID) => {
                        const flourResponse = await axios.get(`${API_URL}/flour/get/${flourID}`);
                        return {
                            FlourID: flourID,
                            Flour_Weight: flourResponse.data.Flour_Weight // Assuming API response structure
                        };
                    }));

                    // Calculate the total ShipmentWeight as the sum of Flour_Weight
                    const totalFlourWeight = flourDetails.reduce((sum, flour) => sum + flour.Flour_Weight, 0);

                    const courierResponse = await axios.get(`${API_URL}/courier/get/${shipment.CourierID}`);
                    const courierName = courierResponse.data.CourierName;

                    return {
                        ...shipment,
                        ShipmentWeight: totalFlourWeight,
                        CourierName: courierName
                    };
                }));

                setShipmentData(updatedShipments);
                console.log(updatedShipments)
            } catch (error) {
                console.error('Error fetching shipments:', error);
            }
        };

        fetchShipments();
    }, [UserID]);

    const handleButtonClick = (item) => {
        setSelectedData(item);
        setTimeout(() => {
            document.getElementById('ShipmentPopup').showModal();
        }, 5);
    };

    const refreshData = async () => {
        try {
            const response = await axios.get(`${API_URL}/shipment/get_by_user/${UserID}`);
            const shipments = response.data.filter(shipment => shipment.ShipmentDate === null); // Ensure filtering here as well
            const updatedShipments = await Promise.all(shipments.map(async (shipment) => {
                const flourDetails = await Promise.all(shipment.FlourIDs.map(async (flourID) => {
                    const flourResponse = await axios.get(`${API_URL}/flour/get/${flourID}`);
                    return {
                        FlourID: flourID,
                        Flour_Weight: flourResponse.data.Flour_Weight
                    };
                }));

                const totalFlourWeight = flourDetails.reduce((sum, flour) => sum + flour.Flour_Weight, 0);
                const courierResponse = await axios.get(`${API_URL}/courier/get/${shipment.CourierID}`);
                const courierName = courierResponse.data.CourierName;

                return {
                    ...shipment,
                    ShipmentWeight: totalFlourWeight,
                    CourierName: courierName
                };
            }));

            setShipmentData(updatedShipments);
        } catch (error) {
            console.error('Error refreshing shipments:', error);
        }
    };

    const accordions = [
        {
            summary: 'Ordered shipment',
            details: () => (
                <>
                    {shipmentData.map((item, index) => (
                        <div key={`order_${index}`} className='flex justify-between p-1'>
                            <WidgetContainer borderRadius="10px" className="w-full flex items-center">
                                <button onClick={() => handleButtonClick(item)}>
                                    <CircularButton imageUrl={Shipments} backgroundColor="#C0CD30" />
                                </button>

                                <div className='flex flex-col ml-3'>
                                    <span className="font-montserrat text-base font-semibold leading-tight tracking-wide text-left">
                                        {item.ShipmentWeight} Kg
                                    </span>
                                    <span className='font-montserrat text-sm font-medium leading-17 tracking-wide text-left'>
                                        S01{item.ShipmentID}
                                    </span>
                                </div>
                                <div className="flex ml-auto items-center">
                                    <ShipmentStatus packing />
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
                    confirmDeliver
                    courier={selectedData.CourierName}
                    code={selectedData.ShipmentID}
                    time={selectedData.time}
                    quantity={selectedData.ShipmentQuantity}
                    weight={selectedData.ShipmentWeight + " Kg"}
                    date={selectedData.date}
                    imageSrc={selectedData.detailImage}
                    onConfirm={refreshData} // Pass the refreshData function as a prop
                />
            )}
        </>
    )
}

export default ShipmentOrders;
