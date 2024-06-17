import React, { useState, useEffect } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import axios from 'axios';
import WidgetContainer from '../../components/Cards/WidgetContainer';
import SearchLogo from '../../assets/SearchLogo.svg';
import CircularButton from '../../components/CircularButton';
import WetLeavesLogo from '../../assets/WetLeaves.svg';
import Countdown from '../../components/Countdown';
import ProcessedLogo from '@assets/Status.svg';
// import ProcessedLogo from "@assets/ProcessedLeaves.svg";
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
import LoadingStatic from "@components/LoadingStatic"
import Throw from "@assets/Thrown.svg";
import { useCookies } from 'react-cookie';
import Popup from '../../components/Popups/Popup';

function WetLeaves() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [wetLeavesData, setWetLeavesData] = useState([]);
  const [expiredLeavesData, setExpiredLeavesData] = useState([]);
  const [ThrownLeavesData, setThrownLeavesData] = useState([]);
  const [processedLeavesData, setProcessedLeavesData] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [WetLeavesDailyLimit, setWetLeavesDailyLimit] = useState(30);
  const UserID = useOutletContext();
  const refModal = useRef();
  const [cookies, setCookie] = useCookies(['WetLeavesDailyLimit']);

  function handleWetLeavesDailyLimit() {
    const newWetLeavesDailyLimit = !WetLeavesDailyLimit; // Negate the current value to get the new value
    setWetLeavesDailyLimit(newWetLeavesDailyLimit); // Update the state
    setCookie("WetLeavesDailyLimit", newWetLeavesDailyLimit); // Set the cookie with the new value
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/wetleaves/get_by_user/${UserID}`);
        const data = response.data;
        const currentTime = new Date();
        setWetLeavesData(data.filter(item => new Date(item.Expiration) > currentTime && item.Status === "Awaiting"));
        setExpiredLeavesData(data.filter(item => new Date(item.Expiration) < currentTime && item.Status === "Awaiting")); // Corrected line
        setProcessedLeavesData(data.filter(item => item.Status === "Processed"));
        setThrownLeavesData(data.filter(item => item.Status === "Thrown"))
        console.log(data);
      } catch (error) {
        console.error('Error fetching wet leaves data:', error);
      }
    };

    fetchData();
  }, [UserID]);

  const handleButtonClick = (item) => {
    setSelectedData(item);
    setTimeout(() => {
      document.getElementById('AddLeaves').showModal();
    }, 5);
  };

  function WarningDailyLimit(){

  }

  const accordions = [
    {
      summary: 'Awaiting Leaves',
      details: () => (
        <>
          {wetLeavesData.length > 0 ? (
            wetLeavesData.map((item) => (
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
                    <Countdown expiredTime={item.Expiration} color="#79B2B7" image={CountdownIcon} />
                  </div>
                </WidgetContainer>
              </div>
            ))
          ) : (
            <div className='text-center p-4'>
              <span className="font-montserrat text-base font-semibold leading-tight tracking-wide">
                <LoadingStatic />
              </span>
            </div>
          )}
        </>
      ),
      defaultExpanded: true,
    },
    {
      summary: 'Processed Leaves',
      details: () => (
        <>
          {processedLeavesData.map((item) => (
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
                  <Countdown processed={true} expiredTime={item.Expiration} color="#D4965D80" image={ProcessedLogo} />
                </div>
              </WidgetContainer>
            </div>
          ))}
        </>
      ),
      defaultExpanded: false,
    },
    {
      summary: 'Expired Leaves',
      details: () => (
        <>
          {expiredLeavesData.map((item) => (
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
                  <Countdown expired={true} expiredTime={item.Expiration} color="#D45D5D" image={ExpiredWarningIcon} />
                </div>
              </WidgetContainer>
            </div>
          ))}
        </>
      ),
      defaultExpanded: false,
    },
    {
      summary: "Thrown Leaves",
      details: () => (
        <>
          {ThrownLeavesData.map((item) => (
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
                  <Countdown thrown color="#D45D5D" image={Throw} expiredTime={item.Expiration} />
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
          expirationDate={selectedData.Expiration}
          imageSrc={WetLeavesDetail}
          status = {selectedData.Status}
          text="Wet Leaves"
          showExpiredIn
        />
      )}
      <Drawer WetLeaves Data={wetLeavesData} setData={setWetLeavesData} UserID={UserID} includeFourthSection={false} showThirdInput={false} firstText="Date" secondText="Weight" firstImgSrc={DateIcon} secondImgSrc={WeightLogo} />
      <Popup />
    </>
  );
}

export default WetLeaves;
