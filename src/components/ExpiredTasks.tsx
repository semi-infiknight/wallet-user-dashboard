import { TASK } from '../utils/Enum';
import { TaskType, UserDetailsType } from '../utils/Types';
import TaskCard from './TaskCard';

type ExpiredTasksProps = {
  expiredTasks: TaskType[];
  userDetails: UserDetailsType;
  handleClick: (_id: string) => void;
};

const ExpiredTasks = ({ expiredTasks, userDetails, handleClick }: ExpiredTasksProps) => {
  return (
    <div className="flex flex-col gap-2">
      {expiredTasks.map((task, index) => (
        <TaskCard
          key={index}
          taskDetails={task}
          handleClick={(_id: string) => handleClick(_id)}
          taskStatus={TASK.CLAIMED}
          userDetails={userDetails}
        />
      ))}
    </div>
  );
};

export default ExpiredTasks;
