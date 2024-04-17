import { useState } from 'react'
import './App.css'
import Circle from './components/Circle'
import logo from './assets/LeaftyLogo.svg'
import InputField from './components/InputField'
import CheckBox from './components/Checkbox'
import Email from './assets/icons/email.svg'
import Password from './assets/icons/password.svg'
import Google from './assets/icons/google.svg'
import Divider from './components/Divider'
import Button from './components/Button'

function App() {
  const [isRegister, setIsRegister] = useState(false);

  const handleRegister = () =>{

  }

  return (
    <div className='flex w-screen h-screen overflow-hidden disable-zoom'>
      {/* Login Contents */}
      <div className="flex flex-col w-1/2 h-screen m-20 gap-2 max-w-md">
        <img className="w-20 h-20" src={logo} alt="Logo" />
        <div className='flex flex-col'>
          <span className='font-bold text-3xl'>Welcome Back!</span>
          <span className='text-xl font-medium' style={{color: "#606060"}}>It's nice to see you again! Sign in to continue to Leafty</span>
        </div>
        <InputField icon={Email} label={"Email Address"} placeholder={"example@gmail.com"} />
        <InputField icon={Password} label={"Password"} placeholder={"***********"} />
        <div className='flex flex-row justify-between items-center'>
          <CheckBox label={"Remember Me"} />
          <span style={{color: "#79B2B7"}}>Forget Password?</span>
        </div>
        <Button background="#0F7275" color="#F7FAFC" label="Sign in"></Button>
        <Divider />
        <Button background="#F7FAFC" color="#4C4949" label="Sign in with Google" img={Google}></Button>
        <span className='flex justify-center gap-2'>Don't have an account?<button onClick = {() => setIsRegister(!isRegister)}className = {"font-bold"} style={{color: "#79B2B7"}}>Sign Up</button></span>
      </div>
      {/* End of Login Contents */}

      {/* Register Contents */}

      {/* End of Register Contents */}
      {/* Features */}
      <div className='w-1/2 h-screen relative justify-end items-center'>
        {/* TODO: Image Carousel */}
        <div className='z-0'>
        <Circle color="#94C3B3" opacity={"50%"} position={{ left: "100%", bottom: "-45%" }} />
        <Circle color="#94C3B3" opacity={"50%"} position={{ left: "107.5%", bottom: "-45%" }} />
        <Circle color="#94C3B3" opacity={"100%"} position={{ left: "115%", bottom: "-45%" }} />
        </div>
      </div>
      {/* End of Features */}
    </div>
  );
}

export default App
