import EXPIcon from '../assets/EXP.png';
import { generateAddressIcon, truncateAddress } from '../utils/helper';
import { LeaderBoardType } from '../utils/Types';

type LeaderBoardProp = {
  _leaderBoardData: LeaderBoardType[];
};

const LeaderBoard = ({ _leaderBoardData }: LeaderBoardProp) => {
  const lifetimeUsers = _leaderBoardData.sort((a, b) => b.EXP - a.EXP);

  return (
    <div className="h-[78%] flex-col px-6 py-2 border-y bg-[#262626] rounded-xl border-y-[#a66cff]   neomorphic__big ">
      <p className="text-3xl tracking-wider sticky mt-4">Leaderboard</p>

      <div className="max-h-[85%] overflow-y-scroll py-1">
        <div className=" w-full flex justify-center items-center flex-col gap-4 py-4">
          {lifetimeUsers.map((user, index) => {
            return (
              <div
                key={index}
                className="flex justify-between  w-[90%] px-2 py-1 rounded-xl  neomorphic hover:border-[#a66cff] "
              >
                <div className="flex justify-center items-center gap-2 py-2">
                  <img
                    className=" rounded-xl h-10 bg-[#1e2025] "
                    src={generateAddressIcon(user.address)}
                    alt="PFP icon"
                  />
                  <p className="text-xl">{truncateAddress(user.address)}</p>
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
