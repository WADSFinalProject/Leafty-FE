import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './App.css'
import OnBoarding from "./pages/OnBoarding";
import Verification from "./pages/Verification";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

function App(){
  return (
    <Router>
      <Routes>
        <Route path="/" element = {<OnBoarding />}></Route>
        <Route path="/verify" element = {<Verification />}></Route>
        <Route path="/register" element = {<Register />}></Route>
        <Route path="/dashboard" element = {<Dashboard />}></Route>
      </Routes>
    </Router>
  )
}

export default App;