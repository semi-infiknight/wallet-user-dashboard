import { useState, useEffect } from 'react';
import { RewardType, TransactionDataType, UserDetailsType } from '../../utils/Types';
import { REWARD } from '../../utils/Enum';
import RewardCard from './RewardCard';
import { getAllRewardsStatus } from '../../services/axios';
import { useQuery } from '@tanstack/react-query';

type RunningTasksProps = {
  runningRewards: RewardType[];
  userDetails: UserDetailsType;
  handleClick: (_id: string, _transactionData: TransactionDataType) => void;
};

const RunningRewards = ({ runningRewards, userDetails, handleClick }: RunningTasksProps) => {
  const [completedRewards, setCompletedRewards] = useState<RewardType[]>([]);
  const [ongoingRewards, setOngoingRewards] = useState<RewardType[]>([]);
  const [claimedRewards, setClaimedRewards] = useState<RewardType[]>([]);

  const {
    isLoading: rewardsStatusAreLoading,
    error: rewardsStatusError,
    data: rewardsStatusData,
    refetch: rewardsStatusRefetch,
  } = useQuery({ queryKey: ['rewards-status'], queryFn: getAllRewardsStatus });
  console.log('This is rewards ', rewardsStatusData?.data, runningRewards);
  console.log('This is rewards section ', rewardsStatusAreLoading, rewardsStatusError);

  useEffect(() => {
    if (rewardsStatusData && runningRewards) {
      const completedRewards: RewardType[] = runningRewards.filter((reward) =>
        rewardsStatusData.data.some((status) => status.id === reward._id && status.isEligible && !status.isClaimed),
      );

      const ongoingRewards: RewardType[] = runningRewards.filter((reward) =>
        rewardsStatusData.data.some((status) => status.id === reward._id && !status.isEligible && !status.isClaimed),
      );

      const claimedRewards: RewardType[] = runningRewards.filter((reward) =>
        rewardsStatusData.data.some((status) => status.id === reward._id && status.isClaimed),
      );

      setCompletedRewards(completedRewards);
      setOngoingRewards(ongoingRewards);
      setClaimedRewards(claimedRewards);
    }
  }, [rewardsStatusData, runningRewards]);

  const upcomingReward: RewardType = {
    _id: '1',
    name: 'EXP to $WAX conversion ',
    description: 'Total platform EXPs will be converted to 250,000,000 $WAX soon',
    isActive: false,
    expiry: 0,
    links: [
      {
        videoLink: '',
        website:
          'https://getwalletx.medium.com/unlocking-the-power-of-wax-tokens-convert-your-exps-and-vote-on-wips-5c353d47aaa6',
      },
    ],
    burnEXP: '0',
    tokenAddress: '0x',
    tokenAmount: '0x',
    tokenDecimal: '16',
    chain: 'JMDLR',
  };

  return (
    <div className="flex flex-col gap-4">
      <RewardCard
        key={1}
        rewardDetails={upcomingReward}
        handleClick={(_id: string, _transactionData) => {
          handleClick(_id, _transactionData);
        }}
        rewardStatus={REWARD.PENDING}
        userDetails={userDetails}
        rewardsStatusRefetch={rewardsStatusRefetch}
        rewardCss="fancy-button"
      />

      {completedRewards.length > 0 && (
        <div className="flex flex-col gap-2">
          {completedRewards.map((reward, index) => (
            <RewardCard
              key={index}
              rewardDetails={reward}
              handleClick={(_id: string, _transactionData) => {
                handleClick(_id, _transactionData);
                rewardsStatusRefetch();
              }}
              rewardStatus={REWARD.COMPLETED}
              userDetails={userDetails}
              rewardsStatusRefetch={rewardsStatusRefetch}
              rewardCss=""
            />
          ))}
        </div>
      )}
      {ongoingRewards.length > 0 && (
        <div className="flex flex-col gap-2">
          {ongoingRewards.map((reward, index) => (
            <RewardCard
              key={index}
              rewardDetails={reward}
              handleClick={(_id: string, _transactionData) => handleClick(_id, _transactionData)}
              rewardStatus={REWARD.PENDING}
              userDetails={userDetails}
              rewardsStatusRefetch={rewardsStatusRefetch}
              rewardCss=""
            />
          ))}
        </div>
      )}
      {claimedRewards.length > 0 && (
        <div className="flex flex-col gap-2">
          {claimedRewards.map((reward, index) => (
            <RewardCard
              key={index}
              rewardDetails={reward}
              handleClick={(_id: string, _transactionData) => handleClick(_id, _transactionData)}
              rewardStatus={REWARD.CLAIMED}
              userDetails={userDetails}
              rewardsStatusRefetch={rewardsStatusRefetch}
              rewardCss=""
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default RunningRewards;
