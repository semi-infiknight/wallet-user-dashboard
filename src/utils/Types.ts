import { UserType } from './Enum';

export type TaskType = {
  _id: string;
  name: string;
  description: string;
  isActive: boolean;
  EXP: number;
  expiry: number;
  links: [];
};

export type Links = {
  videoLink: string;
  website: string;
};

export type RewardType = {
  _id: string;
  name: string;
  description: string;
  isActive: boolean;
  expiry: number;
  links: Links[];
  burnEXP: string;
  tokenAddress: string;
  tokenAmount: string;
  tokenDecimal: string;
  chain: string;
};

export type CompletedTaskType = {
  id: string;
  isClaimed: boolean;
};

export type CompletedRewardsType = {
  id: string;
  isClaimed: boolean;
};

export type UserDetailsType = {
  address: string;
  completedTasks: CompletedTaskType[];
  completedRewards: CompletedRewardsType[];
  earnedEXP: number;
  role: UserType;
  userName: string;
};

export type LeaderBoardType = {
  address: string;
  EXP: number;
};

export type TransactionDataType = {
  amount: string;
  expBurned: string;
  txHash: string;
  advertiserDetails: Links[];
};

export interface ReactChildProps {
  children: JSX.Element[] | JSX.Element;
}
