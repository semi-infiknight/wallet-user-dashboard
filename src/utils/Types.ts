export type TaskType = {
  _id: number;
  name: string;
  description: string;
  EXP: number;
  expiry: number;
  
};


export interface ReactChildProps {
  children: JSX.Element[] | JSX.Element;
}