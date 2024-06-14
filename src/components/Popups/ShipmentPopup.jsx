import React from 'react';
import WidgetContainer from '../../components/Cards/WidgetContainer';
import ShipmentLogo from '../../assets/ShipmentDetail.svg';
import PackageCount from '../../assets/Packagecount.svg';
import Date from '../../assets/Date.svg';
import ShipmentWeight from '../../assets/ShipmentWeight.svg';
import Courier from '../../assets/Courier.svg';
import Address from '../../assets/Address.svg';
import ShipmentReceipt from '../../assets/ShipmentReceipt.svg';
import Download from '../../assets/Download.svg';
import Upload from '../../assets/Upload.svg';
import Open from '../../assets/Open.svg';
import QRPage from '../../pages/QRPage';
import Button from '@components/Button'; //
function ShipmentPopup({ code, weight }) {
    const ShipmentText = `Expedition #${code}`;
    const date = '22/07/2024'; // Example static date

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
                        <div className="flex space-x-2">
                            <img src={PackageCount} alt="Profile" style={{ maxWidth: '100px' }} className='w-5 h-auto' />
                            <span className="font-montserrat text-16px font-semibold tracking-02em text-center">
                                3 Packages
                            </span>
                            <img src={Date} alt="Profile" style={{ maxWidth: '100px' }} className='w-6 h-auto' />
                            <span className="font-montserrat text-16px font-semibold tracking-02em text-center ">
                                22/07/2024
                            </span>
                        </div>
                    </div>

                    <div className='p-2'>
                        <WidgetContainer container = {false} borderRadius="20px">
                            <div className="flex justify-around">
                                <div className="flex flex-col">
                                    <span className='font-montserrat text-16px font-semibold tracking-02em  pb-2 ml-1'>Powder</span>
                                    <div className='flex pb-2'>
                                        <img src={Date} alt="Profile" style={{ maxWidth: '100px' }} className='w-6 h-6 mr-2' />
                                        <span className="font-montserrat text-16px font-semibold tracking-02em text-center">3 Packages</span>
                                    </div>
                                    <div className='flex pb-2'>
                                        <img src={ShipmentWeight} alt="Profile" style={{ maxWidth: '100px' }} className='w-6 h-6 mr-2' />
                                        <span className="font-montserrat text-16px font-semibold tracking-02em text-center">{weight}</span>
                                    </div>
                                    <div className='flex pb-2'>
                                        <img src={Courier} alt="Profile" style={{ maxWidth: '100px' }} className='w-6 h-6 mr-2' />
                                        <span className="font-montserrat text-16px font-semibold tracking-02em text-center">Courier - JNE</span>
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
                        <WidgetContainer container = {false} borderRadius='20px'>
                            <QRPage/>
                        </WidgetContainer>
                    </div>
                    <Button className="flex w-full mt-4" noMax = {true} onClick = {() => {}} type="submit" background="#0F7275" color="#F7FAFC" label="Confirm Deliver"  />
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </>
    );
}

export default ShipmentPopup;
