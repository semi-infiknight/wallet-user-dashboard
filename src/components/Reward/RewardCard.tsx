import ConnectWallet from './../ConnectWallet';
import { useEffect, useRef, useState } from 'react';
import { CONNECT_WALLET_BTN, REWARD } from '../../utils/Enum';
import { RewardType, TransactionDataType, UserDetailsType } from '../../utils/Types';
import { apiRoutes } from '../../services/apiRoutes';
import axiosClient from '../../services/config/axiosClient';
import toast from 'react-hot-toast';
import { calculateDaysLeft } from '../../utils/helper';
import { Clock } from 'react-feather';

type RewardCardProp = {
  rewardDetails: RewardType;
  rewardStatus: REWARD;
  handleClick: (_id: string, _transactionData: TransactionDataType) => void;
  userDetails: UserDetailsType;
  rewardCss: string;
};

interface ConnectWalletWithSignature {
  // eslint-disable-next-line no-unused-vars
  getProviderSignature: (message: string, address: string) => Promise<string>;
}

const RewardCard = ({ rewardDetails, rewardStatus, handleClick, userDetails, rewardCss }: RewardCardProp) => {
  const { _id, name, description, isActive, expiry } = rewardDetails;
  const connectWalletRef = useRef<ConnectWalletWithSignature>(null);
  const [currentRewardStatus, setCurrentTaskStatus] = useState<REWARD>(rewardStatus);
  const [numberOfDaysLeftToCompleteTask, setNumberOfDaysLeftToCompleteTask] = useState<number | null>(null);

  useEffect(() => {
    if (isActive === false) {
      if (rewardStatus === REWARD.COMPLETED) {
        setCurrentTaskStatus(REWARD.COMPLETED_AND_EXPIRED);
      } else if (rewardStatus === REWARD.CLAIMED) {
        setCurrentTaskStatus(REWARD.COMPLETED_AND_EXPIRED);
      }
    }
  }, [isActive, rewardStatus]);

  const handleClaim = async () => {
    console.log('This is claim');

    const message = 'Burn 350 EXPs to claim your USDT.';

    let sign = '';
    try {
      if (connectWalletRef.current) {
        sign = await connectWalletRef.current.getProviderSignature(message, userDetails.address);
      } else {
        console.error('connectWalletRef.current is null');
      }
    } catch (error) {
      toast.error('Something went wrong ', {
        id: 'error',
      });
    }

    try {
      const rewardAmount = '2';
      const expToBurn = '350';

      const response = await axiosClient.post(
        apiRoutes.claimUSDT,
        { USDTAmount: rewardAmount, EXPs: expToBurn },
        { headers: { signature: sign } },
      );

      const transactionData = {
        amount: rewardAmount,
        expBurned: expToBurn,
        txHash: response.data.transactionHash,
      };

      if (response.status === 200) {
        // Handle successful claim
        console.log('Reward claimed successfully');
        handleClick(_id, transactionData);
      } else {
        // Handle error
        console.error(`Failed to claim reward: ${response.status} ${response.statusText}`);
        toast.error('Failed to claim reward', {
          id: 'error',
        });
      }
    } catch (error) {
      // Handle network error
      if (error instanceof Error) {
        console.error('Network error:', error.message);
      } else {
        console.error('Network error:', error);
      }
      toast.error('Something went wrong  ', {
        id: 'error',
      });
    }
  };

  const handleBtnClick = async () => {
    if (currentRewardStatus === REWARD.COMPLETED) {
      await handleClaim();
    } else if (currentRewardStatus === REWARD.PENDING) {
      toast('Not eligible for this reward', {
        icon: '❌',
        id: 'pending',
      });
    } else if (currentRewardStatus === REWARD.CLAIMED) {
      toast('Reward already claimed', {
        icon: '👏🏻',
        id: 'claimed',
      });
    } else if (
      currentRewardStatus === REWARD.EXPIRED ||
      currentRewardStatus === REWARD.CLAIMED_AND_EXPIRED ||
      currentRewardStatus === REWARD.COMPLETED_AND_EXPIRED
    ) {
      toast('Reward has already expired', {
        icon: '🚫',
        id: 'expired',
      });
    }
  };

  useEffect(() => {
    if (expiry) {
      const daysLeft = calculateDaysLeft(expiry);
      setNumberOfDaysLeftToCompleteTask(daysLeft);
    }
  }, [expiry]);

  return (
    <div
      key={_id}
      aria-hidden
      className={`"w-[90%] my-2 flex my-2place-self-start justify-between items-center p-4 rounded-xl mx-4   ${rewardCss ? rewardCss : 'neomorphic'} `}
    >
      <div className="w-[80%] max-w-[80%]">
        <div className="text-xl flex gap-2 justify-between ">
          <span>{name} </span>
          <div className="flex justify-center items-center">
            <span className="text-xs  rounded-xl px-1 flex  justify-center items-center gap-1 text-nowrap ">
              <Clock size={12} />
              {numberOfDaysLeftToCompleteTask !== null ? `${numberOfDaysLeftToCompleteTask} days left` : ''}
            </span>
          </div>
        </div>

        <div className="text-sm break-words pt-2 text-gray-200">{description}</div>
      </div>
      <ConnectWallet ref={connectWalletRef} btnType={CONNECT_WALLET_BTN.GET_SIGNATURE} />
      <button
        onClick={() => handleBtnClick()}
        className={`${
          currentRewardStatus === REWARD.PENDING
            ? 'neomorphic-pending'
            : currentRewardStatus === REWARD.COMPLETED
              ? 'neomorphic-completed text-purple-400'
              : currentRewardStatus === REWARD.CLAIMED
                ? ' neomorphic-claimed text-orange-300 '
                : currentRewardStatus === REWARD.EXPIRED
                  ? 'neomorphic-expired text-rose-600'
                  : currentRewardStatus == REWARD.COMPLETED_AND_EXPIRED
                    ? 'neomorphic-expired text-purple-400'
                    : 'neomorphic-expired text-orange-300'
        } flex flex-col justify-center relative z-10 items-center rounded-xl px-2 min-w-24 max-h-10 text-gray-200 font-medium py-2 cursor-pointer`}
      >
        {currentRewardStatus === REWARD.EXPIRED ? (
          <>Expired</>
        ) : currentRewardStatus === REWARD.COMPLETED || currentRewardStatus === REWARD.COMPLETED_AND_EXPIRED ? (
          <span>Redeem</span>
        ) : currentRewardStatus === REWARD.CLAIMED || currentRewardStatus === REWARD.CLAIMED_AND_EXPIRED ? (
          <span>Redeemed</span>
        ) : (
          <>
            <span>Locked</span>
          </>
        )}
      </button>
    </div>
  );
};

export default RewardCard;
