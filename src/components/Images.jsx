import { useState, useEffect } from 'react';
import VerifImg from '../assets/Verification.svg'
import '../style/Images.css'
import { animate, motion, useAnimationControls } from "framer-motion";

function VerificationImage({img, isVisible}) {
    return <>   
        <motion.img
            initial={{ opacity: 0, x: "-50%", y: "0%" }}
            animate={isVisible ? { opacity: 1, x: "-50%", y: "-50%" } : {opacity: 0, x: "-50%", y: "0%"}}
            transition={{
                duration: 1,
                type: "spring"
              }}
            src={img}
            className="image-container hidden xl:block"
        />
    </>
}

export default VerificationImage;