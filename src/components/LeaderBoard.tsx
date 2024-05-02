import EXPIcon from '../assets/EXP.png';
import { generateAddressIcon, truncateAddress } from '../utils/helper';
import { LeaderBoardType } from '../utils/Types';

type LeaderBoardProp = {
  leaderBoardData: LeaderBoardType[];
};

const LeaderBoard = ({ _leaderBoardData }: LeaderBoardProp) => {
  const leaderBoardData = [
    {
      address: '0x1234567890',
      EXP: 100,
    },
    {
      address: '0x1234567890',
      EXP: 30,
    },
    {
      address: '0x1234567890',
      EXP: 70,
    },
    {
      address: '0x1234567890',
      EXP: 80,
    },
    {
      address: '0x1234567890',
      EXP: 60,
    },
    {
      address: '0x1234567890',
      EXP: 80,
    },
    {
      address: '0x1234567890',
      EXP: 60,
    },
    {
      address: '0x1234567890',
      EXP: 80,
    },
    {
      address: '0x1234567890',
      EXP: 60,
    },
    {
      address: '0x1234567890',
      EXP: 80,
    },
    {
      address: '0x1234567890',
      EXP: 60,
    },
    {
      address: '0x1234567890',
      EXP: 80,
    },
    {
      address: '0x1234567890',
      EXP: 60,
    },
  ];
  const lifetimeUsers = leaderBoardData.sort((a, b) => b.EXP - a.EXP); // Sort by earnedEXP in descending order

  return (
    <div className="h-[54%] flex-col px-6 py-2 border-y-2 bg-[#262626] rounded-xl border-y-[#cff500]   neomorphic__big ">
      <p className="text-3xl tracking-wider sticky mt-4">LeaderBoard</p>

      <div className="max-h-[85%] overflow-y-scroll py-1">
        <div className=" w-full flex justify-center items-center flex-col gap-4 py-4">
          {lifetimeUsers.map((user, index) => {
            return (
              <div
                key={index}
                className="flex justify-between  w-[90%] px-2 py-1 rounded-xl  neomorphic hover:border-[#a66cff] "
              >
                <div className="flex gap-2 py-1">
                  <img className=" rounded-full h-8 " src={generateAddressIcon(user.address)} alt="PFP icon" />
                  <div>
                    <p className="text-xl">{truncateAddress(user.address)}</p>
                    <p className="text-sm text-opacity-90">{truncateAddress(user.address)}</p>
                  </div>
                </div>
                <div className=" flex justify-end items-center gap-2 min-w-[25%]">
                  <span className=" text-xl">{user.EXP}</span>
                  <img className="h-8" src={EXPIcon} alt="exp icon" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LeaderBoard;
