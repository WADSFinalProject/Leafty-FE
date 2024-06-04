import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import WidgetContainer from '../../components/Cards/WidgetContainer';
import SearchLogo from '../../assets/SearchLogo.svg';
import CircularButton from '../../components/CircularButton';
import WetLeavesLogo from '../../assets/WetLeaves.svg';
import Countdown from '../../components/Countdown';
import InnerPlugins from '../../assets/InnerPlugins.svg';
import Plus from '../../assets/Plus.svg';
import CountdownIcon from '../../assets/Countdown.svg';
import ExpiredWarningIcon from '../../assets/ExpiredWarning.svg';
import InputField from '../../components/InputField';
import { Search } from '@mui/icons-material';




function WetLeaves() {

  const data = [
    { time: "01h05m", color: "#79B2B7", image: CountdownIcon, weight: "30 Kg", code: "W232120" },
    { time: "01h45m", color: "#79B2B7", image: CountdownIcon, weight: "20 Kg", code: "W267760" },
    { time: "Expired", color: "#D45D5D", image: ExpiredWarningIcon, weight: "40 Kg", code: "W543210" },
    { time: "Expired", color: "#D45D5D", image: ExpiredWarningIcon, weight: "40 Kg", code: "W543210" },

  ];


  return (
    <>
      <div className="mt-4  flex justify-center items-center gap-3">
        <InputField icon = {SearchLogo} placeholder={"Search"} className={"max-w-none"}/>

        <div className='ml-1'>
          <WidgetContainer backgroundColor="#94C3B3" borderRadius="20px" border={false}>
            <img src={InnerPlugins} alt="InnerPlugins" className='w-8 h-8 ' />
          </WidgetContainer>
        </div>
      </div>


      {data.map((item) => (
        <div key={item.code} className=' flex justify-between'>
          <WidgetContainer borderRadius="10px" className="w-full flex items-center">
            <Link to="/wetleavesdetail">
              <CircularButton imageUrl={WetLeavesLogo} backgroundColor="#94C3B3" />
            </Link>
            <div className='flex flex-col ml-3'>
              <span className="font-montserrat text-base font-semibold leading-tight tracking-wide text-left">
                {item.weight}
              </span>
              <span className='font-montserrat text-sm font-medium leading-17 tracking-wide text-left'>
                {item.code}
              </span>
            </div>
            <div className="flex ml-auto items-center">
              <Countdown time={item.time} color={item.color} image={item.image} />
            </div>
          </WidgetContainer>
        </div>
      ))}
    </>
  );
}

export default WetLeaves;
