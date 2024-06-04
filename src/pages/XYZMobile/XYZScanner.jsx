import React, { useState } from 'react';
import { Scanner, useDeviceList } from '@yudiel/react-qr-scanner';
import './scanner.css'; 

function XYZScanner() {
    const [selectedDeviceId, setSelectedDeviceId] = useState(null);
    const [data, setData] = useState('');
    const devices = useDeviceList();

    const handleDeviceChange = (event) => {
        setSelectedDeviceId(event.target.value);
    };

    const handleError = (error) => {
        console.error(error?.message);
    };

    return (
        <div>
            {devices.length > 0 && (
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="cameraSelect">Select Camera:</label>
                    <select id="cameraSelect" onChange={handleDeviceChange} value={selectedDeviceId || devices[0].deviceId}>
                        {devices.map((device) => (
                            <option key={device.deviceId} value={device.deviceId}>
                                {device.label}
                            </option>
                        ))}
                    </select>
                </div>
            )}
            <div className="scanner-container">
                <Scanner
                    onResult={(text) => setData(text)}
                    onError={handleError}
                    options={{ deviceId: selectedDeviceId }}
                />
            </div>
           
                <div style={{ marginTop: '20px' }}>
                    <h2>Scanned Data:</h2>
                    <p>{data}</p>
                </div>
        </div>
    );
}

export default XYZScanner;
