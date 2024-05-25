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

  const [errorFromApi, setErrorFromApi] = useState<boolean>(false);

  const [tasks, setTasks] = useState([]);

  const [leaderBoard, setLeaderBoard] = useState<LeaderBoardType[]>([]);

  const {
    isLoading: userDataIsLoading,
    error: userDataError,
    data: userData,
    isError: userDataAPIError,
    refetch: userDataRefetch,
    isFetching: userDataIsFetching,
  } = useQuery({ queryKey: ['user-info'], queryFn: getUserInfo });
  console.log('This is userData', userDataError, userData, userDataAPIError, userDataIsLoading);

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
    refetch: leaderBoardRefetch,
  } = useQuery({ queryKey: ['leader-board'], queryFn: getLeaderBoard });
  console.log('This is leaderboard', leaderBoardError, leaderBoardData);

  useEffect(() => {
    if (!userDataIsLoading) {
      setUserInfo(userData?.data);
      setErrorFromApi(userDataAPIError);
    }
  }, [userData?.data, userDataAPIError, userDataIsLoading]);

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

  console.log('userInfo', userInfo, userData, userDataIsLoading);
  console.log('tasks', tasks);
  console.log('tasks', leaderBoard);

  if (userDataIsLoading) {
    return <LoadingAnimation />;
  }

  return (
    <>
      <div className="h-screen w-full  flex  text-white overflow-scroll md:overflow-hidden gradient-bg">
        <LeftSideBar />
        <div className="w-full lg:h-full h-screen lg:overflow-hidden overflow-scroll py-16 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 lg:grid-rows-1 gap-4">
          {/* Right side */}
          <div className="order-1 lg:order-2 lg:col-span-1 lg:row-span-1 px-4 flex flex-col  gap-4">
            <UserDetails
              userName={userInfo?.userName || 'User'}
              address={userInfo.address}
              earnedEXP={userInfo.earnedEXP}
              role={UserType.USER}
              completedTasks={userInfo.completedTasks}
            />
            <div className="block lg:hidden">
              <Tasks
                tasksData={tasks}
                userDetails={userInfo}
                userDataRefetch={userDataRefetch}
                errorFromApi={errorFromApi}
                isUserDataLoading={userDataIsFetching}
                leaderBoardRefetch={leaderBoardRefetch}
              />
            </div>
            <LeaderBoard _leaderBoardData={leaderBoard} userAddress={userInfo.address} />
          </div>

          {/* Left side */}
          <div className="xl:col-span-2 lg:row-span-1 order-2 lg:order-1 px-4 hidden lg:block">
            <Tasks
              tasksData={tasks}
              userDetails={userInfo}
              userDataRefetch={userDataRefetch}
              leaderBoardRefetch={leaderBoardRefetch}
              errorFromApi={errorFromApi}
              isUserDataLoading={userDataIsFetching}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
