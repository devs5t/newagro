import { createContext, ReactNode, useEffect, useState } from "react";
import { useBoolean } from "react-use";

const PriceContext = createContext({
  prices: {},
  apy: {},
  tvl: {},
  isLoading: false,
});

interface PriceContextProviderProps {
  children: ReactNode;
}
const PriceContextProvider = ({ children }: PriceContextProviderProps) => {
  const [prices, setPrices] = useState({});
  const [apy, setApy] = useState({});
  const [tvl, setTvl] = useState({});
  const [isLoading, setLoading] = useBoolean(true);

  const loadPrices = () => {
    setLoading(true);
    Promise.all([
      fetch("https://api.yieldparrot.finance/lps"),
      fetch("https://api.yieldparrot.finance/prices"),
      fetch("https://api.yieldparrot.finance/apy"),
      fetch("https://api.yieldparrot.finance/tvl"),
    ])
      .then((result) => {
        return Promise.all([
          result[0].json(),
          result[1].json(),
          result[2].json(),
          result[3].json(),
        ]).then((result) => {
          setPrices({ ...result[0], ...result[1] });
          setApy(result[2]);
          setTvl(result[3]);
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    loadPrices();
  }, []);

  useEffect(() => {
    const priceInterval = setInterval(async () => {
      loadPrices();
    }, 15000);

    return () => clearInterval(priceInterval);
  }, []);

  return (
    <PriceContext.Provider value={{ prices, apy, tvl, isLoading }}>
      {children}
    </PriceContext.Provider>
  );
};

export { PriceContext, PriceContextProvider };
