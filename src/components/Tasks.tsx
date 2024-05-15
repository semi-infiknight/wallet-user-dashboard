import React, { useState } from 'react';
import Modal from './RewardModal';
import ConfettiAnimation from './ConfettiAnimation';
import { TaskType, UserDetailsType } from '../utils/Types';
import RunningTasks from './RunningTasks';
import ExpiredTasks from './ExpiredTasks';

type TaskData = {
  name: string;
  description: string;
  EXP: number;
};

type TasksProp = {
  tasksData: TaskType[];
  userDetails: UserDetailsType;
  refetch: () => void;
};

const Tasks = ({ tasksData, userDetails, refetch }: TasksProp) => {
  const [activeTab, setActiveTab] = useState('running');
  const [modal, setModal] = useState<{ show: boolean; data: TaskData }>({
    show: false,
    data: {
      name: '',
      description: '',
      EXP: 0,
    },
  });
  const [showConfetti, setShowConfetti] = React.useState(false);

  // Function to divide the tasks based on expiry
  const divideTasks = () => {
    const currentDate = new Date().getTime();
    const runningTasks: TaskType[] = [];
    const expiredTasks: TaskType[] = [];
    tasksData.forEach((task) => {
      if (task.expiry > currentDate) {
        runningTasks.push(task);
      } else {
        expiredTasks.push(task);
      }
    });
    return { runningTasks, expiredTasks };
  };

  const { runningTasks, expiredTasks } = divideTasks();

  const handleClick = (id: string) => {
    const selectedTask = runningTasks.filter((task) => task._id === id)?.[0];
    console.log(selectedTask);
    setModal({ show: true, data: selectedTask });
    setShowConfetti(true);
    refetch();
    setTimeout(() => setShowConfetti(false), 7000);
  };

  return (
    <div className=" w-full flex flex-col items-center h-full bg-[#262626] border-y rounded-xl border-y-[#a66cff] px-5 neomorphic__big">
      <p className="place-self-start text-4xl mt-4 tracking-wide">Tasks</p>
      <div className="mt-2 w-full flex gap-7">
        <button
          className={`py-2 rounded-xl ${
            activeTab === 'running'
              ? 'text-gray-200 underline underline-offset-4 decoration-[#a66cff] scale-105 '
              : 'text-gray-500'
          }`}
          onClick={() => setActiveTab('running')}
        >
          Ongoing Tasks
        </button>
        <button
          className={`py-2 ${
            activeTab === 'expired'
              ? 'text-gray-200 underline underline-offset-4 decoration-[#a66cff] scale-105'
              : 'text-gray-500'
          }`}
          onClick={() => setActiveTab('expired')}
        >
          Expired Tasks
        </button>
      </div>
      <div className="mt-2 w-full h-full max-h-[90%] overflow-y-scroll py-2">
        {activeTab === 'running' && (
          <RunningTasks
            runningTasks={runningTasks}
            userDetails={userDetails}
            handleClick={(_id: string) => handleClick(_id)}
          />
        )}
        {activeTab === 'expired' && (
          <ExpiredTasks
            expiredTasks={expiredTasks}
            userDetails={userDetails}
            handleClick={(_id: string) => handleClick(_id)}
          />
        )}
      </div>
      <Modal
        isOpen={modal.show}
        onClick={() => {
          setModal({
            show: false,
            data: {
              name: '',
              description: '',
              EXP: 0,
            },
          });
        }}
      >
        <div className="text-white flex flex-col gap-3 items-center">
          <h1 className="text-2xl">You claimed task successfully 🎉 </h1>
          <h3 className="text-lg font-semibold">{modal?.data?.name}</h3>
          <div className="block mb-2 text-sm font-medium ">{modal.data?.description}</div>
          <p className="text-lg">
            You have earned <span className=" font-extrabold text-green-600">{modal?.data?.EXP}</span> Points ✨
          </p>
        </div>
      </Modal>
      {showConfetti && <ConfettiAnimation />}
    </div>
  );
};

export default Tasks;
