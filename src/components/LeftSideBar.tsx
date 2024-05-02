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
    <div className=" h-screen min-w-[22%] pl-14 pr-4 pt-14  ">
      <div className="w-full flex items-center text-white mt-2">
        <p className="text-4xl">Wallet</p>
        <img className="w-14" src={walletXLogo} alt="walletXLogo" />
      </div>

      <div className="relative h-[75%] bg-[#262626] border-y-2 rounded-xl border-y-[#cff500] px-5 mt-20 pt-20">
        <div className="flex gap-8 flex-col  py-6 px-4   rounded-xl shadow-inner   ">
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
          className="  absolute bottom-8 left-1/2 translate-x-[-50%]  w-[65%] px-2 flex gap-3 text-xl text-gray-200 justify-center items-center py-2 bg-red-700 rounded-lg"
          onClick={handleLogout}
        >
          <LogOut />
          Logout
        </button>
      </div>
    </div>
  );
};

export default LeftSideBar;
