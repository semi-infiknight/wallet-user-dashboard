import { useState } from 'react';
import ConnectWallet from '../components/ConnectWallet';
import Dashboard from './Dashboard';
// import bgFun from "../assets/bgFun.png";
// listen to the connector to get the background glass or not.

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  return (
    <>
      {/* <div className="h-screen w-full">
        <img src={bgFun} alt="" />
      </div> */}
      <Dashboard />
      {!isLoggedIn && (
        <div className="glass absolute h-screen top-0 w-full flex justify-center items-center ">
          <ConnectWallet isLoggedIn={() => setIsLoggedIn(true)} />
        </div>
      )}
    </>
  );
};

export default Home;
