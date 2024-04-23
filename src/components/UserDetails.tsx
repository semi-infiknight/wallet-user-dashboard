import { UserType } from '../utils/Enum';
import pfpIcon from '../assets/default.jpeg';
import EXPIcon from '../assets/XP.svg';
import TaskIcon from '../assets/taskIcon.png';
import { generateAddressIcon } from '../utils/helper';
const UserDetails = () => {
  const UserDetailsData = {
    _id: 1,
    walletName: 'Xhakti',
    addressID: '0x123',
    role: UserType.USER,
    completedTasks: [1, 2, 3],
    earnedEXP: 10,
  };

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
      <div className=" border-2 h-full rounded-3xl flex-col px-6 py-2 border-[#262626] hover:border-[#cff500] ">
        <p className="text-3xl text-[#cff500] tracking-wider ">Welcome,</p>
        <div className=" flex flex-col gap-2">
          <div className=" flex justify-between w-full py-2">
            <div className="flex gap-2">
              <img
                className=" rounded-xl h-10 border "
                src={generateAddressIcon(UserDetailsData.addressID)}
                alt="PFP icon"
              />
              <div>
                <p className="text-2xl">{UserDetailsData.walletName}</p>
                <p className="text-base text-opacity-90">{UserDetailsData.addressID}</p>
              </div>
            </div>
          </div>

          {/* <div className="flex justify-evenly items-center px-2 py-2 ">
            <div className="flex flex-col justify-center items-center">
              <span className="flex justify-center items-center text-3xl gap-2">
                {UserDetailsData.completedTasks.length}
              </span>
              <p className="text-sm text-gray-400">Task Completed</p>
            </div>
            <div className="flex flex-col justify-center items-center">
              <span className=" text-3xl">80</span>
              <p className="text-sm text-gray-400">Gasless Tx Completed</p>
            </div>
          </div> */}

          <div className=" flex justify-evenly gap-4 w-full ">
            <div className="w-[40%] px-2 pt-1  bg-[#262626] rounded-2xl flex flex-col  ">
              <p className=" text-center text-sm text-gray-400">Task Completed</p>
              <div className=" flex gap-2  justify-center items-center py-1">
                <img className="h-8 " src={TaskIcon} alt="Exp Icon " />
                <span className="text-2xl">{UserDetailsData.completedTasks.length}</span>
              </div>
            </div>
            <div className="w-[40%] px-2 pt-1 bg-[#262626] rounded-2xl flex flex-col  ">
              <p className=" text-center text-sm text-gray-400">EXP Earned</p>
              <div className=" flex gap-2  justify-center items-center py-1 ">
                <img className="h-8 " src={EXPIcon} alt="Exp Icon " />
                <span className="text-2xl">{UserDetailsData.completedTasks.length}</span>
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
