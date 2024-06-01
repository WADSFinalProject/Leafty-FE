import React from 'react';
import WidgetContainer from './Cards/WidgetContainer';

const HarborReception = ({ containers, title }) => {
    return (
        <div className='p-2'>
            <WidgetContainer borderRadius='20px'>
                <span className='font-montserrat text-lg font-semibold tracking-wide ml-3'>
                    {title}
                </span>
                <span className='font-montserrat text-sm font-medium leading-4 tracking-wide ml-3 mt-1'>
                    Ensure every data is correctly inputted
                </span>

                <div>
                    {[containers.slice(0, 2), containers.slice(2)].map((group, index) => (
                        <div key={index} className='flex justify-between mt- '>
                            {group.map((container, idx) => (
                                <div key={idx} className='w-full max-w-40 p-1'>
                                    <p className='ml-1'>{container.label}</p>
                                    
                                    <WidgetContainer borderRadius="30px" backgroundColor="#94C3B380"  borderWidth="2px" borderColor="#79B2B7" className="flex h-8">
                                        
                                        <input
                                            type="text"
                                            className="w-full h-full bg-transparent border-none outline-none px-2"
                                            
                                        />
                                    </WidgetContainer>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </WidgetContainer>
        </div>
    );
};

export default HarborReception;
