import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { getFromLocalStorage } from '../utils/helper';
import { useEffect, useState } from 'react';

const PrivateRoutes = () => {
  const isAuthenticated = getFromLocalStorage('authenticated');
  const [login, setLogin] = useState(!!isAuthenticated);

  const navigate = useNavigate();
  console.log('log', login, isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      setLogin(true);
    }
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  console.log(isAuthenticated, 'inside', login);

  return <>{login ? <Outlet /> : <Navigate to="/login" />} </>;
};

export default PrivateRoutes;
