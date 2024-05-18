import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './style/App.css'
import './style/font.css'
import OnBoarding from "./pages/OnBoarding";
import Verification from "./pages/Verification";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Approval from "./pages/Approval";
import DashboardHarbor from "./pages/DashboardHarbor";
import Example from "./pages/Example";
import DashboardCentra from "./pages/Centra/DashboardCentra";
import WetLeaves from "./pages/Centra/WetLeaves";
import WetLeavesDetail from "./pages/Centra/WetLeavesDetail";
import DryLeaves from "./pages/Centra/DryLeaves";
import DryLeavesDetail from "./pages/Centra/DryLeavesDetail";
import Powder from "./pages/Centra/Powder";
import PowderDetail from "./pages/Centra/PowderDetail";
import Shipment from "./pages/Centra/Shipment";
import ShipmentDetail from "./pages/Centra/ShipmentDetail";

function App(){
  return (
    <Router>
      <Routes>
        <Route path="/" element = {<OnBoarding />}></Route>
        <Route path="/verify" element = {<Verification />}></Route>
        <Route path="/register" element = {<Register />}></Route>
        <Route path="/dashboard" element = {<Dashboard />}></Route>
        <Route path="/approval" element = {<Approval />}></Route>
        <Route path = "/dashboardHarbor" element = {<DashboardHarbor />} />
        <Route path = "/test" element = {<Example />}></Route>
        <Route path = "/dashboardCentra" element = {<DashboardCentra />} />
        <Route path = "/wetleaves" element = {<WetLeaves />} />
        <Route path = "/wetleavesdetail" element = {<WetLeavesDetail />} />
        <Route path = "/dryleaves" element = {<DryLeaves />} />
        <Route path = "/dryleavesdetail" element = {<DryLeavesDetail />} />
        <Route path = "/powder" element = {<Powder />} />
        <Route path = "/powderdetail" element = {<PowderDetail />} />
        <Route path = "/shipment" element = {<Shipment />} />
        <Route path = "/shipmentdetail" element = {<ShipmentDetail />} />
      </Routes>
    </Router>
  )
}

export default App;