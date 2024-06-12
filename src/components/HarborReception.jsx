import React from 'react';
import WidgetContainer from './Cards/WidgetContainer';

const HarborReception = ({ containers, title, padding = true }) => {
    return (
        <WidgetContainer borderRadius='20px' className={"pl-4 flex flex-col gap-1"}>
            <div className='flex flex-col'>
                <span className='font-montserrat text-lg font-semibold'>
                    {title}
                </span>
                <span className='font-montserrat text-sm'>
                    Ensure every data is correctly inputted
                </span>
            </div>

            <div>
                {[containers.slice(0, 2), containers.slice(2)].map((group, index) => (
                    <div key={index} className='flex justify-between xl:justify-start gap-2'>
                        {group.map((container, id) => (
                            <div key={id} className='w-full max-w-fit'>
                                <span className=''>{container.label}</span>
                                <WidgetContainer borderRadius="30px" backgroundColor="#94C3B380" borderWidth="2px" borderColor="#79B2B7" className="flex h-8">
                                    <input
                                        type="text"
                                        className="w-full h-full bg-transparent border-none outline-none"
                                    />
                                </WidgetContainer>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </WidgetContainer>

    );
};

export default HarborReception;
