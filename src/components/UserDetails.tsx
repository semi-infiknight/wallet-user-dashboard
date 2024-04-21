import { UserType } from "../utils/Enum";
import pfpIcon from "../assets/default.jpeg";
import expIcon from "../assets/Lightning icon 64.png";
const UserDetails = () => {
  const UserDetaisData = {
    _id: 1,
    walletName: "Xhakti",
    addressID: "0x123",
    role: UserType.USER,
    completedTasks: [1, 2, 3],
    earnedEXP: 10,
  };

  const ListOfSponsors = [
    {
      name: "LedgerCompany",
      icon: `${pfpIcon}`,
      adLink: "this is the ad link",
    },
    {
      name: "LedgerCompany",
      icon: `${pfpIcon}`,
      adLink: "this is the ad link",
    },
    {
      name: "LedgerCompany",
      icon: `${pfpIcon}`,
      adLink: "this is the ad link",
    },
    {
      name: "LedgerCompany",
      icon: `${pfpIcon}`,
      adLink: "this is the ad link",
    },
  ];

  return (
    <>
      <div className=" border h-full rounded-3xl flex-col px-6 py-2 border-[#a66cff] hover:border-[#cff500] ">
        <p className="text-3xl ">Welcome,</p>
        <div className=" flex flex-col gap-2">
          <div className=" flex justify-between w-full py-2">
            <div className="flex gap-2">
              <img
                className=" rounded-full h-10 "
                src={pfpIcon}
                alt="PFP icon"
              />
              <div>
                <p className="text-2xl">{UserDetaisData.walletName}</p>
                <p className="text-base text-opacity-90">
                  {UserDetaisData.addressID}
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center">
              <span className="text-lg flex ">
                <span className=" text-2xl ">{UserDetaisData.earnedEXP}</span>
                <img className="h-8" src={expIcon} alt="EXP Icon" />
              </span>
              <span className=" tracking-widest">EXP</span>
            </div>
          </div>

          <div className="flex justify-evenly items-center px-2 py-2 ">
            <div className="flex flex-col justify-center items-center">
              <span className="flex justify-center items-center text-3xl gap-2">
                {UserDetaisData.completedTasks.length}
              </span>
              <p className="text-sm text-gray-400">Task Completed</p>
            </div>
            <div className="flex flex-col justify-center items-center">
              <span className=" text-3xl">80</span>
              <p className="text-sm text-gray-400">Gasless Tx Completed</p>
            </div>
          </div>

          <div>
            <p className="text-xl"> Your Sponsors:</p>
            <div className=" flex gap-3">
              {ListOfSponsors.map((sponsor) => {
                return (
                  <>
                    <div className="px-2 py-1">
                      <img className="h-7 rounded-full " src={sponsor.icon} alt="Sponsor Image" />
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
