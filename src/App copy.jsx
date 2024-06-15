import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import './style/App.css'
import './style/font.css'
import OnBoarding from "./pages/OnBoarding";
import Verification from "./pages/Verification";
import Register from "./pages/Register";
import Dashboard from "./pages/XYZ Desktop/Dashboard";
import Approval from "./pages/Approval";
import DashboardHarbor from "./pages/Harbor/DashboardHarbor";
import PageNotFound from "./pages/PageNotFound";
import WetLeavesXYZ from "./pages/XYZ Desktop/WetLeaves";
import DryLeavesXYZ from "./pages/XYZ Desktop/DryLeaves";
import PowderXYZ from "./pages/XYZ Desktop/Powder";
import ShipmentXYZ from "./pages/XYZ Desktop/Shipment";
import DashboardLayout from "./pages/XYZ Desktop/DashboardLayout";
import DashboardCentra from "./pages/Centra/DashboardCentra";
import WetLeaves from "./pages/Centra/WetLeaves";
import WetLeavesDetail from "./pages/Centra/WetLeavesDetail";
import DryLeaves from "./pages/Centra/DryLeaves";
import DryLeavesDetail from "./pages/Centra/DryLeavesDetail";
import Powder from "./pages/Centra/Powder";
import PowderDetail from "./pages/Centra/PowderDetail";
import Shipment from "./pages/Centra/Shipment";
import ShipmentDetail from "./pages/Centra/ShipmentDetail";
import HarborLayout from "./pages/Harbor/HarborLayout";
import HarborReception from "./pages/Harbor/HarborReception";
import HarborScanner from './pages/Harbor/HarborScanner';
import Reception from "./pages/XYZ Desktop/Reception";
import CentraLayout from "./pages/Centra/CentraLayout";
import CentraTabContent from "./pages/XYZ Desktop/CentraTabContent";
import HarborTabContent from "./pages/XYZ Desktop/HarborTabContent";
import ShipmentOrders from "./pages/Centra/ShipmentOrders";
import ShipmentSent from "./pages/Centra/ShipmentSent";
import ShipmentCompleted from "./pages/Centra/ShipmentCompleted";
import AdminWetLeaves from "./pages/Admin/AdminWetLeaves";
import XYZLayout from "./pages/XYZMobile/XYZLayout";
import XYZShipmentList from "./pages/XYZMobile/XYZShipmentList";
import XYZScanner from './pages/XYZMobile/XYZScanner';
import DashboardXYZ from "./pages/XYZMobile/DashboardXYZ";
import XYZShipmentDetail from "./pages/XYZMobile/XYZShipmentDetail";
import Tracker from "./pages/XYZMobile/Tracker";
import UserSetting from "./pages/XYZMobile/UserSetting";
import TempAdmin from "./pages/Admin/TempAdmin";
import DashboardAdmin from "./pages/Admin/DashboardAdmin";
import AdminDryLeaves from "./pages/Admin/AdminDryLeaves";
import AdminPowder from "./pages/Admin/AdminPowder";
import AdminUserTable from "./pages/Admin/AdminUserTable";
import AdminLayout from "./pages/Admin/AdminLayout";
<<<<<<< Updated upstream
import Performance from "./pages/XYZ Desktop/Performance";
import WetLeavesOverview from "./pages/XYZ Desktop/WetLeavesOverview";
import AdminUserApproval from "./pages/Admin/AdminUserApproval";
import Pickup from "./pages/XYZ Desktop/PickUp";
import ShipmentDetails from "./pages/XYZ Desktop/ShipmentDetails";
import QRPage from "./pages/QRPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<OnBoarding />}></Route>
        <Route path="verify" element={<Verification />}></Route>
        <Route path="register" element={<Register />}></Route>
        <Route path="approval" element={<Approval />}></Route>
        <Route path="*" element={<PageNotFound />}></Route>
        {/* <Route path="company" element={<PageNotFound />}></Route> */}
        <Route path="company" element={<DashboardLayout />}>
          <Route path="dashboard" element={<Dashboard />}></Route>
          <Route path="wetleaves" element={<WetLeavesXYZ />}></Route>
          <Route path="wetoverview" element={<WetLeavesOverview />}></Route>
          <Route path="dryleaves" element={<DryLeavesXYZ />}></Route>
          <Route path="powder" element={<PowderXYZ />}></Route>
          <Route path="shipment" element={<ShipmentXYZ />}></Route>
          <Route path="performance" element={<Performance />}></Route>
          <Route path="pickup" element={<Pickup />}></Route>
          <Route path="shipmentdetails" element={<ShipmentDetails />}></Route>
          <Route path="reception" element={<Reception />}>
            <Route path="centra" element={<CentraTabContent />}></Route>
            <Route path="harbor" element={<HarborTabContent />}></Route>
          </Route>
        </Route>
        <Route path="harbor" element={<HarborLayout />}>
          <Route path="dashboard" element={<DashboardHarbor />} />
          <Route path="reception" element={<HarborReception />} />
          <Route path="Scanner" element={<HarborScanner />} />
        </Route>
        <Route path="centra" element={<CentraLayout />}>
          <Route path="Dashboard" element={<DashboardCentra />}></Route>
          <Route path="Wet Leaves" element={<WetLeaves />}>
            
          </Route>
          <Route path="wet-leaves/detail/:code/:time/:weight" element={<WetLeavesDetail />} />
          <Route path="Dry Leaves" element={<DryLeaves />}></Route>
          <Route path="dry-leaves/detail/:code/:time/:weight" element={<DryLeavesDetail />} />
          <Route path="Powder" element={<Powder />}></Route>
          <Route path="powderdetail/:code/:weight" element={<PowderDetail />}></Route>
          <Route path="Shipment" element={<Shipment />}>
            <Route path="ShipmentOrder" element={<ShipmentOrders />}></Route>
            <Route path="ShipmentSent" element={<ShipmentSent />}></Route>
            <Route path="ShipmentCompleted" element={<ShipmentCompleted />}></Route>
          </Route>
          <Route path="shipmentdetail/:code" element={<ShipmentDetail />}></Route>
          

        </Route>
        <Route path="xyzmobile" element={<XYZLayout />}>
          <Route path="dashboard" element={<DashboardXYZ />} />
          <Route path="Shipment List" element={<XYZShipmentList />} />
          <Route path="Scanner" element={<XYZScanner />} />
          <Route path="Tracker" element={<Tracker />} />
        </Route>
        <Route path="xyzshipmentdetail" element={<XYZShipmentDetail />} />
        <Route path="admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<DashboardAdmin />} />
          <Route path="wet leaves" element={<AdminWetLeaves />} />
          <Route path="dry leaves" element={<AdminDryLeaves />} />
          <Route path="powder" element={<AdminPowder />} />
          <Route path="user management" element={<AdminUserTable />} />
          <Route path="user approval" element={<AdminUserApproval />} />
        </Route>
        <Route path="qr" element={<QRPage />} />
        {/* <Route path="Admin" element={<TempAdmin />}> */}
        {/* <Route path="admindashboard" element={<DashboardAdmin />}/> */}
        {/* <Route path="adminwetleaves" element={<AdminWetLeaves />} />
        <Route path="admindryleaves" element={<AdminDryLeaves />} />
        <Route path="adminpowder" element={<AdminPowder />} />
        <Route path="adminusermanagement" element={<AdminUserTable />} /> */}
        {/* </Route> */}

        {/* <Route path="/wetleavesdetail" element={<WetLeavesDetail />} /> */}
        
       
        <Route path="/xyzshipmentdetail" element={<XYZShipmentDetail />} />
        <Route path="/usersetting" element={<UserSetting />} />
      </Routes>
    </Router>
