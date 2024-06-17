import Upload from '../assets/icons/upload.svg';
import Download from "@assets/icons/download.svg";
import Open from "@assets/icons/open_file.svg";
import WidgetContainer from './Cards/WidgetContainer';
import ShipmentReceipt from '../assets/ShipmentReceipt.svg';

function ReceptionFile({fileName, harbor, centra, download }) {
    return <>
        <div className='flex flex-row items-center gap-4 p-4'>
            <WidgetContainer container = {false} borderRadius='rounded-lg' border={false} backgroundColor="#DEE295" className='flex items-center w-fit p-4 '>
                <img src={ShipmentReceipt} alt="Profile" className='w-24 h-auto' />
            </WidgetContainer>
            <div className='flex flex-col'>
                <span className='font-montserrat text-16px font-semibold tracking-02em'>Your Receipt is Ready!</span>
                <span className='w-3/4'>{fileName}</span>
                {download}
            </div>
        </div>
    </>
}

export default ReceptionFile;