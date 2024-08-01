import React from 'react';
import WidgetContainer from '@components/Cards/WidgetContainer';
import CustomCircleButton from '@components/CustomCircleButton';

const Read = ({ items }) => {
  return (
    <div className='flex flex-col gap-4'>
      {items.map((item, index) => (
        <WidgetContainer
          key={index}
          backgroundColor='#79B2B733'
          border={false}
          borderRadius='20px'
          className='p-1 gap-1'
        >
          <div className='flex justify-around p-1'>
            <CustomCircleButton
              imageUrl={item.buttonImage}
              backgroundColor={item.buttonColor}
            />
            <p className='flex items-center ml-3 text-xs sm:text-sm md:text-base lg:text-lg'>
              {item.text}
            </p>
            {/* <div className='flex items-start'>
              <img src={item.optionsImage} alt='Options' />
            </div> */}
          </div>
        </WidgetContainer>
      ))}
    </div>
  );
};

export default Read;
