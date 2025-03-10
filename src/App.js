import './App.css';
import Login from './api/login';
import Register from './api/Register';
import Home from './index/Home.js';
import User from './index/User.js';
import {BrowserRouter,Routes,Route } from "react-router-dom";
import Update from './index/Update';
import Spareparts from './Spareparts/spareparts';
import Requests from './Request/RequestForm';
import Notifications from './Request/Notifications';
import { useEffect, useState } from 'react';
import AdminDashboard from './Position/AdminDashboard'
import EngineerDashboard from './Position/EngineerDashboard'
import TechnicianDashboard from './Position/TechnicianDashboard'
import AssistantEngineerDashBoard from './Position/AssistantEngineerDashBoard';



function App() {

  const [usePosition,setUserPosition] = useState(null)

  useEffect(()=>{
    const storePosition = localStorage.getItem('position')
    if(storePosition){
      setUserPosition(storePosition)
    }
  },[])

  const handleLogin = (position)=>{
    setUserPosition(position)
    localStorage.setItem('position',position)
  }
  const handleLogout = ()=>{
    setUserPosition(null)
    localStorage.removeItem('position')
  }

  return (
    <div className="App">
      
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login onLogin={handleLogin} />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/User" element={<User />} />
          <Route path="/Spareparts" element={<Spareparts />} />
          <Route path="/Requests" element={<Requests />} />
          <Route path="/Notifications" element={<Notifications />} />
          <Route path="/register" element={<Register />} />
          <Route path='/Update/:user_id' element={<Update />} />

        {usePosition === 'admin' &&(
          <Route path='/Admin' element={<AdminDashboard onLogout={handleLogout} />} />
        )}

        {usePosition === 'Engineer' &&(
          <Route path='/Engineer' element={<EngineerDashboard onLogout={handleLogout} />} />
        )}

        {usePosition === 'Technician' &&(
          <Route path='/Technician' element={<TechnicianDashboard onLogout={handleLogout} />} />
        )}

        {usePosition === 'Assistant_Engineer' &&(
                  <Route path='/Assistant_Engineer' element={<AssistantEngineerDashBoard onLogout={handleLogout} />} />
        )}

        {/* <Route path='*' element={<Navigate to="/" />} /> */}

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
