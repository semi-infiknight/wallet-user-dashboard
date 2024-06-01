import { useEffect, useState } from 'react';
import LeaderBoard from '../components/LeaderBoard';
import UserDetails from '../components/UserDetails';
import LoadingAnimation from './Loading';
import { useQuery } from '@tanstack/react-query';
import { UserType } from '../utils/Enum';
import { LeaderBoardType, UserDetailsType } from '../utils/Types';
import { getAllRewards, getLeaderBoard, getUserInfo } from '../services/axios';
import Rewards from '../components/Reward/Rewards';

const Reward = () => {
  const [userInfo, setUserInfo] = useState<UserDetailsType>({
    address: '',
    userName: '',
    completedTasks: [],
    completedRewards: [],
    earnedEXP: 0,
    role: UserType.USER,
  });

  const [errorFromApi, setErrorFromApi] = useState<boolean>(false);

  const [rewards, setRewards] = useState([]);

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
    isLoading: rewardsAreLoading,
    error: rewardsError,
    data: rewardsData,
  } = useQuery({ queryKey: ['rewards'], queryFn: getAllRewards });
  console.log('This is tasks ', rewardsError, rewardsData);

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
    if (!rewardsAreLoading) {
      setRewards(rewardsData?.data);
    }
  }, [rewardsData?.data, rewardsAreLoading]);

  useEffect(() => {
    if (!leaderBoardIsLoading) {
      setLeaderBoard(leaderBoardData?.data);
    }
  }, [leaderBoardData?.data, leaderBoardIsLoading]);

  if (userDataIsLoading) {
    return (
      <div className="h-full w-full justify-center items-center my-auto overflow-hidden">
        <LoadingAnimation />
      </div>
    );
  }

  return (
    <div className="w-full h-full  grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 lg:grid-rows-1  ">
      <div className=" h-full order-1 lg:order-2 lg:col-span-1 lg:row-span-1 px-4 flex flex-col  gap-4">
        <UserDetails
          userName={userInfo?.userName || 'User'}
          address={userInfo.address}
          earnedEXP={userInfo.earnedEXP}
          role={UserType.USER}
          completedTasks={userInfo.completedTasks}
          completedRewards={userInfo.completedRewards}
        />
        <div className="block lg:hidden">
          <Rewards
            rewardsData={rewards}
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
      <div className=" h-full xl:col-span-2 lg:row-span-1 order-2 lg:order-1 px-4 hidden lg:block">
        <Rewards
          rewardsData={rewards}
          userDetails={userInfo}
          userDataRefetch={userDataRefetch}
          leaderBoardRefetch={leaderBoardRefetch}
          errorFromApi={errorFromApi}
          isUserDataLoading={userDataIsFetching}
        />
      </div>
    </div>
  );
};

export default Reward;
