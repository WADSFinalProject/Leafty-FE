import React from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import QRGenerator from "@components/QRCode/QRGenerator";
import QRCodeDocument from "@components/QRCode/QRCodeDocument";
import LoadingCircle from "@components/LoadingCircle"
import Download from "@assets/icons/download.svg";

function QRPage({ numPackages = 1, data = "$2y$10$Ult/9pprJ3QUUav9FZ2yuugq0WakxwRpD00nDFDOtxsrQZhYJq8hy" }) {
  const qrCodeData = [
    { id: 1, value: data },
    // Add more QR code data objects as needed
  ];

  // Prepare an array to hold repeated QR code data
  let repeatedQRCodeData = [];

  qrCodeData.forEach((data) => {
    for (let i = 0; i < numPackages; i++) {
      repeatedQRCodeData.push(data);
    }
  });

  // Extract ids for QRCodeDocument
  const repeatedQRCodeIds = repeatedQRCodeData.map((data) => data.id);

  return (
    <div className="flex justify-center flex-col items-center">
      {numPackages === 0 && "No PDF"}
      {numPackages === 1 && qrCodeData.map((data) => (
        <QRGenerator key={data.id} value={data.value} documentId={data.id} logo="/path/to/logo.png" />
      ))}
      {numPackages >= 2 && repeatedQRCodeData.map((data) => (
        <QRGenerator key={data.id} value={data.value} documentId={data.id} logo="/path/to/logo.png" />
      ))}
      <PDFDownloadLink
        document={<QRCodeDocument ids={repeatedQRCodeIds} numPackages={numPackages} />}
        fileName="ShipmentCode.pdf"
      >
        {({ loading }) => (loading ? <div className="bg-[#D9D9D9] p-2 w-10 h-10 rounded-full justify-center flex"><img src={Download}></img></div> : <div className="bg-[#79B2B7] p-2 w-10 h-10 rounded-full justify-center flex"><img src={Download}></img></div>)}
      </PDFDownloadLink>
    </div>
  );
}

export default QRPage;
