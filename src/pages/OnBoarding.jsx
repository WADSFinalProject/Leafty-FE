import React, { useEffect, useState, useContext, useRef } from 'react';
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
import LoadingCircle from "@components/LoadingCircle"
import { Slides } from '../components/Slides.js';
import axios from 'axios';
import * as bcrypt from 'bcryptjs';
import { API_URL } from '../App';
import AuthApi from '../AuthApi.js';
import RegApi from '../RegProvider.js';
import Popup from '../components/Popups/Popup.jsx';

function OnBoarding() {

  const Reg = useContext(RegApi);
  const Auth = useContext(AuthApi);
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  const [isRegister, setIsRegister] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const controls = useAnimationControls();
  const navigate = useNavigate();
  const [showCarousel, setShowCarousel] = useState(false);

  console.log(Reg.reg);
  useEffect(() => {
    controls.start("login");
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowCarousel(true);
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  async function handleRouting() {

    const response = await axios.get(API_URL + "/user/get_user_email/" + email);
    const user_id = response.data.UserID;
    try {
      const response = await axios.post(API_URL + "/create_session/" + user_id, {
      });
      console.log("session created")
    } catch (error) {
      console.error('Error calling backend function for session', error);
    }
    Auth.setAuth(true);
  }

  const handleLogin = async () => {
    setIsLogin(!isLogin);
    try {
      const response = await axios.get(API_URL + "/user/get_user_email/" + email);
      bcrypt.compare(password, response.data.Password, function (err, result) {
        if (err) {
          console.error('Error encrypting password:', err);
        }
        if (result) {
          handleRouting();
        }
        else {
          console.log("wrong password");
          setIsLogin(false)
          modalRef.current.showModal();
        }
      })
    } catch (error) {
      console.error("Error while checking session:", error);
      setIsLogin(false)
      modalRef.current.showModal();
      return false
    }
  };

  const handleNavigation = async () => {
    await new Promise(resolve => setTimeout(resolve, 0));
    navigate('/register', { state: { emailAddress: email, userPassword: password } });
  };

  const handleSignUp = async () => {
    setIsSignUp(!isSignUp);
    Reg.setReg(true);
    setLoading(true);

    setTimeout(() => {
      handleNavigation();
    }, 1500);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  const handleForgotpassword = () => {
    navigate("/email-forgor");
  }

  if (loading) {
    return <LoadingCircle />;
  }

  const modalRef = useRef(null);

  return (
    <div className='flex w-screen h-screen md:overflow-hidden disable-zoom'>
      {/* Login Contents */}
      <div id="contents" className="flex flex-col w-screen h-screen mx-8 my-20 gap-2 lg:max-w-md lg:mx-20 lg:w-1/2">
        <img className="w-20 h-20" src={logo} alt="Logo" />
        <div className='flex flex-col'>
          <span className='font-bold text-3xl'>{isRegister ? "Join Us" : "Welcome Back!"}</span>
          <span className='text-xl font-medium' style={{ color: "#606060" }}>
            {isRegister ? "Register your account today to join the Leafty community" : "It's nice to see you again! Sign in to continue to Leafty"}
          </span>
        </div>
        <form className='flex flex-col gap-1' onSubmit={handleSubmit}>
          <InputField type={"email"} icon={Email} label={"Email Address"} placeholder={"example@gmail.com"} onChange={(e) => { setEmail(e.target.value) }} value={email} />
          <InputField type={"password"} icon={Password} label={"Password"} placeholder={"***********"} onChange={(e) => { setPassword(e.target.value) }} value={password} />
          <div className='flex flex-row justify-between items-center'>
            <CheckBox label={"Remember Me"} />
            <span className='' style={{ color: "#79B2B7", cursor: "pointer" }} onClick={handleForgotpassword}>Forgot Password?</span>
          </div>
          <Button type={"submit"} background="#0F7275" color="#F7FAFC" label={isRegister ? (isSignUp ? <span className='loading loading-dots loading-sm'></span> : "Sign Up") : (isLogin ? <span className='loading loading-dots loading-sm'></span> : "Sign In")} onClick={isRegister ? handleSignUp : handleLogin}></Button>
        </form>
        <Divider label={"OR"} />
        <Button border={"2px solid #0F7275"} background="#F7FAFC" color="#4C4949" label={isRegister ? "Sign up with Google" : "Sign in with Google"} img={Google}></Button>
        <span className='flex justify-center gap-2'>Don't have an account?<button onClick={() => setIsRegister(!isRegister)} className={"font-bold"} style={{ color: "#79B2B7" }}>{isRegister ? "Sign In" : "Sign Up"}</button></span>
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
      <Popup ref={modalRef} error description={"Invalid Credentials, please try again."} onConfirm={() => modalRef.current.close()} />
    </div>
  );
}

export default OnBoarding;
