import contracts from "src/config/constants/contracts";
import {CHAIN_ID} from "src/config";

export const NMILK_TOKENS_BY_COW = 6000;
export const NLAND_TOKENS_BY_HECTARE = 1;
export const NBEEF_TOKENS_BY_STEER = 1;

export const NMILK_POOL_ID = 0;
export const NLAND_POOL_ID = 1;
export const NBEEF_POOL_ID = 2;

export const BURN_ADDRESS = '0x0cC94633618a1746F9e8037532B7771Ed7d0b0F6';

export const TokenKeyMap = {
  nmilk: {
    pId: NMILK_POOL_ID,
    contract: contracts.nmilk[CHAIN_ID],
    exchangeContract: contracts.exchangeNmilk[CHAIN_ID]
  },
  nland: {
    pId: NLAND_POOL_ID,
    contract: contracts.nland[CHAIN_ID],
    exchangeContract: contracts.exchangeNland[CHAIN_ID]
  },
  nbeef: {
    pId: NBEEF_POOL_ID,
    contract: contracts.nbeef[CHAIN_ID],
    exchangeContract: contracts.exchangeNbeef[CHAIN_ID]
  },
};