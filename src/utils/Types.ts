import { UserType } from './Enum';

export type TaskType = {
  _id: number;
  name: string;
  description: string;
  EXP: number;
  expiry: number;
};

export type UserDetailsType = {
  address: string;
  completedTasks: [];
  earnedEXP: number;
  role: UserType;
  userName: string;
};

export interface ReactChildProps {
  children: JSX.Element[] | JSX.Element;
}
