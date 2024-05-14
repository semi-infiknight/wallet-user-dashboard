/* eslint-disable no-unused-vars */
export enum UserType {
  USER = 'USER',
  BOTH = 'BOTH',
  ADVERTISER = 'ADVERTISER',
}

export enum TASK {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  CLAIMED = 'CLAIMED',
  EXPIRED = 'EXPIRED',
  COMPLETED_AND_EXPIRED = 'COMPLETED_AND_EXPIRED',
  CLAIMED_AND_EXPIRED = 'CLAIMED_AND_EXPIRED',
}

export enum CONNECT_WALLET_BTN {
  CONNECT = 'CONNECT',
  DISCONNECT = 'DISCONNECT',
  GET_SIGNATURE = "GET_SIGNATURE" // This is used to call only functions in the connect wallet button.
}
