import ConnectWallet from '../components/ConnectWallet';
import { CONNECT_WALLET_BTN } from '../utils/Enum';

const Home = () => {
  return (
    <>
      <div className="glass absolute h-screen top-0 w-full flex justify-center items-center bg-black ">
        <ConnectWallet btnType={CONNECT_WALLET_BTN.CONNECT} navigateTo="/dashboard" />
      </div>
    </>
  );
};

export default Home;
