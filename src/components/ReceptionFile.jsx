import Upload from '../assets/icons/upload.svg';
import Download from "@assets/icons/download.svg";
import Open from "@assets/icons/open_file.svg";
import WidgetContainer from './Cards/WidgetContainer';
import ShipmentReceipt from '../assets/ShipmentReceipt.svg';

function ReceptionFile({harbor, centra}) {
    return <>
        <div className='flex flex-wrap items-center gap-4'>
            <WidgetContainer borderRadius='rounded-lg' border={false} backgroundColor="#DEE295" className='flex items-center'>
                <img src={ShipmentReceipt} alt="Profile" className='w-24 h-auto' />
            </WidgetContainer>
            <div className='flex flex-col'>
                <span className='font-montserrat text-16px font-semibold tracking-02em'>Your Receipt is Ready!</span>
                <span className='w-3/4'>{harbor && "Harbor"} {centra && "Centra"} Receipt - Expedition #012345.pdf</span>
                <br></br>
                <div className='flex gap-2'>
                    <div className="bg-[#79B2B7] p-2 w-10 h-10 rounded-full justify-center flex"><img src={Download}></img></div>
                    <div className="bg-[#79B2B7] p-2 w-10 h-10 rounded-full justify-center flex"><img src={Open}></img></div>
                    <div className="bg-[#79B2B7] p-2 w-10 h-10 rounded-full justify-center flex"><img src={Upload}></img></div>
                </div>
            </div>
        </div>
    </>
}

export default ReceptionFile;