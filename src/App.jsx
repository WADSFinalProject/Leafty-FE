import { BrowserRouter as Router, Routes, Route, Navigate, Outlet, useParams } from "react-router-dom";
import './style/App.css';
import './style/font.css';
import LoadingCircle from "@components/LoadingCircle";
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
import Performance from "./pages/XYZ Desktop/Performance";
import WetLeavesOverview from "./pages/XYZ Desktop/WetLeavesOverview";
import AdminUserApproval from "./pages/Admin/AdminUserApproval";
import Pickup from "./pages/XYZ Desktop/PickUp";
import ShipmentDetails from "./pages/XYZ Desktop/ShipmentDetails";
import QRPage from "./pages/QRPage";
import axios from 'axios';
import { useEffect, useState } from 'react';
import React from "react";
import AuthApi from "./AuthApi";
import ForgotPassword from "./pages/ForgotPassword";
import ForgotPasswordEmail from "./pages/ForgotPasswordEmail";
import OtpApi from "./OtpProvider";
import RegApi from "./RegProvider";
import DryLeavesOverview from "./pages/XYZ Desktop/DryLeavesOverview";
import PowderOverview from "./pages/XYZ Desktop/PowderOverview";
import DownloadPDF from "./pages/Downloadpdf";
import { PDFDownloadLink } from "@react-pdf/renderer";
import AdminShipment from "./pages/Admin/AdminShipment";
import AdminShipmentDetails from "./pages/Admin/AdminShipmentDetail";
import PushNotif from "./components/Popups/pushnotif";

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
  const [otp, setOtp] = useState(false);
  const [reg, setReg] = useState(false);
  const [CURRENT_USER, setUser] = useState(null);
  const [CURRENT_USER_ROLE, setRole] = useState(0);
  const [loading, setLoading] = useState(true);
  
  async function handleWhoAmI() {
    try {
      const response = await axios.get(API_URL + "/whoami");
      console.log("who am i (UUID) : ", response.data);
      if (response.data) {
        setUser(response.data.user_id);
        setRole(response.data.user_role);
        if (!auth) {
          setAuth(true);
        }
      }
    } catch (error) {
      console.error("Error fetching user data", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    handleWhoAmI();
  }, [auth]);

  if (loading) {
    return <LoadingCircle />;
  }

  const ProtectedLogin = ({}) => {
    const { auth } = React.useContext(AuthApi);

    if (auth) {
      if (CURRENT_USER_ROLE == 1) {
        return <Navigate to="/centra/dashboard" />;
      }
      if (CURRENT_USER_ROLE == 2) {
        return <Navigate to="/harbor/dashboard" />;
      }
      if (CURRENT_USER_ROLE == 3) {
        let check = false;
        (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
        if (check){
          return <Navigate to="/xyzmobile/dashboard" />;  
        }
        return <Navigate to="/company/dashboard" />;
      }
      if (CURRENT_USER_ROLE == 4) {
        return <Navigate to="/admin/dashboard" />;
      }
      if (CURRENT_USER_ROLE == 5) {
        return <Navigate to="/approval" />;
      }
      if (CURRENT_USER_ROLE == 6) {
        return <Navigate to="/aa" />;
      }
    }

    return <Outlet />;
  };

  const ProtectedOtp = ({}) => {
    const { otp } = React.useContext(OtpApi);
  
    if (otp) {
      return <Outlet/>;
    }
  
    return <Navigate to="/" />;
  };

  const ProtectedRegistering = ({}) => {
    const { reg } = React.useContext(RegApi);
  
    if (reg) {
      return <Outlet/>;
    }
  
    return <Navigate to="/" />;
  };


  const ProtectedCentra = ({}) => {
    if (CURRENT_USER_ROLE != 1) {
      return <Navigate to="/" />;
    }

    return <Outlet />;
  };

  const ProtectedHarbor = ({}) => {
    if (CURRENT_USER_ROLE != 2) {
      return <Navigate to="/" />;
    }

    return <Outlet />;
  };

  const ProtectedCompany = ({}) => {
    if (CURRENT_USER_ROLE != 3) {
      return <Navigate to="/" />;
    }

    return <Outlet />;
  };

  const ProtectedAdmin = ({}) => {
    if (CURRENT_USER_ROLE != 4) {
      return <Navigate to="/" />;
    }

    return <Outlet />;
  };

  return (
    <AuthApi.Provider value={{auth, setAuth}}>
      <OtpApi.Provider value={{otp, setOtp}}>
        <RegApi.Provider value={{reg, setReg}}>
          <Router>
            <Routes>
            <Route path="/pushnotif" element={<PushNotif />} />
              <Route exact path="/" element={<ProtectedLogin/>}>
                <Route path="/" element={<OnBoarding handleWhoAmI={handleWhoAmI}/>}></Route>
                <Route path="forgor" element={<ForgotPassword/>}></Route>
                <Route path="email-forgor" element={<ForgotPasswordEmail/>}></Route>
                <Route exact path="/" element={<ProtectedOtp/>}>
                  <Route path="verify" element={<Verification />}></Route>
                </Route>\
                <Route exact path="/" element={<ProtectedRegistering/>}>
                  <Route path="register" element={<Register />}></Route>
                </Route>
              </Route>            
              
              <Route path="approval" element={<Approval />}></Route>
              <Route path="*" element={<PageNotFound />}></Route>
              {/* <Route path="company" element={<PageNotFound />}></Route> */}

          <Route exact path="/" element={<ProtectedRoute />}>
            <Route exact path="/" element={<ProtectedCompany />}>
              <Route path="company" element={<DashboardLayout CURRENT_USER={CURRENT_USER} />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="wetleaves" element={<WetLeavesXYZ />} />
                <Route path="wetoverview" element={<WetLeavesOverview />} />
                <Route path="dryleaves" element={<DryLeavesXYZ />} />
                <Route path="dryoverview" element={<DryLeavesOverview />} />
                <Route path="powder" element={<PowderXYZ />} />
                <Route path="powderoverview" element={<PowderOverview />} />
                <Route path="shipment" element={<ShipmentXYZ />} />
                <Route path="performance" element={<Performance />} />
                <Route path="pickup" element={<Pickup />} />
                <Route path="shipmentdetails" element={<ShipmentDetails />} />
                <Route path="reception" element={<Reception />}>
                  <Route path="centra" element={<CentraTabContent />} />
                  <Route path="harbor" element={<HarborTabContent />} />
                </Route>
              </Route>
            </Route>
          </Route>

          <Route exact path="/" element={<ProtectedRoute />}>
            <Route exact path="/" element={<ProtectedHarbor />}>
              <Route path="harbor" element={<HarborLayout />}>
                <Route path="dashboard" element={<DashboardHarbor />} />
                <Route path="reception" element={<HarborReception />} />
                <Route path="Scanner" element={<HarborScanner />} />
              </Route>
            </Route>
          </Route>

          <Route exact path="/" element={<ProtectedRoute />}>
            <Route exact path="/" element={<ProtectedCentra />}>
              <Route path="centra" element={<CentraLayout CURRENT_USER={CURRENT_USER} />}>
                <Route path="Dashboard" element={<DashboardCentra />} />
                <Route path="Wet Leaves" element={<WetLeaves />} />
                <Route path="Dry Leaves" element={<DryLeaves />} />
                <Route path="Powder" element={<Powder />} />
                <Route path="Shipment" element={<Shipment />}>
                  <Route path="ShipmentOrder" element={<ShipmentOrders />} />
                  <Route path="ShipmentSent" element={<ShipmentSent />} />
                  <Route path="ShipmentCompleted" element={<ShipmentCompleted />} />

                </Route>
              </Route>
            </Route>
          </Route>

          <Route exact path="/" element={<ProtectedRoute />}>
            <Route exact path="/" element={<ProtectedCompany />}>
              <Route path="xyzmobile" element={<XYZLayout />}>
              <Route path="dashboard" element={<DashboardXYZ />} />
              <Route path="Shipment List" element={<XYZShipmentList />} />
              <Route path="Scanner" element={<XYZScanner />} />
              <Route path="Tracker/:id" element={<Tracker />} /> {/* Dynamic route for Tracker */}
              </Route>
              <Route path="xyzshipmentdetail" element={<XYZShipmentDetail />} />
            </Route>
          </Route>

          <Route exact path="/" element={<ProtectedRoute />}>
            <Route exact path="/" element={<ProtectedAdmin />}>
              <Route path="admin" element={<AdminLayout CURRENT_USER={CURRENT_USER}/>}>
                <Route path="dashboard" element={<DashboardAdmin />} />
                <Route path="wet leaves" element={<AdminWetLeaves />} />
                <Route path="dry leaves" element={<AdminDryLeaves />} />
                <Route path="powder" element={<AdminPowder />} />
                <Route path="user management" element={<AdminUserTable />} />
                <Route path="shipment" element={<AdminShipment />} />
                <Route path="shipmentdetails" element={<AdminShipmentDetails />} />
                <Route path="user approval" element={<AdminUserApproval />} />
              </Route>
            </Route>
          </Route>
          <Route path="/pdfdownload" element={<DownloadPDF/>} />

          <Route path="qr" element={<QRPage />} />
        </Routes>
      </Router>
        </RegApi.Provider>
      </OtpApi.Provider>
    </AuthApi.Provider>
    
  );
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