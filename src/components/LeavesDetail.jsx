import React, { useRef } from 'react';
import WidgetContainer from '../components/Cards/WidgetContainer';
import Status from '../assets/Status.svg';
import WeightLogo from '../assets/Weight.svg';
import DateIcon from '../assets/Date.svg';
import AwaitingLogo from '@assets/Countdown.svg';
import ExpiredLogo from '@assets/ExpiredRed.svg';
import Throw from '@assets/Thrown.svg';
import Button from "./Button";
import axios from 'axios';
import { API_URL } from '../App';
import Popup from './Popups/Popup';

const LeavesDetail = ({ date, weight, status, code, text }) => {
    // Function to format date to dd MM YYYY HH:mm format
    const formatDate = (inputDate) => {
        const dateObj = new Date(inputDate);
        const day = String(dateObj.getDate()).padStart(2, '0');
        const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Month is 0-based
        const year = dateObj.getFullYear();
        const hours = String(dateObj.getHours()).padStart(2, '0');
        const minutes = String(dateObj.getMinutes()).padStart(2, '0');
        return `${day}/${month}/${year} ${hours}:${minutes}`;
    };

    const transformLeavesType = (text) => {
        let formattedText = text.toLowerCase().replace(/\s+/g, ''); // Convert to lowercase and remove spaces
        if (formattedText === 'powder') {
            formattedText = 'flour';
        }
        return formattedText;
    };
    
    // Example usage
    const typeLeaves = transformLeavesType(text);
    const modalRef = useRef(null);

    function ShowThrowPopup(){
        if (modalRef.current) {
            modalRef.current.showModal();
        }
    }

    async function ThrowLeaves() {
        await axios.put(`${API_URL}/${typeLeaves}/update_status/${code}`, {
            "Status": "Thrown"
        });
        modalRef.current.close();
        document.getElementById('AddLeaves').close();
        
    }

    const formattedDateTime = formatDate(date);
    const isPastDate = new Date(date) < new Date();

    return (
        <div className='flex flex-col'>
            <span className="font-montserrat font-medium text-xs leading-4 ml-2">Expired DateTime</span>
            <WidgetContainer container={false} borderRadius="20px" backgroundColor="#FDFDFD" className="flex justify-start">
                <img src={DateIcon} alt="Date" className='w-6 h-auto mr-1' />
                <div className='flex items-center'>
                    <span className="font-montserrat font-semibold text-base">{formattedDateTime}</span>
                </div>
            </WidgetContainer>

            <div className='flex justify-between mt-4 gap-1'>
                {status === "Awaiting" && !isPastDate ? (
                    <WidgetContainer borderRadius="20px" backgroundColor="rgba(148, 195, 179, 0.5)" border={false} className="flex">
                        <img src={AwaitingLogo} alt="Status" className='w-6 h-auto mr-1' />
                        <span className="font-montserrat font-medium text-xs leading-4 text-[#79B2B7] mt-1">Awaiting</span>
                    </WidgetContainer>
                ) : status === "Processed" ? (
                    <WidgetContainer borderRadius="20px" backgroundColor="rgba(212, 150, 93, 0.5)" border={false} className="flex">
                        <img src={Status} alt="Status" className='w-6 h-auto mr-1' />
                        <span className="font-montserrat font-medium text-xs leading-4 text-[#D4965D] mt-1">Processed</span>
                    </WidgetContainer>
                ) : status === "Thrown" ? (
                    <WidgetContainer borderRadius="20px" backgroundColor="rgba(212, 93, 93, 0.5)" border={false} className="flex">
                        <img src={Throw} alt="Status" className='w-6 h-auto mr-1' />
                        <span className="font-montserrat font-medium text-xs leading-4 text-[#D45D5D] mt-1">Thrown</span>
                    </WidgetContainer>
                ) : (
                    <WidgetContainer borderRadius="20px" backgroundColor="rgba(212, 93, 93, 0.5)" border={false} className="flex">
                        <img src={ExpiredLogo} alt="Status" className='w-6 h-auto mr-1' />
                        <span className="font-montserrat font-medium text-xs leading-4 text-[#D45D5D] mt-1">Expired</span>
                    </WidgetContainer>
                )}

                <WidgetContainer borderRadius="20px" border={false} backgroundColor="#FDFDFD" className="flex">
                    <img src={WeightLogo} alt="Weight" className='w-6 h-auto mr-1' />
                    <span className="font-montserrat font-semibold text-base leading-4 mt-2">{weight}</span>
                </WidgetContainer>
            </div>
            {(status === "Awaiting" && !isPastDate) && (
                <Button className="flex mt-4" noMax onClick={ShowThrowPopup} label="Throw" background={"#D45D5D"} color={"white"} img={Throw}></Button>
            )}
            <Popup ref={modalRef} leavesid="errorModal" info={true} description = {"You are deleting a data. Are you sure?"} confirm = {true} onConfirm = {ThrowLeaves} onCancel = {() => modalRef.current.close()}/>
        </div>
    );
}

export default LeavesDetail;
