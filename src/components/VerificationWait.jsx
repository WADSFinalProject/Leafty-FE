import React from 'react';
import WidgetContainer from './Cards/WidgetContainer';
import Button from "@components/Button";

const VerificationWait = ({ padding = true, title = "Waiting for Verification", message = "Harbor has not received the packages" }) => {
    return (
        <div className={`${padding ? "p-2" : ""}` }>
            <WidgetContainer borderRadius='20px' className={"flex flex-col p-4"} container = {false}>
                <span className='font-montserrat text-lg font-semibold'>
                    {title}
                </span>
                <span className='font-montserrat text-sm'>
                    {message}
                </span>
                <div className="w-full flex justify-start mt-2">
                    <Button color="white" background="#79B2B7" label="Contact" />
                </div>
            </WidgetContainer>
        </div>
    );
};

export default VerificationWait;
