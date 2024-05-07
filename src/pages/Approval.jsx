import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useAnimationControls } from "framer-motion";
import '../style/App.css';
import { FaArrowLeft } from "react-icons/fa";

import Circle from '../components/Circle'; // Import Circle directly
import logo from '../assets/LeaftyLogo.svg';
import Button from '../components/Button';
import Image from '../components/Images';
import Illustration from "../assets/Approval.svg";
import UnapprovedIllustration from "../assets/Unapproved.svg"; // Import the new illustration/svg

function Approval() {
  const [isApproved, setIsApproved] = useState(false);
  const [showLoadingCircle, setShowLoadingCircle] = useState(false);
  const [showUnapprovedIllustration, setShowUnapprovedIllustration] = useState(false); // State to toggle the unapproved illustration

  const controls = useAnimationControls();
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleApprove = () => {
    setIsApproved(true);
  };

  const handleLogout = () => {
    // Update state to show the unapproved illuAstration and loading circle
    setShowUnapprovedIllustration(true);
  };

  return (
    <div className='flex w-screen h-screen overflow-hidden disable-zoom'>
      <Button id="back" label={<FaArrowLeft />} onClick={handleGoBack}></Button>

      <div id="contents" className="flex flex-col w-1/2 h-screen m-20 gap-4 max-w-md" style={{ marginTop: '80px' }}>
        <img className="w-20 h-20" src={logo} alt="Logo" />
        <div className='flex flex-col'>
          <span className='font-bold text-3xl'>
            {isApproved ? "Unsuccessful Approval" : "Waiting for Approval"}
          </span>
          <span className='text-xl font-medium' style={{ color: "#606060" }}>
            {isApproved
              ? "Unfortunately, this account has been disapproved by the company and will be deleted within 24 hours."
              : "You can leave this page while waiting for the company to approve you"
            }
          </span>
        </div>
        <Button
          background="#0F7275"
          color="#F7FAFC"
          label="Logout"
          onClick={handleLogout} // Attach handleLogout function
        ></Button>
      </div>

      <motion.div className='w-1/2 h-screen relative justify-end items-center'
        initial={{ left: "0%" }}
        transition={{ duration: 2.5, type: "spring" }}
        variants={{ initial: { left: "0%" } }}
        animate={controls}
      >
        <div className='z-0'>
          <Circle color="#94C3B3" opacity={"50%"} position={{ left: "0%", bottom: "-45%" }} />
          <Circle color="#94C3B3" opacity={"50%"} position={{ left: "7.5%", bottom: "-45%" }} />
          <Circle color="#94C3B3" opacity={"100%"} position={{ left: "15%", bottom: "-45%" }} />
        </div>
      </motion.div>
      
      <Image img={showUnapprovedIllustration ? UnapprovedIllustration : Illustration} isVisible={true} /> {/* Use ternary operator to conditionally render the illustration */}

    </div>
  );
}

export default Approval;
