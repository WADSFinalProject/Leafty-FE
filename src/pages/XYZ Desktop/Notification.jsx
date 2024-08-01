import React, { useRef, useState } from 'react';
import WidgetContainer from '@components/Cards/WidgetContainer';
import Return from '@components/Return';
import DoubleTick from '@assets/DoubleTick.svg';
import SegmentedControl from '@components/SegmentedControl'; 
import Exclamation from '@assets/Exclamation.svg';
import Options from '@assets/Options.svg';
import Shipments from '@assets/Shipments.svg';
import Checkbox from '@assets/Checkbox.svg'
import Read from '@components/Read';
import Unread from '@components/Unread';

const Notification = () => {
  const [selectedValue, setSelectedValue] = useState("Read");

  const readItems = [
    {
      buttonImage: Exclamation,
      buttonColor: '#0F7275',
      text: 'There are 5 packages that have not been scheduled!',
      optionsImage: Options
    },
    {
      buttonImage: Shipments,
      buttonColor: '#C0CD30',
      text: 'There are 5 packages that have not been scheduled!',
      optionsImage: Options
    },
    {
      buttonImage: Checkbox,
      buttonColor: '#C0CD30',
      text: 'There are 5 packages that have not been scheduled!',
      optionsImage: Options
    }
  ];

  const unreadItems = [
    {
      buttonImage: Exclamation,
      buttonColor: '#0F7275',
      text: 'There are 5 packages that have not been scheduled!',
      optionsImage: Options
    },
    {
      buttonImage: Shipments,
      buttonColor: '#C0CD30',
      text: 'There are 5 packages that have not been scheduled!',
      optionsImage: Options
    },
    {
      buttonImage: Checkbox,
      buttonColor: '#C0CD30',
      text: 'There are 5 packages that have not been scheduled!',
      optionsImage: Options
    }
  ];

  return (
    <>
      <div className="flex flex-col items-center justify-center px-2 pb- overflow-y-auto overflow-x-hidden">
        <div className="bg-[#F9F9F9] max-w-screen-md w-full h-full flex flex-col pl- p-2 m-8 gap-2 no-scrollbar">
          <div className="flex items-center justify-between ">           
            <Return className="" destination="/company/dashboard" />
            <p className='font-bold text-xl sm:text-2xl ps-3'>Notifications</p>
            <div className='flex '>
              <img src={DoubleTick} alt="DoubleTick" className='' />
              {/* <img src={Filter} alt="Filter" /> */}
            </div>
          </div>
          <div className='flex flex-col gap-2 '>
            <SegmentedControl
              name="group-1"
              callback={(val) => setSelectedValue(val)}
              controlRef={useRef()}
              segments={[
                { label: "Read", value: "Read", ref: useRef() },
                { label: "Unread", value: "Unread", ref: useRef() },               
              ]}
            />
            <p className="selected-item">Selected: {selectedValue}</p>
            {selectedValue === "Read" && <Read items={readItems} />}
            {selectedValue === "Unread" && <Unread items={unreadItems} />}
          </div>          
        </div>
      </div>
    </>
  );
};

export default Notification;
