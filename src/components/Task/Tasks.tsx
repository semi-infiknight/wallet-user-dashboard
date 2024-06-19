import React, { useState } from 'react';
import Modal from '../RewardModal';
import ConfettiAnimation from '../ConfettiAnimation';
import { TaskType, UserDetailsType } from '../../utils/Types';
import RunningTasks from './RunningTasks';
import ExpiredTasks from './ExpiredTasks';
import toast from 'react-hot-toast';
import { RefreshCcw } from 'react-feather';
type TaskData = {
  name: string;
  description: string;
  EXP: number;
};

type TasksProp = {
  tasksData: TaskType[];
  userDetails: UserDetailsType;
  errorFromApi: boolean;
  userDataRefetch: () => void;
  leaderBoardRefetch: () => void;
  isUserDataLoading: boolean;
};

const Tasks = ({
  tasksData,
  userDetails,
  userDataRefetch,
  leaderBoardRefetch,
  errorFromApi,
  isUserDataLoading,
}: TasksProp) => {
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
    setModal({ show: true, data: selectedTask });
    setShowConfetti(true);
    userDataRefetch();
    leaderBoardRefetch();
    setTimeout(() => setShowConfetti(false), 7000);
  };

  const handleRefresh = () => {
    userDataRefetch();
    if (errorFromApi === true) {
      toast.error('Please come after 30 mins ', {
        id: 'error',
      });
    }
  };

  return (
    <div className=" w-full flex flex-col items-center h-full bg-zinc-900 border-y rounded-xl border-y-[#a66cff] px-5 ">
      <div className="place-self-start flex justify-center items-center mt-4 gap-4">
        <p className="place-self-start text-4xl  tracking-wide">Tasks</p>
        <button className="hover:opacity-100 opacity-25   " onClick={() => handleRefresh()}>
          {!isUserDataLoading ? (
            <>
              <RefreshCcw size={20} />
            </>
          ) : (
            <div className=" flex justify-center items-center gap-2">
              <svg
                className="animate-spin   h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <p className="opacity-50 text-sm">Loading</p>
            </div>
          )}
        </button>
      </div>

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
      <div
        className={` relative mt-2 w-full h-full max-h-[90%] ${isUserDataLoading ? 'overflow-hidden' : 'overflow-y-scroll'} py-2`}
      >
        {isUserDataLoading && (
          <>
            <div className="absolute bg-black opacity-50  h-full w-full z-50 rounded-xl"></div>
          </>
        )}
        <>
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
        </>
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
          <p className="text-sm font-semibold">{modal?.data?.name}</p>
          <p className="text-2xl">You claimed this task successfully 🎉 </p>
          <p className="text-lg">
            You earned <span className=" font-extrabold text-green-600">{modal?.data?.EXP}</span> EXPs ✨
          </p>
        </div>
      </Modal>
      {showConfetti && <ConfettiAnimation />}
    </div>
  );
};

export default Tasks;
