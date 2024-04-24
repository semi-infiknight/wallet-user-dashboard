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
  }, [isLoading]);

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

          {/* <div className="w-[60%] flex flex-col gap-5 items-center  mt-20 px-6 ">
            <div className="hover:scale-105 border-[#a66cff] hover:border-[#cff500] bg-[#141414] w-full flex justify-center items-center border h-72  rounded-lg">
              Info about task and WAX Token
            </div>
            <p className="place-self-start text-4xl">Task</p>
            <div className="  flex flex-col  justify-start gap-10 items-center  mx-auto h-72 w-full ">
              <div className="hover:scale-105 border-[#a66cff] hover:border-[#cff500] bg-[#141414] flex justify-center items-center border h-full w-full rounded-lg">
                <img src={taskIcon} alt="task icon" />
                Task1
              </div>
              <div className="hover:scale-105 border-[#a66cff] hover:border-[#cff500] bg-[#141414] flex justify-center items-center border h-full w-full rounded-lg">
                <img src={taskIcon} alt="task icon" />
                Task2
              </div>
              <div className="hover:scale-105 border-[#a66cff] hover:border-[#cff500] bg-[#141414] flex justify-center items-center border h-full w-full rounded-lg">
                <img src={taskIcon} alt="task icon" />
                Task2
              </div>
            </div>
          </div> */}
          {/* right side  */}
          {/* <div className="w-[35%]  flex flex-col gap-10 items-center  mx-auto mt-20 px-6">
            <div className="hover:scale-105  hover:shadow-md hover:shadow-[#cff500] border-[#a66cff] hover:border-[#cff500] bg-[#141414] w-full flex justify-center items-center border h-72  rounded-lg">
              User WalletDetails
            </div>
            <div className="hover:scale-105 border-[#a66cff] hover:border-[#cff500] hover:shadow-md hover:shadow-[#cff500] bg-[#141414] w-full flex justify-center items-center border h-96  rounded-lg">
              Top user with their points
            </div>
          </div> */}

          {/* <div className="w-[90%] flex justify-between gap-10 items-center h-72 mx-auto mt-20 ">
            <div className="flex justify-center items-center border h-[85%] w-[60%] rounded-lg"></div>
            <div className="flex justify-center items-center border h-[85%] w-[35%] rounded-lg"></div>
          </div>
          <div className="w-[90%] flex justify-start gap-10 items-center h-72 mx-auto  ">
            <div className="flex justify-center items-center border h-[85%] w-[30%] rounded-lg"></div>
            <div className="flex justify-center items-center border h-[85%] w-[30%] rounded-lg"></div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
