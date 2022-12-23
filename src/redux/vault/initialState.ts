import pools from "src/config/constants/pools";
import { FarmPool, QuoteToken } from "src/config/constants/types";

const bikiniPools: FarmPool[] = [];
const bikiniFarms: FarmPool[] = [];
const bikiniVaults: FarmPool[] = [];

pools.map((p: FarmPool) => {
  if (p.id === "BIKINI") {
    bikiniFarms.push(p);
    return;
  }
  if (p.stakingToken.name === QuoteToken.BIKINI) {
    bikiniPools.push(p);
  } else if (p.earningToken.name === QuoteToken.BIKINI && !p.isVault) {
    bikiniFarms.push(p);
  } else {
    bikiniVaults.push(p);
  }
});

const initialState = {
  bikiniPools,
  bikiniFarms,
  bikiniVaults,
};

export default initialState;
