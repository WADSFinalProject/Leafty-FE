// LoadingCircle.js
import React, { useEffect } from 'react';
import './LoadingCircle.css'; // You might need to define styles for the loading circle
import logo from '../assets/LeaftyLogo.svg';
import { animate, motion, useAnimationControls } from "framer-motion";

function LoadingCircle() {

  return (
    <>
      <div className="loading-circle-container">
        <motion.img src={logo} className='loading-circle-container' transition = {{duration: 2.5, type: "spring"}} animate={{ width: "175px", height: "175px" }} initial = {{width: "0px", height: "0px"}}></motion.img>
        <motion.span class="loading loading-spinner" style={{ color: "#0F7275", marginBottom: "-5px"}} transition = {{duration: 2.5, type: "spring"}} animate={{ width: "300px", height: "300px" }} initial = {{width: "0px", height: "0px"}}> </motion.span>
      </div>
    </>
  );
}

export default LoadingCircle;
