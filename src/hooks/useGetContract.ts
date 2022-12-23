import { useEthers } from "@usedapp/core";
import { Contract, utils } from "ethers";
import { useMemo } from "react";
import defiLaunchAbi from "src/config/abi/defiLaunch.json";
import erc20Abi from "src/config/abi/erc20.json";
import farmAbi from "src/config/abi/farm.json";
import ifoAbi from "src/config/abi/ifo.json";
import masterChef from "src/config/abi/masterchef.json";
import poolAbi from "src/config/abi/pool.json";
import referralContract from "src/config/abi/referral.json";
import sousChef from "src/config/abi/sousChef.json";
import strategyContract from "src/config/abi/strategyContract.json";
import zapAbi from "src/config/abi/zapAbi.json";
import addresses from "src/config/constants/contracts";

export const useIfoContract = (address: string): Contract => {
  const { library } = useEthers();

  return useMemo(
    () =>
      new Contract(address, new utils.Interface(ifoAbi), library?.getSigner()),
    [address, library]
  );
};

export const useERC20 = (address?: string): Contract | void => {
  const { library, account } = useEthers();
  return useMemo(() => {
    if (account && address) {
      return new Contract(
        address,
        new utils.Interface(erc20Abi),
        library?.getSigner()
      );
    }
  }, [address, library, account]);
};

export const useERC20ReadOnly = (address?: string): Contract | void => {
  const { library } = useEthers();
  return useMemo(() => {
    if (address) {
      return new Contract(
        address,
        new utils.Interface(erc20Abi),
        library?.getSigner()
      );
    }
  }, [address, library]);
};

export const useSwapContract = (address: string): Contract | void => {
  const { library, account } = useEthers();
  return useMemo(() => {
    if (account) {
      return new Contract(
        address,
        new utils.Interface(zapAbi),
        library?.getSigner()
      );
    }
  }, [address, library, account]);
};

export const useDefiLaunchContract = (address: string): Contract => {
  const { library } = useEthers();
  return useMemo(
    () =>
      new Contract(
        address,
        new utils.Interface(defiLaunchAbi),
        library?.getSigner()
      ),
    [address, library]
  );
};

export const useSousChef = (address: string): Contract => {
  const { library } = useEthers();

  return useMemo(
    () =>
      new Contract(
        address,
        new utils.Interface(sousChef),
        library?.getSigner()
      ),
    [address, library]
  );
};

export const useMasterChef = (address?: string) => {
  const { library, account } = useEthers();

  return useMemo(() => {
    if (account) {
      return new Contract(
        address || addresses.masterChef[56],
        new utils.Interface(masterChef),
        library?.getSigner()
      );
    }
  }, [account, address, library]);
};

export const useFarm = (address?: string) => {
  const { library, account } = useEthers();

  return useMemo(() => {
    if (account && address) {
      return new Contract(
        address,
        new utils.Interface(farmAbi),
        library?.getSigner()
      );
    }
  }, [account, address, library]);
};

export const usePool = (address?: string) => {
  const { library, account } = useEthers();

  return useMemo(() => {
    if (account && address) {
      return new Contract(
        address,
        new utils.Interface(poolAbi),
        library?.getSigner()
      );
    }
  }, [account, address, library]);
};

export const useStrategy = (address?: string) => {
  const { library, account } = useEthers();

  return useMemo(() => {
    if (account && address) {
      return new Contract(
        address,
        new utils.Interface(strategyContract),
        library?.getSigner()
      );
    }
  }, [account, address, library]);
};

export const useReferral = (address?: string) => {
  const { library, account } = useEthers();

  return useMemo(() => {
    if (account && address) {
      return new Contract(
        address,
        new utils.Interface(referralContract),
        library?.getSigner()
      );
    }
  }, [account, address, library]);
};
