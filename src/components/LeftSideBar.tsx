import { memo, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, LogOut, RefreshCcw, Slack, UserPlus, Zap } from 'react-feather';
import ConnectWallet from './ConnectWallet';
import ComingSoon from './ComingSoon';
import SoulNFTComingSoon from './SoulNFTComingSoon';
import { CONNECT_WALLET_BTN } from '../utils/Enum';
import walletXLogo from '../assets/walletx.png';
import souldNFTGIF from '../assets/souls/soulNFTDemo1.gif';
import telegramIcon from '../assets/telegramIcon.svg';
import twitterIcon from '../assets/twitterIcon.svg';
import discordIcon from '../assets/discordIcon.svg';

interface ConnectWalletType {
  disconnectWallet: () => void;
}

const sidebarButtons = [
  { icon: <Home />, label: 'Home', route: '/' },
  { icon: <Slack />, label: 'Rewards', route: '/rewards' },
  { icon: <Zap />, label: 'Soul NFTs', isComingSoon: true, route: null },
  {
    icon: <RefreshCcw />,
    label: 'EXP to $WAX',
    isComingSoon: true,
    route: null,
  },
  {
    icon: <UserPlus />,
    label: 'Refer friends',
    isComingSoon: true,
    route: null,
  },
];

const socialIcons = [
  {
    icon: twitterIcon,
    alt: 'twitterIcon',
    href: 'https://twitter.com/getWalletX',
    height: 'h-6',
  },
  {
    icon: telegramIcon,
    alt: 'telegramIcon',
    href: 'https://t.me/getwalletx',
    height: 'h-8',
  },
  {
    icon: discordIcon,
    alt: 'discordIcon',
    href: 'https://discord.com/invite/GNFPRUxxKW',
    height: 'h-9',
  },
];

const LeftSideBar = () => {
  const connectWalletRef = useRef<ConnectWalletType>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    console.log('Please logout');
    connectWalletRef.current?.disconnectWallet();
  };

  const handleButtonClick = (route: string | null) => {
    if (route) {
      navigate(route);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="w-full flex justify-center items-center text-white mt-2 ml-2">
        <img className="w-80" src={walletXLogo} alt="walletXLogo" />
      </div>
      <div className="relative flex-1 overflow-y-auto bg-zinc-900 border-y rounded-xl border-y-[#a66cff] px-5 mt-8">
        <div className="mt-2">
          <SoulNFTComingSoon>
            <img className="h-16" src={souldNFTGIF} alt="Soul NFT" />
          </SoulNFTComingSoon>
        </div>
        <div className="flex flex-col gap-8 py-8 px-4 rounded-xl neomorphic w-full mt-5">
          {sidebarButtons.map(({ icon, label, isComingSoon, route }, index) => (
            <div key={index} className="overflow-hidden">
              {isComingSoon ? (
                <ComingSoon>
                  <button className="flex items-center gap-2 text-xl text-neutral-100 opacity-20">
                    {icon} {label}
                  </button>
                </ComingSoon>
              ) : (
                <button
                  className={`flex items-center gap-3 text-2xl text-neutral-100 ${
                    location.pathname === route ? 'opacity-100' : 'opacity-20'
                  }`}
                  onClick={() => handleButtonClick(route)}
                >
                  {icon} {label}
                </button>
              )}
            </div>
          ))}
        </div>
        <div className="absolute bottom-5 left-1/2 translate-x-[-50%] w-full flex flex-col gap-3 justify-center items-center">
          <div className="flex justify-center items-center gap-10">
            {socialIcons.map(({ icon, alt, href, height }, index) => (
              <a key={index} href={href} target="_blank" rel="noopener noreferrer">
                <img className={height} src={icon} alt={alt} />
              </a>
            ))}
          </div>
          <ConnectWallet ref={connectWalletRef} btnType={CONNECT_WALLET_BTN.DISCONNECT} navigateTo="/login" />
          <button
            className="px-4 flex gap-3 text-lg text-gray-200 justify-center items-center py-2 shadow-inner shadow-black bg-[#B23B3B] rounded-lg"
            onClick={handleLogout}
          >
            <LogOut /> Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(LeftSideBar);
