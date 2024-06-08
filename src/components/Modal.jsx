import { useState } from 'react'
import { FaCheck } from "react-icons/fa";
import { IoIosWarning } from 'react-icons/io';
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'

function modal({ id, title, desc }) {
  return (<>
    <dialog id={id} className="modal">
      <div className="modal-box">
        <div className='flex flex-row m-2'>
          <IoIosWarning className='text-6xl' />
          <div className='flex flex-col gap-2 mx-2'>
            <h3 className="font-bold text-lg">{title}</h3>
            <p className="">{desc}</p>
          </div>
        </div>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  </>);
}

export default modal;