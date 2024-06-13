import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Profilepic from '../../assets/Profilepic.svg';
import ReturnWhite from '../../components/ReturnWhite';
import UserSetLogo from "../../assets/UserSetting.svg";
import Background from "../../assets/UserSettingBackground.svg";
import WidgetContainer from '../../components/Cards/WidgetContainer';
import Line from "../../assets/Line.svg";
import FullNameIcon from "../../assets/FullnameIcon.svg";
import EmailLogo from "../../assets/EmailLogo.svg";
import PhoneNumberLogo from "../../assets/PhoneNumberLogo.svg";
import AddressLogo from "../../assets/AddressLogo.svg";
import AccountInfoLine from "../../assets/AccountInfoLine.svg";

function UserSetting() {
    const [activeTab, setActiveTab] = useState('account');
    const [inputValues, setInputValues] = useState({
        fullName: "John Doe",
        email: "example@gmail.com",
        phoneNumber: "+62 8xxx xxxx xxxx",
        address: "Jakarta, Indonesia"
    });

    const handleChange = (field, value) => {
        setInputValues(prevValues => ({
            ...prevValues,
            [field]: value
        }));
    };
    const navigate = useNavigate();
    const location = useLocation();
    const { from } = location.state || { from: "/" };

    const data = [
        {
            icon: FullNameIcon,
            paragraphs: ["Full Name", inputValues.fullName],
            field: "fullName"
        },
        {
            icon: EmailLogo,
            paragraphs: ["Email", inputValues.email],
            field: "email"
        },
        {
            icon: PhoneNumberLogo,
            paragraphs: ["Phone Number", inputValues.phoneNumber],
            field: "phoneNumber"
        },
        {
            icon: AddressLogo,
            paragraphs: ["Address", inputValues.address],
            field: "address"
        }
    ];

    return (
        <div className="w-screen h-screen flex flex-col items-center justify-center pb-8 overflow-y-auto no-scrollbar overflow-x-hidden">
            <div className="bg-[#F9F9F9] max-w-screen-md w-full h-full flex flex-col overflow-hidden relative">
                <div className="w-full h-40 relative bg-cover bg-center" style={{ backgroundImage: `url(${Background})` }}>
                    <div className="flex justify-between items-start p-4 h-full mt-12">
                        <ReturnWhite destination={from} className="mr-2 text-sm" />
                        <span className="font-bold text-2xl text-gray-100 ml-2">User Settings</span>
                        <img src={UserSetLogo} alt="Notification" className="w-8 h-8 ml-2" />
                    </div>
                </div>

                <WidgetContainer borderRadius="25px" border={false} className="relative flex items-center flex-col h-full mt-4">
                    <div className='mt-8 p-2'>
                        <div className='flex flex-col items-center mb-2 p-2'>
                            <p>John Doe</p>
                            <p className="text-gray-600">Company XYZ</p>
                        </div>
                        <div className='flex gap-4 p-2'>
                            <div className='flex flex-col items-center mb-2'>
                                <p className="text-green-600 whitespace-normal">150 KG</p>
                                <p className="whitespace-normal text-sm">Total Production</p>
                            </div>
                            <img src={Line} alt="Notification" className="w-auto h-8" />
                            <div className='flex flex-col items-center mb-2'>
                                <p className="whitespace-normal rounded-lg" style={{ color: '#D2D681' }}>23</p>
                                <p className="whitespace-normal text-sm">Unscaled Pickup</p>
                            </div>
                        </div>

                        <div className="flex gap-2 p-2 bg-[#EFEFEF] rounded-2xl">
                            <button
                                className={`w-full p-2 rounded-2xl ${activeTab === 'account' ? 'bg-[#0F7275] text-white' : 'bg-transparent text-black'}`}
                                onClick={() => setActiveTab('account')}
                            >
                                Account
                            </button>
                            <button
                                className={`w-full p-2 rounded-2xl ${activeTab === 'company' ? 'bg-[#0F7275] text-white' : 'bg-transparent text-black'}`}
                                onClick={() => setActiveTab('company')}
                            >
                                Company
                            </button>
                        </div>

                        {activeTab === 'account' && (
                            <div className='flex flex-col'>
                                {data.map((item, index) => (
                                    <React.Fragment key={index}>
                                        <div className="mt-2 p-2 flex items-center">
                                            <img src={item.icon} alt="Notification" className="w-6 h-6 ml-2 mt-2" />
                                            <div className='flex flex-col ml-4'>
                                                <p style={{ color: '#606060' }}>{item.paragraphs[0]}</p>
                                                <input
                                                    type="text"
                                                    placeholder={item.paragraphs[1]}
                                                    value={inputValues[item.field]}
                                                    onChange={(e) => handleChange(item.field, e.target.value)}
                                                    className="px-0 py-0 bg-transparent outline-none"
                                                />
                                            </div>
                                        </div>
                                        <img src={AccountInfoLine} alt="Notification" className="w-full max-w-52 h-auto ml-12" />
                                    </React.Fragment>
                                ))}
                            </div>
                        )}

                        {activeTab === 'company' && (
                             <div className='flex flex-col'>
                             {data.map((item, index) => (
                                 <React.Fragment key={index}>
                                     <div className="mt-2 p-2 flex items-center">
                                         <img src={item.icon} alt="Notification" className="w-6 h-6 ml-2 mt-2" />
                                         <div className='flex flex-col ml-4'>
                                             <p style={{ color: '#606060' }}>{item.paragraphs[0]}</p>
                                             <input
                                                 type="text"
                                                 placeholder={item.paragraphs[1]}
                                                 value={inputValues[item.field]}
                                                 onChange={(e) => handleChange(item.field, e.target.value)}
                                                 className="px-0 py-0 bg-transparent outline-none"
                                             />
                                         </div>
                                     </div>
                                     <img src={AccountInfoLine} alt="Notification" className="w-full max-w-52 h-auto ml-12" />
                                 </React.Fragment>
                             ))}
                         </div>
                        )}
                    </div>

                    <img src={Profilepic} alt="Profile" className="w-16 h-16 rounded-full -top-8 absolute z-0" />
                </WidgetContainer>
            </div>
        </div>
    );
}

export default UserSetting;
