import './App.css';
import Login from './login/Login.js';
import Register from './login/Register';
import Home from './index/Home.js';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Update from './index/Update';
import Spareparts from './Spareparts/spareparts';


function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Spareparts" element={<Spareparts />} />
          <Route path="/register" element={<Register />} />
          <Route path='/Update/:user_id' element={<Update />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
