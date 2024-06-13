import React, { useState, useEffect } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import WidgetContainer from '../../components/Cards/WidgetContainer';
import SearchLogo from '../../assets/SearchLogo.svg';
import CircularButton from '../../components/CircularButton';
import DryLeavesLogo from '../../assets/DryLeaves.svg';
import Countdown from '../../components/Countdown';
import InnerPlugins from '../../assets/InnerPlugins.svg';
import CountdownIcon from '../../assets/Countdown.svg';
import InputField from '../../components/InputField';
import Drawer from '../../components/Drawer';
import Date from '../../assets/Date.svg';
import WeightLogo from '../../assets/Weight.svg';
import axios from 'axios';
import { API_URL } from '../../App';

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

  return (
    <>
      <div className="mt-4 flex justify-center items-center gap-3">
        <InputField icon={SearchLogo} placeholder="Search" className="w-full" />
        <div className='ml-1'>
          <WidgetContainer backgroundColor="#94C3B3" borderRadius="20px" border={false}>
            <img src={InnerPlugins} alt="Inner Plugins" className='w-full h-8' />
          </WidgetContainer>
        </div>
      </div>

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

      <Drawer DryLeaves UserID={UserID} includeFourthSection={false} showThirdInput={true} firstText="Expiry Date" secondText="Weight" thirdText="Wet leaves" firstImgSrc={Date} secondImgSrc={WeightLogo} />
    </>
  );
}

export default DryLeaves;
