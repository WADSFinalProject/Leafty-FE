import React, { useState, useEffect, useCallback, useMemo } from 'react';
import axios from 'axios';
import WidgetContainer from '../../components/Cards/WidgetContainer';
import CircularButton from '../../components/CircularButton';
import Shipments from '../../assets/Shipments.svg';
import ShipmentPopup from '../../components/Popups/ShipmentPopup';
import AccordionUsage from '../../components/AccordionUsage';
import { useOutletContext } from 'react-router';
import { API_URL } from '../../App';
import ShipmentStatus from '@components/ShipmentStatus';
import LoadingBackdrop from '../../components/LoadingBackdrop';
import LoadingStatic from "@components/LoadingStatic"

function ShipmentOrders() {
    const [shipmentData, setShipmentData] = useState([]);
    const [selectedData, setSelectedData] = useState(null);
    const [users, setUsers] = useState([]);
    const UserID = useOutletContext();
    const [loading, SetLoading] = useState(true);
    const courierCache = useMemo(() => ({}), []);

    const fetchShipments = useCallback(async () => {
        try {
            // Fetching shipments and users in parallel
            const [shipmentsResponse, usersResponse] = await Promise.all([
                axios.get(`${API_URL}/shipment/get_by_user/${UserID}`),
                axios.get(`${API_URL}/user/get`)
            ]);

            const shipments = shipmentsResponse.data;

            // Fetch all necessary flour and courier data in parallel
            const promises = shipments.map(async (shipment) => {
                const flourDetails = await Promise.all(shipment.FlourIDs.map(async (flourID) => {
                    const flourResponse = await axios.get(`${API_URL}/flour/get/${flourID}`);
                    return {
                        FlourID: flourID,
                        Flour_Weight: flourResponse.data.Flour_Weight
                    };
                }));

                const totalFlourWeight = flourDetails.reduce((sum, flour) => sum + flour.Flour_Weight, 0);

                let courierName;
                if (courierCache[shipment.CourierID]) {
                    courierName = courierCache[shipment.CourierID];
                } else {
                    const courierResponse = await axios.get(`${API_URL}/courier/get/${shipment.CourierID}`);
                    courierName = courierResponse.data.CourierName;
                    courierCache[shipment.CourierID] = courierName;
                }

                return {
                    ...shipment,
                    ShipmentWeight: totalFlourWeight,
                    CourierName: courierName
                };
            });

            // Wait for all promises to resolve
            const updatedShipments = await Promise.all(promises);

            // Update state with fetched data
            setShipmentData(updatedShipments);
            setUsers(usersResponse.data);
            SetLoading(false);

            // Logging
            console.log('Updated shipments:', updatedShipments);
            console.log('Fetched users:', usersResponse.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }, [UserID, courierCache]); 

    // Initial fetch on component mount
    useEffect(() => {
        fetchShipments();
    }, [fetchShipments]);

    const handleButtonClick = useCallback((item) => {
        setSelectedData(item);
        console.log('Selected shipment data:', item);
        setTimeout(() => {
            document.getElementById('ShipmentPopup').showModal();
        }, 5);
    }, []);

    const refreshData = useCallback(async () => {
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
    }, [UserID]);

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

    if (loading) {
        return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
            <LoadingStatic />
        </div>
    }

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
