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
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    useEffect(() => {
        const fetchShipment = async () => {
            try {
                console.log("Fetching shipment details from API...");
                const response = await axios.get(`${API_URL}/shipment/getid/${id}`);
                console.log("Shipment details fetched successfully:", response.data);
                setShipment(response.data);
            } catch (error) {
                console.error('Error fetching shipment details:', error);
            }
        };

        fetchShipment();
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
                    </div>
                </div>
            </WidgetContainer>
            <VerticalStepper step={1} />
            <XYZPopup shipment={shipment} open={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
        </>
    );
}

export default Tracker;
