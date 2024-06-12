import React from 'react';
import { Link } from 'react-router-dom';
import WidgetContainer from '../../components/Cards/WidgetContainer';
import SearchLogo from '../../assets/SearchLogo.svg';
import CircularButton from '../../components/CircularButton';
import PowderLogo from '../../assets/Powder.svg';
import Countdown from '../../components/Countdown';
import InnerPlugins from '../../assets/InnerPlugins.svg';
import InputField from '../../components/InputField';
import Drawer from '../../components/Drawer';
import Date from '../../assets/Date.svg';
import WeightLogo from '../../assets/Weight.svg';
import ReadyIcon from '../../assets/ReadyIcon.svg';

function Powder() {
  const data = [
    { time: 'Ready ', color: '#C0CD30', image: ReadyIcon, weight: '20 Kg', code: 'W563210' },
    { time: 'Ready ', color: '#C0CD30', image: ReadyIcon, weight: '30 Kg', code: 'W553210' }
  ];

  return (
    <>
      <div className="mt-4 flex justify-center items-center gap-3">
        <InputField icon={SearchLogo} placeholder={'Search'} className={'max-w-none'} />

        <div className='ml-1'>
          <WidgetContainer backgroundColor="#94C3B3" borderRadius="20px" border={false}>
            <img src={InnerPlugins} alt="InnerPlugins" className='w-8 h-8 ' />
          </WidgetContainer>
        </div>
      </div>

      {data.map((item) => (
        <div key={item.code} className='flex justify-between'>
          <WidgetContainer borderRadius="10px" className="w-full flex items-center ">
            <Link to={`/centra/powderdetail/${item.code}/${item.weight}`}>
              <CircularButton imageUrl={PowderLogo} backgroundColor="#94C3B3" />
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
              <Countdown time={item.time} color={item.color} image={item.image} className="" />
            </div>
          </WidgetContainer>
        </div>
      ))}

      <Drawer includeFourthSection={false} showThirdInput={true} firstText="Expiry Date" secondText="Weight" thirdText="Dry leaves" firstImgSrc={Date} secondImgSrc={WeightLogo} />
    </>
  );
}

export default Powder;
