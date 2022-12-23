import BigNumber from "bignumber.js";
import { Contract } from "ethers";

export interface Ifo {
  id: string;
  isActive: boolean;
  address: string;
  address0?: string;
  address1?: string;
  address2?: string;
  name: string;
  subTitle?: string;
  description?: string;
  launchDate: string;
  launchTime: string;
  saleAmount: string;
  raiseAmount: string;
  cakeToBurn: string;
  projectSiteUrl: string;
  twitterUrl: string;
  telegramUrl: string;
  currency: string;
  currencyAddress: string;
  tokenDecimals: number;
  tokenSymbol: string;
  releaseBlockNumber: number;
  campaignId?: string;
  launchPrice?: number;
}

export type IfoStatus = "idle" | "coming_soon" | "live" | "finished";

export interface PublicIfoState {
  status: IfoStatus;
  blocksRemaining: number;
  secondsUntilStart: number;
  progress: number;
  secondsUntilEnd: number;
  raisingAmount: BigNumber;
  totalAmount: BigNumber;
  offeringAmount: BigNumber;
  startBlockNum: number;
  endBlockNum: number;
  offeringToken: string;
  isLoading: boolean;
  overflow: boolean;
}

export interface UserInfo {
  amount: BigNumber;
  claimed: boolean;
}

export interface WalletState {
  isPendingTransaction: boolean;
  offeringTokenBalance: BigNumber;
  refundingAmount: BigNumber;
  userInfo: UserInfo;
  isLoading: boolean;
  allowance?: BigNumber;
  contract?: Contract;
}

export type CallType = "ifo" | "erc20" | "dlaunch" | "masterchef" | "strategy";
