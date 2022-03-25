import {useContext} from "react";
import {PriceContext} from "src/contexts/PriceContext";
import {NmilkContext} from "src/contexts/NmilkContext";
import {NbeefContext} from "src/contexts/NbeefContext";
import {NlandContext} from "src/contexts/NlandContext";

export const useReloadPrices = () => {

  const {loadPrices} = useContext(PriceContext);
  const {loadPrices: loadNmilkPrices} = useContext(NmilkContext);
  const {loadPrices: loadNbeefPrices} = useContext(NbeefContext);
  const {loadPrices: loadNlandPrices} = useContext(NlandContext);

  const reloadPrices = () => {
    loadPrices();
    loadNmilkPrices();
    loadNbeefPrices();
    loadNlandPrices();
  }

  return {reloadPrices};
};
