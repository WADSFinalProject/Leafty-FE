import React from 'react';
import axios from 'axios';
import WidgetContainer from '../../components/Cards/WidgetContainer';
import ShipmentLogo from '../../assets/ShipmentDetail.svg';
import PackageCount from '../../assets/Packagecount.svg';
import DateIcon from '../../assets/Date.svg';
import ShipmentWeight from '../../assets/ShipmentWeight.svg';
import Courier from '../../assets/Courier.svg';
import Address from '../../assets/Address.svg';
import QRPage from '../../pages/QRPage';
import Button from '@components/Button';
import { API_URL } from '../../App'; // Adjust the import path as needed

function ShipmentPopup({ code, weight, quantity, courier, userID, users, onConfirm, ShipmentDate = false, confirmDeliver = false }) {
    const ShipmentText = `Expedition #${code}`;

    const handleConfirm = async () => {
        try {
            const response = await axios.put(`${API_URL}/shipment/update_date/${code}`, {
                ShipmentDate: new Date().toISOString() // Update shipment date to current date
            });
            console.log('Shipment date updated:', response.data);
            if (onConfirm) {
                onConfirm(); // Call the callback function to refresh data
            }
            document.getElementById('ShipmentPopup').close(); // Close the modal
        } catch (error) {
            console.error('Error updating shipment date:', error);
        }
    };

    const getUserName = (userID) => {
        const user = users.find(user => user.UserID === userID);
        return user ? user.Username : 'Unknown User';
    };

    console.log('Rendering ShipmentPopup with userID:', userID);

    return (
        <>
            <dialog id="ShipmentPopup" className="modal modal-bottom">
                <div className='modal-box'>
                    <div className='flex justify-center'>
                        <img src={ShipmentLogo} alt="Profile" style={{ maxWidth: '100px' }} className='w-full h-auto' />
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="font-montserrat text-16px font-semibold tracking-02em text-center">
                            {ShipmentText}
                        </span>
                        <span className="font-montserrat text-16px font-semibold tracking-02em text-center">
                            {getUserName(userID)}
                        </span>
                        <div className="flex space-x-2">
                            <img src={PackageCount} alt="Profile" style={{ maxWidth: '100px' }} className='w-5 h-auto' />
                            <span className="font-montserrat text-16px font-semibold tracking-02em text-center">
                                {quantity} Packages
                            </span>
                            {ShipmentDate ? <><img src={DateIcon} alt="Profile" style={{ maxWidth: '100px' }} className='w-6 h-auto' />
                            <span className="font-montserrat text-16px font-semibold tracking-02em text-center ">
                                {ShipmentDate}
                            </span></>:<></> }
                        </div>
                    </div>

                    <div className='p-2'>
                        <WidgetContainer container={false} borderRadius="20px">
                            <div className="flex justify-around">
                                <div className="flex flex-col">
                                    <span className='font-montserrat text-16px font-semibold tracking-02em pb-2 ml-1'>Powder</span>
                                    <div className='flex pb-2'>
                                        <img src={DateIcon} alt="Profile" style={{ maxWidth: '100px' }} className='w-6 h-6 mr-2' />
                                        <span className="font-montserrat text-16px font-semibold tracking-02em text-center">{quantity} Packages</span>
                                    </div>
                                    <div className='flex pb-2'>
                                        <img src={ShipmentWeight} alt="Profile" style={{ maxWidth: '100px' }} className='w-6 h-6 mr-2' />
                                        <span className="font-montserrat text-16px font-semibold tracking-02em text-center">{weight}</span>
                                    </div>
                                    <div className='flex pb-2'>
                                        <img src={Courier} alt="Profile" style={{ maxWidth: '100px' }} className='w-6 h-6 mr-2' />
                                        <span className="font-montserrat text-16px font-semibold tracking-02em text-center">Courier - {courier}</span>
                                    </div>
                                </div>

                                <div className="flex flex-col">
                                    <span className='font-montserrat text-16px font-semibold tracking-02em pb-2 ml-1'>Centra</span>
                                    <div className='flex pb-2'>
                                        <img src={Address} alt="Address" style={{ maxWidth: '100px' }} className='w-4 h-7' />
                                        <span className=' font-montserrat text-16px font-semibold tracking-02em text-center ml-2'>Unit 1</span>
                                    </div>

                                    <div className='flex pb-2'>
                                        <img src={Address} alt="Address" style={{ maxWidth: '100px' }} className='w-4 h-7' />
                                        <span className=' font-montserrat text-16px font-semibold tracking-02em text-center ml-2'>Jl.Address</span>
                                    </div>
                                </div>
                            </div>
                        </WidgetContainer>
                    </div>

                    <div className='p-2'>
                        <WidgetContainer container={false} borderRadius='20px'>
                            <QRPage data={code} />
                        </WidgetContainer>
                    </div>
                    {confirmDeliver && <Button className="flex w-full mt-4" noMax={true} onClick={handleConfirm} type="submit" background="#0F7275" color="#F7FAFC" label="Confirm Deliver" />}
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </>
    );
}

export default ShipmentPopup;
