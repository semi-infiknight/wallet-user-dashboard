export type TaskType = {
  _id: number;
  name: string;
  description: string;
  EXP: number;
  expiry: number;
  
};

export type userInfoType={
  address:string;
  completedTasks:[];
  earnedEXP:number;
  role:string;
  userName:string
} | null

export interface leftBarProps {
  userData:userInfoType
}

export interface ReactChildProps {
  children: JSX.Element[] | JSX.Element;
}