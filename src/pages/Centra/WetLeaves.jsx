import React, { useState, useEffect } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import WidgetContainer from '../../components/Cards/WidgetContainer';
import SearchLogo from '../../assets/SearchLogo.svg';
import CircularButton from '../../components/CircularButton';
import WetLeavesLogo from '../../assets/WetLeaves.svg';
import Countdown from '../../components/Countdown';
import InnerPlugins from '../../assets/InnerPlugins.svg';
import CountdownIcon from '../../assets/Countdown.svg';
import ExpiredWarningIcon from '../../assets/ExpiredWarning.svg';
import InputField from '../../components/InputField';
import { Search } from '@mui/icons-material';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Date from '../../assets/Date.svg';
import WeightLogo from '../../assets/Weight.svg';
import PackageCount from '../../assets/Packagecount.svg';
import Drawer from '../../components/Drawer';
import axios from 'axios';
import { API_URL } from '../../App';

function WetLeaves() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [wetLeavesData, setWetLeavesData] = useState([]);
  const UserID = useOutletContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL+`/wetleaves/get_by_user/${UserID}`);
        setWetLeavesData(response.data);
      } catch (error) {
        console.error('Error fetching wet leaves data:', error);
      }
    };

    fetchData();
  }, []);

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

      {wetLeavesData.map((item) => (
        <div key={item.WetLeavesID} className='flex justify-between'>
          <WidgetContainer borderRadius="10px" className="w-full flex items-center ">
            <Link to={`/centra/wet-leaves/detail/${item.WetLeavesID}`}>
              <CircularButton imageUrl={WetLeavesLogo} backgroundColor="#94C3B3" />
            </Link>
            <div className='flex flex-col ml-3'>
              <span className="font-montserrat text-base font-semibold leading-tight tracking-wide text-left">
                {item.Weight} Kg
              </span>
              <span className='font-montserrat text-sm font-medium leading-17 tracking-wide text-left'>
                {item.WetLeavesID}
              </span>
            </div>

            <div className="flex ml-auto items-center">
              <Countdown receivedTime={item.ReceivedTime} color="#79B2B7" image={CountdownIcon} />
            </div>
          </WidgetContainer>
        </div>
      ))}
      <Drawer WetLeaves UserID = {UserID} includeFourthSection={false} showThirdInput={false} firstText="Date" secondText="Weight" firstImgSrc={Date} secondImgSrc={WeightLogo}/>
    </>
  );
}

export default WetLeaves;
