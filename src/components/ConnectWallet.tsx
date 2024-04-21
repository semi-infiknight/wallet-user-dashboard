type ConnectWalletType = {
  isLoggedIn: () => void;
};

const ConnectWallet = ({ isLoggedIn }: ConnectWalletType) => {
  return (
    <>
      <button
        onClick={isLoggedIn}
        className="border-2 bg-[#cff500]  border-black px-4 py-2 rounded-xl font-semibold font-sans tracking-wide  text-white shadow-lg"
      >
        Connect Wallet
      </button>
    </>
  );
};

export default ConnectWallet;
