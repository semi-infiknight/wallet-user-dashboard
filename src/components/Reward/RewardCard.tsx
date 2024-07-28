import ConnectWallet from './../ConnectWallet';
import { useEffect, useRef, useState } from 'react';
import { CONNECT_WALLET_BTN, REWARD } from '../../utils/Enum';
import { RewardType, TransactionDataType, UserDetailsType } from '../../utils/Types';
import { apiRoutes } from '../../services/apiRoutes';
import axiosClient from '../../services/config/axiosClient';
import toast from 'react-hot-toast';
import { calculateDaysLeft } from '../../utils/helper';
import { Clock } from 'react-feather';
import VerifyInviteCodeModal from '../VerifyInviteCodeModal';
import externalLink from '../../assets/externalLink.svg';

type RewardCardProp = {
  rewardDetails: RewardType;
  rewardStatus: REWARD;
  handleClick: (_id: string, _transactionData: TransactionDataType) => void;
  userDetails: UserDetailsType;
  rewardCss: string;
  rewardsStatusRefetch: () => void;
};

interface ConnectWalletWithSignature {
  // eslint-disable-next-line no-unused-vars
  getProviderSignature: (message: string, address: string) => Promise<string>;
}

interface Reward {
  rewardId: string;
  transactionHash: string;
}

interface UserRewards {
  [userAddress: string]: Reward[];
}

