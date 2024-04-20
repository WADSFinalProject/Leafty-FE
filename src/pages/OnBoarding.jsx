import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { animate, motion, useAnimationControls } from "framer-motion";
import '../App.css';
import Circle from '../components/Circle';
import logo from '../assets/LeaftyLogo.svg';
import InputField from '../components/InputField';
import CheckBox from '../components/Checkbox';
import Email from '../assets/icons/email.svg';
import Password from '../assets/icons/password.svg';
import Google from '../assets/icons/google.svg';
import Divider from '../components/Divider';
import Button from '../components/Button';
import LoadingCircle from '../components/LoadingCircle';

function OnBoarding() {
  const [isLogin, setIsLogin] = useState(false);
  
  const [isSubmit, setIsSubmit] = useState(false);

  const [isRegister, setIsRegister] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const controls = useAnimationControls();
  const navigate = useNavigate();

  useEffect(() => {
    controls.start("login");
    if (isSubmit) {
      if (isLogin) {
        console.log(email)
        const timeout = setTimeout(() => {
          navigate('/verify', { state: { emailAddress: email } });
        }, 3000);

        // Clean up the timeout to avoid memory leaks
        return () => clearTimeout(timeout);
      }
      if (isSignUp) {
        const timeout = setTimeout(() => {
          navigate('/register', { state: { emailAddress: email } });
        }, 3000);

        // Clean up the timeout to avoid memory leaks
        return () => clearTimeout(timeout);
      }
    }
  }, [isSubmit, isLogin, isSignUp]);

  const handleLogin = () => {
    setIsLogin(!isLogin);
  };

  const handleSignUp = () => {
    setIsSignUp(!isSignUp);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmit(!isSubmit);
  }


  return (
    <div className='flex w-screen h-screen md:overflow-hidden disable-zoom'>
      {/* Login Contents */}
      <div id="contents" className="flex flex-col w-1/2 h-screen mx-20 my-20 gap-2 max-w-md">
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
          </div>
          <Button type={"submit"} background="#0F7275" color="#F7FAFC" label={isRegister ? (isSignUp ? <span className='loading loading-dots loading-sm'></span> : "Sign Up") : (isLogin ? <span className='loading loading-dots loading-sm'></span> : "Sign In")} onClick={isRegister ? handleSignUp : handleLogin}></Button>
        </form>
        <Divider label={"OR"} />
        <Button border = {"2px solid #0F7275"} background="#F7FAFC" color="#4C4949" label={isRegister ? "Sign up with Google" : "Sign in with Google"} img={Google}></Button>
        <span className='flex justify-center gap-2'>Don't have an account?<button onClick={() => setIsRegister(!isRegister)} className={"font-bold"} style={{ color: "#79B2B7" }}>Sign Up</button></span>
      </div>
      {/* End of Login Contents */}
      {/* Features */}
      <motion.div className='w-1/2 h-screen relative justify-end items-center'
        initial={{
          left: "75%"
        }}
        transition={{
          duration: 2.5,
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
        {/* TODO: Image Carousel */}
        <div className='z-0'>
          <Circle color="#94C3B3" opacity={"50%"} position={{ left: "0%", bottom: "-45%" }} />
          <Circle color="#94C3B3" opacity={"50%"} position={{ left: "7.5%", bottom: "-45%" }} />
          <Circle color="#94C3B3" opacity={"100%"} position={{ left: "15%", bottom: "-45%" }} />
        </div>
      </motion.div>
      {/* End of Features */}
    </div>
  );
}

export default OnBoarding;
