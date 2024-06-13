import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Plus from "@assets/Plus.svg"
import { API_URL } from '../App';
import WidgetContainer from '../components/Cards/WidgetContainer';

const InputData = ({ UserID, firstp, secondp, thirdp, fourthp, firstimg, secondimg, thirdimg, includeFourthSection, showThirdInput, WetLeaves = false, DryLeaves = false, Flour = false, Shipment = false }) => {
  const [date, setDate] = useState(new Date().toISOString());
  const [weight, setWeight] = useState(25);
  const [wetLeaves, setWetLeaves] = useState([]);
  const [selectedWetLeavesID, setSelectedWetLeavesID] = useState('');

  useEffect(() => {
    if (DryLeaves) {
      // Fetch wet leaves for the user
      axios.get(API_URL + '/wetleaves/get_by_user/' + UserID)
        .then(response => {
          setWetLeaves(response.data);
        })
        .catch(error => {
          console.error('Error fetching wet leaves:', error);
        });
    }
  }, [DryLeaves, UserID]);

  const fetchAvailableWetLeaves = async () =>{
    try {
      const response = await axios.post(API_URL + '/wetLeaves/get', { UserID: String(UserID), Weight: weight, ReceivedTime: date, Status: "Awaiting" });
      console.log('Wet Leaves posted successfully:', response.data);
    } catch (error) {
      console.error('Error posting wet leaves:', error);
    }
  }

  const postWetLeaves = async () => {
    try {
      const response = await axios.post(API_URL + '/wetLeaves/post', { UserID: String(UserID), Weight: weight, ReceivedTime: date, Status: "Awaiting" });
      console.log('Wet Leaves posted successfully:', response.data);
    } catch (error) {
      console.error('Error posting wet leaves:', error);
    }
  };

  const postDryLeaves = async () => {
    try {
      const response = await axios.post(API_URL + '/dryleaves/post', {
        UserID: String(UserID),
        WetLeavesID: selectedWetLeavesID,
        Processed_Weight: weight,
        Expiration: date,
        Status: "Awaiting"
      });
      console.log('Dry Leaves posted successfully:', response.data);
    } catch (error) {
      console.error('Error posting dry leaves:', error);
    }
  };

  const postFlour = async () => {
    try {
      const response = await axios.post(API_URL + '/flour/post', { date, weight });
      console.log('Flour posted successfully:', response.data);
    } catch (error) {
      console.error('Error posting flour:', error);
    }
  };

  const handleSave = () => {
    console.log("Save button pressed.");
    if (WetLeaves) {
      console.log("Posting Wet Leaves:", { UserID, weight, date });
      postWetLeaves();
    } else if (DryLeaves) {
      console.log("Posting Dry Leaves:", { UserID, selectedWetLeavesID, weight, date });
      postDryLeaves();
    } else if (Flour) {
      console.log("Posting Flour:", { date, weight });
      postFlour();
    }
  };

  return (
    <div className='w-full max-w mt-4 p-4 '>
      {/* Date Input */}
      <div className='mb-4'>
        <p className='font-montserrat text-xs font-medium leading-[14.63px] tracking-wide text-left ml-1'>{firstp}</p>
        <WidgetContainer backgroundColor="#FFFFFF" borderRadius="20px" borderWidth="" borderColor="" className='mt-2'>
          <div className='flex'>
            <input
              type="datetime-local"
              className="w-full h-full bg-transparent border-none outline-none px-2"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <img src={firstimg} alt="Date" className='flex justify-end w-6 h-auto' />
          </div>
        </WidgetContainer>
      </div>

      {/* Weight Input */}
      <div className='mb-4 flex flex-col items-center'>
        <p className='font-montserrat text-xs font-medium leading-[14.63px] tracking-wide text-left self-start mb-2'>{secondp}</p>
        <WidgetContainer backgroundColor="#FFFFFF" borderRadius="20px" borderWidth="" borderColor="" className='w-full '>
          <div className='flex'>
            <input
              type="number"
              className="w-full h-full bg-transparent border-none outline-none px-2"
              placeholder='Input Number'
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
            <img src={secondimg} alt="Weight" className='w-6 h-auto mr-1' />
          </div>
        </WidgetContainer>
      </div>

      {/* Optional Third Input */}
      {showThirdInput && (
        <div className='mb-4'>
          <p className='font-montserrat text-xs font-medium leading-[14.63px] tracking-wide text-left ml-1'>{thirdp}</p>
          <WidgetContainer backgroundColor="#FFFFFF" borderRadius="20px" borderWidth="" borderColor="" className='mt-2 max-h-28 h-32'>
            <button onClick={() => { }} className={"bg-[#94C3B3] rounded-full w-8 h-8 items-center justify-center flex"}><img src={Plus}></img></button>
          </WidgetContainer>
        </div>
      )}

      {/* Select Wet Leaves for Dry Leaves */}
      {DryLeaves && (
        <div className='mb-4'>
          <p className='font-montserrat text-xs font-medium leading-[14.63px] tracking-wide text-left ml-1'>Select Wet Leaves</p>
          <WidgetContainer backgroundColor="#FFFFFF" borderRadius="20px" borderWidth="" borderColor="" className='mt-2'>
            <select
              className="w-full h-full bg-transparent border-none outline-none px-2"
              value={selectedWetLeavesID}
              onChange={(e) => setSelectedWetLeavesID(e.target.value)}
            >
              <option value="">Select Wet Leaves</option>
              {wetLeaves.map((wetLeaf) => (
                <option key={wetLeaf.WetLeavesID} value={wetLeaf.WetLeavesID}>{`ID: ${wetLeaf.WetLeavesID}, Weight: ${wetLeaf.Weight}`}</option>
              ))}
            </select>
          </WidgetContainer>
        </div>
      )}

      {/* Optional Fourth Section */}
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

      {/* Save Button */}
      <div className='flex items-center justify-center mt-12'>
        <WidgetContainer backgroundColor="#0F7275" borderRadius="20px" border={false} className='w-full  mr-2'>
          <button 
            className='flex items-center justify-center w-full h-8 font-montserrat font-semibold leading-4 tracking-wide text-gray-100 text-lg' onClick={handleSave}>
          </button>
        </WidgetContainer>
      </div>
      <dialog id="choose_wet_leaves" className="modal modal-bottom  ">
        <div className="modal-box">
          
        </div>
      </dialog>
    </div>
  );
}

export default InputData;