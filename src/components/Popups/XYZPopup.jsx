import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ShipmentLogo from '../../assets/ShipmentDetail.svg';
import PackageCount from '../../assets/Packagecount.svg';
import DateIcon from '../../assets/Date.svg';
import WidgetContainer from '../../components/Cards/WidgetContainer';
import ShipmentWeight from '../../assets/ShipmentWeight.svg';
import Courier from '../../assets/Courier.svg';
import Address from '../../assets/Address.svg';
import HarborReception from '../../components/HarborReception';
import VerificationWait from '../../components/VerificationWait';
import ReceptionDetail from '../../components/ReceptionDetail';
import Centralogo from '../../assets/centra.svg';
import DownloadPDF from '../../pages/Downloadpdf';
import axios from 'axios';
import { API_URL } from '../../App';

function XYZPopup({ shipment, courier, users, open, onClose }) {
    const [currentComponent, setCurrentComponent] = useState(1);
    const [shipmentData, setShipmentData] = useState(shipment);
    const [harbor, setHarbor] = useState({});
    const [loading, setLoading] = useState(true);
    const [rescalledWeight, setRescalledWeight] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_URL}/user/get_role/2`);
                setHarbor(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (open) {
            document.getElementById('XYZPopup').showModal();
            console.log(shipment);
            determineCurrentComponent(shipment);
        } else {
            document.getElementById('XYZPopup').close();
        }
    }, [open, shipment]);

    const determineCurrentComponent = (shipment) => {
        if (!shipment.Check_in_Date && !shipment.Check_in_Weight) {
            setCurrentComponent(1);
        } else if (shipment.Check_in_Date && shipment.Check_in_Weight) {
            setCurrentComponent(2);
        } else if (!shipment.Harbor_Reception_File) {
            setCurrentComponent(3);
        } else if (!shipment.Rescalled_Weight) {
            setCurrentComponent(4);
        } else {
            setCurrentComponent(1); // Default to component 1 if none of the above conditions are met
        }
    };

    const handleNext = () => {
        setCurrentComponent((prevComponent) => (prevComponent % 7) + 1);
    };

    const handlePrevious = () => {
        setCurrentComponent((prevComponent) => (prevComponent + 5) % 7 + 1);
    };

    const updateRescalledWeight = async () => {
        try {
            const response = await axios.put(`${API_URL}/shipment/update_rescalled_weight/${shipment.ShipmentID}`, { Rescalled_Weight: rescalledWeight });
            setShipmentData({ ...shipmentData, Rescalled_Weight: rescalledWeight });
            setCurrentComponent(2); // Move to the next appropriate component
        } catch (error) {
            console.error('Error updating rescalled weight:', error);
        }
    };

    const getUser = (userId) => {
        const user = users.find((u) => u.UserID === userId);
        return user ? user.Username : 'Unknown User';
    };

    const containers = [
        { label: 'Centra Name' },
        { label: 'Harbor Name' },
        { label: 'Total Packages' },
    ];

    const centracontainers = [
        { label: 'Centra Name' },
        { label: 'Weight' },
        { label: 'Your Name' },
        { label: 'Date Received' },
    ];

    const formatDate = (date, includeTime = false) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const dateString = new Date(date).toLocaleDateString('id-ID', options);

        if (includeTime) {
            const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
            const timeString = new Date(date).toLocaleDateString('id-ID', timeOptions);
            return `${dateString} ${timeString}`;
        }

        return dateString;
    };

    const textHarborContact = `Hello, ${harbor[0]?.Username},
