
import Login from "./components/Login"
import Roleselection from "./components/Roleselection"
import Signup from "./components/Signup"
import Verify from "./components/Verify"
import FarmerDashboard from "./components/Farmerdashboard";
import FarmerPreferences from "./components/FarmerPreferences";
import ReactDOM from 'react-dom/client'; // Use createRoot for React 18+
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Import BrowserRouter
import VoiceNav from "./components/VoiceNav";
import Accessibility from "./components/Accessibility";

function App() {

  return (
    <>
      <BrowserRouter>
      <VoiceNav/>
      <Accessibility/>
        <Routes>
          <Route path="/" element={<Login/>}></Route>
          <Route path="/Signup" element={<Signup/>}></Route>
          <Route path="/Verify" element={<Verify/>}></Route>
          <Route path="/Farmer-preferences" element={<FarmerPreferences/>}></Route>
          <Route path="/Farmer-dashboard" element={<FarmerDashboard/>}></Route>
  
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
