import React, { useState, useEffect } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import axios from 'axios';
import WidgetContainer from '../../components/Cards/WidgetContainer';
import SearchLogo from '../../assets/SearchLogo.svg';
import CircularButton from '../../components/CircularButton';
import WetLeavesLogo from '../../assets/WetLeaves.svg';
import Countdown from '../../components/Countdown';
import InnerPlugins from '../../assets/InnerPlugins.svg';
import CountdownIcon from '../../assets/Countdown.svg';
import ExpiredWarningIcon from '../../assets/ExpiredWarning.svg';
import InputField from '../../components/InputField';
import Drawer from '../../components/Drawer';
import AddLeavesPopup from '../../components/Popups/AddLeavesPopup';
import DateIcon from '../../assets/Date.svg';
import WeightLogo from '../../assets/Weight.svg';
import AccordionUsage from '../../components/AccordionUsage';
import { API_URL } from '../../App';
import WetLeavesDetail from '../../assets/WetLeavesDetail.svg';

function WetLeaves() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [wetLeavesData, setWetLeavesData] = useState([]);
  const [expiredLeavesData, setExpiredLeavesData] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const UserID = useOutletContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/wetleaves/get_by_user/${UserID}`);
        const data = response.data;
        setWetLeavesData(data.filter(item => !item.isExpired));
        setExpiredLeavesData(data.filter(item => item.isExpired));
        console.log(data)
      } catch (error) {
        console.error('Error fetching wet leaves data:', error);
      }
    };

    fetchData();
  }, [UserID]);

  const handleButtonClick = (item) => {
    setSelectedData(item);
    document.getElementById('AddLeaves').showModal();
  };

  const accordions = [
    {
      summary: 'Awaiting Leaves',
      details: () => (
        <>
          {wetLeavesData.map((item) => (
            <div key={item.WetLeavesID} className='flex justify-between p-1'>
              <WidgetContainer borderRadius="10px" className="w-full flex items-center">
                <button onClick={() => handleButtonClick(item)}>
                  <CircularButton imageUrl={WetLeavesLogo} backgroundColor="#94C3B3" />
                </button>
                <div className='flex flex-col ml-3'>
                  <span className="font-montserrat text-base font-semibold leading-tight tracking-wide text-left">
                    {item.Weight} Kg
                  </span>
                  <span className='font-montserrat text-sm font-medium leading-17 tracking-wide text-left'>
                    {item.WetLeavesID}
                  </span>
                </div>
                <div className="flex ml-auto items-center">
                  <Countdown expiredTime={item.ReceivedTime} color="#79B2B7" image={CountdownIcon} />
                </div>
              </WidgetContainer>
            </div>
          ))}
        </>
      ),
      defaultExpanded: true,
    },
    {
      summary: 'Expired Leaves',
      details: () => (
        <>
          {expiredLeavesData.map((item) => (
            <div key={item.WetLeavesID} className='flex justify-between p-1'>
              <WidgetContainer borderRadius="10px" className="w-full flex items-center">
                <button onClick={() => handleButtonClick(item)}>
                  <CircularButton imageUrl={WetLeavesLogo} backgroundColor="#D45D5D" />
                </button>
                <div className='flex flex-col ml-3'>
                  <span className="font-montserrat text-base font-semibold leading-tight tracking-wide text-left">
                    {item.Weight} Kg
                  </span>
                  <span className='font-montserrat text-sm font-medium leading-17 tracking-wide text-left'>
                    {item.WetLeavesID}
                  </span>
                </div>
                <div className="flex ml-auto items-center">
                  <Countdown expiredTime={item.ReceivedTime} color="#D45D5D" image={ExpiredWarningIcon} />
                </div>
              </WidgetContainer>
            </div>
          ))}
        </>
      ),
      defaultExpanded: false,
    },
  ];

  return (
    <>
      <AccordionUsage accordions={accordions} />
      
      {selectedData && (
        <AddLeavesPopup
          code={selectedData.WetLeavesID}
          weight={selectedData.Weight + " Kg"}
          expirationDate={selectedData.ReceivedTime}
          imageSrc={WetLeavesDetail}
          text="Wet Leaves"
        />
      )}
      <Drawer WetLeaves UserID={UserID} includeFourthSection={false} showThirdInput={false} firstText="Date" secondText="Weight" firstImgSrc={DateIcon} secondImgSrc={WeightLogo}/>
    </>
  );
}

export default WetLeaves;
