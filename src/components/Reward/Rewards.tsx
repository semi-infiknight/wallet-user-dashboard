import React, { useState } from 'react';
import Modal from '../RewardModal';
import ConfettiAnimation from '../ConfettiAnimation';
import { RewardType, TransactionDataType, UserDetailsType } from '../../utils/Types';
import toast from 'react-hot-toast';
import { ExternalLink, RefreshCcw } from 'react-feather';
import RewardCard from './RewardCard';
import { REWARD } from '../../utils/Enum';
import RunningRewards from './RunningRewards';

type TaskData = {
  name: string;
  description: string;
  EXP?: number;
};

type RewardsProp = {
  rewardsData: RewardType[];
  userDetails: UserDetailsType;
  errorFromApi: boolean;
  userDataRefetch: () => void;
  leaderBoardRefetch: () => void;
  isUserDataLoading: boolean;
};

const Rewards = ({
  rewardsData,
  userDetails,
  userDataRefetch,
  leaderBoardRefetch,
  errorFromApi,
  isUserDataLoading,
}: RewardsProp) => {
  const [activeTab, setActiveTab] = useState('running');
  const [modal, setModal] = useState<{ show: boolean; data: TaskData }>({
    show: false,
    data: {
      name: '',
      description: '',
      EXP: 0,
    },
  });
  const [showConfetti, setShowConfetti] = React.useState(false);
  const [userTransactionDetails, setUserTransactionDetails] = useState<TransactionDataType>({
    amount: '',
    expBurned: '',
    txHash: '',
    advertiserDetails: [],
  });

  // Function to divide the tasks based on expiry
  const divideTasks = () => {
    const currentDate = new Date().getTime();
    const runningRewards: RewardType[] = [];
    const expiredRewards: RewardType[] = [];
    rewardsData.forEach((reward) => {
      if (reward.expiry > currentDate) {
        runningRewards.push(reward);
      } else {
        expiredRewards.push(reward);
      }
    });
    return { runningRewards, expiredRewards };
  };

  const { runningRewards, expiredRewards } = divideTasks();

  const handleClick = (id: string, transactionData: TransactionDataType) => {
    setUserTransactionDetails({
      amount: transactionData.amount,
      expBurned: transactionData.expBurned,
      txHash: transactionData.txHash,
      advertiserDetails: transactionData.advertiserDetails,
    });

    const selectedReward = runningRewards.filter((reward) => reward._id === id)?.[0];
    setModal({ show: true, data: selectedReward });
    setShowConfetti(true);
    userDataRefetch();
    leaderBoardRefetch();
    setTimeout(() => setShowConfetti(false), 7000);
  };

  const handleRefresh = () => {
    userDataRefetch();
    if (errorFromApi === true) {
      toast.error('Please come after 30 mins ', {
        id: 'error',
      });
    }
  };

  return (
    <div className=" w-full flex flex-col items-center h-full bg-zinc-900 border-y rounded-xl border-y-[#a66cff] px-5 ">
      <div className="place-self-start flex justify-center items-center mt-4 gap-4">
        <p className="place-self-start text-4xl  tracking-wide">Rewards</p>
        <button className="hover:opacity-100 opacity-25   " onClick={() => handleRefresh()}>
          {!isUserDataLoading ? (
            <>
              <RefreshCcw size={20} />
            </>
          ) : (
            <div className=" flex justify-center items-center gap-2">
              <svg
                className="animate-spin   h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <p className="opacity-50 text-sm">Loading</p>
            </div>
          )}
        </button>
      </div>

      <div className="mt-2 w-full flex gap-7">
        <button
          className={`py-2 rounded-xl ${
            activeTab === 'running'
              ? 'text-gray-200 underline underline-offset-4 decoration-[#a66cff] scale-105 '
              : 'text-gray-500'
          }`}
          onClick={() => setActiveTab('running')}
        >
          Ongoing Rewards
        </button>
        <button
          className={`py-2 ${
            activeTab === 'expired'
              ? 'text-gray-200 underline underline-offset-4 decoration-[#a66cff] scale-105'
              : 'text-gray-500'
          }`}
          onClick={() => setActiveTab('expired')}
        >
          Expired Rewards
        </button>
      </div>
      <div
        className={` relative mt-2 w-full h-full max-h-[90%] ${isUserDataLoading ? 'overflow-hidden' : 'overflow-y-scroll'} py-2`}
      >
        {isUserDataLoading && (
          <>
            <div className="absolute bg-black opacity-50  h-full w-full z-50 rounded-xl"></div>
          </>
        )}
        <>
          {activeTab === 'running' && (
            <RunningRewards
              runningRewards={runningRewards}
              userDetails={userDetails}
              handleClick={(_id: string, _transactionData: TransactionDataType) => handleClick(_id, _transactionData)}
            />
          )}
          {activeTab === 'expired' && (
            <>
              {expiredRewards.map((reward, index) => (
                <RewardCard
                  key={index}
                  rewardDetails={reward}
                  handleClick={(_id: string, _transactionData) => handleClick(_id, _transactionData)}
                  rewardStatus={REWARD.EXPIRED}
                  userDetails={userDetails}
                  rewardCss=""
                  rewardsStatusRefetch={() => null} // it should be changed later
                />
              ))}
            </>
          )}
        </>
      </div>

      <Modal
        isOpen={modal.show}
        onClick={() => {
          setModal({
            show: false,
            data: {
              name: '',
              description: '',
              EXP: 0,
            },
          });
        }}
      >
        <div className="text-white flex flex-col gap-3 items-center">
          {userTransactionDetails.txHash !== '' && (
            <>
              <h1 className="text-2xl">You have successfully burned {userTransactionDetails.expBurned} EXPs 🔥 </h1>
              <p className="text-lg">
                You have claimed<span className=" font-extrabold text-green-600">{userTransactionDetails.amount}</span>{' '}
                ELON
              </p>

              {userTransactionDetails.advertiserDetails[0].videoLink && (
                <div className="max-w-md">
                  <iframe
                    title="j"
                    src={userTransactionDetails.advertiserDetails[0].videoLink}
                    width="400"
                    height="300"
                    allow="autoplay"
                  ></iframe>
                </div>
              )}

              <div>
                <div className=" flex justify-center items-center gap-2  rounded-lg px-2 py-2 w-full text-center bg-card-bg2  text-sm">
                  <ExternalLink size={17} />
                  <a
                    href={`https://polygonscan.com/tx/${userTransactionDetails.txHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View on block explorer
                  </a>
                </div>
                <div className=" flex justify-center items-center gap-2  rounded-lg px-2 py-2 w-full text-center bg-card-bg2  text-sm">
                  <ExternalLink size={17} />
                  <a
                    href={userTransactionDetails.advertiserDetails[0].website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Advertiser
                  </a>
                </div>
              </div>
            </>
          )}
        </div>
      </Modal>
      {showConfetti && <ConfettiAnimation />}
    </div>
  );
};

export default Rewards;
