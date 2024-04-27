import { useQuery } from '@tanstack/react-query';
import LeaderBoard from '../components/LeaderBoard';
import LeftSideBar from '../components/LeftSideBar';
import Tasks from '../components/Tasks';
import UserDetails from '../components/UserDetails';
import { getAllTask, getLeaderBoard, getUserInfo } from '../services/dashboard';
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
  console.log(userDataError, userData);

  const {
    isLoading: tasksAreLoading,
    error: tasksError,
    data: tasksData,
  } = useQuery({ queryKey: ['tasks'], queryFn: getAllTask });
  console.log(tasksError, tasksData);

  const {
    isLoading: leaderBoardIsLoading,
    error: leaderBoardError,
    data: leaderBoardData,
  } = useQuery({ queryKey: ['leader-board'], queryFn: getLeaderBoard });
  console.log(leaderBoardError, leaderBoardData);

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
      <div className="h-screen w-full  flex text-white  bg-[#0f1114] ">
        <LeftSideBar />
        <div className="w-full h-full flex py-16">
          {/* left side  */}

          <div className="w-[60%] max-w-[60%] px-4">
            <Tasks tasksData={tasks} userDetails={userInfo} />
          </div>
          <div className="w-[40%] px-4 flex flex-col gap-3 justify-start">
            <div className="h-fit">
              <UserDetails
                userName={userInfo.userName}
                address={userInfo.address}
                earnedEXP={userInfo.earnedEXP}
                role={userInfo.role}
                completedTasks={userInfo.completedTasks}
              />
            </div>
            <div className=" h-full">
              <LeaderBoard leaderBoardData={leaderBoard} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
