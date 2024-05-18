import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, useAnimationControls } from "framer-motion";
import '../style/App.css';
import { FaArrowLeft, FaMapMarkerAlt } from "react-icons/fa";
import Illustration from '../assets/Register.svg';
import Circle from '../components/Circle';
import logo from '../assets/LeaftyLogo.svg';
import profile from '../assets/icons/profile.svg';
import phone from '../assets/icons/phone.svg';
import location from '../assets/icons/location.svg';
import OtpInput from 'react-otp-input';
import Button from '../components/Button';
import LoadingCircle from '../components/LoadingCircle';
import VerificationImage from '../components/Images';
import InputField from '../components/InputField';
import MyMapComponent from '../components/MyMapComponents'; 
import {db, auth, useAuth} from '../firebase';
import axios from 'axios';
import {
    signInWithEmailAndPassword,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithPopup
  } from "firebase/auth";
import {collection, addDoc, Timestamp, query, onSnapshot, QuerySnapshot, updateDoc, doc, deleteDoc, setDoc, getDoc} from 'firebase/firestore';
import { API_URL } from '../App';

axios.defaults.withCredentials = true

function Register() {
    const controls = useAnimationControls();
    const navigate = useNavigate();
    const Location = useLocation();

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


    
    
    const createUser = async () => {
        try {
            const response = await axios.post(API_URL+"/users", {
                Username: username,
                Email: email,
                PhoneNumber: phoneNumber,
                RoleID: 2,
                Password: password,
            });
            console.log(response.data);
            const user_id = response.data.UserID;
            try {
                console.log(user_id);
                const response = await axios.post(API_URL+"/create_session/"+ user_id, {
                });
            } catch (error) {
                console.error('Error calling backend function', error);
            }
        } catch (error) {
            console.error('Error calling backend function', error);
        }

    };

    

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsImageVisible(true);
        }, 250);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const [value,setValue] = useState('')
    const handleClick =()=>{
        signInWithPopup(auth,provider).then((data)=>{
            setValue(data.user.email)
            localStorage.setItem("email",data.user.email)
        })
    }

    useEffect(()=>{
        setValue(localStorage.getItem('email'))
    })

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
        if (user) {
            navigate("/dashboard");
        }
        });
    }, []);


    const handleRegister = async () => {
        createUser();
        createUserWithEmailAndPassword(
          auth,
          email,
          password
        )
        
        const unsubscribeAuth = auth.onAuthStateChanged(async (user) => {
    
    
        });
        
          return () => unsubscribeAuth()
          .then(() => {
            navigate("/dashboard");
          })
          .catch((err) => alert(err.message));
      };

    const handleGoBack = (e) => {
        e.preventDefault();
        navigate(-1);
    }

    const handleOpenMap = () => {
        setShowMap(true);
    }

    const handleCloseMap = () => {
        setShowMap(false);
    }

    return (
        <div className='flex w-screen h-screen overflow-hidden disable-zoom'>
            <Button id="back" icon={<FaArrowLeft />} onClick={handleGoBack}></Button>
            {/* <button type="button" onClick={callBackendFunction}>lol</button> */}
            <div id="contents" className="flex flex-col w-screen h-screen mx-20 gap-4 max-w-md my-20">
                <img className="w-20 h-20" src={logo} alt="Logo" />
                <div className='flex flex-col'>
                    <span className='font-bold text-3xl'>Account Details</span>
                    <span className='text-xl font-medium' style={{ color: "#606060" }}>You are one step away from joining Leafty! Let's set some things up!</span>
                </div>
                <form className='flex flex-col gap-2' onSubmit={handleSubmit}>
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
            <motion.div className='w-1/2 h-screen relative justify-end items-center'
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
            <div className={`fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center ${showMap ? '' : 'hidden'}`}>
                <div className="bg-white p-4 rounded-lg">
                    <MyMapComponent setShowMap={setShowMap} setAddressDetails={setAddressDetails} />
                </div>
            </div>
        </div>
    );
}

export default Register;