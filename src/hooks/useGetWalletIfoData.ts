import { useContractCalls, useEthers, useTokenAllowance } from "@usedapp/core";
import BigNumber from "bignumber.js";
import { useEffect, useState } from "react";
import { Ifo, WalletState } from "src/config/types";
import { useCall } from ".";
import { useIfoContract } from "./useGetContract";

export const useGetWalletIfoData = (ifo: Ifo) => {
  const { account } = useEthers();

  const [walletState, setWalletState] = useState<WalletState>({
    isPendingTransaction: false,
    offeringTokenBalance: new BigNumber(0),
    refundingAmount: new BigNumber(0),
    userInfo: {
      amount: new BigNumber(0),
      claimed: false,
    },
    isLoading: true,
  });

  const { address, currencyAddress } = ifo;
  const contract = useIfoContract(address);
  const allowance = useTokenAllowance(currencyAddress, account, address);

  const setPendingTransaction = (status: boolean) =>
    setWalletState((prevState) => ({
      ...prevState,
      isPendingTransaction: status,
    }));

  const addUserContributedAmount = (amount: BigNumber) => {
    setWalletState((prevState) => ({
      ...prevState,
      userInfo: {
        ...prevState.userInfo,
        amount: prevState.userInfo.amount.plus(amount),
      },
    }));
  };

  const setIsClaimed = () => {
    setWalletState((prevState) => ({
      ...prevState,
      userInfo: {
        ...prevState.userInfo,
        claimed: true,
      },
    }));
  };

  const userInfo = useCall("ifo", address, "userInfo", [account]);
  const refundingAmount = useCall("ifo", address, "getRefundingAmount", [
    account,
  ]);
  const offeringAmount = useCall("ifo", address, "getOfferingAmount", [
    account,
  ]);

  const contractCallResults = useContractCalls([
    userInfo,
    refundingAmount,
    offeringAmount,
  ]);

  useEffect(() => {
    if (contractCallResults.filter(Boolean).length) {
      const [userInfo, refundingAmount, offeringAmount] = contractCallResults;

      setWalletState((prevState) => ({
        ...prevState,
        offeringTokenBalance: new BigNumber(offeringAmount?.[0]?._hex),
        refundingAmount: new BigNumber(refundingAmount?.[0]?._hex),
        isLoading: false,
        userInfo: {
          amount: new BigNumber(userInfo?.amount?._hex),
          claimed: userInfo?.claimed,
        },
      }));
    }
  }, [contractCallResults]);

  return walletState;
};
