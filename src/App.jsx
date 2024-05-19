import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './style/App.css'
import './style/font.css'
import OnBoarding from "./pages/OnBoarding";
import Verification from "./pages/Verification";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Approval from "./pages/Approval";
import DashboardHarbor from "./pages/Harbor/DashboardHarbor";
import Example from "./pages/Example";
import PageNotFound from "./pages/PageNotFound";
import WetLeavesXYZ from "./pages/WetLeaves";
import DashboardLayout from "./pages/DashboardLayout";
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
import Reception from "./pages/Reception";
import CentraLayout from "./pages/Centra/CentraLayout";
import CentraTabContent from "./pages/CentraTabContent";
import HarborTabContent from "./pages/HarborTabContent";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<OnBoarding />}></Route>
        <Route path="verify" element={<Verification />}></Route>
        <Route path="register" element={<Register />}></Route>
        <Route path="approval" element={<Approval />}></Route>
        <Route path="*" element={<PageNotFound />}></Route>
        <Route path="company" element={<DashboardLayout />}>
          <Route path="dashboard" element={<Dashboard />}></Route>
          <Route path="wetleaves" element={<WetLeavesXYZ />}></Route>
          <Route path="reception" element={<Reception />}>
            <Route path = "centra" element = {<CentraTabContent />}></Route>
            <Route path = "harbor" element = {<HarborTabContent />}></Route>
          </Route>
        </Route>
        <Route path="harbor" element = {<HarborLayout />}>
          <Route path="dashboard" element={<DashboardHarbor />} />
          <Route path="reception" element={<HarborReception />} />
          <Route path="Scanner" element={<HarborScanner />} />
        </Route>
        <Route path= "centra" element = {<CentraLayout />}>
          <Route path = "Dashboard" element = {<DashboardCentra />}></Route>
          <Route path = "Wet Leaves" element = {<WetLeaves />}></Route>
          <Route path = "Dry Leaves" element = {<DryLeaves />}></Route>
          <Route path = "Powder" element = {<Powder />}></Route>
          <Route path = "Shipment" element = {<Shipment />}></Route>
        </Route>

        <Route path="/wetleavesdetail" element={<WetLeavesDetail />} />
      </Routes>
    </Router>
  )
}

export default App;
export const API_URL = "http://localhost:8000";