import Task from "./Task";
import { TaskType } from "../utils/Types";
import { useState } from "react";

const TasksData = [
  {
    _id: 1,
    name: "Abc",
    description: "Abc",
    EXP: 100,
    expiry: 1813599466000, //Pre-defined timestamp of the task expiry
  },
  {
    _id: 2,
    name: "Def",
    description: "Def",
    EXP: 50,
    expiry: 1513599466000, //Pre-defined timestamp of the task expiry
  },
  {
    _id: 1,
    name: "Ghi",
    description: "ghi",
    EXP: 10,
    expiry: 1713599466000, //Pre-defined timestamp of the task expiry
  },
];

const Tasks = () => {
  const [activeTab, setActiveTab] = useState("running");

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
      <p className="place-self-start text-3xl">Tasks</p>
      <div className="mt-2 w-full flex">
        <button
          className={`px-4 py-2 ${
            activeTab === "running" ? "bg-gray-700" : "bg-gray-500"
          }`}
          onClick={() => setActiveTab("running")}
        >
          Currently Running Tasks
        </button>
        <button
          className={`px-4 py-2 ${
            activeTab === "expired" ? "bg-gray-700" : "bg-gray-500"
          }`}
          onClick={() => setActiveTab("expired")}
        >
          Expired Tasks
        </button>
      </div>
      <div className="mt-2 w-full">
        {activeTab === "running" &&
          runningTasks.map((task) => (
            <Task
              key={task._id}
              _id={task._id}
              EXP={task.EXP}
              expiry={task.expiry}
              name={task.name}
              description={task.description}
            />
          ))}
        {activeTab === "expired" &&
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
