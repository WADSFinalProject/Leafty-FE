import React from 'react';
import ExpiredIn from '../../components/ExpiredIn';
import LeavesDetail from '../../components/LeavesDetail';
import LeavesType from '../../components/LeavesType';

function AddLeavesPopup({ code, time, weight, date, imageSrc,text }) {
  const expired = time; // Assuming the expired time is the same as the passed time parameter
  const leavesText = `${text} #${code}`;


  return (
    <>
      <dialog id="AddLeaves" className="modal modal-bottom">
        <div className='modal-box'>
          <LeavesType imageSrc={imageSrc} text={leavesText} />
          <ExpiredIn expired={expired} />
          <LeavesDetail date={date} time={time} weight={weight} />
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}

export default AddLeavesPopup;
