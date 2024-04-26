import ConnectWallet from '../components/ConnectWallet';
import { UserDetailsType } from '../utils/Types';
import { setToLocalStorage } from '../utils/helper';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleLogin = async (_userDetails: UserDetailsType) => {
    setToLocalStorage('authenticated', true);
    navigate('/dashboard', { state: { userDetails: _userDetails } });
  };

  return (
    <>
      <div className="glass absolute h-screen top-0 w-full flex justify-center items-center bg-black ">
        <ConnectWallet isLoggedIn={async (_userDetails: UserDetailsType) => await handleLogin(_userDetails)} />
      </div>
    </>
  );
};

export default Home;
