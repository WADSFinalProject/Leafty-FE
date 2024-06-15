import React, { useState, useEffect } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import WidgetContainer from '../../components/Cards/WidgetContainer';
import SearchLogo from '../../assets/SearchLogo.svg';
import CircularButton from '../../components/CircularButton';
import PowderLogo from '../../assets/Powder.svg';
import PowderDetail from '../../assets/PowderDetail.svg';
import PowderStatus from "@components/PowderStatus";
import Drawer from '../../components/Drawer';
import Date from '../../assets/Date.svg';
import WeightLogo from '../../assets/Weight.svg';
import ReadyIcon from '../../assets/ReadyIcon.svg';
import axios from 'axios';
import { API_URL } from '../../App';
import AddLeavesPopup from '../../components/Popups/AddLeavesPopup';
import AccordionUsage from '../../components/AccordionUsage';

function Powder() {
  const [flourData, setFlourData] = useState([]);
  const [ProcessedFlourData, setProcessedFlourData] = useState([]);
  const [ThrownFlourData, setThrownFlourData] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const UserID = useOutletContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/flour/get_by_user/${UserID}`);
        setFlourData(response.data.filter(item => item.Status === "Awaiting"));
        setProcessedFlourData(response.data.filter(item => item.Status === "Processed"));
        setThrownFlourData(response.data.filter(item => item.Status === "Thrown")); // Corrected line
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching flour data:', error);
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
      summary: 'Awaiting Powder',
      details: () => (
        <>
          {flourData.map((item) => (
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
          ))}
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
      summary: 'Thrown Powder',
      details: () => (
        <>
          {ThrownFlourData.map((item) => (
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
  ];

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
          showExpiredIn={false}
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
        firstImgSrc={Date}
        secondImgSrc={WeightLogo}
      />
    </>
  );
}

export default Powder;
