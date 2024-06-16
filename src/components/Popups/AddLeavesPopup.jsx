import React from 'react';
import ExpiredIn from '../../components/ExpiredIn';
import LeavesDetail from '../../components/LeavesDetail';
import LeavesType from '../../components/LeavesType';

function AddLeavesPopup({ code, time, weight, expirationDate, imageSrc, text, status }) {
  const expired = time; // Assuming the expired time is the same as the passed time parameter
  const leavesText = `${text} #${code}`;

  return (
    <>
      <dialog id="AddLeaves" className="modal modal-bottom">
        <div className='modal-box flex flex-col gap-2'>
          <LeavesType imageSrc={imageSrc} text={leavesText} />
          {(status === "Awaiting") && <ExpiredIn expirationDate={expirationDate} />}
          <LeavesDetail date={expirationDate} time={time} weight={weight} status = {status} code = {code} text = {text} />
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}

export default AddLeavesPopup;
