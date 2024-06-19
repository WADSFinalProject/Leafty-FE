import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import WidgetContainer from "@components/Cards/WidgetContainer";
import Powder from '@assets/PowderLogo.svg';
import Van from '@assets/van.svg';
import Box from '@assets/PackageBox.svg';
import Location from '@assets/location.svg';
import DateIcon from '@assets/Date.svg';  // Renamed to avoid conflict with the Date component
import Centra from '@assets/centra.svg';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import Checkbox from '@mui/material/Checkbox';
import VerificationWait from "../../components/VerificationWait";
import HarborReception from "../../components/HarborReception";
import RescallingInput from "../../components/RescallingInput";
import ReceptionDetail from "../../components/ReceptionDetail";
import Button from '../../components/Button';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { API_URL } from "../../App"; // Adjust the import according to your project structure
import { Backdrop } from '@mui/material';
import LoadingStatic from "@components/LoadingStatic"

const ItemDetail = ({ icon, title, value, altText }) => (
    <div className="flex flex-col gap-2">
        <span className="font-bold text-xl">{title}</span>
        <div className="flex flex-row gap-2 items-center">
            <img src={icon} alt={altText} className='w-8 h-8' />
            <span className="text-lg">{value}</span>
        </div>
    </div>
);

const Column = ({ children, border = false }) => (
    <div className={`flex flex-col gap-4 justify-between ${border ? "border-r-2 border-[#94C3B3]" : ""} pr-8`}>
        {children}
    </div>
);

const steps = [
    { label: 'Shipping' },
    { label: 'Harbor Verification' },
    { label: 'Harbor Reception' },
    { label: 'Rescalling Input' },
    { label: 'Centra Reception' },
];

