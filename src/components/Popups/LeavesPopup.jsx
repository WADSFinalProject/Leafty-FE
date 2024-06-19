import React, { forwardRef, useState, useEffect } from 'react';
import axios from 'axios'; 
import WetLeaves from "@assets/WetLeaves.svg";
import DryLeaves from "@assets/DryLeaves.svg";
import Powder from "@assets/Powder.svg";
import ProcessedLeaves from '@assets/icons/Wat.svg';
import trash from '@assets/icons/trash.svg';
import Countdown from '@assets/Countdown.svg';
import Exc from '@assets/icons/Exc.svg';
import RealTimeCountDown from '@components/RealtimeCountDown';
import Button from '@components/Button';
import { API_URL } from '../../App';

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
  status,
  onSubmit
}, ref) => {
  const currentDate = new Date();
  const [id, setid] = useState(leavesid);
  const [name, setName] = useState(centra_name);
  const [leavesWeight, setLeavesWeight] = useState(weight);
  const [expiration, setExpiration] = useState(expiredDate);
  const [leavesStatus, setLeavesStatus] = useState(status);

  const handleEditSubmit = async () => {
    const type = wet_leaves ? 'wetleaves' : dry_leaves ? 'dryleaves' : 'flour';
    try {
      await axios.put(`${API_URL}/${type}/put/${id}`, {
        Weight: leavesWeight,
        Expiration: new Date(expiration).toISOString(),
      });
      onSubmit({ id, name, weight: leavesWeight, expiration, status: leavesStatus });
      ref.current.close();
    } catch (error) {
      console.error(`Error updating ${type} data`, error);
    }
  };

  useEffect(() => {
    setid(leavesid);
    setName(centra_name);
    setLeavesWeight(weight);
    setExpiration(expiredDate);
    setLeavesStatus(status);
  }, [leavesid, centra_name, weight, expiredDate, status]);

  const renderImage = () => {
    if (wet_leaves) return <img className="w-[150px] h-[150px]" src={WetLeaves} alt="Wet Leaves" />;
    if (dry_leaves) return <img className="w-[150px] h-[150px]" src={DryLeaves} alt="Dry Leaves" />;
    if (powder) return <img className="w-[150px] h-[150px]" src={Powder} alt="Powder" />;
    return null;
  };

  return (
    <dialog ref={ref} id={leavesid} className="modal">
      <div className="modal-box rounded-lg flex items-start flex-col gap-2">
        <span className='font-bold text-xl'>Leaves ID - {id}</span>
        <div className="flex flex-row w-full items-start gap-2">
          <div className="p-7 bg-[#94C3B3] rounded-lg">
            {renderImage()}
          </div>
          <div className='flex flex-col w-full'>
            <div className={`px-0`}>
              <span className="label-text font-semibold">Expired Date</span>
            </div>
            <div className={`input input-bordered flex items-center gap-2 input-md green`}>
              <input
                type={"datetime-local"}
                className="grow"
                placeholder={""}
                onChange={(e) => setExpiration(e.target.value)}
                value={expiration}
                disabled={!editable}
              />
            </div>
            <div className='flex flex-row gap-2'>
              <div className='flex flex-col'>
                <span className='label-text font-semibold'>Status</span>
                {(status === "Awaiting" && new Date(expiration) < currentDate) && (
                  <div
                    style={{
                      backgroundColor: "#D45D5D90",
                      color: "black",
                      width: "150px",
                      height: "40px",
                    }}
                    className="flex items-center justify-center rounded-md overflow-hidden"
                  >
                    <div className="flex items-center gap-2">
                      <span style={{ color: "#D45D5D" }}>Expired</span>
                      <img src={Exc} alt="Processed" />
                    </div>
                  </div>
                )}
                {(status === "Awaiting" && new Date(expiration) > currentDate) && (
                  <div
                    style={{
                      backgroundColor: "#94C3B380",
                      color: "black",
                      width: "150px",
                      height: "40px",
                    }}
                    className="flex items-center justify-center rounded-md overflow-hidden"
                  >
                    <div className="flex items-center gap-2">
                      <span style={{ color: "#94C3B3" }}>Awaiting</span>
                      <img src={Countdown} alt="Processed" />
                    </div>
                  </div>
                )}
                {status === "Processed" && (
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
                      <span style={{ color: "rgba(212, 150, 93)" }}>Processed</span>
                      <img src={ProcessedLeaves} alt="Processed" />
                    </div>
                  </div>
                )}
                {status === "Thrown" && (
                  <div
                    style={{
                      backgroundColor: "#9E2B2B90",
                      color: "black",
                      width: "150px",
                      height: "40px",
                    }}
                    className="flex items-center justify-center rounded-md overflow-hidden"
                  >
                    <div className="flex items-center gap-2">
                      <span style={{ color: "#9E2B2B" }}>Thrown</span>
                      <img src={trash} alt="Processed" />
                    </div>
                  </div>
                )}
              </div>
              {currentDate < new Date(expiration) && (
                <div className='flex flex-col justify-center items-center'>
                  <span className='font-semibold text-md'>Expired in</span>
                  <RealTimeCountDown collectedDate={new Date()} expiredDate={expiration} />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className='flex flex-col w-full'>
          <div className={`px-0`}>
            <span className="label-text font-semibold">Centra Name</span>
          </div>
          <div className={`input input-bordered flex items-center gap-2 input-md green`}>
            <input
              type={"text"}
              className="grow"
              placeholder={""}
              onChange={() => { }}
              value={name}
              disabled={true}
            />
          </div>
        </div>
        <div className='flex w-full flex-col'>
          <div className={`px-0`}>
            <span className="label-text font-semibold">Weight</span>
          </div>
          <div className={`input input-bordered flex items-center gap-2 input-md green`}>
            <input
              type={"number"}
              className="grow"
              placeholder={""}
              onChange={(e) => setLeavesWeight(e.target.value)}
              value={leavesWeight}
              disabled={!editable}
            />
          </div>
        </div>
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 font-bold text-[#0F7275]" onClick={() => ref?.current?.close()}>
          ✕
        </button>
        {editable && (
          <Button className="w-full" noMax={true} type="button" background="#0F7275" color="#F7FAFC" label="Save" onClick={handleEditSubmit} />
        )}
      </div>
    </dialog>
  );
});

export default LeavesPopup;
