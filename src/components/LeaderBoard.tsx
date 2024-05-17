import EXPIcon from '../assets/EXP.png';
import { generateAddressIcon, truncateAddress } from '../utils/helper';
import { LeaderBoardType } from '../utils/Types';

type LeaderBoardProp = {
  _leaderBoardData: LeaderBoardType[];
  userAddress: string;
};

const LeaderBoard = ({ _leaderBoardData, userAddress }: LeaderBoardProp) => {
  const lifetimeUsers = _leaderBoardData.filter((user) => user.EXP !== 0).sort((a, b) => b.EXP - a.EXP);

  return (
    <div className="h-fit xl:h-[65%] lg:h-[65%] flex-col px-6 py-4 border-y bg-[#262626] rounded-xl border-y-[#a66cff] neomorphic__big ">
      <p className="text-3xl tracking-wider sticky mt-4">Leaderboard</p>
      <div className=" max-h-[90%] lg:max-h-[90%] overflow-y-scroll py-1">
        <div className=" w-full flex justify-center items-center flex-col py-4 gap-4 ">
          {lifetimeUsers.map((user, index) => {
            const isUserAddress = user.address === userAddress;
            return (
              <div
                key={index}
                className={`flex justify-between w-[90%] px-2 py-1 rounded-xl neomorphic `}
              >
                <div className="flex justify-center items-center gap-2 py-2">
                  <img
                    className=" rounded-xl h-10 bg-[#1e2025] "
                    src={generateAddressIcon(user.address)}
                    alt="PFP icon"
                  />
                  <div>
                    <p className="text-xl">
                      {truncateAddress(user.address)}
                      {isUserAddress && <span className=" text-sm text-gray-200"> (You)</span>}
                    </p>
                    <p className="text-gray-400 text-sm">#{index + 1}</p>
                  </div>
                </div>
                <div className=" flex justify-end items-center gap-2 min-w-[25%]">
                  <span className=" text-lg">{user.EXP}</span>
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
