import { useState, useEffect } from 'react';
import EXPIcon from '../assets/XP.svg';
import { TaskType } from '../utils/Types';
import { UserType } from '../utils/Enum';

const Task = ({ _id, name, description, EXP, expiry }: TaskType) => {
  const [isExpired, setIsExpired] = useState<boolean>(false);
  const [isClaimed, setIsClaimed] = useState<boolean>(false);
  const [isTaskCompleted, setIsTaskCompleted] = useState<boolean>(false);

  const UserDetailsData = {
    _id: 1,
    walletName: 'Xhakti',
    addressID: '0x123',
    role: UserType.USER,
    completedTasks: [1], //
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
        className="w-[90%] flex border-2 border-[#262626]  my-2 rounded-xl place-self-start justify-between px-3 py-3 hover:border-[#a66cff]"
      >
        <div className="w-[80%]">
          <p className="text-2xl">{name}</p>
          <a href={description} target="_blank" className="text-sm break-words" rel="noreferrer">
            {description}
          </a>
        </div>
        <button
          className={`${
            isExpired ? 'bg-red-500' : isClaimed ? 'bg-green-500' : !isTaskCompleted ? 'bg-green-300 ' : 'bg-yellow-300 '
          } flex flex-col justify-center items-center rounded-xl px-2  min-w-24 max-h-10 text-black font-medium`}
        >
          {isExpired === true ? (
            <>Expired</>
          ) : (
            <>
              <div className="flex gap-2 justify-center items-center">
                <img className="h-6" src={EXPIcon} alt="task icon" />
                <span className="text-xl">{EXP}</span>
              </div>
            </>
          )}
        </button>
      </div>
    </>
  );
};

export default Task;
