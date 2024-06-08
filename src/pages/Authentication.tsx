import { useEffect } from 'react';
import ConnectWallet from '../components/ConnectWallet';
import { CONNECT_WALLET_BTN } from '../utils/Enum';
import { getFromLocalStorage } from '../utils/helper';
import { useNavigate } from 'react-router-dom';

const Authentication = () => {
  const navigate = useNavigate();
  const isAuthenticated = getFromLocalStorage('authenticated');

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      <div className="glass absolute top-0 w-full login-bg">
        <div className='h-screen flex justify-center items-center bg-black bg-opacity-20 backdrop-blur-[8px] '>

        <ConnectWallet btnType={CONNECT_WALLET_BTN.CONNECT} navigateTo="/" />
        </div>
      </div>
    </>
  );
};

export default Authentication;
