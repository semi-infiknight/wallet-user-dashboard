import { useEffect, useState } from 'react';
import { TASK } from '../utils/Enum';
import { TaskType, UserDetailsType } from '../utils/Types';
import EXPIcon from '../assets/EXP.png';
import { axiosPost } from '../services/axios';
import { apiRoutes } from '../services/apiRoutes';

type TaskCardProp = {
  taskDetails: TaskType;
  taskStatus: TASK;
  handleClick: (_id: string) => void;
  userDetails: UserDetailsType;
};

const TaskCard = ({ taskDetails, taskStatus, handleClick, }: TaskCardProp) => {
  const { _id, name, description, EXP, isActive } = taskDetails;

  const [currentTaskStatus, setCurrentTaskStatus] = useState<TASK>(taskStatus);

  useEffect(() => {
    if (isActive === false) {
      if (taskStatus === TASK.COMPLETED) {
        setCurrentTaskStatus(TASK.COMPLETED_AND_EXPIRED);
      } else if (taskStatus === TASK.CLAIMED) {
        setCurrentTaskStatus(TASK.COMPLETED_AND_EXPIRED);
      }
    }
  }, [isActive, taskStatus]);

  const handleClaim = async () => {
    console.log('This is claim');
    try {
      const response = await axiosPost(`${apiRoutes.claimEXP}${_id}`, {});
      if (response.status === 200) {
        // Handle successful claim
        console.log('Task claimed successfully');
        handleClick(_id);
      } else {
        // Handle error
        console.error(`Failed to claim task: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      // Handle network error
      console.error('Network error:', error.message);
    }
  };
  return (
    <div
      key={_id}
      aria-hidden
      className="w-[90%] my-2 flex my-2place-self-start justify-between items-center px-3 py-3 rounded-xl mx-4 neomorphic hover:border-[rgb(166,108,255)] cursor-pointer"
    >
      <div className="w-[80%] max-w-[80%]">
        <p className="text-xl">{name}</p>
        <div className="text-sm break-words">{description}</div>
      </div>
      <button
        disabled={currentTaskStatus !== TASK.COMPLETED}
        onClick={handleClaim}
        className={`${
          currentTaskStatus === TASK.PENDING
            ? 'neomorphic-pending'
            : currentTaskStatus === TASK.COMPLETED
              ? 'neomorphic-completed text-purple-400'
              : currentTaskStatus === TASK.CLAIMED
                ? ' neomorphic-claimed text-orange-300 '
                : currentTaskStatus === TASK.EXPIRED
                  ? 'neomorphic-expired text-rose-600'
                  : currentTaskStatus == TASK.COMPLETED_AND_EXPIRED
                    ? 'neomorphic-expired text-purple-400'
                    : 'neomorphic-expired text-orange-300'
        } flex flex-col justify-center items-center rounded-xl px-2 min-w-24 max-h-10 text-gray-200 font-medium py-2`}
      >
        {currentTaskStatus === TASK.EXPIRED ? (
          <>Expired</>
        ) : currentTaskStatus === TASK.COMPLETED || currentTaskStatus === TASK.COMPLETED_AND_EXPIRED ? (
          <span>Claim</span>
        ) : currentTaskStatus === TASK.CLAIMED || currentTaskStatus === TASK.CLAIMED_AND_EXPIRED ? (
          <span>Claimed</span>
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
  );
};

export default TaskCard;
