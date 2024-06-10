import WidgetContainer from "@components/Cards/WidgetContainer";
import Powder from '@assets/PowderLogo.svg';
import Van from '@assets/van.svg';
import Box from '@assets/PackageBox.svg';
import Location from '@assets/location.svg';
import Date from '@assets/Date.svg';
import Centra from '@assets/centra.svg';
import VerificationWait from "../../components/VerificationWait";
import HarborReception from "../../components/HarborReception";
import RescallingInput from "../../components/RescallingInput";
import ReceptionDetail from "../../components/ReceptionDetail";

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
    return (
        <>
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
                            <ItemDetail icon={Date} title="Shipment Date" value="22/07/2024" altText="Date" />
                        </Column>
                    </div>
                </div>
                <div className="flex items-center">
                    <div id="decor" className="w-[25px] h-[175px] rounded-[10px_0px_0px_10px] shadow-[inset_0px_4px_4px_#0000001a]" style={{ background: "#79B2B7" }} />
                </div>
            </WidgetContainer>
            
            <VerificationWait padding = {false}/>
            <HarborReception title="Harbor Reception" containers={HarborContainers} />
            <HarborReception title="Centra Reception" containers={CentraContainers} />
            <RescallingInput />
            <ReceptionDetail />

        </>
    );
}

export default ShipmentDetails;
