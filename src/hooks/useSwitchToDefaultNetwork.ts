import {useEthers} from "@usedapp/core";
import {useCallback} from "react";

export const useSwitchToDefaultNetwork = () => {
  const { library } = useEthers();
  const envChainId: number = Number(import.meta.env.VITE_APP_CHAIN_ID) || 56;

  const map: any = {
    56: {
      chainId: "0x38",
      chainName: "BSCMAINET",
      rpcUrls: ["https://bsc-dataseed1.binance.org"],
      nativeCurrency: {
        name: "BINANCE COIN",
        symbol: "BNB",
        decimals: 18,
      },
      blockExplorerUrls: ["https://testnet.bscscan.com/"],
    },
    42: {
      chainId: "0x2A",
    }
  };

  return useCallback(async () => {
    if (!library) return;

    const lib = library as any;

    const params = map[envChainId];

    let method = 'wallet_addEthereumChain';
    if (envChainId === 42) {
      method = 'wallet_switchEthereumChain';
    }

    await lib.provider?.request({
      method,
      params: [params],
    });
  }, [library, envChainId]);
}