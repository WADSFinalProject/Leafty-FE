// LoadingCircle.js
import React, { useEffect } from 'react';
import logo from '../assets/LeaftyLogo.svg';
import { animate, motion, useAnimationControls } from "framer-motion";

function LoadingStatic() {

  return (
    <>
      <div className="">
        <span class="loading loading-spinner" style={{ color: "#0F7275", marginBottom: "-5px", width: "75px", height: "75px"}}></span>
      </div>
    </>
  );
}

export default LoadingStatic;
