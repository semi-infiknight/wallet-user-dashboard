/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState, useEffect } from 'react';
import EXPIcon from '../assets/EXP.png';
import { TaskType, UserDetailsType } from '../utils/Types';
import { TASKTYPE } from '../utils/Enum';

type TaskProp = {
  taskDetails: TaskType;
  userDetails: UserDetailsType;
  handleClick: (_id) => void;
};

const Task = ({ taskDetails, userDetails, handleClick }: TaskProp) => {
  const { _id, name, description, isActive, EXP, expiry, links } = taskDetails;

  const [currentTaskState, setCurrentTaskState] = useState<TASKTYPE>(TASKTYPE.PENDING);

  useEffect(() => {
    const currentTime = new Date().getTime();
    const expiryTime = new Date(expiry).getTime();

    const isCompleted = userDetails.completedTasks.includes(_id);
    const isClaimed = userDetails.completedTasks.includes(_id); // here it should come as claimed.

    if (currentTime > expiryTime) {
      if (isCompleted) {
        setCurrentTaskState(TASKTYPE.COMPLETEDANDEXPIRED);
      } else if (isClaimed) {
        setCurrentTaskState(TASKTYPE.CLAIMEDANDEXPIRED);
      } else {
        setCurrentTaskState(TASKTYPE.EXPIRED);
      }
    } else {
      if (isCompleted) {
        setCurrentTaskState(TASKTYPE.COMPLETED);
      } else if (isClaimed) {
        setCurrentTaskState(TASKTYPE.CLAIMED);
      }
    }
  }, [_id, expiry, userDetails.completedTasks]);

  return (
    <>
      <div
        key={_id}
        aria-hidden
        className="w-[90%] my-2 flex my-2place-self-start justify-between items-center px-3 py-3 rounded-xl mx-4 neomorphic hover:border-[#a66cff] cursor-pointer"
        onClick={() => handleClick(_id)}
      >
        <div className="w-[80%] max-w-[80%]">
          <p className="text-2xl">{name}</p>
          <a href={description} target="_blank" className="text-sm break-words" rel="noreferrer">
            {description}
          </a>
        </div>
        <button
          disabled={currentTaskState === (TASKTYPE.CLAIMED || TASKTYPE.EXPIRED)}
          className={`${
            currentTaskState === TASKTYPE.PENDING
              ?'neomorphic-pending'
              : currentTaskState === TASKTYPE.COMPLETED
                ? 'text-[#a66cff] neomorphic-purple'
                : currentTaskState === TASKTYPE.CLAIMED
                  ? 'bg-green-800 '
                  : currentTaskState === TASKTYPE.EXPIRED
                    ? 'neomorphic-red text-rose-600'
                    : currentTaskState == TASKTYPE.COMPLETEDANDEXPIRED
                      ? 'border-2 border-red-500 bg-green-500'
                      : ' border border-red-500 bg-green-800'
          } flex flex-col justify-center items-center rounded-xl px-2  min-w-24 max-h-10 text-gray-200 font-medium py-2`}
        >
          {currentTaskState === TASKTYPE.EXPIRED ? (
            <>Expired</>
          ) : currentTaskState === TASKTYPE.COMPLETED ? (
            <span>Claim</span>
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
