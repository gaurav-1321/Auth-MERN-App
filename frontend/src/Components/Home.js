import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handlesuccess } from "../util";

const Home = () => {
  const [loggedUser, setLoggedUser] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('loggedInUser');
    if (user) {
      setLoggedUser(user);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    handlesuccess('User is Logged Out !'); // show message before redirect
    setTimeout(() => {
      navigate('/login');
    }, 2000);
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>Welcome, {loggedUser} to the Home Page !!!</h1>
      <button onClick={handleLogout}
      >Logout</button>
      <ToastContainer/>
    </div>
  )
}

export default Home;
