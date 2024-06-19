import React, { useState, useEffect, useCallback } from 'react';
import WidgetContainer from '../../components/Cards/WidgetContainer';
import CircularButton from '../../components/CircularButton';
import "../../style/TabView.css";
import Shipments from '../../assets/Shipments.svg';
import ShipmentPopup from '../../components/Popups/ShipmentPopup';
import AccordionUsage from '../../components/AccordionUsage';
import axios from 'axios';
import { API_URL } from '../../App';
import ShipmentStatus from '../../components/ShipmentStatus';
import LoadingStatic from '../../components/LoadingStatic';

function ShipmentCompleted() {
    const [shipments, setShipments] = useState([]);
    const [selectedData, setSelectedData] = useState(null);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);  // Set loading to true at the start of data fetching

            // Fetch shipments and users concurrently
            const [shipmentsResponse, usersResponse] = await Promise.all([
                axios.get(`${API_URL}/shipment/get`),
                axios.get(`${API_URL}/user/get`)
            ]);

            const fetchedShipments = shipmentsResponse.data.filter(shipment => shipment.Centra_Reception_File);

            // Create caches for couriers and users to avoid repeated API calls
            const courierCache = {};
            const userCache = {};

            const updatedShipments = await Promise.all(fetchedShipments.map(async (shipment) => {
                // Fetch courier data and cache it
                let courierName = courierCache[shipment.CourierID];
                if (!courierName) {
                    const courierResponse = await axios.get(`${API_URL}/courier/get/${shipment.CourierID}`);
                    courierName = courierResponse.data.CourierName;
                    courierCache[shipment.CourierID] = courierName;
                }

                // Fetch user data and cache it
                let userName = userCache[shipment.UserID];
                if (!userName) {
                    const userResponse = await axios.get(`${API_URL}/user/get_user/${shipment.UserID}`);
                    userName = userResponse.data.Username;
                    userCache[shipment.UserID] = userName;
                }

                // Fetch all flour details in parallel and calculate total weight
                const flourDetailsPromises = shipment.FlourIDs.map(flourID =>
                    axios.get(`${API_URL}/flour/get/${flourID}`)
                );
                const flourDetails = await Promise.all(flourDetailsPromises);
                const totalFlourWeight = flourDetails.reduce((sum, flourResponse) => sum + flourResponse.data.Flour_Weight, 0);

                return {
                    ...shipment,
                    CourierName: courierName,
                    UserName: userName,
                    ShipmentWeight: totalFlourWeight
                };
            }));

            setShipments(updatedShipments);
            setUsers(usersResponse.data);

            console.log('Updated shipments:', updatedShipments);
            console.log('Fetched users:', usersResponse.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);  // Set loading to false after data fetching is complete
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleButtonClick = useCallback((item) => {
        setSelectedData(item);
        console.log('Selected shipment data:', item);
        setTimeout(() => {
            document.getElementById('ShipmentPopup').showModal();
        }, 5);
    }, []);

    const accordions = [
        {
            summary: 'Completed Shipments',
            details: () => (
                <>
                    {shipments.map((item, index) => (
                        <div key={`completed_${index}`} className='flex justify-between p-1'>
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
                                    <ShipmentStatus arrived={item.Check_in_Date !== null} />
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
                    courier={selectedData.CourierName}
                    code={selectedData.ShipmentID}
                    userID={selectedData.UserID}
                    users={users}
                    quantity={selectedData.ShipmentQuantity}
                    weight={`${selectedData.ShipmentWeight} Kg`}
                    date={selectedData.ShipmentDate}
                    imageSrc={selectedData.detailImage}
                />
            )}
        </>
    );
}

export default ShipmentCompleted;
