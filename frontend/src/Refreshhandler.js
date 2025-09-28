import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const RefreshHandler = ({ setisauth }) => { // accept setisauth as a prop if needed
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      if (setisauth) setisauth(true); // optional: update auth state
      if (
        location.pathname === '/' ||
        location.pathname === '/login' ||
        location.pathname === '/signup'
      ) {
        navigate('/home', { replace: true }); // redirect to home
      }
    }
  }, [location, navigate, setisauth]);

  return null;
};

export default RefreshHandler;
