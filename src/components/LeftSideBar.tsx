import ConnectWallet from './ConnectWallet';
import { Home, LogOut, RefreshCcw, UserPlus } from 'react-feather';
import walletXLogo from '../assets/walletx.png';
import telegramIcon from '../assets/telegramIcon.svg';
import twitterIcon from '../assets/twitterIcon.svg';
import discordIcon from '../assets/discordIcon.svg';
import ComingSoon from './ComingSoon';
import { useRef } from 'react';
import { CONNECT_WALLET_BTN } from '../utils/Enum';

interface connectWalletType {
  disconnectWallet();
}

const LeftSideBar = () => {
  const connectWalletRef = useRef<connectWalletType>(null);

  return (
    <div className=" h-screen min-w-[22%] pl-14 pr-4 pt-14 ">
      <div className="w-full flex justify-center items-center text-white mt-2 ml-2">
        <img className="w-80" src={walletXLogo} alt="walletXLogo" />
      </div>
      <div className="relative h-[79%] bg-[#262626] border-y rounded-xl border-y-[#a66cff] px-5 mt-8 pt-20 neomorphic__big">
        <div className="flex flex-col gap-8 py-8 px-3 rounded-xl neomorphic w-full ">
          <button className="flex items-center gap-3 text-2xl text-neutral-100">
            <Home /> Home
          </button>
          <ComingSoon message="Not enough EXPs!">
            <button className="flex items-center gap-2 text-2xl text-neutral-100 opacity-20">
              <RefreshCcw /> EXP to $USDT
            </button>
          </ComingSoon>
          <ComingSoon>
            <button className="flex items-center gap-2 text-2xl text-neutral-100 opacity-20">
              <RefreshCcw /> EXP to $WAX
            </button>
          </ComingSoon>
          <ComingSoon>
            <button className="flex items-center gap-2 text-2xl text-neutral-100 opacity-20">
              <UserPlus /> Refer friends
            </button>
          </ComingSoon>
        </div>
        <div className=" absolute bottom-5 left-1/2 translate-x-[-50%] w-full flex flex-col gap-3 justify-center items-center">
          <div className="flex justify-center items-center gap-10 ">
            <a href="https://twitter.com/getWalletX" target="_blank" rel="noopener noreferrer">
              <img className="h-6" src={twitterIcon} alt="telegramIcon" />
            </a>
            <a href="https://t.me/getwalletx" target="_blank" rel="noopener noreferrer">
              <img className="h-8" src={telegramIcon} alt="telegramIcon" />
            </a>
            <a href="https://discord.com/invite/GNFPRUxxKW" rel="noopener noreferrer" target="_blank">
              <img className="h-9" src={discordIcon} alt="telegramIcon" />
            </a>
          </div>
          <ConnectWallet ref={connectWalletRef} btnType={CONNECT_WALLET_BTN.DISCONNECT} navigateTo={'/login'} />
          <button
            className=" px-4 flex gap-3 text-lg text-gray-200 justify-center items-center py-2 shadow-inner shadow-black bg-[#B23B3B] rounded-lg"
            onClick={() => {
              console.log('Please logout ');
              connectWalletRef.current?.disconnectWallet();
            }}
          >
            <LogOut /> Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeftSideBar;
