import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PDFFile from './PDFfile'; 
import { PDFDownloadLink } from '@react-pdf/renderer';
import { API_URL } from '../App';
import LoadingStatic from "@components/LoadingStatic"
import WidgetContainer from '../components/Cards/WidgetContainer';
import Download from "@assets/icons/download.svg";
import ReceptionDetail from '../components/ReceptionDetail';
import ReceptionFile from '../components/ReceptionFile';

function DownloadPDF({UserID, shipment, harbor}) {
  const [user, setUser] = useState(null);  // Initialize to null for clarity
  const [company, setCompany] = useState(null);  // Initialize to null for clarity
  const shipmentData = shipment;
  // const UserID = "0de15ba4-ed58-4582-9b87-bd0f6e7c9998";
  const CompanyID = "7bca9eb4-b64b-4a3d-a23e-b057107f1c33"

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${API_URL}/user/get_user/${UserID}`);
        setUser(response.data);  // Assuming the response.data is the user object
        
      } catch (error) {
        console.error('Failed to fetch user data', error);
        setUser({}); // Set to an empty object on error to avoid null reference in rendering
      }
    };
    fetchUser();
  }, [UserID]);

  
  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const response = await axios.get(`${API_URL}/user/get_user/${CompanyID}`);
        setCompany(response.data);  // Assuming the response.data is the user object
        console.log(response.data)
      } catch (error) {
        console.error('Failed to fetch user data', error);
        setCompany({}); // Set to an empty object on error to avoid null reference in rendering
      }
    };
    fetchCompany();
  }, [CompanyID]);

  return (
    <WidgetContainer container = {false} className={"flex rounded-full"}>
      <ReceptionFile fileName = {`Expedition #${shipment.ShipmentID} - ${harbor && "Harbor"} Official Statement.pdf`} harbor = {harbor} download =  {user ? (
        <PDFDownloadLink document={<PDFFile user={user} role = {user.role.RoleName} shipment = {shipmentData} shipmentQuantity = {shipment.ShipmentQuantity} checkInDate = {shipment} company = {company} companyRole={company?.role.RoleName}/>} fileName={`Expedition #${shipment.ShipmentID} - ${harbor && "Harbor"} Official Statement.pdf`}>
          {({ loading }) => (
              <div
                className="p-2 w-fit gap-2 h-fit rounded-full flex items-center justify-center mt-2"
                style={{ backgroundColor: loading ? "#D9D9D9" : "#79B2B7" }}
              >
                <img src={Download} alt="Download icon" />
              </div>
            )}
        </PDFDownloadLink>)
       : (
        <p><LoadingStatic /></p>
      )}/>
     
    </WidgetContainer>
  );
}

export default DownloadPDF;
