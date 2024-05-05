import { useQuery } from '@tanstack/react-query';
import LeaderBoard from '../components/LeaderBoard';
import LeftSideBar from '../components/LeftSideBar';
import Tasks from '../components/Tasks';
import UserDetails from '../components/UserDetails';
import { getAllTask, getLeaderBoard, getUserInfo } from '../services/axios';
import LoadingAnimation from './Loading';
import { useEffect, useState } from 'react';
import { LeaderBoardType, UserDetailsType } from '../utils/Types';
import { UserType } from '../utils/Enum';

const Dashboard = () => {
  const [userInfo, setUserInfo] = useState<UserDetailsType>({
    address: '',
    userName: '',
    completedTasks: [],
    earnedEXP: 0,
    role: UserType.USER,
  });

  const [tasks, setTasks] = useState([]);

  const [leaderBoard, setLeaderBoard] = useState<LeaderBoardType[]>([]);

  const {
    isLoading: userDataIsLoading,
    error: userDataError,
    data: userData,
  } = useQuery({ queryKey: ['user-info'], queryFn: getUserInfo });
  console.log('This is userData', userDataError, userData);

  const {
    isLoading: tasksAreLoading,
    error: tasksError,
    data: tasksData,
  } = useQuery({ queryKey: ['tasks'], queryFn: getAllTask });
  console.log('This is tasks ', tasksError, tasksData);

  const {
    isLoading: leaderBoardIsLoading,
    error: leaderBoardError,
    data: leaderBoardData,
  } = useQuery({ queryKey: ['leader-board'], queryFn: getLeaderBoard });
  console.log('This is leaderboard', leaderBoardError, leaderBoardData);

  useEffect(() => {
    if (!userDataIsLoading) {
      setUserInfo(userData?.data);
    }
  }, [userData?.data, userDataIsLoading]);

  useEffect(() => {
    if (!tasksAreLoading) {
      setTasks(tasksData?.data);
    }
  }, [tasksData?.data, tasksAreLoading]);

  useEffect(() => {
    if (!leaderBoardIsLoading) {
      setLeaderBoard(leaderBoardData?.data);
    }
  }, [leaderBoardData?.data, leaderBoardIsLoading]);

  console.log('userInfo', userInfo);
  console.log('tasks', tasks);
  console.log('tasks', leaderBoard);

  if (userDataIsLoading) {
    return <LoadingAnimation />;
  }
  return (
    <>
      <div className="h-screen w-full  flex text-white  bg-gradient overflow-hidden ">
        <LeftSideBar />
        <div className="w-full h-full flex py-16">
          {/* left side  */}

          <div className="w-[60%] max-w-[60%]  h-[102%] px-4">
            <Tasks tasksData={tasks} userDetails={userInfo} />
          </div>
          <div className="w-[40%] px-4 flex flex-col gap-4 justify-start">
            <div className="h-fit">
              <UserDetails
                userName={userInfo.userName}
                address={userInfo.address}
                earnedEXP={userInfo.earnedEXP}
                role={UserType.USER}
                completedTasks={userInfo.completedTasks}
              />
            </div>
            <div className=" h-full">
              <LeaderBoard _leaderBoardData={leaderBoard} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
