/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ContractCall, useContractCall } from "@usedapp/core";
import { Falsy } from "@usedapp/core/dist/esm/src/model/types";
import { ethers } from "ethers";
import defiLaunchAbi from "src/config/abi/defiLaunch.json";
import erc20Abi from "src/config/abi/erc20.json";
import ifoAbi from "src/config/abi/ifo.json";
import masterChefAbi from "src/config/abi/masterchef.json";
import strategyAbi from "src/config/abi/strategyContract.json";
import { CallType } from "src/config/types";

const abiMap = {
  ifo: ifoAbi,
  erc20: erc20Abi,
  dlaunch: defiLaunchAbi,
  masterchef: masterChefAbi,
  strategy: strategyAbi,
};

/**
 *
 * @param callType determines which abi is being used
 * @param address of the contract/token/ifo
 * @param method to execute, i.e: "balanceOf"
 * @param args that the method previously mentioned needs
 */
export function useCall(
  callType: CallType,
  address: string,
  method: string,
  args?: any[]
): ContractCall | Falsy {
  const abi = new ethers.utils.Interface(abiMap[callType]) as any;

  const call: ContractCall = {
    abi,
    address,
    method,
    args: args as any[],
  };

  return call;
}

/**
 *
 * @param callType determines which abi is being used
 * @param address of the contract/token/ifo
 * @param method to execute, i.e: "balanceOf"
 * @param args that the method previously mentioned needs
 */
export function useImmediateCall(
  callType: CallType,
  address: string,
  method: string,
  args?: any[]
): any[] | undefined {
  const abi = new ethers.utils.Interface(abiMap[callType]) as any;

  const call: ContractCall = {
    abi,
    address,
    method,
    args: args as any[],
  };

  return useContractCall(call);
}
