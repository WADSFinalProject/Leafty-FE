import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import WidgetContainer from './Cards/WidgetContainer';
import PackingIcon from "@assets/Countdown.svg";
import DeliveredIcon from "@assets/Delivered.svg";
import VerifyIcon from "@assets/ReadyIcon.svg";
import RescallingIcon from "@assets/rescallingicon.svg";
import ArrivedIcon from "@assets/Arrived.svg";

const ShipmentStatus = ({ packing, delivered, verified, rescalling, arrived }) => {
  const getStatusTheme = () => {
    if (packing) {
      return { color: "#79B2B7", image: PackingIcon, text: "Packing" };
    }
    if (delivered) {
      return { color: "#79B2B7", image: DeliveredIcon, text: "Delivered" };
    }
    if (verified) {
      return { color: "#C0CD30", image: VerifyIcon, text: "Verified" };
    }
    if (rescalling) {
      return { color: "#E28834", image: RescallingIcon, text: "Rescalling" };
    }
    if (arrived) {
      return { color: "#DEE295", image: ArrivedIcon, text: "Arrived" };
    }
    return { color: "#FFFFFF", image: null, text: "Unknown" }; // Default case
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
          <img src={image} alt="ShipmentStatus" className="w-4 h-4" /> 
        </div>
      </WidgetContainer>
    </div>
  );
};

export default ShipmentStatus;