=======
import axios from 'axios';
import { useEffect, useState } from 'react';
import React from "react";
import AuthApi from "./AuthApi";

const USER_TYPES = {
  UNVERIFIED: 'Unverified',
  CENTRA: "Centra",
  HARBOR: "Harbor",
  COMPANY: "Company",
  ADMIN: "Admin",
  REJECTED: "Rejected",
  NULL: "NULL"
}


function App() {
  const [auth, setAuth] = useState(false);
  const [CURRENT_USER, setUser] = useState();
  const [CURRENT_USER_ROLE, setRole] = useState(0);
  const [loading, setLoading] = useState(true);
  
  async function handleWhoAmI() {
    try {
      const response = await axios.get(API_URL + "/whoami");
      console.log("who am i (UUID) : ", response.data);
      if (response.data) {
        setUser(response.data.user_id);
        setRole(response.data.user_role);
        setAuth(true);
      }
    } catch (error) {
      console.error("Error fetching user data", error);
    } finally {
      setLoading(false);
    }
}
  useEffect(() => {
    handleWhoAmI();
  }, []);
  
  useEffect(() => {
    if(auth){
      handleWhoAmI();
    }
  }, [auth]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const ProtectedLogin = ({}) => {
    const { auth } = React.useContext(AuthApi);
  
    if (auth) {
      if(CURRENT_USER_ROLE == 1){
        return <Navigate to="/centra/dashboard"/>;
      }
      if(CURRENT_USER_ROLE == 2){
        return <Navigate to="/harbor/dashboard"/>;
      }
      if(CURRENT_USER_ROLE == 3){
        return <Navigate to="/company/dashboard"/>;
      }
      if(CURRENT_USER_ROLE == 4){
        return <Navigate to="/admin/dashboard"/>;
      }
      if(CURRENT_USER_ROLE == 5){
        return <Navigate to="/approval"/>;
      }
      if(CURRENT_USER_ROLE == 6){
        return <Navigate to="/aa"/>;
      }
    }
  
    return <Outlet/>;
  };

  const ProtectedCentra = ({}) => {
  
    if (CURRENT_USER_ROLE != 1) {
      return <Navigate to="/" />;
    }
  
    return <Outlet/>;
  };

  const ProtectedHarbor = ({}) => {
  
    if (CURRENT_USER_ROLE != 2) {
      return <Navigate to="/" />;
    }
  
    return <Outlet/>;
  };

  const ProtectedCompany = ({}) => {
  
    if (CURRENT_USER_ROLE != 3) {
      return <Navigate to="/" />;
    }
  
    return <Outlet/>;
  };

  const ProtectedAdmin = ({}) => {
  
    if (CURRENT_USER_ROLE != 5) {
      return <Navigate to="/" />;
    }
  
    return <Outlet/>;
  };

  return (
    <AuthApi.Provider value={{auth, setAuth}}>
      <Router>
        <Routes>
          <Route exact path="/" element={<ProtectedLogin/>}>
            <Route path="/" element={<OnBoarding/>}></Route>
          </Route>
          <Route path="/" element={<OnBoarding/>}></Route>
          <Route path="verify" element={<Verification />}></Route>
          <Route path="register" element={<Register />}></Route>
          <Route path="approval" element={<Approval />}></Route>
          <Route path="*" element={<PageNotFound />}></Route>
          {/* <Route path="company" element={<PageNotFound />}></Route> */}

          <Route exact path="/" element={<ProtectedRoute/>}>
            <Route exact path="/" element={<ProtectedCompany/>}>
              <Route path="company" element={<DashboardLayout />}>
                <Route path="dashboard" element={<Dashboard />}></Route>
                <Route path="wetleaves" element={<WetLeavesXYZ />}></Route>
                <Route path="dryleaves" element={<DryLeavesXYZ />}></Route>
                <Route path="powder" element={<PowderXYZ />}></Route>
                <Route path="shipment" element={<ShipmentXYZ />}></Route>
                <Route path="reception" element={<Reception />}>
                  <Route path="centra" element={<CentraTabContent />}></Route>
                  <Route path="harbor" element={<HarborTabContent />}></Route>
                </Route>
              </Route>
            </Route>
          </Route>

          <Route exact path="/" element={<ProtectedRoute/>}>
            <Route exact path="/" element={<ProtectedHarbor/>}>
              <Route path="harbor" element={<HarborLayout />}>
                  <Route path="dashboard" element={<DashboardHarbor />} />
                  <Route path="reception" element={<HarborReception />} />
                  <Route path="Scanner" element={<HarborScanner />} />
                </Route>
              </Route>
          </Route>

          <Route exact path="/" element={<ProtectedRoute/>}>
            <Route exact path="/" ele ment={<ProtectedCentra/>}>
              <Route path="centra" element={<CentraLayout />}>
                  <Route path="Dashboard" element={<DashboardCentra />}></Route>
                  <Route path="Wet Leaves" element={<WetLeaves />}></Route>
                  <Route path="Dry Leaves" element={<DryLeaves />}></Route>
                  <Route path="Powder" element={<Powder />}></Route>
                  <Route path="Shipment" element={<Shipment />}>
                    <Route path="ShipmentOrder" element={<ShipmentOrders />}></Route>
                    <Route path="ShipmentSent" element={<ShipmentSent />}></Route>
                    <Route path="ShipmentCompleted" element={<ShipmentCompleted />}></Route>
                  </Route>
                </Route>
            </Route>
          </Route>

          <Route path="xyzmobile" element={<XYZLayout />}>
            <Route path="dashboard" element={<DashboardXYZ />} />
            <Route path="Shipment List" element={<XYZShipmentList />} />
            <Route path="Scanner" element={<XYZScanner />} />
          </Route>

          <Route exact path="/" element={<ProtectedRoute/>}>
            <Route exact path="/" element={<ProtectedAdmin/>}>
              <Route path="admin" element={<AdminLayout />}>
                <Route path="dashboard" element={<DashboardAdmin />} />
                <Route path="wet leaves" element={<AdminWetLeaves />} />
                <Route path="dry leaves" element={<AdminDryLeaves />} />
                <Route path="powder" element={<AdminPowder />} />
                <Route path="user management" element={<AdminUserTable />} />
              </Route>
            </Route>
          </Route>
          
          {/* <Route path="Admin" element={<TempAdmin />}> */}
          {/* <Route path="admindashboard" element={<DashboardAdmin />}/> */}
          {/* <Route path="adminwetleaves" element={<AdminWetLeaves />} />
          <Route path="admindryleaves" element={<AdminDryLeaves />} />
          <Route path="adminpowder" element={<AdminPowder />} />
          <Route path="adminusermanagement" element={<AdminUserTable />} /> */}
          {/* </Route> */}

          <Route path="/wetleavesdetail" element={<WetLeavesDetail />} />
          <Route path="/dryleavesdetail" element={<DryLeavesDetail />} />
          <Route path="/powderdetail" element={<Powder />} />
          <Route path="/shipmentdetail" element={<ShipmentDetail />} />
          <Route path="/xyzshipmentdetail" element={<XYZShipmentDetail />} />
          <Route path="/usersetting" element={<UserSetting />} />
        </Routes>
      </Router>
    </AuthApi.Provider>
>>>>>>> Stashed changes
  )
}

const ProtectedRoute = ({}) => {
  const { auth } = React.useContext(AuthApi);

  if (!auth) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default App;
export const API_URL = "http://localhost:8000";