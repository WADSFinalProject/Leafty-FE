import React, { useState, useEffect } from 'react';
import WidgetContainer from '../../components/Cards/WidgetContainer';
import CircularButton from '../../components/CircularButton';
import "../../style/TabView.css";
import Shipments from '../../assets/Shipments.svg';
import ShipmentPopup from '../../components/Popups/ShipmentPopup';
import AccordionUsage from '../../components/AccordionUsage';
import axios from 'axios';
import { API_URL } from '../../App';
import ShipmentStatus from '../../components/ShipmentStatus';

function ShipmentCompleted() {
    const [shipments, setShipments] = useState([]);
    const [selectedData, setSelectedData] = useState(null);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchShipments = async () => {
            try {
                const response = await axios.get(`${API_URL}/shipment/get`);
                console.log('Fetched shipments:', response.data);
                const completedShipments = response.data.filter(shipment =>
                    shipment.ShipmentDate !== null
                ); // Exclude shipments without a ShipmentDate

                // Fetch details for each shipment
                const updatedShipments = await Promise.all(completedShipments.map(async (shipment) => {
                    const courierResponse = await axios.get(`${API_URL}/courier/get/${shipment.CourierID}`);
                    const courierName = courierResponse.data.CourierName;

                    const userResponse = await axios.get(`${API_URL}/user/get_user/${shipment.UserID}`);
                    const userName = userResponse.data.Username;

                    const flourDetails = await Promise.all(shipment.FlourIDs.map(async (flourID) => {
                        const flourResponse = await axios.get(`${API_URL}/flour/get/${flourID}`);
                        return flourResponse.data;
                    }));

                    const totalFlourWeight = flourDetails.reduce((sum, flour) => sum + flour.Flour_Weight, 0);

                    return {
                        ...shipment,
                        CourierName: courierName,
                        UserName: userName,
                        ShipmentWeight: totalFlourWeight
                    };
                }));

                setShipments(updatedShipments);
                console.log('Updated shipments:', updatedShipments);
            } catch (error) {
                console.error('Error fetching shipments:', error);
            }
        };

        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${API_URL}/user/get`);
                console.log('Fetched users:', response.data);
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchShipments();
        fetchUsers();
    }, []);

    const handleButtonClick = (item) => {
        setSelectedData(item);
        console.log('Selected shipment data:', item);
        setTimeout(() => {
            document.getElementById('ShipmentPopup').showModal();
        }, 5);
    };

    const accordions = [
        {
            summary: 'Completed Shipment',
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
