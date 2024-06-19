import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WidgetContainer from '../../components/Cards/WidgetContainer';
import CircularButton from '../../components/CircularButton';
import Shipments from '../../assets/Shipments.svg';
import ShipmentPopup from '../../components/Popups/ShipmentPopup';
import AccordionUsage from '../../components/AccordionUsage';
import { useOutletContext } from 'react-router';
import { API_URL } from '../../App';
import ShipmentStatus from '@components/ShipmentStatus';

function ShipmentOrders() {
    const [shipmentData, setShipmentData] = useState([]);
    const [selectedData, setSelectedData] = useState(null);
    const [users, setUsers] = useState([]);
    const UserID = useOutletContext();

    // Function to fetch shipments
    const fetchShipments = async () => {
        try {
            const [shipmentsResponse, usersResponse] = await Promise.all([
                axios.get(`${API_URL}/shipment/get_by_user/${UserID}`),
                axios.get(`${API_URL}/user/get`)
            ]);

            console.log('Fetched shipments:', shipmentsResponse.data);
            const shipments = shipmentsResponse.data.filter(shipment => shipment.ShipmentDate === null);

            const updatedShipments = await Promise.all(shipments.map(async (shipment) => {
                const flourDetails = await Promise.all(shipment.FlourIDs.map(async (flourID) => {
                    const flourResponse = await axios.get(`${API_URL}/flour/get/${flourID}`);
                    console.log(`Fetched flour details for flour ID ${flourID}:`, flourResponse.data);
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
            console.log('Updated shipments:', updatedShipments);

            setUsers(usersResponse.data);
            console.log('Fetched users:', usersResponse.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // Initial fetch on component mount
    useEffect(() => {
        fetchShipments();
    }, [UserID]);

    // Function to handle button click and show popup
    const handleButtonClick = (item) => {
        setSelectedData(item);
        console.log('Selected shipment data:', item);
        setTimeout(() => {
            document.getElementById('ShipmentPopup').showModal();
        }, 5);
    };

    // Function to refresh shipment data
    const refreshData = async () => {
        try {
            const response = await axios.get(`${API_URL}/shipment/get_by_user/${UserID}`);
            const shipments = response.data.filter(shipment => shipment.ShipmentDate === null);

            const updatedShipments = await Promise.all(shipments.map(async (shipment) => {
                const flourDetails = await Promise.all(shipment.FlourIDs.map(async (flourID) => {
                    const flourResponse = await axios.get(`${API_URL}/flour/get/${flourID}`);
                    console.log(`Fetched flour details for flour ID ${flourID}:`, flourResponse.data);
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
            console.log('Refreshed shipments:', updatedShipments);
        } catch (error) {
            console.error('Error refreshing shipments:', error);
        }
    };

    const accordions = [
        {
            summary: 'Ordered shipments',
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
                    userID={selectedData.UserID}
                    users={users}
                    quantity={selectedData.ShipmentQuantity}
                    weight={`${selectedData.ShipmentWeight} Kg`}
                    date={selectedData.ShipmentDate}
                    imageSrc={selectedData.detailImage}
                    onConfirm={refreshData}
                />
            )}
        </>
    );
}

export default ShipmentOrders;
