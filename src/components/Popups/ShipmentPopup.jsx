import React, { useCallback } from 'react';
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

const ShipmentPopup = ({
    code,
    weight,
    quantity,
    courier,
    userID,
    users,
    UserName,
    onConfirm,
    desktop,
    ShipmentDate = false,
    confirmDeliver = false
}) => {
    const ShipmentText = `Expedition #${code}`;

    const handleConfirm = useCallback(async () => {
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
    }, [code, onConfirm]);

    const getUserName = useCallback((userID) => {
        const user = users.find(user => user.UserID === userID);
        return user ? user.Username : 'Unknown User';
    }, [users]);

    console.log('Rendering ShipmentPopup with userID:', userID);

    return (
        <dialog id="ShipmentPopup" className={`modal ${desktop ? "modal-middle" : "modal-bottom"}`}>
            <div className='modal-box'>
                <div className='flex justify-center'>
                    <img src={ShipmentLogo} alt="Shipment" className='w-full h-auto' style={{ maxWidth: '100px' }} />
                </div>
                <div className="flex flex-col items-center">
                    <span className="font-montserrat text-16px font-semibold tracking-02em text-center">
                        {ShipmentText}
                    </span>
                    <div className="flex space-x-2 items-center">
                        <img src={PackageCount} alt="Package Count" className='w-5 h-auto' />
                        <span className="font-montserrat text-16px font-semibold tracking-02em text-center">
                            {quantity} Packages
                        </span>
                        {ShipmentDate && (
                            <>
                                <img src={DateIcon} alt="Date" className='w-6 h-auto' />
                                <span className="font-montserrat text-16px font-semibold tracking-02em text-center">
                                    {ShipmentDate}
                                </span>
                            </>
                        )}
                    </div>
                </div>
                <div className='p-2'>
                    <WidgetContainer container={false} borderRadius="20px">
                        <div className="flex justify-around">
                            <div className="flex flex-col">
                                <span className='font-montserrat text-16px font-semibold tracking-02em pb-2 ml-1'>Powder</span>
                                <div className='flex items-center pb-2'>
                                    <img src={DateIcon} alt="Date" className='w-6 h-6 mr-2' />
                                    <span className="font-montserrat text-16px font-semibold tracking-02em text-center">{quantity} Packages</span>
                                </div>
                                <div className='flex items-center pb-2'>
                                    <img src={ShipmentWeight} alt="Weight" className='w-6 h-6 mr-2' />
                                    <span className="font-montserrat text-16px font-semibold tracking-02em text-center">{weight}</span>
                                </div>
                                <div className='flex items-center pb-2'>
                                    <img src={Courier} alt="Courier" className='w-6 h-6 mr-2' />
                                    <span className="font-montserrat text-16px font-semibold tracking-02em text-center">Courier - {courier}</span>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <span className='font-montserrat text-16px font-semibold tracking-02em pb-2 ml-1'>Centra</span>
                                <div className='flex items-center pb-2'>
                                    <img src={Address} alt="Address" className='w-4 h-7' />
                                    <span className='font-montserrat text-16px font-semibold tracking-02em text-center ml-2'>{UserName}</span>
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
                {confirmDeliver && (
                    <Button
                        className="flex w-full mt-4"
                        noMax={true}
                        onClick={handleConfirm}
                        type="submit"
                        background="#0F7275"
                        color="#F7FAFC"
                        label="Confirm Deliver"
                    />
                )}
                <form method="dialog" className="modal-backdrop">
                    <button>Close</button>
                </form>
            </div>
        </dialog>
    );
};

export default ShipmentPopup;
