import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import WidgetContainer from '../../components/Cards/WidgetContainer';
import PackageCount from '../../assets/Packagecount.svg';
import Date from '../../assets/Date.svg';
import VerticalStepper from '../../components/VerticalStepper';
import CircularButton from '../../components/CircularButton';
import Shipments from '../../assets/Shipments.svg';
import XYZPopup from '../../components/Popups/XYZPopup';
import axios from 'axios';
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
                console.log("Fetching shipment details from API...");
                const response = await axios.get(`${API_URL}/shipment/getid/${id}`);
                console.log("Shipment details fetched successfully:", response.data);
                setShipment(response.data);
                fetchCourier(response.data.CourierID);
            } catch (error) {
                console.error('Error fetching shipment details:', error);
            }
        };

        const fetchCourier = async (courierId) => {
            try {
                console.log("Fetching courier details from API...");
                const response = await axios.get(`${API_URL}/courier/get/${courierId}`);
                console.log("Courier details fetched successfully:", response.data);
                setCourier(response.data);
            } catch (error) {
                console.error('Error fetching courier details:', error);
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
        return <div>Loading shipment details...</div>;
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
                        <div className="flex space-x-2">
                            <img src={PackageCount} alt="Package Count" style={{ maxWidth: '100px' }} className='w-5 h-auto' />
                            <span className="font-montserrat text-14px font-semibold tracking-02em text-center">
                                {shipment.ShipmentQuantity} Packages
                            </span>
                            <img src={Date} alt="Date" style={{ maxWidth: '100px' }} className='w-6 h-auto' />
                            <span className="font-montserrat text-14px font-semibold tracking-02em text-center ">
                                {shipment.ShipmentDate}
                            </span>
                        </div>
                        {courier && (
                            <div className="flex space-x-2 mt-2">
                                <span className="font-montserrat text-14px font-semibold tracking-02em text-center">
                                    Courier: {courier.CourierName}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </WidgetContainer>
            <VerticalStepper step={1} />
            <XYZPopup shipment={shipment} courier={courier} users={users} open={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
        </>
    );
}

export default Tracker;
