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

export type RewardType = {
  _id: string;
  name: string;
  description: string;
  isActive: boolean;
  expiry: number;
  links: [];
};


export type CompletedTaskType = {
  id: string;
  isClaimed: boolean;
};

export type UserDetailsType = {
  address: string;
  completedTasks: CompletedTaskType[];
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
};

export interface ReactChildProps {
  children: JSX.Element[] | JSX.Element;
}
