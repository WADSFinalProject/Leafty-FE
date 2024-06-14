import React, { useState, useEffect } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import axios from "axios";
import bcrypt from "bcryptjs";
import QRGenerator from "@components/QRCode/QRGenerator";
import QRCodeDocument from "@components/QRCode/QRCodeDocument";
import Download from "@assets/icons/download.svg";

function QRPage({ numPackages = 4 }) {
  const [qrCodeData, setQRCodeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShipments = async () => {
      try {
        const response = await axios.get("http://localhost:8000/shipment/get");
        const shipmentData = response.data;

        if (!shipmentData || !Array.isArray(shipmentData)) {
          throw new Error("Invalid shipment data format");
        }

        // Encrypt shipment IDs using bcrypt
        const encryptedShipmentData = await Promise.all(
          shipmentData.map(async (shipment) => {
            if (!shipment.ShipmentID) {
              throw new Error(`Shipment ID is missing for shipment: ${JSON.stringify(shipment)}`);
            }
            const hash = await bcrypt.hash(shipment.ShipmentID.toString(), 10);
            return { id: shipment.ShipmentID, value: hash };
          })
        );

        // Use only the first QR code data for display
        setQRCodeData(encryptedShipmentData.slice(0, 1));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching shipment data:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchShipments();
  }, []);

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
