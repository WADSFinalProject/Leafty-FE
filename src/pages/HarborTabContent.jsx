import React from 'react';
import ReceiptContainer from '../components/Cards/ReceiptContainer';

const reception_data = Array(11).fill({ items: "a" });

function HarborTabContent() {
    return (
        <div className='flex flex-row gap-4 flex-wrap my-2'>
            {reception_data.map((value, index) => (
                <ReceiptContainer key={index} value={value} role = {"Harbor"} fileName={"Expedition #123456.pdf"}/>
            ))}
        </div>
    );
}

export default HarborTabContent;
