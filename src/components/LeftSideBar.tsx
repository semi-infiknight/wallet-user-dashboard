import { Home, LogOut, RefreshCcw, UserPlus } from 'react-feather';
import walletXLogo from '../assets/icons/main-logo.png';
import { removeFromLocalStorage } from '../utils/helper';
import { useNavigate } from 'react-router-dom';

import telegramIcon from '../assets/telegramIcon.svg';
import twitterIcon from '../assets/twitterIcon.svg';
import discordIcon from '../assets/discordIcon.svg';

const LeftSideBar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    // add a function of the logout from the wallet it self and call it here.
    removeFromLocalStorage('authenticated');
    navigate('/login');
  };
  return (
    <div className=" h-screen min-w-[22%] pl-14 pr-4 pt-14  ">
      <div className="w-full flex items-center text-white mt-2 ml-2">
        <p className="text-[3rem] font-[1000]">Wallet</p>
        <img className="w-20" src={walletXLogo} alt="walletXLogo" />
      </div>

      <div className="relative h-[79%] bg-[#262626] border-y-2 rounded-xl border-y-[#cff500] px-5 mt-8  pt-20 neomorphic__big">
        <div className="flex flex-col gap-12 py-10 px-4 rounded-xl mx-4 neomorphic  ">
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
            Refer frens
          </p>
        </div>

        {/* <div className="flex  justify-center items-center gap-10 ">
          <a href="https://twitter.com/getWalletX">
            <img className="h-7" src={twitterIcon} alt="telegramIcon" />
          </a>
          <a href="https://t.me/getwalletx">
            <img className="h-10" src={telegramIcon} alt="telegramIcon" />
          </a>
          <a href="https://discord.com/invite/GNFPRUxxKW">
            <img className="h-11" src={discordIcon} alt="telegramIcon" />
          </a>
        </div> */}

        <div className=" absolute bottom-8 left-1/2 translate-x-[-50%] w-full flex flex-col gap-3 justify-center items-center">
          <div className="flex  justify-center items-center gap-10 ">
            <a href="https://twitter.com/getWalletX">
              <img className="h-7" src={twitterIcon} alt="telegramIcon" />
            </a>
            <a href="https://t.me/getwalletx">
              <img className="h-10" src={telegramIcon} alt="telegramIcon" />
            </a>
            <a href="https://discord.com/invite/GNFPRUxxKW">
              <img className="h-11" src={discordIcon} alt="telegramIcon" />
            </a>
          </div>
          <button
            className="  px-2 flex gap-3 text-xl text-gray-200 justify-center items-center py-2 shadow-inner shadow-black bg-[#B23B3B] rounded-lg"
            onClick={handleLogout}
          >
            <LogOut />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeftSideBar;
