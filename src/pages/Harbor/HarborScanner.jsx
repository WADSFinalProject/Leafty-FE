import React, { useState } from 'react';
import QrScanner from 'react-qr-scanner';

function HarborScanner() {
    const [scanResult, setScanResult] = useState(null);

    const handleScan = (data) => {
        if (data) {
            setScanResult(data.text);
        }
    };

    const handleError = (err) => {
        console.error(err);
    };

    const previewStyle = {
        height: 480,
        width: 1920,
    };

    return (
        <div className="flex flex-col">
            <h1>Scanner</h1>
            <div className="flex flex-col items-center">
                <QrScanner
                    delay={300}
                    style={previewStyle}
                    onError={handleError}
                    onScan={handleScan}
                />
                {scanResult && (
                    <div className="mt-4 p-4 border rounded bg-gray-100">
                        <h2>Scanned Result:</h2>
                        <p>{scanResult}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default HarborScanner;