function AdminShipmentDetails() {
    const location = useLocation();
    const { shipment } = location.state || {};
    const [currentComponent, setCurrentComponent] = useState(4);
    const [userData, setUserData] = useState(null);
    const [maxCurrentComponent, setMaxCurrentComponent] = useState(4);
    const [loading, setLoading] = useState(false)

    const Root = styled('div')(({ theme }) => ({
        height: '100%',
        backgroundColor: 'transparent',
        zIndex: 1,
        borderRadius: '30px'
    }));

    const StyledBox = styled('div')(({ theme }) => ({
        backgroundColor: theme.palette.background.paper,
        borderRadius: '30px',
        padding: theme.spacing(2),
        height: '75vh', // Use vh to ensure it takes 75% of the viewport height
        overflowY: 'auto' // Ensure content is scrollable if it overflows
    }));

    const Puller = styled('div')(({ theme }) => ({
        width: 30,
        height: 6,
        backgroundColor: theme.palette.divider,
        borderRadius: 3,
        position: 'absolute',
        top: 8,
        left: 'calc(50% - 15px)',
    }));

    const theme = createTheme({
        palette: {
            primary: {
                main: '#0F7275',
            },
        },
    });

    useEffect(() => {
        if (shipment?.UserID) {
            fetchUserDetails(shipment.UserID);
        }
        determineCurrentComponent(shipment)
    }, [shipment]);

    const fetchUserDetails = async (userId) => {
        try {
            const response = await axios.get(`${API_URL}/user/get_user/${userId}`);
            setUserData(response.data);
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };

    const handleCheckboxChange = (index) => {
        // Logic to handle checkbox changes
        if (index < currentComponent) {
            // Prevent unchecking previous steps
            // Optionally, you can leave this block empty if unchecking is not allowed
        } else if (index === currentComponent) {
            setCurrentComponent(index - 1);
        }
    };

    function formatDate(dateString) {
        if (!dateString) return "Not Delivered";
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString(undefined, options);
    }

    const navigate = useNavigate()

    function HandleSave() {
        if (currentComponent === maxCurrentComponent) {
            navigate(-1)
        }
        else if (currentComponent === 3) {
            axios.put(API_URL + "/shipment/update_centra_reception/" + shipment.ShipmentID, {
                "Centra_Reception_File": null
            })
        }
        else if (currentComponent === 2) {
            axios.put(API_URL + "/shipment/update_centra_reception/" + shipment.ShipmentID, {
                "Centra_Reception_File": null
            })
            axios.put(API_URL + "/shipment/update_rescalled_weight/" + shipment.ShipmentID, {
                "Rescalled_Weight": null,
                "Rescalled_Date": null
            })
        } else if (currentComponent === 1) {
            axios.put(API_URL + "/shipment/update_centra_reception/" + shipment.ShipmentID, {
                "Centra_Reception_File": null
            })
            axios.put(API_URL + "/shipment/update_rescalled_weight/" + shipment.ShipmentID, {
                "Rescalled_Weight": null,
                "Rescalled_Date": null
            })
            axios.put(API_URL + "/shipment/update_harbor_reception/" + shipment.ShipmentID, {
                "Harbor_Reception_File": null
            })
        } else if (currentComponent === 0) {
            axios.put(API_URL + "/shipment/update_centra_reception/" + shipment.ShipmentID, {
                "Centra_Reception_File": null
            })
            axios.put(API_URL + "/shipment/update_rescalled_weight/" + shipment.ShipmentID, {
                "Rescalled_Weight": null,
                "Rescalled_Date": null
            })
            axios.put(API_URL + "/shipment/update_harbor_reception/" + shipment.ShipmentID, {
                "Harbor_Reception_File": null
            })
            axios.put(API_URL + "/shipment/update_check_in/" + shipment.ShipmentID, {
                "Check_in_Date": null,
                "Check_in_Quantity": null
            })
        }
        else if (currentComponent === -1) {
            axios.put(API_URL + "/shipment/update_centra_reception/" + shipment.ShipmentID, {
                "Centra_Reception_File": null
            })
            axios.put(API_URL + "/shipment/update_rescalled_weight/" + shipment.ShipmentID, {
                "Rescalled_Weight": null,
                "Rescalled_Date": null
            })
            axios.put(API_URL + "/shipment/update_harbor_reception/" + shipment.ShipmentID, {
                "Harbor_Reception_File": null
            })
            axios.put(API_URL + "/shipment/update_check_in/" + shipment.ShipmentID, {
                "Check_in_Date": null,
                "Check_in_Quantity": null
            })
            axios.put(API_URL + "/shipment/update_date/" + shipment.ShipmentID, {
                "ShipmentDate": null
            })
        }
        setLoading(true)
        setTimeout(() => { setLoading(false) }, 2500)
        setTimeout(() => {navigate(-1)}, 3000)
    }

    const determineCurrentComponent = (shipment) => {
        if (!shipment.ShipmentDate) {
            setCurrentComponent(-1);
            setMaxCurrentComponent(-1);
        } else if (!shipment.Check_in_Date && !shipment.Check_in_Weight) {
            setCurrentComponent(0);
            setMaxCurrentComponent(0);
        } else if (!shipment.Harbor_Reception_File) {
            setCurrentComponent(1);
            setMaxCurrentComponent(1);
        } else if (!shipment.Rescalled_Weight && !shipment.Rescalled_Date) {
            setCurrentComponent(2);
            setMaxCurrentComponent(2);
        } else if (!shipment.Centra_Reception_File) {
            setCurrentComponent(3);
            setMaxCurrentComponent(3);
        }
        else if (shipment.Centra_Reception_File) {
            setCurrentComponent(4);
            setMaxCurrentComponent(4);
        }
    };

    function HandleReset() {
        setCurrentComponent(maxCurrentComponent);
    }

    return (
        <div className="flex flex-col h-full justify-between">
            <Stepper className="mt-4" activeStep={currentComponent + 1} alternativeLabel>
                {steps.map((step, index) => (
                    <Step key={index}>
                        <StepLabel
                            StepIconProps={{
                                style: {
                                    fontSize: '2rem',
                                    width: '40px',
                                    height: '40px',
                                    backgroundColor: '#ffffff',
                                    color: index <= currentComponent ? '#C0CD30' : '#000000', // Adjust colors based on active or inactive state
                                }
                            }}
                            classes={{
                                label: 'text-lg'
                            }}
                        >
                            {step.label}
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>

            <WidgetContainer border={true} className="w-full gap-2 py-4 pl-4 pr-0 flex flex-row justify-between">
                <div className="flex flex-col gap-2">
                    <span className="font-bold text-2xl">Item Details</span>
                    <div className="flex flex-row gap-8">
                        <div className="bg-[#79B2B7] w-fit h-fit p-8 rounded-md">
                            <img src={Powder} alt="Powder" className='w-36 h-auto' />
                        </div>
                        <Column border>
                            <ItemDetail icon={Box} title="Powder" value={`${shipment?.ShipmentQuantity || 1} Packages`} altText="Box" />
                            <ItemDetail icon={Van} title={`${shipment?.ShipmentWeight || 30} Kg`} value={`Courier - ${shipment?.CourierName || 'SiCepat'}`} altText="Truck" />
                        </Column>
                        <Column>
                            <ItemDetail icon={Centra} title="Centra" value={userData?.name || "CentraAB"} altText="Centra" />
                            <ItemDetail icon={Location} title="Centra Region" value="Sulawesi Tengah" altText="Location" />
                        </Column>
                        <Column>
                            <ItemDetail icon={Van} title="Shipment No." value={`#${shipment?.ShipmentID || '6'}`} altText="Van" />
                            <ItemDetail icon={DateIcon} title="Shipment Date" value={formatDate(shipment?.ShipmentDate)} altText="Date" />
                        </Column>
                    </div>
                </div>
                <div className="flex items-center">
                    <div id="decor" className="w-[25px] h-[175px] rounded-[10px_0px_0px_10px] shadow-[inset_0px_4px_4px_#0000001a]" style={{ background: "#79B2B7" }} />
                </div>
            </WidgetContainer>

            <div className="mt-4">
                <WidgetContainer>
                    <span className='font-bold text-xl'>Modify Status</span>
                    <div className="flex flex-row gap-2 mt-2 justify-between">
                        {steps.map((step, index) => (
                            <label key={index} className='gap-2 flex items-center'>
                                <Checkbox
                                    sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                                    checked={currentComponent >= index} // Check if currentComponent is equal to or beyond this step
                                    onChange={() => handleCheckboxChange(index)}
                                />
                                <span className=''>{step.label}</span>
                            </label>
                        ))}
                    </div>
                </WidgetContainer>
            </div>

            <div className={`flex justify-end items-center mt-4 px-4 gap-2`}>
                <Button label="Reset" onClick={HandleReset} className='px-4 py-2 bg-gray-200 rounded-md' background="#CAE3DA" color="white" />
                <Button label="Save" onClick={HandleSave} className='px-4 py-2 bg-gray-200 rounded-md' background="#417579" color="white" />
            </div>
            <Backdrop
                sx={{ color: '#94C3B3', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            ><LoadingStatic /></Backdrop>
        </div>
    );
}

export default AdminShipmentDetails;
