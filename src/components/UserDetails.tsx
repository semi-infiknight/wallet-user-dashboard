import EXPIcon from '../assets/EXP.png';
// import pfpIcon from '../assets/default.jpeg';
import TaskIcon from '../assets/taskIcon.png';
import { UserDetailsType } from '../utils/Types';
import { generateAddressIcon, truncateAddress } from '../utils/helper';

const UserDetails = ({ address, completedTasks, earnedEXP, role, userName }: UserDetailsType) => {
  // const ListOfSponsors = [
  //   {
  //     name: 'LedgerCompany',
  //     icon: `${pfpIcon}`,
  //     adLink: 'this is the ad link',
  //   },
  //   {
  //     name: 'LedgerCompany',
  //     icon: `${pfpIcon}`,
  //     adLink: 'this is the ad link',
  //   },
  //   {
  //     name: 'LedgerCompany',
  //     icon: `${pfpIcon}`,
  //     adLink: 'this is the ad link',
  //   },
  //   {
  //     name: 'LedgerCompany',
  //     icon: `${pfpIcon}`,
  //     adLink: 'this is the ad link',
  //   },
  //   {
  //     name: 'LedgerCompany',
  //     icon: `${pfpIcon}`,
  //     adLink: 'this is the ad link',
  //   },
  //   {
  //     name: 'LedgerCompany',
  //     icon: `${pfpIcon}`,
  //     adLink: 'this is the ad link',
  //   },
  //   {
  //     name: 'LedgerCompany',
  //     icon: `${pfpIcon}`,
  //     adLink: 'this is the ad link',
  //   },
  // ];
  return (
    <>
      <div
        key={role}
        className=" flex justify-center items-center  h-full flex-col px-6 py-4 pb-4  bg-[#262626] border-y-2 rounded-xl border-y-[#cff500]  neomorphic__big "
      >
        <p className="text-4xl  tracking-wider mb-2 ">Welcome</p>
        <div className=" flex flex-col gap-4 justify-center">
          <div className=" flex justify-between w-full py-2 px-3 bg-[#262626] border-y-2 rounded-xl border-y-[#cff500]  neomorphic">
            <div className="flex gap-2">
              <img className="rounded-2xl w-12 h-12 bg-[#1e2025]  " src={generateAddressIcon(address)} alt="PFP icon" />
              <div>
                <p className="text-2xl">{userName}</p>
                <p className="text-base text-opacity-90">{truncateAddress(address)}</p>
              </div>
            </div>
          </div>

          <div className=" flex flex-col gap-4 w-full ">
            <div className="w-full px-2 pt-2  flex flex-col rounded-xl neomorphic hover:border-[#a66cff]  ">
              <p className=" text-center text-sm ">Total EXP Earned</p>
              <div className=" flex gap-2  justify-center items-center py-1 ">
                <img className="h-6 " src={EXPIcon} alt="Exp Icon " />
                <span className="text-lg font-semibold">{earnedEXP}</span>
              </div>
            </div>
            <div className="w-full px-2 pt-2  flex flex-col rounded-xl neomorphic hover:border-[#a66cff]  ">
              <p className=" text-center text-sm ">Task Completed</p>
              <div className=" flex gap-2  justify-center items-center py-1">
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
