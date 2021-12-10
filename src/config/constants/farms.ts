import contracts from "./contracts";
import { FarmConfig, QuoteToken } from "./types";

const farms: FarmConfig[] = [
  {
    pid: 1,
    lpSymbol: "BBQ-BNB LP",
    lpAddresses: {
      97: "",
      56: "0x58c8d0fca907b5298471366b87917889192571b2", // BBQ-BNB LP
    },
    tokenSymbol: "BBQ",
    tokenAddresses: {
      97: "",
      56: contracts.cake[56],
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    apeLp: false,
    highlighted: false,
  },
  {
    pid: 2,
    lpSymbol: "BBQ-BUSD LP",
    lpAddresses: {
      97: "",
      56: "0xe9bba5684f9a42335a52204fe3a55ae8452d7c17", // BBQ-BUSD LP
    },
    tokenSymbol: "BBQ",
    tokenAddresses: {
      97: "",
      56: contracts.cake[56],
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
    apeLp: false,
    highlighted: false,
  },
];

export default farms;
