import EXPIcon from '../assets/EXP.png';
import TaskIcon from '../assets/taskIcon.png';
import { UserDetailsType } from '../utils/Types';
import { generateAddressIcon, truncateAddress } from '../utils/helper';

const UserDetails = ({ address, completedTasks, earnedEXP, role, userName }: UserDetailsType) => {
  return (
    <>
      <div
        key={role}
        className=" flex   h-fit flex-col px-8 py-4 pb-4  bg-zinc-900 border-y rounded-xl border-y-[#a66cff]  neomorphic__big "
      >
        <p className="text-4xl  tracking-wide mb-4 text-center ">Welcome </p>
        <div className=" flex flex-col gap-4 justify-center w-full">
          <div className=" flex justify-between w-full px-4 py-3 bg-zinc-900 border-y rounded-xl border-y-[#a66cff]  neomorphic">
            <div className="flex gap-2 overflow-hidden truncate lg:w-full">
              <img className="rounded-2xl w-12 h-12 bg-[#1e2025]  " src={generateAddressIcon(address)} alt="PFP icon" />
              <div className="truncate w-full">
                <p className="text-2xl w-full truncate">{userName}</p>
                <p className="text-base text-opacity-90">{truncateAddress(address)}</p>
              </div>
            </div>
          </div>

          <div className=" flex  gap-4 w-full ">
            <div className="w-full px-3 py-3   flex flex-col rounded-xl neomorphic hover:border-[#a66cff]  ">
              <p className=" text-center text-sm ">Total EXP Earned</p>
              <div className=" flex gap-2  justify-center items-center pt-1">
                <img className="h-6 " src={EXPIcon} alt="Exp Icon " />
                <span className="text-lg font-semibold">{earnedEXP}</span>
              </div>
            </div>
            <div className="w-full px-3 py-3 flex flex-col rounded-xl neomorphic hover:border-[#a66cff]  ">
              <p className=" text-center text-sm ">Task Completed</p>
              <div className=" flex gap-2  justify-center items-center pt-1">
                <img className="h-6 " src={TaskIcon} alt="Exp Icon " />
                <span className="text-lg font-semibold">{completedTasks.length}</span>
              </div>
            </div>
          </div>

          {/* <div>
            <p className="text-xl"> Your Sponsors:</p>
            <div className=" flex gap-3 max-w-full overflow-x-auto ">
              {ListOfSponsors.map((sponsor) => {
                return (
                  <>
                    <div className="px-2 py-1 min-w-fit ">
                      <img className="h-7 rounded-full " src={sponsor.icon} alt="Sponsor " />
                    </div>
                  </>
                );
              })}
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default UserDetails;
