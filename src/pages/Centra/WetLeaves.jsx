import React, { useState, useEffect, useRef, useMemo } from 'react';
import axios from 'axios';
import { useOutletContext } from 'react-router-dom';
import WidgetContainer from '../../components/Cards/WidgetContainer';
import CircularButton from '../../components/CircularButton';
import Countdown from '../../components/Countdown';
import LoadingStatic from "@components/LoadingStatic";
import Throw from "@assets/Thrown.svg";
import Popup from '../../components/Popups/Popup';
import WetLeavesLogo from '../../assets/WetLeaves.svg';
import ProcessedLogo from '@assets/Status.svg';
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
  const [thrownLeavesData, setThrownLeavesData] = useState([]);
  const [processedLeavesData, setProcessedLeavesData] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [wetLeavesDailyLimit, setWetLeavesDailyLimit] = useState(30);
  const [wetLeavesWeightToday, setWetLeavesWeightToday] = useState(0);
  const UserID = useOutletContext();
  const refModal = useRef();

  const accordions = useMemo(() => [
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
          {thrownLeavesData.map((item) => (
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
  ], [wetLeavesData, expiredLeavesData, thrownLeavesData, processedLeavesData]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/wetleaves/get_by_user/${UserID}`);
        const data = response.data;
        const currentTime = new Date();
        setWetLeavesData(data.filter(item => new Date(item.Expiration) > currentTime && item.Status === "Awaiting"));
        setExpiredLeavesData(data.filter(item => new Date(item.Expiration) < currentTime && item.Status === "Awaiting"));
        setProcessedLeavesData(data.filter(item => item.Status === "Processed"));
        setThrownLeavesData(data.filter(item => item.Status === "Thrown"));
        console.log(data);
      } catch (error) {
        console.error('Error fetching wet leaves data:', error);
      }

      try {
        const weightToday = await fetchSumWetLeavesWeightToday();
        setWetLeavesWeightToday(weightToday);
      } catch (error) {
        console.error('Error fetching sum wet leaves weight today:', error);
      }
    };

    fetchData();
  }, [UserID]);

  const fetchSumWetLeavesWeightToday = async () => {
    try {
      const response = await axios.get(`${API_URL}/wetleaves/sum_weight_today/${UserID}`);
      return response.data.total_weight_today;
    } catch (error) {
      console.error('Error fetching sum wet leaves weight today:', error);
      return 0;
    }
  };

  const handleButtonClick = (item) => {
    setSelectedData(item);
    setTimeout(() => {
      document.getElementById('AddLeaves').showModal();
    }, 5);
  };

  return (
    <>
      <div className="flex justify-between p-1">
        <WidgetContainer borderRadius="10px" className="w-full flex items-center">
          <div className='flex flex-col ml-3'>
            <span className="font-montserrat text-base font-semibold leading-tight tracking-wide text-left">
              Total Wet Leaves Weight Today: {wetLeavesWeightToday} Kg
            </span>
          </div>
        </WidgetContainer>
      </div>
      <AccordionUsage accordions={accordions} />
      {selectedData && (
        <AddLeavesPopup
          code={selectedData.WetLeavesID}
          weight={selectedData.Weight + " Kg"}
          expirationDate={selectedData.Expiration}
          imageSrc={WetLeavesDetail}
          status={selectedData.Status}
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
