import { useState, useEffect } from 'react';
import { TaskType, TransactionDataType, UserDetailsType } from '../utils/Types';
import TaskCard from './TaskCard';
import { TASK } from '../utils/Enum';

type RunningTasksProps = {
  runningTasks: TaskType[];
  userDetails: UserDetailsType;
  handleClick: (_id: string, _transactionData: TransactionDataType) => void;
};

const RunningTasks = ({ runningTasks, userDetails, handleClick }: RunningTasksProps) => {
  const [completedTasks, setCompletedTasks] = useState<TaskType[]>([]);
  const [ongoingTasks, setOngoingTasks] = useState<TaskType[]>([]);
  const [claimedTasks, setClaimedTasks] = useState<TaskType[]>([]);
  const { completedTasks: userCompletedTask } = userDetails;

  useEffect(() => {
    const [claimedTasks, unclaimedTasks] = userCompletedTask.reduce<[string[], string[]]>(
      ([claimed, unclaimed], task) => {
        if (task.isClaimed) {
          return [[...claimed, task.id], unclaimed];
        } else {
          return [claimed, [...unclaimed, task.id]];
        }
      },
      [[], []],
    );

    const allCompletedAndClaimedTasks = [...claimedTasks, ...unclaimedTasks];
    const ongoingTasks = runningTasks.filter(
      (task) => task.isActive && !allCompletedAndClaimedTasks.includes(task._id),
    );
    const unclaimedTaskDetails = runningTasks.filter((task) => unclaimedTasks.includes(task._id));
    const claimedTaskDetails = runningTasks.filter((task) => claimedTasks.includes(task._id));

    setCompletedTasks(unclaimedTaskDetails);
    setOngoingTasks(ongoingTasks);
    setClaimedTasks(claimedTaskDetails);
  }, [userCompletedTask, runningTasks]);

  return (
    <div className="flex flex-col gap-4">
      {completedTasks.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className=" text-sm text-gray-300">Claim your rewards 🎉</p>
          {completedTasks.map((task, index) => (
            <TaskCard
              key={index}
              taskDetails={task}
              handleClick={(_id: string, _transactionData) => handleClick(_id, _transactionData)}
              taskStatus={TASK.COMPLETED}
              userDetails={userDetails}
            />
          ))}
        </div>
      )}
      {ongoingTasks.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className=" text-sm text-gray-300">Pending Tasks</p>
          {ongoingTasks.map((task, index) => (
            <TaskCard
              key={index}
              taskDetails={task}
              handleClick={(_id: string, _transactionData) => handleClick(_id, _transactionData)}
              taskStatus={TASK.PENDING}
              userDetails={userDetails}
            />
          ))}
        </div>
      )}
      {claimedTasks.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className=" text-sm text-gray-300">Claimed Tasks</p>
          {claimedTasks.map((task, index) => (
            <TaskCard
              key={index}
              taskDetails={task}
              handleClick={(_id: string, _transactionData) => handleClick(_id, _transactionData)}
              taskStatus={TASK.CLAIMED}
              userDetails={userDetails}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default RunningTasks;
