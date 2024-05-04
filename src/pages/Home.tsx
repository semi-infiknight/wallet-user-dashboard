import ConnectWallet from '../components/ConnectWallet';
import { CONNECTWALLETBTNTYPE } from '../utils/Enum';

const Home = () => {
  return (
    <>
      <div className="glass absolute h-screen top-0 w-full flex justify-center items-center bg-black ">
        <ConnectWallet btnType={CONNECTWALLETBTNTYPE.CONNECT} navigateTo="/dashboard" />
      </div>
    </>
  );
};

export default Home;
