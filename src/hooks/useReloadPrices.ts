import {useContext, useEffect} from "react";
import {PriceContext} from "src/contexts/PriceContext";
import {NmilkContext} from "src/contexts/NmilkContext";
import {NbeefContext} from "src/contexts/NbeefContext";
import {NlandContext} from "src/contexts/NlandContext";
import { useEthers } from "@usedapp/core";

export const useReloadPrices = () => {

  const {account} = useEthers();
  const {loadPrices} = useContext(PriceContext);
  const {loadPrices: loadNmilkPrices} = useContext(NmilkContext);
  const {loadPrices: loadNlandPrices} = useContext(NlandContext);
  const {loadPrices: loadNbeefPrices} = useContext(NbeefContext);

  const reloadPrices = () => {
    loadPrices();
    loadNmilkPrices();
    //loadNlandPrices();
    // loadNbeefPrices();
  }

  return {reloadPrices};
};
