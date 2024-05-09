import { useEffect } from 'react';
import ConnectWallet from '../components/ConnectWallet';
import { CONNECT_WALLET_BTN } from '../utils/Enum';
import { getFromLocalStorage } from '../utils/helper';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const isAuthenticated = getFromLocalStorage('authenticated');

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      <div className="glass absolute h-screen top-0 w-full flex justify-center items-center bg-black ">
        <ConnectWallet btnType={CONNECT_WALLET_BTN.CONNECT} navigateTo="/dashboard" />
      </div>
    </>
  );
};

export default Home;
