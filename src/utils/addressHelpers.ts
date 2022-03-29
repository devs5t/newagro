import addresses from "src/config/constants/contracts";
import { Address } from "src/config/constants/types";

export const getAddress = (address: Address): string => {
  const mainNetChainId = 56;
  const chainId = import.meta.env.VITE_APP_CHAIN_ID;
  return address[chainId] ? address[chainId] : address[mainNetChainId];
};

export const isAdminAddress = (address: string) => {
  let adminAddresses: string = import.meta.env.VITE_APP_ADMIN_ADDRESSES || '';
  adminAddresses = adminAddresses.split(',');
  return adminAddresses.includes(address);
};

export const getCakeAddress = () => {
  return getAddress(addresses.cake);
};
export const getMasterChefAddress = () => {
  return getAddress(addresses.masterChef);
};
export const getMulticallAddress = () => {
  return getAddress(addresses.mulltiCall);
};
export const getWbnbAddress = () => {
  return getAddress(addresses.wbnb);
};
export const getLotteryAddress = () => {
  return getAddress(addresses.lottery);
};
export const getLotteryTicketAddress = () => {
  return getAddress(addresses.lotteryNFT);
};
export const getPancakeProfileAddress = () => {
  return getAddress(addresses.pancakeProfile);
};
export const getPancakeRabbitsAddress = () => {
  return getAddress(addresses.pancakeRabbits);
};
export const getBunnyFactoryAddress = () => {
  return getAddress(addresses.bunnyFactory);
};
export const getClaimRefundAddress = () => {
  return getAddress(addresses.claimRefund);
};
export const getPointCenterIfoAddress = () => {
  return getAddress(addresses.pointCenterIfo);
};
export const getBunnySpecialAddress = () => {
  return getAddress(addresses.bunnySpecial);
};
export const getDefiLaunchAddress = () => {
  return getAddress(addresses.defiLaunch);
};
