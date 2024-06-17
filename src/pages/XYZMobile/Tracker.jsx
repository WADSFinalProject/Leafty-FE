import React, { useEffect, useState } from 'react';
import { useOutlet, useOutletContext, useParams } from 'react-router-dom';
import WidgetContainer from '../../components/Cards/WidgetContainer';
import PackageCount from '../../assets/Packagecount.svg';
import DateIcon from '../../assets/Date.svg';
import VerticalStepper from '../../components/VerticalStepper';
import CircularButton from '../../components/CircularButton';
import Shipments from '../../assets/Shipments.svg';
import XYZPopup from '../../components/Popups/XYZPopup';
import axios from 'axios';
import LoadingStatic from "@components/LoadingStatic"
import { API_URL } from "../../App"; // Adjust the import according to your project structure

function Tracker() {
    const { id } = useParams(); // Get shipment ID from URL params
    const [shipment, setShipment] = useState(null);
    const [courier, setCourier] = useState(null);
    const [users, setUsers] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    useEffect(() => {
        const fetchShipment = async () => {
            try {
                const response = await axios.get(`${API_URL}/shipment/getid/${id}`);
                const shipment = response.data;

                // Fetch details for each FlourID in the shipment
                const flourDetails = await Promise.all(shipment.FlourIDs.map(async (flourID) => {
                    const flourResponse = await axios.get(`${API_URL}/flour/get/${flourID}`);
                    console.log(`Fetched flour details for flour ID ${flourID}:`, flourResponse.data);
                    return {
                        FlourID: flourID,
                        Flour_Weight: flourResponse.data.Flour_Weight // Assuming API response structure
                    };
                }));

                // Calculate the total ShipmentWeight as the sum of Flour_Weight
                const totalFlourWeight = flourDetails.reduce((sum, flour) => sum + flour.Flour_Weight, 0);

                const courierResponse = await axios.get(`${API_URL}/courier/get/${shipment.CourierID}`);
                const courierName = courierResponse.data.CourierName;

                const updatedShipment = {
                    ...shipment,
                    ShipmentWeight: totalFlourWeight,
                    CourierName: courierName
                };

                setShipment(updatedShipment);
                console.log('Updated shipment:', updatedShipment);
            } catch (error) {
                console.error('Error fetching shipment:', error);
            }
        };
        
        const fetchUsers = async () => {
            try {
                console.log("Fetching all users from API...");
                const response = await axios.get(`${API_URL}/user/get`);
                console.log("Users fetched successfully:", response.data);
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        
        fetchShipment();
        fetchUsers();
    }, [id]);

    const handleButtonClick = () => {
        console.log('Selected Item:', shipment);
        setIsPopupOpen(true);
    };

    if (!shipment) {
        return <div className='flex justify-center items-center place-self-center'><LoadingStatic /></div>;
    }

    const formatDate = (date, includeTime = false) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const dateString = new Date(date).toLocaleDateString('id-ID', options);
        
        if (includeTime) {
            const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
            const timeString = new Date(date).toLocaleDateString('id-ID', timeOptions);
            return `${dateString} ${timeString}`;
        }
    
        return dateString;
    }
    
    

    return (
        <>
            <WidgetContainer borderRadius="20px">
                <div className='flex justify-center'>
                    <div className='flex justify-center mr-2'>
                        <button onClick={handleButtonClick}>
                            <CircularButton imageUrl={Shipments} backgroundColor="#C0CD30" />
                        </button>
                    </div>
                    <div className="flex flex-col ml-3 mt-1">
                        <span className="font-montserrat text-16px font-semibold tracking-02em ">
                            Expedition #{shipment.ShipmentID}
                        </span>
                        <div className="flex space-x-2 items-center">
                            <img src={PackageCount} alt="Package Count" style={{ maxWidth: '100px' }} className='w-5 h-auto' />
                            <span className="font-montserrat text-14px font-semibold tracking-02em text-center">
                                {shipment.ShipmentQuantity} 
                            </span>
                            {shipment.ShipmentDate   ? <>
                            <img src={DateIcon} alt="Date" style={{ maxWidth: '100px' }} className='w-6 h-auto' />
                            <span className="font-montserrat text-14px font-semibold tracking-02em text-center ">
                                 {formatDate(shipment.ShipmentDate)}
                            </span></>:<> <img src={DateIcon} alt="Date" style={{ maxWidth: '100px' }} className='w-6 h-auto' /> <span className="font-montserrat text-14px font-semibold tracking-02em text-center ">
                                 Not Delivered
                            </span></>}
                        </div>
                        {courier && (
                            <div className="flex space-x-2 mt-2">
                                <span className="font-montserrat text-14px font-semibold tracking-02em text-center">
                                    Courier: {shipment.CourierName}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </WidgetContainer>
            <VerticalStepper step={1} />
            <XYZPopup shipment={shipment} courier={shipment.CourierName} users={users} open={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
        </>
    );
}

export default Tracker;
