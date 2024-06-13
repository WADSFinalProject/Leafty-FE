import React, { useState, useEffect } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import WidgetContainer from '../../components/Cards/WidgetContainer';
import SearchLogo from '../../assets/SearchLogo.svg';
import CircularButton from '../../components/CircularButton';
import DryLeavesLogo from '../../assets/DryLeaves.svg';
import DryLeavesDetail from '../../assets/DryLeavesDetail.svg';
import Countdown from '../../components/Countdown';
import InnerPlugins from '../../assets/InnerPlugins.svg';
import CountdownIcon from '../../assets/Countdown.svg';
import InputField from '../../components/InputField';
import Drawer from '../../components/Drawer';
import Date from '../../assets/Date.svg';
import WeightLogo from '../../assets/Weight.svg';
import axios from 'axios';import { API_URL } from '../../App';
import AddLeavesPopup from '../../components/Popups/AddLeavesPopup';
import AccordionUsage from '../../components/AccordionUsage';

function DryLeaves() {
  const [dryLeavesData, setDryLeavesData] = useState([]);
  const [openDrawer, setOpenDrawer] = useState(false);
  const UserID = useOutletContext();
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL+`/dryleaves/get_by_user/${UserID}`);
        setDryLeavesData(response.data);
      } catch (error) {
        console.error('Error fetching dry leaves data:', error);
      }
    };

    fetchData();
  }, [UserID]);

  
  const data = [
    { time: '01h05m', color: '#79B2B7', image: CountdownIcon, weight: '30 Kg', code: 'W232122', date: '23-21-2024', detailImage: DryLeavesDetail,text:"Dry Leaves" },
    { time: '01h45m', color: '#79B2B7', image: CountdownIcon, weight: '20 Kg', code: 'W267710', date: '24-21-2024', detailImage: DryLeavesDetail ,text:"Dry Leaves"},
  ];

  const [selectedData, setSelectedData] = useState(null);

  const handleButtonClick = (item) => {
    setSelectedData(item);
    document.getElementById('AddLeaves').showModal();
  };
  const accordions = [
    {
      summary: 'Awaiting Leaves',
      details: () => (
        <>
            {dryLeavesData.map((item) => (
        <div key={item.DryLeavesID} className='flex justify-between'>
          <WidgetContainer borderRadius="10px" className="w-full flex items-center">
            <Link to={`/centra/dry-leaves/detail/${item.DryLeavesID}`}>
              <CircularButton imageUrl={DryLeavesLogo} backgroundColor="#94C3B3" />
            </Link>
            <div className='flex flex-col ml-3'>
              <span className="font-montserrat text-base font-semibold leading-tight tracking-wide text-left">
                {item.Processed_Weight} Kg
              </span>
              <span className='font-montserrat text-sm font-medium leading-17 tracking-wide text-left'>
                {item.DryLeavesID}
              </span>
            </div>
            <div className="flex ml-auto items-center">
              <Countdown receivedTime={item.Expiration} color="#79B2B7" image={CountdownIcon} />
            </div>
          </WidgetContainer>
        </div>
      ))}
      
        </>
      ),
      defaultExpanded: true,
    }
    
  ];


  return (
    <>
      
      <AccordionUsage accordions={accordions} />

      {selectedData && (
        <AddLeavesPopup
          code={selectedData.code}
          time={selectedData.time}
          weight={selectedData.weight}
          date={selectedData.date}
          imageSrc={selectedData.detailImage}
          text={selectedData.text}
        />
      )}

      <Drawer DryLeaves UserID={UserID} includeFourthSection={false} showThirdInput={true} firstText="Expiry Date" secondText="Weight" thirdText="Wet leaves" firstImgSrc={Date} secondImgSrc={WeightLogo} />
    </>
  );
}

export default DryLeaves;
