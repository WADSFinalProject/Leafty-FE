import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import WidgetContainer from './Cards/WidgetContainer';
import ReadyIcon from "@assets/ReadyIcon.svg";
import ProcessedIcon from "@assets/Status.svg";
import ThrownIcon from "@assets/Thrown.svg";

const PowderStatus = ({ ready, processed, thrown }) => {
  const getStatusTheme = () => {
    if (ready) {
      return { color: "#C0CD30", image: ReadyIcon, text: "Ready"};
    }
    if (processed) {
      return { color: "#D4965D80", image: ProcessedIcon, text: "Processed" };
    }
    if (thrown) {
      return { color: "#9E2B2B80", image: ThrownIcon, text: "Thrown" };
    }
  };

  const { color, image, text } = getStatusTheme();

  return (
    <div className="flex justify-end">
      <WidgetContainer 
        borderRadius="20px" 
        border={false} 
        backgroundColor={color} 
        className="w-28 sm:w-32 md:w-36 max-w-sm"
      >
        <div className="flex justify-center items-center mr-1 gap-2">
          <span className="font-montserrat text-xs font-medium leading-14 tracking-normal text-center truncate flex items-center">
            {text}
          </span>
          <img src={image} alt="PowderStatus" className="w-4 h-4" /> 
        </div>
      </WidgetContainer>
    </div>
  );
};

export default PowderStatus;
