import { useEthers } from "@usedapp/core";
import { useEffect, useState } from "react";
import contracts from "src/config/constants/contracts";
import { formatNumber } from "src/utils/formatUtils";
import { useReferral } from "./useGetContract";
import { useTokenPrice } from "./useTokenPrice";

interface ReferralDetails {
  referralsCount: number;
  totalReferralCommissions: number;
  totalInUsd: number;
}
const INITIAL_REFERRAL_DETAILS = {
  referralsCount: 0,
  totalReferralCommissions: 0,
  totalInUsd: 0,
};

export const useReferralDetails = () => {
  const [referralDetails, setReferralDetails] = useState<ReferralDetails>(
    INITIAL_REFERRAL_DETAILS
  );
  const { account } = useEthers();
  const referralContract = useReferral(contracts.referral[56]);
  const price = useTokenPrice();

  useEffect(() => {
    if (account && referralContract) {
      Promise.allSettled([
        referralContract.referralsCount(account),
        referralContract.totalReferralCommissions(account),
      ]).then(([count, comission]) => {
        const countNum = formatNumber(count.value?._hex);
        const comissionNum = formatNumber(comission?.value?.shares?._hex);

        setReferralDetails({
          referralsCount: countNum.toNumber(),
          totalReferralCommissions: comissionNum.toNumber(),
          totalInUsd: comissionNum.times(price).toNumber(),
        });
      });
    }
  }, [account, price, referralContract]);

  return referralDetails;
};
