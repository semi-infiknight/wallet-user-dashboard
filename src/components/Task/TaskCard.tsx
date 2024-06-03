import ConnectWallet from './../ConnectWallet';
import { useEffect, useRef, useState } from 'react';
import { CONNECT_WALLET_BTN, TASK } from '../../utils/Enum';
import { TaskType, UserDetailsType } from '../../utils/Types';
import EXPIcon from '../../assets/EXP.png';
import { apiRoutes } from '../../services/apiRoutes';
import axiosClient from '../../services/config/axiosClient';
import toast from 'react-hot-toast';
import { calculateDaysLeft } from '../../utils/helper';
import { Clock, ExternalLink } from 'react-feather';

type TaskCardProp = {
  taskDetails: TaskType;
  taskStatus: TASK;
  handleClick: (_id: string) => void;
  userDetails: UserDetailsType;
  taskCss: string;
};

interface ConnectWalletWithSignature {
  // eslint-disable-next-line no-unused-vars
  getProviderSignature: (message: string, address: string) => Promise<string>;
}

const TaskCard = ({ taskDetails, taskStatus, handleClick, userDetails, taskCss }: TaskCardProp) => {
  const { _id, name, description, EXP, isActive, expiry, links } = taskDetails;
  const connectWalletRef = useRef<ConnectWalletWithSignature>(null);
  const [currentTaskStatus, setCurrentTaskStatus] = useState<TASK>(taskStatus);
  const [numberOfDaysLeftToCompleteTask, setNumberOfDaysLeftToCompleteTask] = useState<number | null>(null);

  const [currentButtonTitle, setCurrentButtonTitle] = useState<string>('');

  useEffect(() => {
    if (isActive === false) {
      if (taskStatus === TASK.COMPLETED) {
        setCurrentTaskStatus(TASK.COMPLETED_AND_EXPIRED);
      } else if (taskStatus === TASK.CLAIMED) {
        setCurrentTaskStatus(TASK.COMPLETED_AND_EXPIRED);
      }
    }
  }, [isActive, taskStatus]);

  const handleClaim = async (_EXP: number) => {
    console.log('This is claim');

    const message = `Approve this message to claim your ${Number(_EXP)} points`;
    const messageForUSDTClaim = 'Burn 350 EXPs to claim your USDT.';

    let sign = '';
    // pass message and the address here
    try {
      if (connectWalletRef.current) {
        if (EXP === 0) {
          sign = await connectWalletRef.current.getProviderSignature(messageForUSDTClaim, userDetails.address);
        } else {
          sign = await connectWalletRef.current.getProviderSignature(message, userDetails.address);
        }
        console.log(sign);
        if (!sign) {
          toast.error('Invalid signature', {
            id: 'error',
          });
          return;
        }
      } else {
        console.error('connectWalletRef.current is null');
        return;
      }
    } catch (error) {
      toast.error('Something went wrong', {
        id: 'error',
      });
      return;
    }

    try {
      const response = await axiosClient.post(`${apiRoutes.claimEXP}${_id}`, {}, { headers: { signature: sign } });

      if (response.status === 200) {
        // Handle successful claim
        console.log('Task claimed successfully');
        handleClick(_id);
      } else {
        // Handle error
        console.error(`Failed to claim task: ${response.status} ${response.statusText}`);
        toast.error('Failed to claim task', {
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
      toast.error('Something went wrong', {
        id: 'error',
      });
    }
  };

  const handleCompleted = async () => {
    // add this task in the completed array.
    const response = await axiosClient.post(`${apiRoutes.completeSocialTask}${_id}`);

    console.log(response);
  };

  const handleBtnClick = async (_EXP: number) => {
    if (currentTaskStatus === TASK.COMPLETED) {
      await handleClaim(_EXP);
    } else if (currentButtonTitle === 'Open') {
      // make it open in new link like a target.

      if (links.length > 0) {
        const link = links as Array<string>;
        const linkToOpen = link[0];
        window.open(linkToOpen, '_blank');

        // Call handleCompleted after 15 seconds
        setTimeout(async () => {
          await handleCompleted();
        }, 15000); // 15000 milliseconds = 15 seconds
      }
    } else if (currentTaskStatus === TASK.PENDING) {
      if (currentButtonTitle === 'Claim') {
        if (EXP > 350) {
          toast('Please collect 350 EXP to claim this task');
        }
      }
      toast('Task not completed yet', {
        icon: '❌',
        id: 'pending',
      });
    } else if (currentTaskStatus === TASK.CLAIMED) {
      toast('Task already claimed', {
        icon: '👏🏻',
        id: 'claimed',
      });
    } else if (
      currentTaskStatus === TASK.EXPIRED ||
      currentTaskStatus === TASK.CLAIMED_AND_EXPIRED ||
      currentTaskStatus === TASK.COMPLETED_AND_EXPIRED
    ) {
      toast('Task has already expired', {
        icon: '🚫',
        id: 'expired',
      });
    }
  };

  useEffect(() => {
    if (EXP === 0) {
      setCurrentButtonTitle('Claim');
    }

    if (links.length > 0) {
      setCurrentButtonTitle('Open');
    }
  }, [links, EXP]);

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
      className={`"w-[90%] my-2 flex my-2place-self-start justify-between items-center p-4 rounded-xl mx-4   ${taskCss ? taskCss : 'neomorphic'} `}
    >
      <div className="w-[80%] max-w-[80%]">
        <div className="text-xl flex gap-2 justify-between ">
          <div className=" flex gap-2">
            <span>{name} </span>
            {currentTaskStatus === TASK.COMPLETED && (
              <span className="text-sm flex justify-center items-center gap-2">
                <img className="h-6" src={EXPIcon} alt="" />
                {EXP}{' '}
              </span>
            )}
          </div>
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
        onClick={() => handleBtnClick(EXP)}
        className={`${
          currentTaskStatus === TASK.PENDING
            ? 'neomorphic-pending'
            : currentTaskStatus === TASK.COMPLETED
              ? 'neomorphic-completed text-purple-400'
              : currentTaskStatus === TASK.CLAIMED
                ? ' neomorphic-claimed text-orange-300 '
                : currentTaskStatus === TASK.EXPIRED
                  ? 'neomorphic-expired text-rose-600'
                  : currentTaskStatus == TASK.COMPLETED_AND_EXPIRED
                    ? 'neomorphic-expired text-purple-400'
                    : 'neomorphic-expired text-orange-300'
        } flex flex-col justify-center relative z-10 items-center rounded-xl px-2 min-w-24 max-h-10 text-gray-200 font-medium py-2 cursor-pointer`}
      >
        {currentTaskStatus === TASK.EXPIRED ? (
          <>Expired</>
        ) : currentTaskStatus === TASK.COMPLETED || currentTaskStatus === TASK.COMPLETED_AND_EXPIRED ? (
          <span>Claim</span>
        ) : currentTaskStatus === TASK.CLAIMED || currentTaskStatus === TASK.CLAIMED_AND_EXPIRED ? (
          <span>Claimed</span>
        ) : currentButtonTitle === 'Open' ? (
          <span className="flex  justify-center items-center gap-2">
            Open
            <ExternalLink size={15} />
          </span>
        ) : currentButtonTitle === 'Claim' ? (
          <span>Redeem</span>
        ) : (
          <>
            <div className="flex gap-2 justify-center items-center">
              <img className="h-6" src={EXPIcon} alt="task icon" />
              <span className="text-xl">{EXP}</span>
            </div>
          </>
        )}
      </button>
    </div>
  );
};

export default TaskCard;
