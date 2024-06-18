import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { animate, motion, useAnimationControls } from "framer-motion";
import '@style/App.css';
import Circle from '@components/Circle';
import logo from '@assets/LeaftyLogo.svg';
import InputField from '@components/InputField';
import CheckBox from '@components/Checkbox';
import Email from '@assets/icons/email.svg';
import Password from '@assets/icons/password.svg';
import Google from '@assets/icons/google.svg';
import Divider from '@components/Divider';
import Button from '@components/Button';
import CarouselImage from "@components/CarouselImage.jsx";
import { Slides } from '../components/Slides.js';
import axios from 'axios';
import * as bcrypt from 'bcryptjs';
import { API_URL } from '../App';
import AuthApi from '../AuthApi.js';
import OtpApi from '../OtpProvider.js';

function ForgotPasswordEmail( ) {
  const Otp = useContext(OtpApi);
  const Auth = React.useContext(AuthApi);
  const [isLogin, setIsLogin] = useState(false);

  const [isSubmit, setIsSubmit] = useState(false);

  const [isRegister, setIsRegister] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const controls = useAnimationControls();
  const navigate = useNavigate();
  const [showCarousel, setShowCarousel] = useState(false);


  useEffect(() => {
    controls.start("login");
  }, []);

  async function handleForgotpassEmail() {
    
    try {
      Otp.setOtp(true);
      const response = await axios.get(API_URL + "/user/get_user_email/" + email);
      if (response) {
        navigate("/verify", {state: { emailAddress: email, ForgotPass: true}} )
      }
      } catch (error) {
      console.error('Error calling backend function for session', error);
      return false
    }
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmit(!isSubmit);
  }

  useEffect(() => {
    // Set a timeout to show the carousel after 2 seconds
    const timeout = setTimeout(() => {
      setShowCarousel(true);
    }, 500);
    // Clear the timeout to avoid memory leaks
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className='flex w-screen h-screen md:overflow-hidden disable-zoom'>
      {/* Login Contents */}
      <div id="contents" className="flex flex-col w-screen h-screen mx-8 my-20 gap-2 lg:max-w-md lg:mx-20 lg:w-1/2">
        <img className="w-20 h-20" src={logo} alt="Logo" />
        <div className='flex flex-col'>
          <span className='font-bold text-3xl'>{"Enter Your Email"}</span>
        </div>
        <form className='flex flex-col gap-1' onSubmit={handleSubmit}>
          <InputField type={"email"} icon={Email} label={"Email Address"} placeholder={"example@gmail.com"} onChange={(e) => { setEmail(e.target.value) }} value={email} />
          <br></br>
          <Button type={"submit"} background="#0F7275" color="#F7FAFC" label={isRegister ? (isSignUp ? <span className='loading loading-dots loading-sm'></span> : "Sign Up") : (isLogin ? <span className='loading loading-dots loading-sm'></span> : "Submit")} onClick={handleForgotpassEmail}></Button>
        </form>
      </div>
      {/* End of Login Contents */}
      {/* Features */}
      <motion.div className='w-1/2 h-screen relative justify-end items-center hidden md:block'
        initial={{
          left: "75%"
        }}
        transition={{
          duration: 2,
          type: "spring"
        }}
        variants={{
          initial: {
            left: "75%"
          },
          login: {
            left: "0%"
          },
          alreadyLogin: {
            left: "-100%"
          }
        }}
        animate={controls}
      >
        <Circle color="#94C3B3" opacity={"50%"} position={{ left: "0%", bottom: "-45%" }} />
        <Circle color="#94C3B3" opacity={"50%"} position={{ left: "7.5%", bottom: "-45%" }} />
        <Circle color="#94C3B3" opacity={"100%"} position={{ left: "15%", bottom: "-45%" }} />

      </motion.div>
      {showCarousel && (
        <CarouselImage initial={{ opacity: 0, y: "100%" }}
          animate={{ opacity: 1, y: "0%" }}
          transition={{
            duration: 1.25,
            type: "spring"
          }} images={Slides} />
      )}

      {/* End of Features */}
    </div>
  );
}

export default ForgotPasswordEmail;
