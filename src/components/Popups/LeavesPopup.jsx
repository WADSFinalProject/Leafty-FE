import React, { forwardRef, useState } from 'react';
import WetLeaves from "@assets/WetLeaves.svg";
import DryLeaves from "@assets/DryLeaves.svg";
import Powder from "@assets/Powder.svg";
import ProcessedLeaves from "@assets/icons/Wat.svg";
import InputField from '@components/InputField';
import RealTimeCountDown from '@components/RealtimeCountDown';
import Button from '@components/Button'; // Ensure this import is correct based on your project structure

const LeavesPopup = forwardRef(({
  leavesid,
  centra_name,
  weight,
  wet_leaves = false,
  dry_leaves = false,
  powder = false,
  expiredDate,
  collectedDate,
  editable = false,
  onSubmit
}, ref) => {
  const currentDate = new Date();
  const [formData, setFormData] = useState({
    id: leavesid,
    name: centra_name,
    weight: weight,
    date: collectedDate,
    expiration: expiredDate
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  const renderImage = () => {
    if (wet_leaves) return <img className="w-[150px] h-[150px]" src={WetLeaves} alt="Wet Leaves" />;
    if (dry_leaves) return <img className="w-[150px] h-[150px]" src={DryLeaves} alt="Dry Leaves" />;
    if (powder) return <img className="w-[150px] h-[150px]" src={Powder} alt="Powder" />;
    return null;
  };

  return (
    <dialog ref={ref} id={leavesid} className="modal">
      <div className="modal-box rounded-lg flex items-start flex-col gap-2">
        <div className="flex flex-row w-full items-start gap-2">
          <div className="p-7 bg-[#94C3B3] rounded-lg">
            {renderImage()}
          </div>
          <div className='flex flex-col w-full'>
            <InputField
              padding={false}
              type="text"
              label="Expired Date"
              green={true}
              value={formData.expiration}
              className="font-semibold"
              name="expiration"
              onChange={handleInputChange}
              disabled={!editable}
            />
            <InputField
              padding={false}
              type="text"
              label="Collected Date"
              green={true}
              value={formData.date}
              className="font-semibold"
              name="date"
              onChange={handleInputChange}
              disabled={!editable}
            />
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
                    <img src={ProcessedLeaves} alt="Processing" />
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
        <InputField
          value={formData.name}
          padding={false}
          type="text"
          label="Centra Name"
          green={true}
          className="font-semibold"
          name="name"
          onChange={handleInputChange}
          disabled={!editable}
        />
        <InputField
          value={`${formData.weight} Kg`}
          padding={false}
          type="text"
          label="Weight"
          green={true}
          className="font-semibold"
          name="weight"
          onChange={handleInputChange}
          disabled={!editable}
        />
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 font-bold text-[#0F7275]" onClick={() => ref?.current?.close()}>
          ✕
        </button>
        {editable && (
          <Button className="w-full" type="submit" background="#0F7275" color="#F7FAFC" label="Save" onClick={handleSubmit} />
        )}
      </div>
    </dialog>
  );
});

export default LeavesPopup;
