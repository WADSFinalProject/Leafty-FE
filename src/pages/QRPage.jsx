import QRCodeDocument from "@components/QRCode/QRCodeDocument";
import QRGenerator from "@components/QRCode/QRGenerator";
import ReactPDF, { PDFDownloadLink } from "@react-pdf/renderer";

function QRPage() {
    const qrCodeData = [
        { id: 1234, value: "$2y$10$Ult/9pprJ3QUUav9FZ2yuugq0WakxwRpD00nDFDOtxsrQZhYJq8hy" },
    ];
    const qrCodeIds = qrCodeData.map((data) => data.id);

    return (
        <div className="">
            {qrCodeData.map((data) => {
                return <QRGenerator value={data.value} documentId={data.id} />;
            })}
            <h2>Download to see some magic happen!</h2>
            <PDFDownloadLink
                document={<QRCodeDocument ids={qrCodeIds} />}
                fileName="ShipmentCode.pdf"
            >
                {({ loading }) => (loading ? "Loading..." : "Download PDF")}
            </PDFDownloadLink>
        </div>
    );
}

export default QRPage;