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
  } = useQuery({ queryKey: ['rewards-status'], queryFn: getAllRewardsStatus });
  console.log('This is rewards ', rewardsStatusError, rewardsStatusData, rewardsStatusAreLoading);

  useEffect(() => {
    if (rewardsStatusData && runningRewards) {
      const completedRewards = runningRewards.filter((reward) =>
        rewardsStatusData.data.every((status) => status.id === reward._id && status.isEligible && !status.isClaimed),
      );
      const ongoingRewards = runningRewards.filter((reward) =>
        rewardsStatusData.data.every((status) => status.id === reward._id && !status.isEligible && !status.isClaimed),
      );
      const claimedRewards = runningRewards.filter((reward) =>
        rewardsStatusData.data.every((status) => status.id === reward._id && status.isClaimed),
      );

      setCompletedRewards(completedRewards);
      setOngoingRewards(ongoingRewards);
      setClaimedRewards(claimedRewards);
    }
  }, [rewardsStatusData, runningRewards]);

  return (
    <div className="flex flex-col gap-4">
      {completedRewards.length > 0 && (
        <div className="flex flex-col gap-2">
          {completedRewards.map((reward, index) => (
            <RewardCard
              key={index}
              rewardDetails={reward}
              handleClick={(_id: string, _transactionData) => handleClick(_id, _transactionData)}
              rewardStatus={REWARD.COMPLETED}
              userDetails={userDetails}
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
              rewardCss=""
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default RunningRewards;
