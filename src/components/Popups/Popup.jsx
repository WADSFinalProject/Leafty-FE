import React, { forwardRef } from 'react';
import Button from "@components/Button";
import ErrorIcon from "@assets/error.svg";
import InfoIcon from "@assets/confirm.svg";
import WarningIcon from "@assets/warning.svg";

const Popup = forwardRef(({ warning = false, info = false, error = false, confirm = false, leavesid, description, onConfirm, onCancel }, ref) => {
    return (
        <dialog ref={ref} id={leavesid} className="modal">
            <div className="modal-box rounded-lg flex flex-col gap-2 items-center">
                {warning && <>
                    <img src={WarningIcon} className="w-1/6" alt="Warning" />
                    <span>{"Warning"}</span>
                    <span>{description || "Confirm?"}</span>
                </>}
                {info && (
                    <>
                        <img src={InfoIcon} className="w-1/6" alt="Info" />
                        <span className='font-bold text-xl'>{"Confirm?"}</span>
                        <span className='text-md'>{description}</span>
                    </>
                )}
                {error && <>
                    <img src={ErrorIcon} className="w-1/6" alt="Error" />
                    <span>{"Error"}</span>
                </>}
                <Button className="w-full flex-grow p-0" type="submit" background="#0F7275" color="#F7FAFC" label="Confirm" onClick={onConfirm} />
                {confirm && (
                    <div className='gap-2 w-full flex flex-col items-center'>     
                        <Button className="w-full flex-grow" type="cancel" background="#94C3B3" color="#F7FAFC" label="Cancel" onClick={onCancel} />
                    </div>
                )}
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 font-bold text-[#0F7275]" onClick={onCancel}>
                    ✕
                </button>
            </div>
        </dialog>
    );
});

export default Popup;
