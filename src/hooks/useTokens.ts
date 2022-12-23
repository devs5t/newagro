import { useContext } from "react";
import { Token } from "src/config/constants/types";
import { TokensContext } from "src/contexts/TokensContext";

export const useTokens = (): Token[] => {
  const tokens = useContext(TokensContext);
  return tokens;
};
