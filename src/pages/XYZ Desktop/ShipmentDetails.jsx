    import React, { useState } from 'react';
    import WidgetContainer from "@components/Cards/WidgetContainer";
    import Powder from '@assets/PowderLogo.svg';
    import Van from '@assets/van.svg';
    import Box from '@assets/PackageBox.svg';
    import Location from '@assets/location.svg';
    import DateIcon from '@assets/Date.svg';  // Renamed to avoid conflict with the Date component
    import Centra from '@assets/centra.svg';
    import VerificationWait from "../../components/VerificationWait";
    import HarborReception from "../../components/HarborReception";
    import RescallingInput from "../../components/RescallingInput";
    import ReceptionDetail from "../../components/ReceptionDetail";
    import Button from '../../components/Button';
    import Stepper from '@mui/material/Stepper';
    import Step from '@mui/material/Step';
    import StepLabel from '@mui/material/StepLabel';

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

    const HarborContainers = [
        { label: 'Harbor Name' },
        { label: 'Total Packages' },
        { label: 'Centra Name' },
    ];

    const CentraContainers = [
        { label: 'Centra Name' },
        { label: 'Weight' },
        { label: 'Your Name' },
    ];

    function ShipmentDetails({ numPackages }) {
        const [currentComponent, setCurrentComponent] = useState(0); // changed initial step to 0

        const handleNext = () => {
            setCurrentComponent(prevComponent => Math.min(prevComponent + 1, 6)); // changed to a max value of 6
            console.log(currentComponent)
        };

        const handlePrevious = () => {
            setCurrentComponent(prevComponent => Math.max(prevComponent - 1, 0)); // changed to a min value of 0
        };

        return (
            <div className="flex flex-col h-full justify-between">
                <Stepper className="mt-4" activeStep={currentComponent} alternativeLabel>
                    {['Shipping', 'Harbor Reception', 'Rescalling Input', 'Centra Reception', 'Reception Detail'].map((label, index) => (
                        <Step key={label}>
                            <StepLabel
                                StepIconProps={{
                                    style: {
                                        fontSize: '2rem', // Enlarge the font size of the circle
                                        width: '40px', // Make the circle bigger
                                        height: '40px', // Make the circle bigger
                                        backgroundColor: '#ffffff', // Set the circle color
                                        color: '#C0CD30' // Set the text color to white
                                    }
                                }}
                                classes={{
                                    label: 'text-lg' // Enlarge the font size of the label text
                                }}
                            >
                                {label}
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
                                <ItemDetail icon={Box} title="Powder" value={`${numPackages || 5} Packages`} altText="Box" />
                                <ItemDetail icon={Van} title="30 Kg" value="Courier - JNE" altText="Truck" />
                            </Column>
                            <Column>
                                <ItemDetail icon={Centra} title="Centra" value="Centra A" altText="Centra" />
                                <ItemDetail icon={Location} title="Centra Region" value="Sulawesi Tengah" altText="Location" />
                            </Column>
                            <Column>
                                <ItemDetail icon={Van} title="Shipment No." value="#0123456" altText="Van" />
                                <ItemDetail icon={DateIcon} title="Shipment Date" value="22/07/2024" altText="Date" />
                            </Column>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <div id="decor" className="w-[25px] h-[175px] rounded-[10px_0px_0px_10px] shadow-[inset_0px_4px_4px_#0000001a]" style={{ background: "#79B2B7" }} />
                    </div>
                </WidgetContainer>

                <div className="mt-4">
                    {currentComponent === 0 && <VerificationWait padding={false} />}
                    {currentComponent === 1 && <HarborReception title="Harbor Reception" containers={HarborContainers} />}
                    {currentComponent === 2 && <ReceptionDetail harbor />}
                    {currentComponent === 2 && <RescallingInput />}
                    {currentComponent === 3 && <HarborReception title="Centra Reception" containers={CentraContainers} />}
                    {currentComponent === 4 && <ReceptionDetail harbor centra />}
                </div>

                <div className={`flex ${currentComponent === 0 ? 'justify-end':'justify-between'} items-center mt-4 px-4`}>
                    <Button label="Previous" onClick={handlePrevious} disabled={currentComponent === 0} className='px-4 py-2 bg-gray-200 rounded-md' background="#79B2B7" color="white" />
                    <Button label="Next" onClick={handleNext} disabled={currentComponent === 5} className='px-4 py-2 bg-gray-200 rounded-md' background="#417579" color="white" />
                </div>
            </div>
        );
    }

    export default ShipmentDetails;
