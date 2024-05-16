import React from 'react'; 
import ExpiredInLogo from '../assets/ExpiredIn.svg';
import WidgetContainer from '../components/Cards/WidgetContainer';

const ExpiredIn = ({ expired }) => {
  return (
    <div className='flex-grow '> {/* Added max-w-[340px] class to limit width */}
      <span className="font-montserrat font-medium text-xs leading-4 ml-2">Expired in</span>
      <WidgetContainer borderRadius="20px" backgroundColor="#FDFDFD" className="flex justify-start ">
            <img src={ExpiredInLogo} alt="ExpiredIn" className='w-5 h-auto mr-1' />
            <span className="font-montserrat font-semibold text-base leading-4 mt-0.5">{expired}</span>
      </WidgetContainer>
    </div>
  );
}

export default ExpiredIn;
