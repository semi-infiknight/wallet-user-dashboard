import { useState, useEffect } from 'react';
import EXPIcon from '../assets/EXP.png';
import { TaskType, UserDetailsType } from '../utils/Types';
import { TASKTYPE } from '../utils/Enum';

type TaskProp = {
  taskDetails: TaskType;
  userDetails: UserDetailsType;
};

const Task = ({ taskDetails, userDetails }: TaskProp) => {
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
        className="w-[90%] my-2 flex my-2place-self-start justify-between px-3 py-3 rounded-xl mx-4 neomorphic hover:border-[#a66cff]"
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
              ? 'bg-yellow-300 '
              : currentTaskState === TASKTYPE.COMPLETED
                ? 'bg-green-500'
                : currentTaskState === TASKTYPE.CLAIMED
                  ? 'bg-green-800 '
                  : currentTaskState === TASKTYPE.EXPIRED
                    ? 'bg-red-400'
                    : currentTaskState == TASKTYPE.COMPLETEDANDEXPIRED
                      ? 'border-2 border-red-500 bg-green-500'
                      : ' border border-red-500 bg-green-800'
          } flex flex-col justify-center items-center rounded-xl px-2  min-w-24 max-h-10 text-black font-medium`}
        >
          {currentTaskState === TASKTYPE.EXPIRED ? (
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
