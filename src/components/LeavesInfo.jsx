import React from 'react';
import WidgetContainer from '../components/Cards/WidgetContainer';
import WetLeaves from '../assets/WetLeaves.svg';
import DryLeaves from "../assets/DryLeaves.svg";
import Powder from "../assets/Powder.svg";
import PackageSent from "../assets/PackangeSent.svg";
// import Box from "../assets/PackageBox.svg";

const LeavesInfo = ({ leavesData }) => {
  // Filter the data into two arrays, one for Wet Leaves and Dry Leaves, and another for Powder and Package Sent
  const wetDryData = leavesData.filter(data => data.image === 'WetLeaves' || data.image === 'DryLeaves');
  const powderPackageData = leavesData.filter(data => data.image === 'Powder' || data.image === 'PackageSent');

  return (
    <div>
  {/* Display Wet Leaves and Dry Leaves in a single line */}
  <div className='flex flex-wrap items-center justify-between w-full mt-2'>
    {wetDryData.map((data, index) => (
      <div className='flex flex-1 min-w-[200px] ml-5' key={index}>
        <WidgetContainer className="flex items-center w-full p-2" borderRadius="20px">
          {data.image === 'WetLeaves' && <img src={WetLeaves} alt="Wet Leaves" className='h-auto max-w-[50px] sm:max-w-[75px] md:max-w-[100px] lg:max-w-[125px]' />}
          {data.image === 'DryLeaves' && <img src={DryLeaves} alt="Dry Leaves" className='h-auto max-w-[50px] sm:max-w-[75px] md:max-w-[100px] lg:max-w-[125px]' />}
          <div className="flex flex-col justify-center ml-2 w-3/4">
            <p className='m-0 text-sm md:text-base lg:text-lg whitespace-nowrap'>{data.label}</p>
            <p className='m-0 text-sm md:text-base lg:text-lg'>{data.amount} KG</p>
          </div>
        </WidgetContainer>
      </div>
    ))}
  </div>

  {/* Display Powder and Package Sent in a single line */}
  <div className='flex flex-wrap items-center justify-between w-full mt-2 gap-x-2'>
    {powderPackageData.map((data, index) => (
      <div className='flex flex-1 min-w-[200px] ml-5' key={index}>
        <WidgetContainer className="flex items-center w-full p-2" borderRadius="20px">
          {data.image === 'Powder' && <img src={Powder} alt="Powder" className='h-auto max-w-[150px] sm:max-w-[175px] md:max-w-[200px] lg:max-w-[225px]' />}
          {data.image === 'PackageSent' && <img src={PackageSent} alt="Package Sent" className='h-auto max-w-[50px] sm:max-w-[75px] md:max-w-[100px] lg:max-w-[125px]' />}
          <div className="flex flex-col justify-center ml-2 w-3/4">
            <p className='m-0 text-sm md:text-base lg:text-lg whitespace-nowrap'>{data.label}</p>
            <p className='m-0 text-sm md:text-base lg:text-lg'>{data.amount} KG</p>
          </div>
        </WidgetContainer>
      </div>
    ))}
  </div>
</div>

  

  );
}

export default LeavesInfo;
