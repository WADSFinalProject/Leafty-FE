import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PDFFile from './PDFfile'; 
import { PDFDownloadLink } from '@react-pdf/renderer';
import { API_URL } from '../App';

function DownloadPDF() {
  const [user, setUser] = useState(null);  // Initialize to null for clarity
  const [company, setCompany] = useState(null);  // Initialize to null for clarity
  const UserID = "0de15ba4-ed58-4582-9b87-bd0f6e7c9998";
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
    <div>
      {user ? (
        <PDFDownloadLink document={<PDFFile user={user} role = {user.role.RoleName} company = {company} companyRole={company.role.RoleName}/>} fileName="OfficialStatement.pdf">
          {({ loading }) => (loading ? 'Loading document...' : 'Download PDF')}
        </PDFDownloadLink>)
       : (
        <p>Loading user data...</p>
      )}
    </div>
  );
}

export default DownloadPDF;
