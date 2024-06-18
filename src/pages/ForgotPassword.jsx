import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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

function ForgotPassword( ) {
  const Location = useLocation();

  const [isLogin, setIsLogin] = useState(false);

  const [isSubmit, setIsSubmit] = useState(false);

  const [isRegister, setIsRegister] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const controls = useAnimationControls();
  const navigate = useNavigate();
  const [showCarousel, setShowCarousel] = useState(false);
  const { uid } = Location.state || {};
  const [ user_id, setUserId] = useState(uid);

  const { username } = Location.state || {};
  const [ Username, setUsername] = useState(username);

  const { email } = Location.state || {};
  const [ Email, setEmail] = useState(email);

  useEffect(() => {
    controls.start("login");
  }, []);


  const handleForgotpass = async () => {
    try {
      const saltRounds = 10;
      bcrypt.hash(password, saltRounds, async (err, hashedPassword) => {
          if (err) {
              console.error('Error encrypting password:', err);
          } else {
            const response = await axios.put(API_URL + "/user/put/" + user_id, {
              Password: hashedPassword,
              Username: Username,
              Email: Email
            });
            if (response) {
              console.log(response.data);
              navigate("/");
            }
          }
      });
      } catch (error) {
      console.error('Error calling backend function for session', error);
      return false
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmit(!isSubmit);
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowCarousel(true);
    }, 500);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className='flex w-screen h-screen md:overflow-hidden disable-zoom'>
      {/* Login Contents */}
      <div id="contents" className="flex flex-col w-screen h-screen mx-8 my-20 gap-2 lg:max-w-md lg:mx-20 lg:w-1/2">
        <img className="w-20 h-20" src={logo} alt="Logo" />
        <div className='flex flex-col'>
          <span className='font-bold text-3xl'>{"Reset Your Password"}</span>
        </div>
        <form className='flex flex-col gap-1' onSubmit={handleSubmit}>
          <InputField type={"password"} icon={Password} label={"Password"} placeholder={"***********"} onChange={(e) => { setPassword(e.target.value) }} value={password} />
          <InputField type={"password"} icon={Password} label={"Confirm Password"} placeholder={"***********"} onChange={(e) => { setConfirmPassword(e.target.value) }} value={confirmPassword} />
          <br></br>
          <Button type={"submit"} background="#0F7275" color="#F7FAFC" label={isRegister ? (isSignUp ? <span className='loading loading-dots loading-sm'></span> : "Sign Up") : (isLogin ? <span className='loading loading-dots loading-sm'></span> : "Submit")} onClick={handleForgotpass}></Button>
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

export default ForgotPassword;
