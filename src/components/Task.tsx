/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState, useEffect } from 'react';
import EXPIcon from '../assets/EXP.png';
import { TaskType, UserDetailsType } from '../utils/Types';
import { TASK } from '../utils/Enum';

type TaskProp = {
  taskDetails: TaskType;
  userDetails: UserDetailsType;
  handleClick: (_id: string) => void;
};

const Task = ({ taskDetails, userDetails, handleClick }: TaskProp) => {
  const { _id, name, description, isActive, EXP, expiry, links } = taskDetails;

  const [currentTaskState, setCurrentTaskState] = useState<TASK>(TASK.PENDING);

  useEffect(() => {
    const currentTime = new Date().getTime();
    const expiryTime = new Date(expiry).getTime();
    const isCompleted = userDetails.completedTasks.map((task) => task._id === _id && !task.isClaimed);
    const isClaimed = userDetails.completedTasks.map((task) => task._id === _id && task.isClaimed === true);

    if (currentTime > expiryTime) {
      if (isCompleted) {
        setCurrentTaskState(TASK.COMPLETED_AND_EXPIRED);
      } else if (isClaimed) {
        setCurrentTaskState(TASK.CLAIMED_AND_EXPIRED);
      } else {
        setCurrentTaskState(TASK.EXPIRED);
      }
    } else {
      if (isCompleted) {
        setCurrentTaskState(TASK.COMPLETED);
      } else if (isClaimed) {
        setCurrentTaskState(TASK.CLAIMED);
      }
    }
  }, [_id, expiry, userDetails.completedTasks]);

  const handleClaim = async () => {
    try {
      const response = await axios.post(
        'https://api.getwalletx.com/user/data',
        {
          taskId: _id, // Replace with the actual task ID
          isClaimed: true,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            address: userDetails.address,
          },
        },
      );

      if (response.status === 200 || response.status === 201) {
        // Handle successful claim
        console.log('Task claimed successfully');
        // call the confite modal here. 
      } else {
        // Handle error
        console.error('Failed to claim task');
      }
    } catch (error) {
      // Handle network error
      console.error('Network error:', error);
    }
  };

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
          disabled={currentTaskState === (TASK.CLAIMED || TASK.EXPIRED)}
          className={`${
            currentTaskState === TASK.PENDING
              ? 'neomorphic-pending'
              : currentTaskState === TASK.COMPLETED
                ? 'text-[#a66cff] neomorphic-purple'
                : currentTaskState === TASK.CLAIMED
                  ? 'bg-green-800 '
                  : currentTaskState === TASK.EXPIRED
                    ? 'neomorphic-red text-rose-600'
                    : currentTaskState == TASK.COMPLETED_AND_EXPIRED
                      ? 'border-2 border-red-500 bg-green-500'
                      : ' border border-red-500 bg-green-800'
          } flex flex-col justify-center items-center rounded-xl px-2 min-w-24 max-h-10 text-gray-200 font-medium py-2`}
        >
          {currentTaskState === TASK.EXPIRED ? (
            <>Expired</>
          ) : currentTaskState === TASK.COMPLETED ? (
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
