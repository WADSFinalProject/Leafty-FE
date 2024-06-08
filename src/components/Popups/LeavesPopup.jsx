import React, { forwardRef } from 'react';
import WetLeaves from "@assets/WetLeaves.svg";
import ProcesssedLeaves from "@assets/icons/Wat.svg";
import InputField from '@components/InputField';
import RealTimeCountDown from '@components/RealtimeCountDown';

const LeavesPopup = forwardRef(({ leavesid, centra_name, weight, wet_leaves = false, dry_leaves = false, powder = false, expiredDate, collectedDate }, ref) => {
  const currentDate = new Date();
  return (
    <dialog ref={ref} id={leavesid} className="modal">
      <div className="modal-box rounded-lg flex items-start flex-col gap-2">
        <div className="flex flex-row w-full items-start gap-2">
          <div className="p-7 bg-[#94C3B3] rounded-lg">
            <img className="w-[150px] h-[150px]" src={WetLeaves} alt="Wet Leaves" />
          </div>
          <div className='flex flex-col w-full'>
            <InputField padding={false} type="text" label="Expired Date" green={true} value={expiredDate} className="font-semibold" disabled />
            <InputField padding={false} type="text" label="Collected Date" green={true} value={collectedDate} className="font-semibold" disabled />
            <div className='flex flex-row gap-2'>
              <div className='flex flex-col'>
                <span className='label-text font-semibold'>Status</span>
                <div
                  style={{
                    backgroundColor: "rgba(212, 150, 93, 0.5)",
                    color: "black",
                    width: "150px",
                    height: "40px",
                  }}
                  className="flex items-center justify-center rounded-md overflow-hidden"
                >
                  <div className="flex items-center gap-2">
                    <span style={{ color: "rgba(212, 150, 93)" }}>Processing</span>
                    <img src={ProcesssedLeaves} alt="Processing" />
                  </div>
                </div>
              </div>
              {currentDate < new Date(expiredDate) && (
                <div className='flex flex-col justify-center items-center'>
                  <span className='font-semibold text-md'>Expired in</span>
                  <RealTimeCountDown collectedDate={collectedDate} expiredDate={expiredDate} />
                </div>
              )}
            </div>
          </div>
        </div>
        <InputField value={centra_name} padding={false} type="text" label="Centra Name" green={true} className="font-semibold" />
        <InputField value={weight + " Kg"} padding={false} type="text" label="Weight" green={true} className="font-semibold" />
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 font-bold text-[#0F7275]" onClick={() => ref.current.close()}>
          ✕
        </button>
      </div>
    </dialog>
  );
});

export default LeavesPopup;