import centraImg from "@assets/centra.svg";
import harborImg from "@assets/Harbor.svg";
import box from "@assets/PackageBox.svg";
import wetLeavesImg from "@assets/WetLeaves.svg";
import dryLeavesImg from "@assets/DryLeaves.svg";
import powderImg from "@assets/Powder.svg";
import deliveryImg from "@assets/delivery.svg";
import WidgetContainer from "./Cards/WidgetContainer";

function MarkerDetails({ centra, harbor, name, wet_leaves, dry_leaves, powder, packages }) {
    const renderItem = (imgSrc, label, value, unit = "") => (
        <div className='flex flex-row items-center gap-2'>
            <img src={imgSrc} className="w-8 h-8" alt={label} />
            <div className="flex flex-col">
                <span className='font-semibold'>{label}</span>
                <span>{value} {unit}</span>
            </div>
        </div>
    );

    return (
        <WidgetContainer>
            <span className='font-bold text-lg'>Marker Details</span>
            <div className='flex flex-row gap-4'>
                {centra && (
                    <div className='bg-[#C0CD30] p-4 rounded-lg w-fit gap-2 items-center justify-center flex'>
                        <img className="w-20 h-20" src={centraImg} alt="Centra" />
                    </div>
                )}
                {harbor && (
                    <div className='bg-[#94C3B3] p-4 rounded-lg w-fit gap-2 items-center justify-center flex'>
                        <img className="w-20 h-20" src={harborImg} alt="Harbor" />
                    </div>
                )}
                <div>
                    <span className='text-lg font-semibold'>{name}</span>
                    <div className='grid grid-cols-2 gap-4'>
                        {renderItem(wetLeavesImg, "Wet Leaves", wet_leaves, "Kg")}
                        {renderItem(dryLeavesImg, "Dry Leaves", dry_leaves, "Kg")}
                        {renderItem(powderImg, "Powder", powder, "Kg")}
                        <div className='flex flex-row items-center gap-2'>
                            <img src={deliveryImg} className="w-8 h-8" alt="Packages Sent" />
                            <div className="flex flex-col">
                                <span className='font-semibold'>Packages Sent</span>
                                <span className="flex flex-row items-center gap-2">
                                    {packages}
                                    <img className="w-4 h-4" src={box} alt="Box" />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </WidgetContainer>
    );
}

export default MarkerDetails;
