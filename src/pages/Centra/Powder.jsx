import React, { useState } from 'react';
import WidgetContainer from '../../components/Cards/WidgetContainer';
import SearchLogo from '../../assets/SearchLogo.svg';
import CircularButton from '../../components/CircularButton';
import PowderLogo from '../../assets/Powder.svg';
import PowderDetail from '../../assets/PowderDetail.svg';
import Countdown from '../../components/Countdown';
import InnerPlugins from '../../assets/InnerPlugins.svg';
import InputField from '../../components/InputField';
import Drawer from '../../components/Drawer';
import Date from '../../assets/Date.svg';
import WeightLogo from '../../assets/Weight.svg';
import ReadyIcon from '../../assets/ReadyIcon.svg';
import AddLeavesPopup from '../../components/Popups/AddLeavesPopup';
import AccordionUsage from '../../components/AccordionUsage';

function Powder() {
  const data = [
    { time: 'Ready', color: '#C0CD30', image: ReadyIcon, weight: '20 Kg', code: 'W563210', date: '23-21-2024', detailImage: PowderDetail,text:"Powder" },
    { time: 'Ready', color: '#C0CD30', image: ReadyIcon, weight: '30 Kg', code: 'W553210', date: '24-21-2024', detailImage: PowderDetail ,text:"Powder"}
  ];

  const [selectedData, setSelectedData] = useState(null);

  const handleButtonClick = (item) => {
    setSelectedData(item);
    document.getElementById('AddLeaves').showModal();
  };
  const accordions = [
    {
      summary: 'Finished Leaves',
      details: () => (
        <>
        {data.map((item) => (
        <div key={item.code} className='flex justify-between p-1'>
          <WidgetContainer borderRadius="10px" className="w-full flex items-center ">
            <button onClick={() => handleButtonClick(item)}>
              <CircularButton imageUrl={PowderLogo} backgroundColor="#94C3B3" />
            </button>
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

      <Drawer includeFourthSection={false} showThirdInput={true} firstText="Expiry Date" secondText="Weight" thirdText="Dry leaves" firstImgSrc={Date} secondImgSrc={WeightLogo} />
    </>
  );
}

export default Powder;
