import { Home, LogOut, RefreshCcw, UserPlus } from 'react-feather';
import walletXLogo from '../assets/icons/main-logo.png';
import { removeFromLocalStorage } from '../utils/helper';
import { useNavigate } from 'react-router-dom';

const LeftSideBar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    // add a function of the logout from the wallet it self and call it here.
    removeFromLocalStorage('authenticated');
    navigate('/login');
  };
  return (
    <div className="relative h-screen min-w-[20%] bg-[#0f1114] pl-14 pr-4 pt-14 rounded-r-lg border-r-2  border-r-neutral-800">
      <div className="w-full flex items-center text-white mt-2">
        <p className="text-4xl">Wallet</p>
        <img className="w-14" src={walletXLogo} alt="walletXLogo" />
      </div>
      <div></div>
      <div className="flex gap-8 flex-col mt-20">
        <p className="flex items-center gap-2 text-xl text-neutral-100">
          <Home />
          Home
        </p>
        <p className="flex items-center gap-2 text-xl text-neutral-100 opacity-20">
          <RefreshCcw />
          EXP to WAX
        </p>
        <p className="flex items-center gap-2 text-xl text-neutral-100  opacity-20">
          <UserPlus />
          Refer
        </p>
      </div>

      <button
        className=" absolute bottom-8 left-1/2 translate-x-[-50%] w-[65%] px-2 flex gap-3 text-xl text-gray-200 justify-center items-center py-2 bg-red-700 rounded-lg"
        onClick={handleLogout}
      >
        <LogOut />
        Logout
      </button>
    </div>
  );
};

export default LeftSideBar;
