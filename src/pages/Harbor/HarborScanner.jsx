import React, { useState } from 'react';
import { Scanner, useDevices } from '@yudiel/react-qr-scanner';
import './scanner.css'; 

function HarborScanner() {
    const [selectedDeviceId, setSelectedDeviceId] = useState(null);
    const [data, setData] = useState('');
    const devices = useDevices();

    const handleDeviceChange = (event) => {
        setSelectedDeviceId(event.target.value);
    };

    const handleError = (error) => {
        console.error(error?.message);
    };

    return (
        <div className="scanner-wrapper">
            {devices.length > 0 && (
                <div className="camera-select-container">
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
                {/* <div className="scanner-overlay">
                    <div className="scanner-frame">
                        <div className="scanner-guide">Align the QR code within the frame to scan</div>
                    </div>
                </div> */}
            </div>
            <div className="scanned-data-container">
                <h2>Scanned Data:</h2>
                <p>{data}</p>
            </div>
        </div>
    );
}

export default HarborScanner;
