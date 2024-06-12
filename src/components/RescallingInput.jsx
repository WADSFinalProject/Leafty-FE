import WidgetContainer from "./Cards/WidgetContainer";

function RescallingInput({value}) {
    return <>
        <WidgetContainer borderRadius='20px' className={"ml-1 flex flex-col gap-1 p-4"}>
            <div className="flex flex-col gap-1"><span className='font-montserrat text-lg font-semibold'>
                Re-scaling
            </span>
            <span className='font-montserrat text-sm font-medium'>
                Input the re-scaled weight below
            </span></div>
            <div className="w-fit">
                <span className=''>Re-scalled weight</span>
                <WidgetContainer backgroundColor="#94C3B380" borderRadius="13.5px" borderWidth="2px" borderColor="#79B2B7" className=''>
                    <input
                        type="text"
                        className="w-full h-full bg-transparent border-none outline-none px-2"
                        value = {value}
                    />
                </WidgetContainer>
            </div>
        </WidgetContainer>
    </>
}
export default RescallingInput;