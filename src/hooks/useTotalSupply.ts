import {useCallback, useContext, useEffect, useState} from "react";
import {PriceContext} from "src/contexts/PriceContext";
import {NmilkContext} from "src/contexts/NmilkContext";
import {NbeefContext} from "src/contexts/NbeefContext";
import {NlandContext} from "src/contexts/NlandContext";
import {formatDateToUnixTimestamp} from "src/utils/formatUtils";

export const useTotalSupply = () => {

  const {nacTotalSupply} = useContext(PriceContext);
  const {nmilkLastRewardDate, nmilkRewardPerSecond} = useContext(NmilkContext);
  const {nlandLastRewardDate, nlandRewardPerSecond} = useContext(NlandContext);
  const {nbeefLastRewardDate, nbeefRewardPerSecond} = useContext(NbeefContext);

  const [totalSupply, setTotalSupply] = useState<number>(0);

  const calculateTotalSupply = useCallback(() => {
    const pendingNmilkNac = (formatDateToUnixTimestamp(new Date()) - formatDateToUnixTimestamp(nmilkLastRewardDate)) * nmilkRewardPerSecond;
    const pendingNlandNac = (formatDateToUnixTimestamp(new Date()) - formatDateToUnixTimestamp(nlandLastRewardDate)) * nlandRewardPerSecond;
    const pendingNbeefNac = (formatDateToUnixTimestamp(new Date()) - formatDateToUnixTimestamp(nbeefLastRewardDate)) * nbeefRewardPerSecond;

    setTotalSupply(nacTotalSupply + pendingNmilkNac + pendingNlandNac + pendingNbeefNac);

  }, [nacTotalSupply, nmilkLastRewardDate, nmilkRewardPerSecond, nlandLastRewardDate, nlandRewardPerSecond, nbeefLastRewardDate, nbeefRewardPerSecond]);

  useEffect(() => {
    calculateTotalSupply();
    const interval = setInterval(calculateTotalSupply, 10000);
    return () => clearInterval(interval);
  }, [nacTotalSupply, nmilkLastRewardDate, nmilkRewardPerSecond, nlandLastRewardDate, nlandRewardPerSecond, nbeefLastRewardDate, nbeefRewardPerSecond]);

  return totalSupply;
};