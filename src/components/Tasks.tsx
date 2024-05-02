import Task from './Task';
import { TaskType, UserDetailsType } from '../utils/Types';
import { useState } from 'react';

type TasksProp = {
  tasksData: TaskType[];
  userDetails: UserDetailsType;
};

const Tasks = ({ _tasksData, userDetails }: TasksProp) => {
  const [activeTab, setActiveTab] = useState('running');
  const tasksData = [
    {
      _id: '123',
      name: 'This is Task One',
      description: 'This is description',
      isActive: true,
      EXP: 100,
      expiry: 1714726838000,
      links: [],
    },
    {
      _id: '123',
      name: 'This is Task One',
      description: 'This is description',
      isActive: true,
      EXP: 100,
      expiry: 1714726838000,
      links: [],
    },

    {
      _id: '123',
      name: 'This is Task One',
      description: 'This is description',
      isActive: true,
      EXP: 100,
      expiry: 1714726838000,
      links: [],
    },
    {
      _id: '123',
      name: 'This is Task One',
      description: 'This is description',
      isActive: true,
      EXP: 100,
      expiry: 1814726838,
      links: [],
    },
  ];

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

  return (
    <div className=" w-full flex flex-col items-center h-full bg-[#262626] border-y-2 rounded-xl border-y-[#cff500] px-5  neomorphic__big">
      <p className="place-self-start text-4xl mt-4">Tasks</p>
      <div className="mt-2 w-full flex gap-7">
        <button
          className={` py-2 rounded-xl  ${
            activeTab === 'running'
              ? 'text-gray-200 underline underline-offset-4 decoration-[#cff500] scale-105 '
              : 'text-gray-500'
          }`}
          onClick={() => setActiveTab('running')}
        >
          Ongoing Tasks
        </button>
        <button
          className={` py-2 ${
            activeTab === 'expired'
              ? 'text-gray-200 underline underline-offset-4 decoration-[#cff500] scale-105'
              : 'text-gray-500'
          }`}
          onClick={() => setActiveTab('expired')}
        >
          Expired Tasks
        </button>
      </div>
      <div className="mt-2 w-full max-h-[90%] overflow-y-scroll py-2">
        <div className="flex  flex-col gap-2">
          {activeTab === 'running' &&
            runningTasks.map((task, index) => <Task key={index} taskDetails={task} userDetails={userDetails} />)}
        </div>
        <div className="flex  flex-col gap-2 ">
          {activeTab === 'expired' &&
            expiredTasks.map((task, index) => <Task key={index} taskDetails={task} userDetails={userDetails} />)}
        </div>
      </div>
    </div>
  );
};

export default Tasks;
