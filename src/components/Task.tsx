import { useState, useEffect } from "react";
import taskIcon from "../assets/Lightning icon 64.png";
import { TaskType } from "../utils/Types";
import { UserType } from "../utils/Enum";

const Task = ({ _id, name, description, EXP, expiry }: TaskType) => {
  const [isExpired, setIsExpired] = useState<boolean>(false);
  const [isClaimed, setIsClaimed] = useState<boolean>(false);
  const [isTaskCompleted, setIsTaskCompleted] = useState<boolean>(false);

  const UserDetailsData = {
    _id: 1,
    walletName: "Xhakti",
    addressID: "0x123",
    role: UserType.USER,
    completedTasks: [1],
    earnedEXP: 10,
  };

  useEffect(() => {
    const currentTime = new Date().getTime();
    const expiryTime = new Date(expiry).getTime();

    if (currentTime > expiryTime) {
      setIsExpired(true);
    } else {
      setIsExpired(false);
    }
  }, [expiry]);

  useEffect(() => {
    const isCompleted = UserDetailsData.completedTasks.includes(_id);
    setIsTaskCompleted(isCompleted);
  }, [_id, UserDetailsData.completedTasks]);

  return (
    <>
      <div
        key={_id}
        className="w-[80%] flex border border-purple-50 my-2 rounded-xl place-self-start justify-between px-3 py-3"
      >
        <div>
          <p>{name}</p>
          <p>{description}</p>
        </div>
        <button
          className={`${
            isExpired
              ? "bg-red-300"
              : isClaimed
              ? "bg-yellow-300"
              : isTaskCompleted
              ? "bg-green-300"
              : "bg-gray-300"
          } flex flex-col justify-center items-center rounded-xl px-2 py-1`}
        >
          {isExpired === true ? (
            <>Expired</>
          ) : (
            <>
              <div className="flex justify-center items-center">
                <img className="h-6" src={taskIcon} alt="task icon" />
                <span>{EXP}</span>
              </div>
              <p className="text-xl ">
                {isClaimed === false ? "Claim" : "Claimed"}
              </p>
            </>
          )}
        </button>
      </div>
    </>
  );
};

export default Task;
