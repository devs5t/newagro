import { useBlockNumber, useContractCalls } from "@usedapp/core";
import BigNumber from "bignumber.js";
import { useEffect, useState } from "react";
import { Ifo, IfoStatus, PublicIfoState } from "src/config/types";
import { useCall } from ".";

const BSC_BLOCK_TIME = 3;

const getStatus = (
  currentBlock: number,
  startBlock: number,
  endBlock: number
): IfoStatus => {
  if (currentBlock === 0) return "idle";
  if (currentBlock < startBlock) return "coming_soon";
  if (currentBlock >= startBlock && currentBlock <= endBlock) return "live";
  if (currentBlock > endBlock) return "finished";

  return "idle";
};

export const useGetPublicIfoData = (ifo: Ifo): PublicIfoState => {
  const [publicData, setPublicData] = useState<PublicIfoState>({
    status: "idle",
    blocksRemaining: 0,
    secondsUntilStart: 0,
    progress: 5,
    secondsUntilEnd: 0,
    raisingAmount: new BigNumber(0),
    totalAmount: new BigNumber(0),
    offeringAmount: new BigNumber(0),
    startBlockNum: 0,
    endBlockNum: 0,
    offeringToken: "",
    isLoading: true,
    overflow: true,
  });
  const currentBlock = useBlockNumber() || 0;

  const { address, releaseBlockNumber } = ifo;

  const startBlock = useCall("ifo", address, "startBlock", undefined);
  const endBlock = useCall("ifo", address, "endBlock", undefined);
  const raisingAmount = useCall("ifo", address, "raisingAmount", undefined);
  const totalAmount = useCall("ifo", address, "totalAmount", undefined);
  const offeringAmount = useCall("ifo", address, "offeringAmount", undefined);
  const offeringToken = useCall("ifo", address, "offeringToken", undefined);
  const overflow = useCall("ifo", address, "overflow", undefined);

  const contractCallsResult = useContractCalls([
    startBlock,
    endBlock,
    raisingAmount,
    totalAmount,
    offeringAmount,
    offeringToken,
    overflow,
  ]);

  useEffect(() => {
    if (contractCallsResult.filter(Boolean).length) {
      const [
        startBlock,
        endBlock,
        raisingAmount,
        totalAmount,
        offeringAmount,
        offeringToken,
        overflow,
      ] = contractCallsResult.flat();

      const startBlockNum = parseInt(startBlock?._hex);
      const endBlockNum = parseInt(endBlock?._hex);

      const status = getStatus(currentBlock, startBlockNum, endBlockNum);
      const totalBlocks = endBlockNum - startBlockNum;
      const blocksRemaining = endBlockNum - currentBlock;

      const progress =
        currentBlock > startBlockNum
          ? ((currentBlock - startBlockNum) / totalBlocks) * 100
          : ((currentBlock - releaseBlockNumber) /
              (startBlockNum - releaseBlockNumber)) *
            100;

      const overflowMethod = overflow || true;

      setPublicData({
        secondsUntilEnd: blocksRemaining * BSC_BLOCK_TIME,
        secondsUntilStart: (startBlockNum - currentBlock) * BSC_BLOCK_TIME,
        raisingAmount: new BigNumber(raisingAmount._hex),
        totalAmount: new BigNumber(totalAmount._hex),
        offeringAmount: new BigNumber(offeringAmount._hex),
        status,
        progress,
        blocksRemaining,
        startBlockNum,
        endBlockNum,
        offeringToken,
        isLoading: false,
        overflow: overflowMethod,
      });
    }
  }, [contractCallsResult, currentBlock, releaseBlockNumber]);

  return publicData;
};
