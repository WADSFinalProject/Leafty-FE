import React, { useState } from 'react';
import WidgetContainer from '../../components/Cards/WidgetContainer';
import SearchLogo from '../../assets/SearchLogo.svg';
import CircularButton from '../../components/CircularButton';
import WetLeavesLogo from '../../assets/WetLeaves.svg';
import Countdown from '../../components/Countdown';
import InnerPlugins from '../../assets/InnerPlugins.svg';
import CountdownIcon from '../../assets/Countdown.svg';
import ExpiredWarningIcon from '../../assets/ExpiredWarning.svg';
import InputField from '../../components/InputField';
import Drawer from '../../components/Drawer';
import AddLeavesPopup from '../../components/Popups/AddLeavesPopup';
import DateIcon from '../../assets/Date.svg';
import WeightLogo from '../../assets/Weight.svg';
import WetLeavesDetail from '../../assets/WetLeavesDetail.svg';
import AccordionUsage from '../../components/AccordionUsage';

function WetLeaves() {
  const [selectedData, setSelectedData] = useState(null);

  const data = [
    { time: "01h05m", color: "#79B2B7", image: CountdownIcon, weight: "30 Kg", code: "W332120", date: "23-21-2024", detailImage: WetLeavesDetail, text: "Wet Leaves" },
    { time: "01h45m", color: "#79B2B7", image: CountdownIcon, weight: "20 Kg", code: "W261760", date: "24-21-2024", detailImage: WetLeavesDetail, text: "Wet Leaves" },
  ];

  const expired = [
    { time: "Expired", color: "#D45D5D", image: ExpiredWarningIcon, weight: "40 Kg", code: "W643210", date: "25-21-2024", detailImage: WetLeavesDetail, text: "Wet Leaves" },
    { time: "Expired", color: "#D45D5D", image: ExpiredWarningIcon, weight: "40 Kg", code: "W443210", date: "26-21-2024", detailImage: WetLeavesDetail, text: "Wet Leaves" },
  ];

  const handleButtonClick = (item) => {
    setSelectedData(item);
    document.getElementById('AddLeaves').showModal();
  };

  const accordions = [
    {
      summary: 'Awaiting Leaves',
      details: () => (
        <>
          {data.map((item) => (
            <div key={item.code} className='flex justify-between p-1'>
              <WidgetContainer borderRadius="10px" className="w-full flex items-center">
                <button onClick={() => handleButtonClick(item)}>
                  <CircularButton imageUrl={WetLeavesLogo} backgroundColor="#94C3B3" />
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
                  <Countdown time={item.time} color={item.color} image={item.image} />
                </div>
              </WidgetContainer>
            </div>
          ))}
        </>
      ),
      defaultExpanded: true,
    },
    {
      summary: 'Expired Leaves',
      details: () => (
        <>
          {expired.map((item) => (
        <div key={item.code} className='flex justify-between p-1'>
          <WidgetContainer borderRadius="10px" className="w-full flex items-center">
            <button onClick={() => handleButtonClick(item)}>
              <CircularButton imageUrl={WetLeavesLogo} backgroundColor="#94C3B3" />
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
              <Countdown time={item.time} color={item.color} image={item.image} />
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
          code={selectedData.code}
          time={selectedData.time}
          weight={selectedData.weight}
          date={selectedData.date}
          imageSrc={selectedData.detailImage}
          text={selectedData.text}
        />
      )}
      <Drawer includeFourthSection={false} showThirdInput={false} firstText="Date" secondText="Weight" firstImgSrc={DateIcon} secondImgSrc={WeightLogo} />
    </>
  );
}

export default WetLeaves;
