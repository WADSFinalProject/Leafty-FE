  import React from "react";
  import { PDFDownloadLink } from "@react-pdf/renderer";
  import QRGenerator from "@components/QRCode/QRGenerator";
  import QRCodeDocument from "@components/QRCode/QRCodeDocument";
  import Download from "@assets/icons/download.svg";

  function QRPage({ numPackages = 4, data = "$2y$10$Ult/9pprJ3QUUav9FZ2yuugq0WakxwRpD00nDFDOtxsrQZhYJq8hy" }) {
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
      <div className="flex justify-center flex-col items-center p-4 gap-2">
        {qrCodeData.map((data) => (
          <QRGenerator key={data.id} value={data.value} documentId={data.id} />
        ))}
        <PDFDownloadLink
          document={<QRCodeDocument ids={repeatedQRCodeIds} numPackages={numPackages} />}
          fileName="ShipmentCode.pdf"
        >
          {({ loading }) => (
            <div className="p-2 px-4 w-fit gap-2 h-10 rounded-full flex items-center justify-center mt-2"
                style={{ backgroundColor: loading ? "#D9D9D9" : "#79B2B7" }}>
              <img src={Download} alt="Download icon" />
              <span className = "text-[white] font-semibold">Download</span>
            </div>
          )}
        </PDFDownloadLink>
      </div>
    );
  }

  export default QRPage;
