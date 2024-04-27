import EXPIcon from '../assets/EXP.png';
import pfpIcon from '../assets/default.jpeg';
import TaskIcon from '../assets/taskIcon.png';
import { UserDetailsType } from '../utils/Types';
import { generateAddressIcon, truncateAddress } from '../utils/helper';

const UserDetails = ({ address, completedTasks, earnedEXP, role, userName }: UserDetailsType) => {
  const ListOfSponsors = [
    {
      name: 'LedgerCompany',
      icon: `${pfpIcon}`,
      adLink: 'this is the ad link',
    },
    {
      name: 'LedgerCompany',
      icon: `${pfpIcon}`,
      adLink: 'this is the ad link',
    },
    {
      name: 'LedgerCompany',
      icon: `${pfpIcon}`,
      adLink: 'this is the ad link',
    },
    {
      name: 'LedgerCompany',
      icon: `${pfpIcon}`,
      adLink: 'this is the ad link',
    },
    {
      name: 'LedgerCompany',
      icon: `${pfpIcon}`,
      adLink: 'this is the ad link',
    },
    {
      name: 'LedgerCompany',
      icon: `${pfpIcon}`,
      adLink: 'this is the ad link',
    },
    {
      name: 'LedgerCompany',
      icon: `${pfpIcon}`,
      adLink: 'this is the ad link',
    },
  ];
  return (
    <>
      <div
        key={role}
        className="  h-full rounded-3xl flex-col px-6 py-2 border-2 border-[#1e2025] hover:border-[#cff500] "
      >
        <p className="text-3xl  tracking-wider mb-2 ">Welcome</p>
        <div className=" flex flex-col gap-4">
          <div className=" flex justify-between w-full py-2">
            <div className="flex gap-2">
              <img className="rounded-2xl w-12 h-12 bg-[#1e2025]  " src={generateAddressIcon(address)} alt="PFP icon" />
              <div>
                <p className="text-2xl">{userName}</p>
                <p className="text-base text-opacity-90">{truncateAddress(address)}</p>
              </div>
            </div>
          </div>

          <div className=" flex justify-evenly gap-4 w-full ">
            <div className="w-[40%] px-2 pt-1  bg-[#1e2025] rounded-2xl flex flex-col  ">
              <p className=" text-center text-sm text-gray-400">Task Completed</p>
              <div className=" flex gap-2  justify-center items-center py-1">
                <img className="h-8 " src={TaskIcon} alt="Exp Icon " />
                <span className="text-2xl">{completedTasks.length}</span>
              </div>
            </div>
            <div className="w-[40%] px-2 pt-1 bg-[#1e2025] rounded-2xl flex flex-col  ">
              <p className=" text-center text-sm text-gray-400">EXP Earned</p>
              <div className=" flex gap-2  justify-center items-center py-1 ">
                <img className="h-8 " src={EXPIcon} alt="Exp Icon " />
                <span className="text-2xl">{earnedEXP}</span>
              </div>
            </div>
          </div>

          <div>
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
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDetails;
