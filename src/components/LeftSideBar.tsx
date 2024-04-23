import { Home, LogOut, RefreshCcw, UserPlus } from 'react-feather';
import walletXLogo from '../assets/icons/main-logo.png';
import exp from '../assets/XP.svg';
import { generateAddressIcon } from '../utils/helper';

const LeftSideBar = () => {
  return (
    <div className="relative h-screen min-w-[20%] bg-[#141414] pl-14 pr-4 pt-14 rounded-r-lg border-r-2  border-r-neutral-800">
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

      <div className=" absolute bottom-8 rounded-xl shadow py-4 px-3 flex flex-col  gap-4 justify-center items-center drop-shadow shadow-[#cff500] w-[80%] left-1/2 translate-x-[-50%]">
        <div className="flex gap-2 justify-center items-center">
          <img src={generateAddressIcon('0x123...Abc')} alt="pfp" className="rounded-full w-12 h-12" />
          <div className="mt-2">
            <p className=" text-lg">0x123...Abc</p>
            <p className="flex gap-1 items-center ">
              <img className="w-6  " src={exp} alt="exp points" /> 100
            </p>
          </div>
        </div>

        <button className=" w-[75%] px-2 flex gap-3 text-lg justify-center items-center py-1 bg-red-600 rounded-lg">
          <LogOut />
          Logout
        </button>
      </div>
    </div>
  );
};

export default LeftSideBar;