I hope this message finds you well. I am writing to inquire about the status of Expedition #${shipment.ShipmentID}. 
Could you please provide an update on whether it has arrived safely at its destination?
As we await confirmation, any details regarding the condition of the shipment or any special instructions would be greatly appreciated.
Thank you for your attention to this matter. Looking forward to your prompt response.`;

    if (!shipment) {
        return null;
    }

    return (
        <>
            <dialog id="XYZPopup" className="modal modal-bottom">
                <div className='modal-box'>
                    <button className="modal-close" onClick={onClose}>×</button>
                    <div className='flex justify-center'>
                        <img src={ShipmentLogo} alt="Profile" style={{ maxWidth: '100px' }} className='w-full h-auto' />
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="font-montserrat text-16px font-semibold tracking-02em text-center">
                            Expedition #{shipment.ShipmentID}
                        </span>
                        <div className="flex space-x-2">
                            <img src={PackageCount} alt="Package Count" style={{ maxWidth: '100px' }} className='w-5 h-auto' />
                            <span className="font-montserrat text-16px font-semibold tracking-02em text-center">
                                {shipment.ShipmentQuantity} Packages
                            </span>
                            <img src={DateIcon} alt="Date" style={{ maxWidth: '100px' }} className='w-6 h-auto' />
                            {shipment.ShipmentDate ?
                                <span className="font-montserrat text-16px font-semibold tracking-02em text-center ">
                                    {formatDate(shipment.ShipmentDate)}
                                </span> : <span className="font-montserrat text-16px font-semibold tracking-02em text-center">Not Delivered</span>}
                        </div>
                    </div>
                    <div className='p-1'>
                        <WidgetContainer borderRadius="20px" container={false}>
                            <div className="flex justify-around">
                                <div className="flex flex-col">
                                    <span className='font-montserrat text-16px font-semibold tracking-02em pb-2 ml-1'>Powder</span>
                                    <div className='flex pb-1'>
                                        <img src={PackageCount} alt="Package Count" style={{ maxWidth: '100px' }} className='w-6 h-6 mr-2' />
                                        <span className="font-montserrat text-16px font-semibold tracking-02em text-center">{shipment.ShipmentQuantity} Packages</span>
                                    </div>
                                    <div className='flex pb-1'>
                                        <img src={ShipmentWeight} alt="Shipment Weight" style={{ maxWidth: '100px' }} className='w-6 h-6 mr-2' />
                                        <span className="font-montserrat text-16px font-semibold tracking-02em text-center">{shipment.ShipmentWeight} Kg</span>
                                    </div>
                                    {courier &&
                                        <div className='flex pb-1'>
                                            <img src={Courier} alt="Courier" style={{ maxWidth: '100px' }} className='w-6 h-6 mr-2' />
                                            <span className="font-montserrat text-16px font-semibold tracking-02em text-center">Courier - {shipment.CourierName}</span>
                                        </div>}
                                </div>
                                <div className="flex flex-col">
                                    <span className='font-montserrat text-16px font-semibold tracking-02em pb-2 ml-1'>Centra</span>
                                    <div className='flex pb-1'>
                                        <img src={Centralogo} alt="Central Logo" style={{ maxWidth: '100px' }} className='w-4 h-7' />
                                        <span className='font-montserrat text-16px font-semibold tracking-02em text-center ml-2'>{getUser(shipment.UserID)}</span>
                                    </div>
                                </div>
                            </div>
                        </WidgetContainer>
                    </div>
                    <div className='mt-2'>
                        {currentComponent === 1 && <VerificationWait title="Waiting for Verification" message="Harbor has not received the packages" phoneNumber={harbor[0]?.PhoneNumber} text={textHarborContact} />}
                        {currentComponent === 2 && <HarborReception title="Harbor Reception" containers={containers} />}
                        {currentComponent === 3 && <DownloadPDF harbor UserID={shipment.UserID} shipment={shipment} />}
                        {currentComponent === 4 && (
                            <div className='p-2'>
                                <WidgetContainer borderRadius='20px' container={false}>
                                    <span className='font-montserrat text-lg font-semibold tracking-wide ml-1'>
                                        Re-scaling
                                    </span>
                                    <span className='font-montserrat text-sm font-medium leading-4 tracking-wide ml-1 '>
                                        Input the re-scaled weight below
                                    </span>
                                    <div className="w-full max-w ml- mt-4">
                                        <p className='font-montserrat text-xs font-medium leading-[14.63px] tracking-wide text-left ml-1'>Re-scaled weight</p>
                                        <WidgetContainer backgroundColor="#94C3B380" borderRadius="13.5px" borderWidth="2px" borderColor="#79B2B7" className='mt-2'>
                                            <input type="text" className="w-full h-full bg-transparent border-none outline-none px-2" value={rescalledWeight} onChange={(e) => setRescalledWeight(e.target.value)} />
                                        </WidgetContainer>
                                    </div>
                                    <button onClick={updateRescalledWeight} className='mt-2 bg-green-500 text-white p-2 rounded'>Update Weight</button>
                                </WidgetContainer>
                            </div>
                        )}
                        {currentComponent === 5 && <VerificationWait title="Re-scaling" message="Please have a confirmation with Centra" />}
                        {currentComponent === 6 && <HarborReception title="Centra Reception" containers={centracontainers} />}
                        {currentComponent === 7 && <ReceptionDetail />}
                    </div>
                    <div className='flex justify-between items-center mt-auto p-4'>
                        {currentComponent !== 1 ? (
                            <button
                                onClick={handlePrevious}
                                className='font-montserrat text-sm font-medium leading-4 tracking-wide text-green-900 ml-3'
                            >
                                Previous
                            </button>
                        ) : (
                            <div className="w-20"></div> // Empty div to maintain spacing
                        )}
                        {currentComponent !== 7 && (
                            <WidgetContainer container={false} backgroundColor="#0F7275" borderRadius="20px" border={false} className='w-full max-w-20 mr-2'>
                                <button
                                    onClick={handleNext}
                                    className='flex justify-items-center font-montserrat text-xs font-semibold leading-4 tracking-wide text-gray-100 ml-4'
                                >
                                    Next
                                </button>
                            </WidgetContainer>
                        )}
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button onClick={onClose}>close</button>
                </form>
            </dialog>
        </>
    );
}

XYZPopup.propTypes = {
    shipment: PropTypes.object,
    courier: PropTypes.object,
    users: PropTypes.array,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default XYZPopup;