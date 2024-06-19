import React, { useState, useEffect, useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import WidgetContainer from '../../components/Cards/WidgetContainer';
import CircularButton from '../../components/CircularButton';
import PowderLogo from '../../assets/Powder.svg';
import PowderDetail from '../../assets/PowderDetail.svg';
import PowderStatus from "@components/PowderStatus";
import LoadingStatic from "@components/LoadingStatic";
import axios from 'axios';
import Drawer from '../../components/Drawer';
import { API_URL } from '../../App';
import AddLeavesPopup from '../../components/Popups/AddLeavesPopup';
import AccordionUsage from '../../components/AccordionUsage';
import DateIcon from '../../assets/Date.svg';
import WeightLogo from '../../assets/Weight.svg';

function Powder() {
  const [flourData, setFlourData] = useState([]);
  const [ProcessedFlourData, setProcessedFlourData] = useState([]);
  const [ExpiredFlourData, setExpiredFlourData] = useState([]);
  const [ThrownPowderData, setThrownPowderData] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [loading, setLoading] = useState(true);
  const UserID = useOutletContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/flour/get_by_user/${UserID}`);
        const currentTime = new Date();
        const data = response.data;

        setFlourData(data.filter(item => new Date(item.Expiration) > currentTime && item.Status === "Awaiting"));
        setProcessedFlourData(data.filter(item => item.Status === "Processed"));
        setExpiredFlourData(data.filter(item => new Date(item.Expiration) < currentTime));
        setThrownPowderData(data.filter(item => item.Status === "Thrown"));
      } catch (error) {
        console.error('Error fetching flour data:', error);
      } finally {
        setLoading(false);
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

  const accordions = useMemo(() => [
    {
      summary: 'Awaiting Powder',
      details: () => (
        <>
          {loading ? (
            <div className='text-center p-4'>
              <span className="font-montserrat text-base font-semibold leading-tight tracking-wide">
                <LoadingStatic />
              </span>
            </div>
          ) : (
            flourData.map((item) => (
              <div key={item.FlourID} className='flex justify-between p-1'>
                <WidgetContainer borderRadius="10px" className="w-full flex items-center">
                  <button onClick={() => handleButtonClick(item)}>
                    <CircularButton imageUrl={PowderLogo} backgroundColor="#94C3B3" />
                  </button>
                  <div className='flex flex-col ml-3'>
                    <span className="font-montserrat text-base font-semibold leading-tight tracking-wide text-left">
                      {item.Flour_Weight} Kg
                    </span>
                    <span className='font-montserrat text-sm font-medium leading-17 tracking-wide text-left'>
                      {item.FlourID}
                    </span>
                  </div>
                  <div className="flex ml-auto items-center">
                    <PowderStatus ready />
                  </div>
                </WidgetContainer>
              </div>
            ))
          )}
        </>
      ),
      defaultExpanded: true,
    },
    {
      summary: 'Processed Powder',
      details: () => (
        <>
          {ProcessedFlourData.map((item) => (
            <div key={item.FlourID} className='flex justify-between p-1'>
              <WidgetContainer borderRadius="10px" className="w-full flex items-center">
                <button onClick={() => handleButtonClick(item)}>
                  <CircularButton imageUrl={PowderLogo} backgroundColor="#94C3B3" />
                </button>
                <div className='flex flex-col ml-3'>
                  <span className="font-montserrat text-base font-semibold leading-tight tracking-wide text-left">
                    {item.Flour_Weight} Kg
                  </span>
                  <span className='font-montserrat text-sm font-medium leading-17 tracking-wide text-left'>
                    {item.FlourID}
                  </span>
                </div>
                <div className="flex ml-auto items-center">
                  <PowderStatus processed />
                </div>
              </WidgetContainer>
            </div>
          ))}
        </>
      ),
    },
    {
      summary: 'Expired Powder',
      details: () => (
        <>
          {ExpiredFlourData.map((item) => (
            <div key={item.FlourID} className='flex justify-between p-1'>
              <WidgetContainer borderRadius="10px" className="w-full flex items-center">
                <button onClick={() => handleButtonClick(item)}>
                  <CircularButton imageUrl={PowderLogo} backgroundColor="#94C3B3" />
                </button>
                <div className='flex flex-col ml-3'>
                  <span className="font-montserrat text-base font-semibold leading-tight tracking-wide text-left">
                    {item.Flour_Weight} Kg
                  </span>
                  <span className='font-montserrat text-sm font-medium leading-17 tracking-wide text-left'>
                    {item.FlourID}
                  </span>
                </div>
                <div className="flex ml-auto items-center">
                  <PowderStatus expired />
                </div>
              </WidgetContainer>
            </div>
          ))}
        </>
      )
    },
    {
      summary: 'Thrown Powder',
      details: () => (
        <>
          {ThrownPowderData.map((item) => (
            <div key={item.FlourID} className='flex justify-between p-1'>
              <WidgetContainer borderRadius="10px" className="w-full flex items-center">
                <button onClick={() => handleButtonClick(item)}>
                  <CircularButton imageUrl={PowderLogo} backgroundColor="#94C3B3" />
                </button>
                <div className='flex flex-col ml-3'>
                  <span className="font-montserrat text-base font-semibold leading-tight tracking-wide text-left">
                    {item.Flour_Weight} Kg
                  </span>
                  <span className='font-montserrat text-sm font-medium leading-17 tracking-wide text-left'>
                    {item.FlourID}
                  </span>
                </div>
                <div className="flex ml-auto items-center">
                  <PowderStatus thrown />
                </div>
              </WidgetContainer>
            </div>
          ))}
        </>
      )
    }
  ], [loading, flourData, ProcessedFlourData, ExpiredFlourData, ThrownPowderData]);

  return (
    <>
      <AccordionUsage accordions={accordions} />
      {selectedData && (
        <AddLeavesPopup
          code={selectedData.FlourID}
          weight={selectedData.Flour_Weight + " Kg"}
          expirationDate={selectedData.Expiration}
          imageSrc={PowderDetail}
          text="Powder"
          status={selectedData.Status}
        />
      )}
      <Drawer
        Data={flourData}
        setData={setFlourData}
        includeFourthSection={false}
        UserID={UserID}
        Flour={true}
        showThirdInput={false}
        firstText="Expiry Date"
        secondText="Weight"
        thirdText="Dry leaves"
        firstImgSrc={DateIcon}
        secondImgSrc={WeightLogo}
      />
    </>
  );
}

export default Powder;
