import React, { useState, useEffect, useCallback } from 'react';
import WidgetContainer from '../../components/Cards/WidgetContainer';
import CircularButton from '../../components/CircularButton';
import Shipments from '../../assets/Shipments.svg';
import ShipmentPopup from '../../components/Popups/ShipmentPopup';
import AccordionUsage from '../../components/AccordionUsage';
import { useOutletContext } from 'react-router';
import axios from 'axios';
import { API_URL } from '../../App';
import ShipmentStatus from '../../components/ShipmentStatus';
import LoadingStatic from "@components/LoadingStatic"

function ShipmentSent() {
    const [shipmentData, setShipmentData] = useState([]);
    const [selectedData, setSelectedData] = useState(null);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const UserID = useOutletContext();

    const fetchUsers = useCallback(async () => {
        try {
            const response = await axios.get(`${API_URL}/user/get`);
            setUsers(response.data);
            console.log('Fetched users:', response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    }, []);

    const fetchShipments = useCallback(async () => {
        try {
            const response = await axios.get(`${API_URL}/shipment/get_by_user/${UserID}`);
            const shipments = response.data;

            const updatedShipments = await Promise.all(shipments.map(async (shipment) => {
                const [shipmentWeight, courierName] = await Promise.all([
                    calculateShipmentWeight(shipment.FlourIDs),
                    getCourierName(shipment.CourierID)
                ]);

                return {
                    ...shipment,
                    ShipmentWeight: shipmentWeight,
                    CourierName: courierName
                };
            }));

            setShipmentData(updatedShipments);
            console.log('Updated shipments:', updatedShipments);
        } catch (error) {
            console.error('Error fetching shipments:', error);
        } finally {
            setLoading(false);
        }
    }, [UserID]);

    useEffect(() => {
        fetchUsers();
        fetchShipments();
    }, [fetchUsers, fetchShipments]);

    const handleButtonClick = (item) => {
        setSelectedData(item);
        console.log('Selected shipment data:', item);
        setTimeout(() => {
            document.getElementById('ShipmentPopup').showModal();
        }, 5);
    };

    const calculateShipmentWeight = async (flourIDs) => {
        try {
            const flourWeights = await Promise.all(flourIDs.map(async (flourID) => {
                const flourResponse = await axios.get(`${API_URL}/flour/get/${flourID}`);
                console.log(`Fetched flour details for flour ID ${flourID}:`, flourResponse.data);
                return flourResponse.data?.Flour_Weight || 0;
            }));
            return flourWeights.reduce((sum, flourWeight) => sum + flourWeight, 0);
        } catch (error) {
            console.error('Error calculating shipment weight:', error);
            return 0;
        }
    };  

    const getCourierName = async (courierID) => {
        if (!courierID) {
            return 'Unknown Courier';
        }
        try {
            const courierResponse = await axios.get(`${API_URL}/courier/get/${courierID}`);
            console.log(`Fetched courier details for courier ID ${courierID}:`, courierResponse.data);
            return courierResponse.data?.CourierName || 'Unknown Courier';
        } catch (error) {
            console.error(`Error fetching courier details for courier ID ${courierID}:`, error);
            return 'Unknown Courier';
        }
    };

    if (loading) {
        return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <LoadingStatic />
    </div>;
    }

    const deliveredShipments = shipmentData.filter(item => !item.Check_in_Date && !item.Check_in_Quantity);
    const verifiedShipments = shipmentData.filter(item => item.Check_in_Date && item.Check_in_Quantity && item.Rescalled_Weight === null);
    const rescalledShipments = shipmentData.filter(item => item.Rescalled_Weight !== null);

    return (
        <>
            <AccordionUsage accordions={[
                {
                    summary: 'Delivered Shipments',
                    details: () => (
                        <>
                            {deliveredShipments.length > 0 ? deliveredShipments.map((item, index) => (
                                <div key={`delivered_${index}`} className='flex justify-between p-1'>
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
                                            <ShipmentStatus delivered />
                                        </div>
                                    </WidgetContainer>
                                </div>
                            )) : <div>No shipments found.</div>}
                        </>
                    ),
                    defaultExpanded: true,
                },{
                    summary: 'Verified Shipments',
                    details: () => (
                        <>
                            {verifiedShipments.length > 0 ? verifiedShipments.map((item, index) => (
                                <div key={`verified_${index}`} className='flex justify-between p-1'>
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
                                            <ShipmentStatus verified />
                                        </div>
                                    </WidgetContainer>
                                </div>
                            )) : <div>No shipments found.</div>}
                        </>
                    ),
                    defaultExpanded: false,
                },{
                    summary: 'Re-scalled Shipments',
                    details: () => (
                        <>
                            {rescalledShipments.length > 0 ? rescalledShipments.map((item, index) => (
                                <div key={`rescalled_${index}`} className='flex justify-between p-1'>
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
                                            <ShipmentStatus rescalling />
                                        </div>
                                    </WidgetContainer>
                                </div>
                            )) : <div>No shipments found.</div>}
                        </>
                    ),
                    defaultExpanded: false,
                }
            ]} className="mt-3" />
            {selectedData && (
                <ShipmentPopup
                    courier={selectedData.CourierName}
                    code={selectedData.ShipmentID}
                    userID={selectedData.UserID}
                    users={users}
                    quantity={selectedData.ShipmentQuantity}
                    weight={selectedData.ShipmentWeight + " Kg"}
                    date={selectedData.ShipmentDate}
                />
            )}
        </>
    );
}

export default ShipmentSent;
