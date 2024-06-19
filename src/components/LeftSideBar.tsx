import { memo, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, LogOut, Slack, UserPlus, Zap } from 'react-feather';
import ConnectWallet from './ConnectWallet';
import ComingSoon from './ComingSoon';
import SoulNFTComingSoon from './SoulNFTComingSoon';
import { CONNECT_WALLET_BTN } from '../utils/Enum';
import walletXLogo from '../assets/walletx.png';
import souldNFTGIF from '../assets/souls/soulNFTDemo1.gif';
import telegramIcon from '../assets/socials/telegramIcon.svg';
import twitterIcon from '../assets/socials/twitterIcon.svg';
import discordIcon from '../assets/socials/discordIcon.svg';
import mediumIcon from '../assets/socials/medium.svg';
import soulExcite from '../assets/souls/soulExcite.gif';

interface ConnectWalletType {
  disconnectWallet: () => void;
}

const sidebarButtons = [
  { icon: <Home />, label: 'Home', route: '/' },
  { icon: <Slack />, label: 'Rewards', route: '/rewards' },
  { icon: <Zap />, label: 'Soul NFTs', isComingSoon: true, route: null },
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
    alt: 'twitter',
    href: 'https://twitter.com/getWalletX',
    height: 'h-6',
  },
  {
    icon: telegramIcon,
    alt: 'telegram',
    href: 'https://t.me/getwalletx',
    height: 'h-8',
  },
  {
    icon: discordIcon,
    alt: 'discord',
    href: 'https://discord.com/invite/GNFPRUxxKW',
    height: 'h-9',
  },
  {
    icon: mediumIcon,
    alt: 'medium',
    href: 'https://getwalletx.medium.com/',
    height: 'h-9',
  },
];

const LeftSideBar = () => {
  const connectWalletRef = useRef<ConnectWalletType>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    connectWalletRef.current?.disconnectWallet();
  };

  const handleButtonClick = (route: string | null) => {
    if (route) {
      navigate(route);
    }
  };

  const [showExcite, setShowExcite] = useState(false);
  const [time, setTime] = useState(Date.now());
  const [isClickable, setIsClickable] = useState(true);

  const handleClick = () => {
    if (isClickable) {
      setTime(Date.now());
      setShowExcite(true);
      setIsClickable(false); // Disable further clicks

      setTimeout(() => {
        setShowExcite(false);
      }, 1300);

      setTimeout(() => {
        setIsClickable(true); // Re-enable clicks after 2.3 seconds
      }, 1400);
    }
  };

  return (
    <div className="h-full flex flex-col ">
      <div className="w-full flex justify-center items-center text-white mt-2 ml-2">
        <img className="w-64" src={walletXLogo} alt="walletXLogo" />
      </div>
      <div className="relative flex-1  bg-zinc-900 border-y rounded-xl border-y-[#a66cff] px-5 mt-8">
        <div className="mt-2 cursor-pointer">
          <SoulNFTComingSoon>
            <button onClick={() => handleClick()} className="relative">
              <img
                className={`h-16 min-w-16 transform duration-700 ${!isClickable ? 'opacity-0' : ''}`}
                src={souldNFTGIF}
                alt="Soul NFT"
              />
              {showExcite && (
                <img
                  key={time}
                  className="absolute left-0 top-0 h-16 w-16 scale-[3]"
                  src={soulExcite}
                  alt="Soul NFT Excite"
                />
              )}
            </button>
          </SoulNFTComingSoon>
        </div>

        <div className="flex flex-col gap-6 justify-around py-8 px-4 rounded-xl neomorphic w-full mt-5">
          {sidebarButtons.map(({ icon, label, isComingSoon, route }, index) => (
            <div key={index}>
              {isComingSoon ? (
                <ComingSoon>
                  <button className="flex items-center gap-2 text-xl text-neutral-100 opacity-20">
                    {icon} {label}
                  </button>
                </ComingSoon>
              ) : (
                <button
                  className={`flex items-center gap-3 text-xl text-neutral-100 ${
                    location.pathname === route ? 'opacity-100' : 'opacity-60'
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
