function HarborStats({ label, value, icon, duration }) {
    return <>
        <WidgetContainer className={"p-5 h-[13rem] md:h-full"}>
            <div className='flex flex-row'>
                <div className='flex flex-col'>
                    <span className="font-semibold text-gray-600">
                        {label}
                    </span>
                    <span className='font-montserrat text-xl font-semibold text-left'>
                        {value}
                        {duration > 0 ? duration : "Expired"}
                    </span>
                </div>
                <img src={icon} alt="VerifiedPackages" className='place-self-start' />
            </div>

        </WidgetContainer>
    </>
}