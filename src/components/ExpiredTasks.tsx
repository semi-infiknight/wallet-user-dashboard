import { TASK } from '../utils/Enum';
import { TaskType, TransactionDataType, UserDetailsType } from '../utils/Types';
import TaskCard from './TaskCard';
import expiredIcon from '../assets/expireIcon.svg';

type ExpiredTasksProps = {
  expiredTasks: TaskType[];
  userDetails: UserDetailsType;
  handleClick: (_id: string, _transactionData: TransactionDataType) => void;
};

const ExpiredTasks = ({ expiredTasks, userDetails, handleClick }: ExpiredTasksProps) => {
  return (
    <div className="flex flex-col gap-2 h-full ">
      {expiredTasks.length === 0 && (
        <div className="flex justify-center items-center my-auto pb-16">
          <img className="h-48 opacity-30 " src={expiredIcon} alt="" />
        </div>
      )}
      {expiredTasks.map((task, index) => (
        <TaskCard
          key={index}
          taskDetails={task}
          handleClick={(_id: string, _transactionData) => handleClick(_id, _transactionData)}
          taskStatus={TASK.CLAIMED}
          userDetails={userDetails}
        />
      ))}
    </div>
  );
};

export default ExpiredTasks;
