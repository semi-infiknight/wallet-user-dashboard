/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { HelpCircle } from 'react-feather';
import souldNFTGIF from '../assets/souls/soulNFTDemo1.gif';

const SoulNFTComingSoon = ({ children }) => {
  console.log(children);

  return (
    <div className="relative group">
      <div className="flex items-center gap-2">
        <img className="h-16" src={souldNFTGIF} alt="Soul NFT" />
        <div className="left-16 top-20 p-2 bg-white bg-opacity-30 text-gray-200 px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm flex flex-col items-center  ">
          <span className=" flex whitespace-nowrap w-42 gap-1 ">
            What is WalletX Soul NFTs{' '}
            <a href="https://t.me/getwalletx/223" target="_blank" rel="noopener noreferrer">
              <HelpCircle className="h-5" />
            </a>
          </span>

          <span className="italic place-self-start">Coming soon</span>
        </div>
      </div>
    </div>
  );
};

export default SoulNFTComingSoon;