const RewardCard = ({
  rewardDetails,
  rewardStatus,
  handleClick,
  userDetails,
  rewardCss,
  rewardsStatusRefetch,
}: RewardCardProp) => {
  const { _id, name, description, isActive, expiry, links, burnEXP, tokenAmount } = rewardDetails;
  const connectWalletRef = useRef<ConnectWalletWithSignature>(null);
  const [currentRewardStatus, setCurrentTaskStatus] = useState<REWARD>(rewardStatus);
  const [numberOfDaysLeftToCompleteTask, setNumberOfDaysLeftToCompleteTask] = useState<number | null>(null);

  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState<boolean>(false);

  const [isOneIDRewardLocked, setIsOneIDRewardLocked] = useState<boolean>(false);
  const [isVoyagerRewardLocked, setIsVoyagerRewardLocked] = useState<boolean>(false);
  const OneIDRewardID = name.includes('OneID') ? _id : null; // Update this line
  const VoyagerIDRewardID = name.includes('Voyager') ? _id : null; // Update this line

  useEffect(() => {
    if (isActive === false) {
      if (rewardStatus === REWARD.COMPLETED) {
        setCurrentTaskStatus(REWARD.COMPLETED_AND_EXPIRED);
      } else if (rewardStatus === REWARD.CLAIMED) {
        setCurrentTaskStatus(REWARD.COMPLETED_AND_EXPIRED);
      }
    }
  }, [isActive, rewardStatus]);

  useEffect(() => {
    if (OneIDRewardID !== null && rewardStatus === REWARD.PENDING) {
      setIsOneIDRewardLocked(true);
    } else if (OneIDRewardID !== null && rewardStatus === REWARD.COMPLETED) {
      setIsOneIDRewardLocked(false);
    }

    if (VoyagerIDRewardID !== null && rewardStatus === REWARD.PENDING) {
      setIsVoyagerRewardLocked(true);
    } else if (VoyagerIDRewardID !== null && rewardStatus === REWARD.COMPLETED) {
      setIsVoyagerRewardLocked(false);
    }
  }, [OneIDRewardID, VoyagerIDRewardID, rewardStatus]);

  const handleClaim = async () => {
    const message = `Burn ${burnEXP} EXPs and ${name}`;

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
      const response = await axiosClient.post(
        `${apiRoutes.claimRewards}${_id}`,
        { body: { EXP: burnEXP } },
        { headers: { signature: sign } },
      );

      if (response.status === 200) {
        const transactionData: TransactionDataType = {
          amount: tokenAmount,
          expBurned: burnEXP,
          txHash: response.data.transactionHash,
          advertiserDetails: links,
        };
        // Handle successful claim
        handleClick(_id, transactionData);
        setRewardDataInLocalStorage(userDetails.address, _id, response.data.transactionHash);
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
      toast.error('Something went wrong ', {
        id: 'error',
      });
    }
  };

  const handleBtnClick = async () => {
    if (_id === '1') {
      const linkToOpen = links[0].website;
      window.open(linkToOpen, '_blank');
    } else if (isOneIDRewardLocked || isVoyagerRewardLocked) {
      setIsVerifyModalOpen(true);
    } else if (currentRewardStatus === REWARD.COMPLETED) {
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

  const closeVerifyInviteCodeModal = () => {
    setIsVerifyModalOpen(false);
  };

  useEffect(() => {
    if (expiry) {
      const daysLeft = calculateDaysLeft(expiry);
      setNumberOfDaysLeftToCompleteTask(daysLeft);
    }
  }, [expiry]);

  const setRewardDataInLocalStorage = (userAddress: string, rewardId: string, txnHash: string): void => {
    const storedData = localStorage.getItem('RewardsData');
    const existingData: UserRewards[] = storedData ? JSON.parse(storedData) : [];
    let userEntry = existingData.find((entry) => Object.keys(entry)[0] === userAddress);

    if (userEntry) {
      userEntry[userAddress].push({ rewardId, transactionHash: txnHash });
    } else {
      userEntry = { [userAddress]: [{ rewardId, transactionHash: txnHash }] };
      existingData.push(userEntry);
    }
    localStorage.setItem('RewardsData', JSON.stringify(existingData));
  };

  const getTransactionHashFromLocalStorage = (): string | null => {
    const storedData = localStorage.getItem('RewardsData');
    if (!storedData) {
      return null;
    }

    const rewardsData: UserRewards[] = JSON.parse(storedData);
    const userEntry = rewardsData.find((entry) => Object.keys(entry)[0] === userDetails.address);

    if (!userEntry) {
      return null;
    }

    const reward = userEntry[userDetails.address].find((reward) => reward.rewardId === _id);

    return reward ? reward.transactionHash : null;
  };
  const txHash = getTransactionHashFromLocalStorage();

  // TODO
  const baseUrl = OneIDRewardID || VoyagerIDRewardID ? 'https://bscscan.com/tx/' : 'https://polygonscan.com/tx/';

  return (
    <>
      <div
        key={_id}
        aria-hidden
        className={`"w-[90%] my-2 flex my-2place-self-start justify-between items-center p-4 rounded-xl mx-4   ${rewardCss ? rewardCss : 'neomorphic'} `}
      >
        <div className="w-[80%] max-w-[80%]">
          <div className="text-xl flex gap-2 justify-between ">
            <span>{name} </span>
            <div className="flex justify-center items-center">
              {_id !== '1' && (
                <span className="text-xs  rounded-xl px-1 flex  justify-center items-center gap-1 text-nowrap ">
                  <Clock size={12} />
                  {numberOfDaysLeftToCompleteTask !== null ? `${numberOfDaysLeftToCompleteTask} days left` : ''}
                </span>
              )}
            </div>
          </div>

          <div className="text-sm break-words pt-2 text-gray-200">{description}</div>
        </div>
        <ConnectWallet ref={connectWalletRef} btnType={CONNECT_WALLET_BTN.GET_SIGNATURE} />
        <div className="text-base">
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
            } flex flex-col justify-center relative z-10 items-center rounded-xl px-2 min-w-24 max-h-10 text-gray-200 font-medium py-2 cursor-pointer ml-auto`}
          >
            {_id === '1' ? (
              <span className="text-sm xl:text-base">Learn More</span>
            ) : isOneIDRewardLocked === true || isVoyagerRewardLocked === true ? (
              <>Unlock</>
            ) : currentRewardStatus === REWARD.EXPIRED ? (
              <>Expired</>
            ) : currentRewardStatus === REWARD.COMPLETED ? (
              <span>Redeem</span>
            ) : currentRewardStatus === REWARD.CLAIMED || currentRewardStatus === REWARD.CLAIMED_AND_EXPIRED ? (
              <span>Redeemed</span>
            ) : (
              <>
                <span>Locked</span>
              </>
            )}
          </button>
          {(currentRewardStatus === REWARD.CLAIMED || currentRewardStatus === REWARD.CLAIMED_AND_EXPIRED) && txHash && (
            <a
              href={`${baseUrl}${txHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 flex gap-2 whitespace-nowrap items-center text-xs"
            >
              View on explorer
              <img src={externalLink} className="h-3 w-3" alt="External link" />
            </a>
          )}
        </div>
      </div>
      <VerifyInviteCodeModal
        isOpen={isVerifyModalOpen}
        onClose={() => closeVerifyInviteCodeModal()}
        rewardsStatusRefetch={rewardsStatusRefetch}
      />
    </>
  );
};

export default RewardCard;
