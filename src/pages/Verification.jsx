import { useEffect, useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, useAnimationControls } from "framer-motion";
import '@style/App.css';
import { FaArrowLeft } from "react-icons/fa";

import Illustration from "@assets/Verification.svg";
import Circle from '@components/Circle';
import logo from '@assets/LeaftyLogo.svg';
import OtpInput from 'react-otp-input';
import Button from '@components/Button';
import LoadingCircle from '@components/LoadingCircle';
import Image from '@components/Images';
import axios from 'axios';
import { API_URL } from '../App';
import OtpApi from '../OtpProvider';
import RegApi from '../RegProvider';


function Verification() {
    const [isVerified, setIsVerified] = useState(false);
    const [otp, setOtp] = useState('');
    const Otp = useContext(OtpApi);
    const Reg = useContext(RegApi);
    const [showLoadingCircle, setShowLoadingCircle] = useState(false);

    const controls = useAnimationControls();
    const location = useLocation();
    const navigate = useNavigate();
    const { emailAddress } = location.state || {};
    const { Username } = location.state || {};
    const { PhoneNumber } = location.state || {};
    const { Password } = location.state || {};
    const { ForgotPass = false } = location.state || {};
    const { locationPoint } = location.state || {};

    const [email, setEmail] = useState(emailAddress);
    const [username, setUserName] = useState(Username);
    const [phoneNumber, setPhoneNumber] = useState(PhoneNumber);
    const [password, setPassword] = useState(Password);
    const [isImageVisible, setIsImageVisible] = useState(false);
    const [forgotPass, setForgotPass] = useState(ForgotPass);
    const [address, setAddress] = useState(locationPoint);

    // useEffect(() => {
    //     if (isVerified) {
    //         setTimeout(() => { controls.start("verifiedOTP"); setIsImageVisible(false); }, 1000);
    //         setTimeout(() => setShowLoadingCircle(true), 2000);
    //         setTimeout(() => {
    //             navigate('/company/dashboard', { state: { emailAddress: email } });
    //         }, 10000);
    //     } else {
    //         setTimeout(() => setIsImageVisible(true), 1000);
    //     }
    // }, [isVerified]);

    const generateOTP = async () => {
        try {
            console.log(email);
            const response = await axios.post(API_URL + "/generate_otp", {
                email: email,
            });
            console.log('OTP sent to email:', email);
            console.log(response);
        } catch (error) {
            console.error('Error generating OTP', error);
        }

    };

    useEffect(() => {
        setIsImageVisible(true)
        if (email){
            generateOTP();
        }
    }, []);

    const handleGoBack = () => {
        Reg.setReg(false);
        navigate(-1);
    };

    const createUser = async () => {
        try {
            Reg.setReg(false);
            Otp.setOtp(false);
            console.log(username);
            console.log(email);
            console.log(phoneNumber);
            console.log(password);
            const response = await axios.post(API_URL + "/user/post", {
                Username: username,
                Email: email,
                PhoneNumber: phoneNumber,
                RoleID: 5,
                Password: password,
                location: address,
            });
            console.log(response.data);
        } catch (error) {
            console.error('Error calling backend function', error);
        }
    };

    const handleVerify = async () => {
        try {
            const response = await axios.post(API_URL + "/verify_otp", {
                email: email,
                otp_code: otp
            });

            if (response.data.message === 'OTP verified successfully') {
                if(forgotPass){
                    const response = await axios.get(API_URL + "/user/get_user_email/" + email);
                    navigate("/forgor", {state: { uid: response.data.UserID, username: response.data.Username, email: email, ForgotPass: true}} )
                }else{
                    createUser();
                    navigate('/');
                }
            } else {
                console.error('OTP verification failed');
                alert('Invalid or expired OTP. Please try again.');
            }
        } catch (error) {
            console.error('Error verifying OTP', error);
        }
    };

    const handleResendCode = async () => {
        try {
            const response = await axios.post(`${API_URL}/generate_otp`, {
                email: email
            });

            console.log('OTP resent to email:', email);
        } catch (error) {
            console.error('Error resending OTP', error);
        }
    };
    const getMargin = () => {
        const width = window.innerWidth;
        if (width < 320) {
            return '0.3vw'; // Smaller margin for very small screens
        } else if (width < 600) {
            return '0.5vw'; // Smaller margin for small screens
        } else {
            return '0.55vw'; // Larger margin for bigger screens
        }
    };
    const margin = getMargin();
    const getInputStyle = () => {
        if (window.innerWidth <= 375) {
          return { width: '45px', height: '45px' }; // For Mobile S
        } else if (window.innerWidth <= 480) {
          return { width: '55px', height: '55px' }; // For Mobile M
        }
        return { width: '55px', height: '55px' }; // For larger screens
      };
    return (
        <div className='flex flex-col md:flex-row w-screen h-screen overflow-hidden disable-zoom'>
            <Button id="back" label={<FaArrowLeft />} onClick={handleGoBack} className="ml-5"></Button>
            {/* Login Contents */}
            <div id="contents" className="flex flex-col w-full md:w-1/2 h-screen m-4 md:m-20 mt-16 py-8 gap-4 max-w-md">
                <img className="w-20 h-20" src={logo} alt="Logo" />
                <div className='flex flex-col'>
                    <span className='font-bold text-3xl me-8'>Verify Your Account</span>
                    <span className='text-xl font-medium me-8' style={{ color: "#606060" }}>Enter the code that we have sent to <span style={{ color: "#79B2B7" }}>{email}</span></span>
                </div>
                <OtpInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    renderSeparator={<span style={{ margin: `0 ${margin}` }} />}
                    renderInput={(props) => <input {...props} style={{ ...getInputStyle(), background: "#CAE3DA", borderRadius: "0.5rem", marginInlineEnd: margin }} />}
                    inputStyle={{ /* Keep any additional styles if needed */ }}
                    />

                <div className='flex flex-row justify-end items-center'>
                    <span style={{ color: "#79B2B7", cursor: "pointer" }} onClick={handleResendCode} className="me-8">Resend Code</span>
                </div>

                <Button background="#0F7275" color="#F7FAFC" label="Submit" onClick={handleVerify} className="me-8"></Button>
                <span className='flex justify-center me-8 gap-2'>Verify with Phone Number?<button className={"font-bold"} style={{ color: "#79B2B7" }}>Switch</button></span>
            </div>
            {/* End of Login Contents */}

            {/* Features */}
            <motion.div className='w-1/2 h-screen relative justify-end items-center'
                initial={{
                    left: "0%"
                }}
                transition={{
                    duration: 2.5,
                    type: "spring"
                }}
                variants={{
                    initial: {
                        left: "0%"
                    },
                    verifiedOTP: {
                        left: "-100%"
                    }
                }}
                animate={controls}
            >
                <div className='z-0'>
                    <Circle color="#94C3B3" opacity={"50%"} position={{ left: "0%", bottom: "-45%" }} />
                    <Circle color="#94C3B3" opacity={"50%"} position={{ left: "7.5%", bottom: "-45%" }} />
                    <Circle color="#94C3B3" opacity={"100%"} position={{ left: "15%", bottom: "-45%" }} />
                    {showLoadingCircle && <LoadingCircle />}
                </div>
            </motion.div>
            <Image img={Illustration} isVisible={isImageVisible} />
            {/* End of Features */}
        </div>
    );
}

export default Verification;