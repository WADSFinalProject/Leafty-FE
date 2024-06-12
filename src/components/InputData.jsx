import React, { useEffect, useState } from 'react';
import WidgetContainer from '../components/Cards/WidgetContainer';
import axios from 'axios';
import { API_URL } from '../App';

// const wetleavespost
// const DryLeavesPost
// const FlourPost = (){}
// const ShipmentPost = (){}

const InputData = ({ UserID, firstp, secondp, thirdp, fourthp, firstimg, secondimg, thirdimg, includeFourthSection, showThirdInput, WetLeaves = false, DryLeaves = false, Flour = false, Shipment = false }) => {
  const [date, setDate] = useState(new Date());
  const [weight, setWeight] = useState(25);

  const postWetLeaves = async () => {
    try {
      const response = await axios.post(API_URL+'/wetLeaves/post', {UserID: String(UserID), Weight: weight, ReceivedTime: date, Status: "Awaiting"});
      console.log('Wet Leaves posted successfully:', response.data);
    } catch (error) {
      console.error('Error posting wet leaves:', error);
    }
  };

  const postDryLeaves = async () => {
    try {
      const response = await axios.post(API_URL+'/dryleaves/post', { date, weight });
      console.log('Dry Leaves posted successfully:', response.data);
    } catch (error) {
      console.error('Error posting dry leaves:', error);
    }
  };

  const postFlour = async () => {
    try {
      const response = await axios.post(API_URL+'/flour/post', { date, weight });
      console.log('Flour posted successfully:', response.data);
    } catch (error) {
      console.error('Error posting flour:', error);
    }
  };

  const handleSave = () => {
    if (WetLeaves) {
      console.log("adding")
      postWetLeaves();
    } else if (DryLeaves) {
      postDryLeaves();
    } else if (Flour) {
      postFlour();
    }
  };

  return (
    <div className='w-full max-w mt-4 p-4 '>
      <div className='mb-4'>
        <p className='font-montserrat text-xs font-medium leading-[14.63px] tracking-wide text-left ml-1'>{firstp}</p>
        <WidgetContainer backgroundColor="#FFFFFF" borderRadius="20px" borderWidth="" borderColor="" className='mt-2'>
          <div className='flex'>
            <input
              type="text"
              className="w-full h-full bg-transparent border-none outline-none px-2"
              placeholder='Input Date'
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <img src={firstimg} alt="Date" className='flex justify-end w-6 h-auto' />
          </div>
        </WidgetContainer>
      </div>

      <div className='mb-4 flex flex-col items-center'>
        <p className='font-montserrat text-xs font-medium leading-[14.63px] tracking-wide text-left self-start mb-2'>{secondp}</p>
        <WidgetContainer backgroundColor="#FFFFFF" borderRadius="20px" borderWidth="" borderColor="" className='w-full '>
          <div className='flex'>
            <input
              type="text"
              className="w-full h-full bg-transparent border-none outline-none px-2"
              placeholder='Input Number'
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
            <img src={secondimg} alt="Weight" className='w-6 h-auto mr-1' />
          </div>
        </WidgetContainer>
      </div>

      {showThirdInput && (
        <div className='mb-4'>
          <p className='font-montserrat text-xs font-medium leading-[14.63px] tracking-wide text-left ml-1'>{thirdp}</p>
          <WidgetContainer backgroundColor="#FFFFFF" borderRadius="20px" borderWidth="" borderColor="" className='mt-2 max-h-28 h-32'>
            <input
              type="text"
              className="w-full h-full bg-transparent border-none outline-none px-2"
            />
          </WidgetContainer>
        </div>
      )}

      {includeFourthSection && (
        <div className='mb-4 flex flex-col items-center'>
          <p className='font-montserrat text-xs font-medium leading-[14.63px] tracking-wide text-left self-start mb-2'>{fourthp}</p>
          <WidgetContainer backgroundColor="#FFFFFF" borderRadius="20px" borderWidth="" borderColor="" className='w-full '>
            <div className='flex'>
              <input
                type="text"
                className="w-full h-full bg-transparent border-none outline-none px-2"
                placeholder='Input Number'
              />
              <img src={thirdimg} alt="Weight" className='w-6 h-auto mr-1' />
            </div>
          </WidgetContainer>
        </div>
      )}

      <div className='flex items-center justify-center mt-12'>
        <WidgetContainer backgroundColor="#0F7275" borderRadius="20px" border={false} className='w-full  mr-2'>
          <button 
            className='flex items-center justify-center w-full h-8 font-montserrat font-semibold leading-4 tracking-wide text-gray-100 text-lg' onClick={() => handleSave()}
          >
            Save
          </button>
        </WidgetContainer>
      </div>
    </div>
  );
}

export default InputData;
