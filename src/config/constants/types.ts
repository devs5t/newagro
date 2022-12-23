// import { TranslatableText } from 'state/types'

export type IfoStatus = "idle" | "coming_soon" | "live" | "finished";

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
  audit?: string;
  countdown?: boolean;
  toBeConfirmed?: boolean;
}

export enum QuoteToken {
  "BANANA" = "BANANA",
  "BBQ" = "BBQ",
  "BIKINI" = "BIKINI",
  "BIKINIBNB" = "BIKINI-BNB LP",
  "BIKINIBUSD" = "BIKINI-BUSD LP",
  "BNB" = "BNB",
  "BUSD" = "BUSD",
  "CAKE" = "CAKE",
  "DLAUNCH" = "DLAUNCH",
  "DLAUNCHBUSD" = "DLAUNCH-BUSD LP",
  "LORY" = "LORY",
  "LORYBNB" = "LORY-BNB LP",
  "LORYBUSD" = "LORY-BUSD LP",
  "LORYUSDT" = "LORY-USDT LP",
  "PEAR" = "PEAR",
  "USDT" = "USDT",
  "WBNB" = "WBNB",
}

export enum PoolCategory {
  "COMMUNITY" = "Community",
  "CORE" = "Core",
  "BINANCE" = "Binance", // Pools using native BNB behave differently than pools using a token
}

export interface Address {
  97?: string;
  56?: string;
}
export interface Farm {
  functionName?: string;
  isCompounding?: boolean;
  pid: number;
  address?: string;
  earnApiIndexPrice?: string;
}

export interface MultipleTokenAddress {
  token0Address: string;
  token1Address: string;
}

export interface FPToken {
  address?: string;
  addresses?: MultipleTokenAddress;
  buyLink?: string;
  decimals?: number;
  name: string;
  pathToBnb?: string[];
  router?: string;
  token: string;
  uses?: string;
}

export interface FarmPool {
  apiIndexApy?: string;
  apiIndexPrice?: string;
  contractAddress: Address;
  earnDescription?: string;
  earningToken: FPToken;
  farm?: Farm;
  harvest?: boolean;
  id?: string;
  isFinished?: boolean;
  isLp?: boolean;
  isVault?: boolean;
  multiplier?: number;
  name?: string;
  network?: string;
  originFarm?: Farm;
  performanceFee?: number;
  poolCategory?: PoolCategory;
  projectLink?: string;
  sousId?: number;
  stakingToken: FPToken;
  strategyContractAddress?: Address;
  tokenPerBlock?: string;
}

export interface FarmConfig {
  //   earnLabel: string;
  //   endBlock: number;
  //   rewardPerBlock: number;
  // };
  // apeLp?: boolean;
  // apiIndexApyFactor?: number;
  // aTokenAddress?: Address;
  // boostPools?: boolean;
  // cafeLp?: boolean;
  // defaultFarmApr?: number;
  // dual?: {
  // farmContractAddress?: Address;
  // farmPendingFunctionName?: string;
  // farmPendingPid?: number;
  // getURL?: string;
  // hidden?: boolean;
  // highlighted?: boolean;
  // isBoosted?: boolean;
  // isCommunity?: boolean;
  // isTokenOnly?: boolean;
  // lpAddresses?: Address;
  // lpSymbol?: string;
  // pid?: number;
  // quoteTokenAdresses?: Address;
  // quoteTokenSymbol?: QuoteToken;
  // tokenAddresses?: Address;
  // tokenSymbol?: string;
  apiIndexApy?: string; // Being used for API
  apiIndexPrice?: string;
  earnDescription: string;
  earnedToken: QuoteToken;
  farm: Farm;
  farmContactAddress: Address;
  farmFunctionName: string;
  id: string;
  multiplier?: string;
  name: string;
  network: string;
  strategyContractAddress?: Address;
  token: QuoteToken;
  uses?: string;
}

export interface PoolConfig {
  // apy?: BigNumber; -> Lo puedo obtener del metodo.
  // bushVersion?: number; -> No se usa
  contractAddress: Address;
  // depositFee?: number; -> No se usa
  // getTokenURL?: string; -> Reemplazado
  harvest?: boolean;
  image?: string;
  // isBush?: boolean;
  isFinished?: boolean;
  isLp?: boolean;
  lpAddress?: string;
  poolCategory: PoolCategory;
  projectLink: string;
  rewardLpAddress?: string;
  rewardToken0?: string;
  rewardToken1?: string;
  // sortOrder?: number;
  sousId: number;
  // stakingLimit?: number;
  stakingTokenAddress?: string;
  stakingTokenBuy: string;
  stakingTokenDecimals?: number;
  stakingTokenName: QuoteToken;
  stakingTokenPathToBnb: string[];
  stakingTokenRouter: string;
  stakingTokenUses: string;
  token0?: string; // Puede ser stakingTokenAddress
  token1?: string; // Puede ser tokenAddress
  tokenAddress: string;
  tokenBuy: string;
  tokenDecimals: number;
  tokenLabel: string;
  tokenName: string;
  tokenPathToBnb: string[];
  tokenPerBlock: string;
  tokenRouter: string;
  tokenUses: string;
}

export interface Token {
  getTokenURL?: string;
  pathToBnb?: string[];
  router?: string;
  tokenAddress: string | undefined;
  tokenName: string;
  uses?: string;
}

export type Images = {
  lg: string;
  md: string;
  sm: string;
  ipfs?: string;
};

export type NftImages = {
  blur?: string;
} & Images;

export type NftVideo = {
  webm: string;
  mp4: string;
};

export type Nft = {
  name: string;
  description: string;
  images: NftImages;
  sortOrder: number;
  bunnyId: number;
  video?: NftVideo;
};

export type TeamImages = {
  alt: string;
} & Images;

export type Team = {
  id: number;
  name: string;
  description: string;
  isJoinable?: boolean;
  users: number;
  points: number;
  images: TeamImages;
  background: string;
  textColor: string;
};

export type CampaignType = "ifo";

export type Rounded =
  | "default"
  | 0
  | 1
  | 2
  | 3
  | "bottom"
  | "top"
  | "circle"
  | "end"
  | "start"
  | "pill";

export type Shadow = "default" | "none" | "sm" | "md" | "lg" | "3d";

export type Colors =
  | "primary"
  | "secondary"
  | "success"
  | "info"
  | "warning"
  | "danger"
  | "light"
  | "dark";

export type Stretch = "full" | "semi";

export type Size = "sm" | "lg";

export type Direction = "left" | "right";
