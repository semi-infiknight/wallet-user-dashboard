import { UserType } from "../utils/Enum";
import { useState } from "react";

const LeaderBoard = () => {
  const ListOfUsers = [
    {
      _id: 1,
      walletName: "Xhakti",
      addressID: "0x123",
      role: UserType.USER,
      completedTasks: [1, 2, 3],
      earnedEXP: 10,
      lastActivityTime: new Date("2023-04-19T12:00:00Z"), // Example date for 24-hour calculation
    },
    {
      _id: 2,
      walletName: "Xhakti2",
      addressID: "0x456",
      role: UserType.USER,
      completedTasks: [4, 5, 6],
      earnedEXP: 20,
      lastActivityTime: new Date("2023-04-18T10:00:00Z"), // Example date for lifetime calculation
    },
    // Add more users as needed
  ];

  const [activeTab, setActiveTab] = useState("24hours");

  const last24HoursUsers = ListOfUsers.filter(
    (user) => new Date().getTime() - user.lastActivityTime.getTime() < 24 * 60 * 60 * 1000 // 24 hours in milliseconds
  );

  const lifetimeUsers = ListOfUsers;

  return (
    <div className="border h-full rounded-3xl flex-col px-6 py-2 border-[#a66cff] hover:border-[#cff500]">
      <p className="text-3xl ">Leaderboard</p>
      <div className="flex">
        <button
          onClick={() => setActiveTab("24hours")}
          className={`px-4 py-2 ${
            activeTab === "24hours" ? "bg-blue-500 text-white" : ""
          }`}
        >
          24 Hours
        </button>
        <button
          onClick={() => setActiveTab("lifetime")}
          className={`px-4 py-2 ${
            activeTab === "lifetime" ? "bg-blue-500 text-white" : ""
          }`}
        >
          Lifetime
        </button>
      </div>
      <div className=" w-full flex flex-col gap-3">
        {(activeTab === "24hours" ? last24HoursUsers : lifetimeUsers).map(
          (user) => {
            return (
              <div className="flex justify-between w-full border">
                <div>
                  <p>{user.walletName}</p>
                  <p>{user.addressID}</p>
                </div>
                <div>
                  <p>
                    Total points: <span>{user.earnedEXP}</span>
                  </p>
                </div>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

export default LeaderBoard;
