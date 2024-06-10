import React from 'react';
import WidgetContainer from './Cards/WidgetContainer';
import Button from "@components/Button"
const VerificationWait = ({ padding = true }) => {
    return (
        <div className={`${padding ? "p-2" : ""}`}>
            <WidgetContainer borderRadius='20px' className={"flex flex-col p-4"}>
                <span className='font-montserrat text-lg font-semibold'>
                    Waiting for Verification
                </span>
                <span className='font-montserrat text-sm'>
                    Harbor has not received the packages
                </span>

                <div className="w-full flex justify-end">
                    <Button color = "white" background = "#79B2B7" label = {"Contact"}></Button>
                    {/* <WidgetContainer className="flex w-fit" backgroundColor="#79B2B7" borderRadius="13.5px" border={false}>
                        <span className="flex text-gray-100 p-1">
                            Contact
                        </span>
                    </WidgetContainer> */}
                </div>

            </WidgetContainer>
        </div>
    );
};

export default VerificationWait;
