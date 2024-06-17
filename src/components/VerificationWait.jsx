import React from 'react';
import WidgetContainer from './Cards/WidgetContainer';
import Button from "@components/Button";

const VerificationWait = ({ padding = true, title = "Waiting for Verification", message = "Harbor has not received the packages", phoneNumber, text  }) => {
    // Remove leading '0' and add country code '+62'
    // const formattedPhoneNumber = phoneNumber.replace(/^0/, '62');
    // Encode the te
    const encodedText = encodeURIComponent(text);
    return (
        <div className={`${padding ? "p-2" : ""}` }>
            <WidgetContainer borderRadius='20px' className={"flex flex-col p-4"} container = {false}>
                <span className='font-montserrat text-lg font-semibold'>
                    {title}
                </span>
                <span className='font-montserrat text-sm'>
                    {message}
                </span>
                <div className="w-full flex justify-end mt-2">
                <a href={`https://api.whatsapp.com/send/?phone=${phoneNumber}&text=${encodedText}&type=phone_number&app_absent=0`} target="_blank"><Button color="white" background="#79B2B7" label="Contact" /></a>
                </div>
            </WidgetContainer>
        </div>
    );
};

export default VerificationWait;
