import Task from './Task';
import { TaskType } from '../utils/Types';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllTasks } from '../services/dashboard';

const TasksData = [
  {
    _id: 1,
    name: 'Follow WalletX on Twitter',
    description: 'https://x.com/getwalletx ',
    EXP: 100,
    expiry: 1813599466000, //Pre-defined timestamp of the task expiry
  },
  {
    _id: 2,
    name: 'Def',
    description:
      'DefDefDefDefDefDefDef DefDefDefDefDefDefDefDefDefDefDefDefDefDefDefDefDefDefDefDefDefDefDefDef DefDefDefDefDefDef DefDefDefDefDefDef',
    EXP: 50,
    expiry: 1513599466000, //Pre-defined timestamp of the task expiry
  },
  {
    _id: 1,
    name: 'Ghi',
    description: 'ghi',
    EXP: 10,
    expiry: 1713599466000, //Pre-defined timestamp of the task expiry
  },
];

const Tasks = () => {
  const [activeTab, setActiveTab] = useState('running');
  const { isLoading, error, data } = useQuery({ queryKey: ['user-tasks'], queryFn: getAllTasks });

  console.log(data);
  // Function to divide the tasks based on expiry
  const divideTasks = (tasksData: TaskType[]) => {
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

  const { runningTasks, expiredTasks } = divideTasks(TasksData);

  return (
    <div className="bg-[#141414] w-full flex flex-col items-center h-full">
      <p className="place-self-start text-4xl text-[#cff500]">Tasks</p>
      <div className="mt-2 w-full flex gap-7">
        <button
          className={` py-2 rounded-xl  ${
            activeTab === 'running'
              ? 'text-gray-200 underline underline-offset-4 decoration-[#cff500]'
              : 'text-gray-500'
          }`}
          onClick={() => setActiveTab('running')}
        >
          Ongoing Tasks
        </button>
        <button
          className={` py-2 ${
            activeTab === 'expired'
              ? 'text-gray-200 underline underline-offset-4 decoration-[#cff500]'
              : 'text-gray-500'
          }`}
          onClick={() => setActiveTab('expired')}
        >
          Expired Tasks
        </button>
      </div>
      <div className="mt-2 w-full">
        {isLoading
          ? Array(2)
              .fill(3)
              .map((arr, index) => <div key={index} className="w-full h-16 mb-3  rounded animate-shimmer"></div>)
          : activeTab === 'running' &&
            data?.data?.map((task) => (
              <Task
                key={task._id}
                _id={task._id}
                EXP={task.points}
                expiry={task.expiry}
                name={task.name}
                description={task.description}
              />
            ))}

        {activeTab === 'expired' &&
          expiredTasks.map((task) => (
            <Task
              key={task._id}
              _id={task._id}
              EXP={task.EXP}
              expiry={task.expiry}
              name={task.name}
              description={task.description}
            />
          ))}
      </div>
    </div>
  );
};

export default Tasks;
