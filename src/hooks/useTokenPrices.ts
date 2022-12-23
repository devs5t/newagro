import { useContext } from "react";
import { PriceContext } from "src/contexts/PriceContext";

export const useTokenPrices = () => {
  const { prices, apy, tvl, isLoading } = useContext(PriceContext);
  return { prices, apy, tvl, isLoading };
};
