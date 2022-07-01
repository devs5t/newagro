import { createContext, ReactNode, useEffect, useState } from "react";
import pools from "src/config/constants/pools";
import { FarmPool, Token } from "src/config/constants/types";

const TokensContext = createContext({ tokens: [] });

interface TokensContextProviderProps {
  children: ReactNode;
}
const TokensContextProvider = ({ children }: TokensContextProviderProps) => {
  const [tokens, setTokens] = useState<Token[]>([] as Token[]); 

  useEffect(() => {
    const retTokens: Token[] = [];
    pools.forEach((pool: FarmPool) => {
      retTokens.push({
        tokenName: pool.stakingToken.name,
        tokenAddress: pool.stakingToken.address,
        pathToBnb: pool.stakingToken.pathToBnb,
        uses: pool.stakingToken.uses,
        router: pool.stakingToken.router,
        getTokenURL: pool.stakingToken.buyLink,
      });
      retTokens.push({
        tokenName: pool.earningToken.name,
        tokenAddress: pool.earningToken.address,
        pathToBnb: pool.earningToken.pathToBnb,
        uses: pool.earningToken.uses,
        router: pool.earningToken.router,
        getTokenURL: pool.earningToken.buyLink,
      });
    });

    setTokens(retTokens.filter((t) => t.tokenName));
  }, []);

  return (
    tokens.length && (
      <TokensContext.Provider value={tokens}>{children}</TokensContext.Provider>
    )
  );
};

export { TokensContext, TokensContextProvider };
