import { useQuery } from '@tanstack/react-query';
import LeaderBoard from '../components/LeaderBoard';
import LeftSideBar from '../components/LeftSideBar';
import Tasks from '../components/Tasks';
import UserDetails from '../components/UserDetails';
import { getUserInfo } from '../services/dashboard';
import LoadingAnimation from './Loading';
import { useEffect, useState } from 'react';

const Dashboard = () => {
  const [userInfo, setUserInfo] = useState(null);
  const { isLoading, error, data } = useQuery({ queryKey: ['user-info'], queryFn: getUserInfo });
  console.log(error, data);

  useEffect(() => {
    if (!isLoading) {
      setUserInfo(data?.data);
    }
  }, [data?.data, isLoading]);

  console.log('userInfo', userInfo);

  if (isLoading) {
    return <LoadingAnimation />;
  }
  return (
    <>
      <div className="h-screen w-full  flex text-white  bg-[#141414] ">
        <LeftSideBar />
        <div className="w-full h-full flex py-16">
          {/* left side  */}

          <div className="w-[60%] px-4">
            <Tasks />
          </div>
          <div className="w-[40%] px-4 flex flex-col  justify-between">
            <div className=" h-[40%]">
              <UserDetails />
            </div>
            <div className=" h-[55%]">
              <LeaderBoard />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
