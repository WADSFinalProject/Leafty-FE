import React, { useEffect, useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, useAnimationControls } from "framer-motion";
import '@style/App.css';
import { FaArrowLeft, FaMapMarkerAlt } from "react-icons/fa";
import Illustration from '@assets/Register.svg';
import Circle from '@components/Circle';
import logo from '@assets/LeaftyLogo.svg';
import profile from '@assets/icons/profile.svg';
import phone from '@assets/icons/phone.svg';
import location from '@assets/icons/location.svg';
import OtpInput from 'react-otp-input';
import Button from '@components/Button';
import LoadingCircle from '@components/LoadingCircle';
import VerificationImage from '@components/Images';
import InputField from '@components/InputField';
import MyMapComponent from '@components/MyMapComponents';
import axios from 'axios';
import * as bcrypt from 'bcryptjs';
import { API_URL } from '../App';
import OtpApi from '../OtpProvider';
import RegApi from '../RegProvider';

axios.defaults.withCredentials = true

function Register() {
    const Reg = useContext(RegApi);
    const Otp = useContext(OtpApi);
    const controls = useAnimationControls();
    const navigate = useNavigate();
    const Location = useLocation();
    const [loading, setLoading] = useState(false);

    const [isVerified, setIsVerified] = useState(false);
    const [isImageVisible, setIsImageVisible] = useState(false);
    const [showLoadingCircle, setShowLoadingCircle] = useState(false);
    const [showMap, setShowMap] = useState(false);

    const { emailAddress } = Location.state || {};
    const { userPassword } = Location.state || {};

    const [currentUserId, setCurrentUserId] = useState("");
    const [email, setEmail] = useState(emailAddress);
 
    const [password, setPassword] = useState(userPassword);
    const [username, setUsername] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [addressDetails, setAddressDetails] = useState("");
    const [isRegistering, setIsRegistering] = useState(false);
    const [registerInformation, setRegisterInformation] = useState({
        email: "",
        username: "",
        phoneNumber: "",
        addressDetails: ""
    });


    useEffect(() => {
        if (userPassword) {
            setPassword(userPassword);
            const saltRounds = 10;
            bcrypt.hash(userPassword, saltRounds, (err, hashedPassword) => {
                if (err) {
                    console.error('Error encrypting password:', err);
                } else {
                    setPassword(hashedPassword);
                }
            });
        }
    }, [userPassword]);


    async function handleWhoAmI() {
        try {
            const response = await axios.get(API_URL + "/whoami")
            console.log("who am i (UUID) : ", response.data.user_id)
            if (response) {
                return response.data.user_id
            }
        } catch (error) {
            console.error("Error while checking session:", error);
            console.error(err.response.data);    // ***
            console.error(err.response.status);  // ***
            console.error(err.response.headers);
            return false

        }
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsImageVisible(true);
        }, 250);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const [value, setValue] = useState('')

    useEffect(() => {
        setValue(localStorage.getItem('email'))
    })

    // const handleRegister = async () => {
    //     createUser()
        
    //     .then(res => navigate("/"))
    //     .catch((err) => alert(err.message));
    // };

    const createUser = async () => {
        try {
            const response = await axios.post(API_URL + "/user/post", {
                Username: username,
                Email: email,
                PhoneNumber: phoneNumber,
                RoleID: 5,
                Password: password,
            });
            console.log(response.data);
        } catch (error) {
            console.error('Error calling backend function', error);
        }

    };

    const handleRegister = async () => {
        Otp.setOtp(true);
        setLoading(true);

        const handleNavigation = async () => {
            await new Promise(resolve => setTimeout(resolve, 0));
            navigate('/verify', { state: { Username: username, emailAddress: email, PhoneNumber: phoneNumber, Password: password, ForgotPass: false, locationPoint: addressDetails} });
        };

        setTimeout(() => {
            handleNavigation();
        }, 1500);
      };

    const handleGoBack = (e) => {
        Reg.setReg(false);
        e.preventDefault();
        navigate(-1);
    }

    const handleOpenMap = () => {
        document.getElementById('my_modal_2').showModal()
        setShowMap(true);
    }

    const handleCloseMap = () => {
        setShowMap(false);
    }

    if (loading) {
        return <LoadingCircle />;
      }

    return (
        <div className='flex w-screen h-screen overflow-hidden disable-zoom'>
            <Button id="back" icon={<FaArrowLeft />} onClick={handleGoBack}></Button>
            {/* <button type="button" onClick={callBackendFunction}>lol</button> */}
            <div id="contents" className="flex flex-col w-screen h-screen mx-20 gap-4 my-20 md:max-w-md">
                <img className="w-20 h-20" src={logo} alt="Logo" />
                <div className='flex flex-col'>
                    <span className='font-bold text-3xl'>Account Details</span>
                    <span className='text-xl font-medium' style={{ color: "#606060" }}>You are one step away from joining Leafty! Let's set some things up!</span>
                </div>
                <form className='flex flex-col gap-2 ' onSubmit={handleSubmit}>
                    <InputField type={"text"} icon={profile} label={"Username"} placeholder={"@example"} onChange={(e) => {
                        setUsername(e.target.value);
                        setRegisterInformation({
                            ...registerInformation,
                            username: e.target.value
                        })
                    }}
                        value={username} />

                    <InputField type={"text"} icon={phone} label={"Phone Number"} placeholder={"+62 8xx xxxx xxxx"} onChange={(e) => {
                        setPhoneNumber(e.target.value);
                        setRegisterInformation({
                            ...registerInformation,
                            phoneNumber: value,
                        });
                    }}
                        value={phoneNumber} />

                    <div className="relative">
                        <InputField type={"text"} icon={location} label={"Address Details"} placeholder={"Jl. Jenderal Sudirman"} onChange={(e) => { setAddressDetails(e.target.value) }} value={addressDetails} />
                        <button type="button" className="absolute top-0 right-0" onClick={handleOpenMap}>
                            <FaMapMarkerAlt size={24} color="#606060" />
                        </button>
                    </div>
                    <div className='my-8 flex flex-col'>
                        <Button type={"submit"} background="#0F7275" color="#F7FAFC" label={isVerified ? <span className='loading loading-dots loading-sm'></span> : "Submit"} onClick={handleRegister}></Button>
                    </div>
                </form>
            </div>
            <motion.div className='w-1/2 h-screen relative justify-end items-center hidden md:block'
                initial={{ left: "0%" }}
                transition={{ duration: 2.5, type: "spring" }}
                variants={{ initial: { left: "0%" }, verifiedOTP: { left: "-100%" } }}
                animate={controls}
            >
                <div className='z-0'>
                    <Circle color="#94C3B3" opacity={"50%"} position={{ left: "0%", bottom: "-45%" }} />
                    <Circle color="#94C3B3" opacity={"50%"} position={{ left: "7.5%", bottom: "-45%" }} />
                    <Circle color="#94C3B3" opacity={"100%"} position={{ left: "15%", bottom: "-45%" }} />
                    <VerificationImage img={Illustration} isVisible={isImageVisible} />
                    {showLoadingCircle && <LoadingCircle />}
                </div>
            </motion.div>
            {/* <button className="btn" onClick={() => document.getElementById('my_modal_2').showModal()}>open modal</button> */}
            <dialog id="my_modal_2" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Select your Location</h3>
                    <MyMapComponent setShowMap={setShowMap} setAddressDetails={setAddressDetails} />
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
            {/* <div className={`fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center ${showMap ? '' : 'hidden'}`}>
                <div className="bg-white p-4 rounded-lg">
                    <MyMapComponent setShowMap={setShowMap} setAddressDetails={setAddressDetails} />
                </div>
            </div> */}
        </div>
    );
}

export default Register;