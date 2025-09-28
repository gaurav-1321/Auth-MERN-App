import { useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './App.css';
import Home from './Components/Home';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Refreshhandler from './Refreshhandler';
function App() {
  const navigate=useNavigate();
  const [isauth,setisauth]=useState(false);
  const PrivateRoute =({element})=>{
    return isauth ? element : <Navigate to='/login'/>

  }
  return (
  <div className='App'>
    <Refreshhandler setisauth={setisauth}/>
    <Routes>
     <Route path='/signup' element={<Signup/>}/>
      <Route path='/login' element={<Login/>}/>
       <Route path='/home' element={<PrivateRoute element ={<Home/>}/>} />
      
    </Routes>
    <ToastContainer/>

  </div>
  );
}

export default App;
