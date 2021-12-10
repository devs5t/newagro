import getRpcUrl from "src/utils/getRpcUrl";
import { HttpProviderOptions } from "web3-core-helpers";
import Web3 from "web3/dist/web3.min.js";

const RPC_URL = getRpcUrl();

const httpProvider = new Web3.providers.HttpProvider(
  RPC_URL as string,
  { timeout: 10000 } as HttpProviderOptions
);

const web3NoAccount = new Web3(httpProvider);

const getWeb3NoAccount = () => {
  return web3NoAccount;
};

export { getWeb3NoAccount };

export default web3NoAccount;
