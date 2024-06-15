import React, { useState, useEffect } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import bcrypt from "bcryptjs";
import QRGenerator from "@components/QRCode/QRGenerator";
import QRCodeDocument from "@components/QRCode/QRCodeDocument";
import Download from "@assets/icons/download.svg";

function QRPage({ numPackages = 4, data = "Leafty"}) {
  const [qrCodeData, setQRCodeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const encryptData = async () => {
      try {
        if (!data) {
          throw new Error("Data is required for generating QR codes");
        }
        const hash = await bcrypt.hash(String(data), 10);
        const encryptedData = { id: 1, value: hash }; // Assuming a single data item with id 1

        // Use only the encrypted data for display
        setQRCodeData([encryptedData]);
        setLoading(false);
      } catch (error) {
        console.error("Error encrypting data:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    encryptData();
  }, [data]);

  // Prepare an array to hold repeated QR code data for the PDF
  let repeatedQRCodeData = [];
  qrCodeData.forEach((data) => {
    for (let i = 0; i < numPackages; i++) {
      repeatedQRCodeData.push(data);
    }
  });

  const repeatedQRCodeIds = repeatedQRCodeData.map((data) => data.id);

  return (
    <div className="flex justify-center flex-col items-center p-4 gap-2">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <>
          {qrCodeData.map((data, index) => (
            <QRGenerator key={index} value={data.value} documentId={data.id} />
          ))}
          <PDFDownloadLink
            document={<QRCodeDocument ids={repeatedQRCodeIds} numPackages={numPackages} />}
            fileName="ShipmentCode.pdf"
          >
            {({ loading }) => (
              <div
                className="p-2 px-4 w-fit gap-2 h-10 rounded-full flex items-center justify-center mt-2"
                style={{ backgroundColor: loading ? "#D9D9D9" : "#79B2B7" }}
              >
                <img src={Download} alt="Download icon" />
                <span className="text-[white] font-semibold">Download</span>
              </div>
            )}
          </PDFDownloadLink>
        </>
      )}
    </div>
  );
}

export default QRPage;
