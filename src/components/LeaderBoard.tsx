import { UserType } from '../utils/Enum';
import { useState } from 'react';
import EXPIcon from '../assets/EXP.png';
import { generateAddressIcon } from '../utils/helper';

const LeaderBoard = () => {
  const ListOfUsers = [
    {
      _id: 1,
      walletName: 'Xhakti',
      addressID: '0x1231211223423223',
      role: UserType.USER,
      completedTasks: [1, 2, 3],
      earnedEXP: 10,
      lastActivityTime: new Date('2023-04-19T12:00:00Z'), // Example date for 24-hour calculation
    },
    {
      _id: 2,
      walletName: 'Xhakti2',
      addressID: '0x456',
      role: UserType.USER,
      completedTasks: [4, 5, 6],
      earnedEXP: 20,
      lastActivityTime: new Date('2023-04-18T10:00:00Z'), // Example date for lifetime calculation
    },
    // Add more users as needed
  ];

  const [activeTab, setActiveTab] = useState('24hours');

  const last24HoursUsers = ListOfUsers.filter(
    (user) => new Date().getTime() - user.lastActivityTime.getTime() < 24 * 60 * 60 * 1000,
  ) // 24 hours in milliseconds
    .sort((a, b) => b.earnedEXP - a.earnedEXP); // Sort by earnedEXP in descending order

  const lifetimeUsers = ListOfUsers.sort((a, b) => b.earnedEXP - a.earnedEXP); // Sort by earnedEXP in descending order

  return (
    <div className="h-full rounded-3xl flex-col px-6 py-2 border-2 border-[#1e2025] hover:border-[#cff500]">
      <p className="text-3xl  tracking-wider">LeaderBoard</p>
      <div className="flex gap-5 my-2">
        <button
          onClick={() => setActiveTab('24hours')}
          className={`py-2 ${
            activeTab === '24hours'
              ? 'text-gray-200 underline underline-offset-4 decoration-[#cff500]'
              : 'text-gray-500'
          }`}
        >
          24 Hours
        </button>
        <button
          onClick={() => setActiveTab('lifetime')}
          className={`py-2 ${
            activeTab === 'lifetime'
              ? 'text-gray-200 underline underline-offset-4 decoration-[#cff500]'
              : 'text-gray-500'
          }`}
        >
          Lifetime
        </button>
      </div>
      <div className=" w-full flex flex-col gap-3">
        {(activeTab === '24hours' ? last24HoursUsers : lifetimeUsers).map((user) => {
          return (
            <div
              key={user._id}
              className="flex justify-between w-full  rounded-xl px-2 py-1 bg-[#1e2025] hover:bg-[#26272c] "
            >
              <div className="flex gap-2 py-1">
                <img className=" rounded-full h-8 " src={generateAddressIcon(user.addressID)} alt="PFP icon" />
                <div>
                  <p className="text-xl">{user.walletName}</p>
                  <p className="text-sm text-opacity-90">{user.addressID}</p>
                </div>
              </div>
              <div className=" flex justify-center items-center gap-2">
                <span className=" text-xl">{user.earnedEXP}</span>
                <img className="h-8" src={EXPIcon} alt="exp icon" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LeaderBoard;
