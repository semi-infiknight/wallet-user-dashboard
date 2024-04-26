import { useState } from 'react';
import ConnectWallet from '../components/ConnectWallet';
import { setToLocalStorage } from '../utils/helper';
import { useNavigate } from 'react-router-dom';
// import bgFun from "../assets/bgFun.png";
// listen to the connector to get the background glass or not.

const Home = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    setToLocalStorage('authenticated', true);
    navigate('/dashboard');
  };

  return (
    <>
      {/* <div className="h-screen w-full">
        <img src={bgFun} alt="" />
      </div> */}
      <div className="glass absolute h-screen top-0 w-full flex justify-center items-center bg-black ">
        <ConnectWallet isLoggedIn={() => handleLogin()} />
      </div>
    </>
  );
};

export default Home;
