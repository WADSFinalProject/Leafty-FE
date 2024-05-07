import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './style/App.css'
import './style/font.css'
import OnBoarding from "./pages/OnBoarding";
import Verification from "./pages/Verification";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Approval from "./pages/Approval";
import DashboardHarbor from "./pages/DashboardHarbor";

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
      </Routes>
    </Router>
  )
}

export default App;