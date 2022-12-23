import {createContext, ReactNode, useEffect, useState} from "react";
import {CHAIN_ID} from "src/config";
import contracts from "src/config/constants/contracts";
import {callFunction} from "reblox-web3-utils";
import {useEthers} from "@usedapp/core";
import {formatHexToDate, formatHexToDecimal, formatUintToDecimal} from "src/utils/formatUtils";
import {get} from "lodash";
import RedeemRewards from "src/config/abi/RedeemRewards.json";
import NewTokenExchange from "src/config/abi/NewTokenExchange.json";

export type OrderType ={
  index: number,
  originalAmount: number,
  amount: number,
  price: number,
  timestamp: Date,
  token: 'nmilk' | 'nland' | 'nbeef',
  status: 'confirmed' | 'processing',
};

interface SellOrderType {
  nmilkUserPendingSell: number;
  nlandUserPendingSell: number;
  nbeefUserPendingSell: number;
  sellOrders: OrderType[];
  requestSellOrders: Function;
}

const SellOrdersContext = createContext<SellOrderType>({
  nmilkUserPendingSell: 0,
  nlandUserPendingSell: 0,
  nbeefUserPendingSell: 0,
  sellOrders: [],
  requestSellOrders: () => {}
});

interface SellOrdersProviderProps {
  children: ReactNode;
}
const SellOrdersProvider = ({ children }: SellOrdersProviderProps) => {
  const { account, library } = useEthers();

  const [nmilkUserPendingSell, setNmilkUserPendingSell] = useState<number>(0);
  const [nlandUserPendingSell, setNlandUserPendingSell] = useState<number>(0);
  const [nbeefUserPendingSell, setNbeefUserPendingSell] = useState<number>(0);

  const [nmilkOrders, setNmilkOrders] = useState<OrderType[]>([]);
  const [nlandOrders, setNlandOrders] = useState<OrderType[]>([]);
  const [nbeefOrders, setNbeefOrders] = useState<OrderType[]>([]);

  const [sellOrders, setSellOrders] = useState<OrderType[]>([]);

  const configExchange: any = {
    nac: {exchangeAbi: RedeemRewards, exchangeContract: contracts.redeemRewards[CHAIN_ID]},
    nmilk: {exchangeAbi: NewTokenExchange, exchangeContract: contracts.exchangeNmilk[CHAIN_ID]},
    nland: {exchangeAbi: NewTokenExchange, exchangeContract: contracts.exchangeNland[CHAIN_ID]},
    nbeef: {exchangeAbi: NewTokenExchange, exchangeContract: contracts.exchangeNbeef[CHAIN_ID]},
  };

  const mapOrders = (orders: OrderType[], token: 'nmilk' | 'nland' | 'nbeef'): OrderType[] => {
    return orders.map((order: OrderType) => ({
      index: formatHexToDecimal(get(order, 'index._hex', '0x00')),
      originalAmount: formatUintToDecimal(order.originalAmount),
      amount: formatUintToDecimal(order.amount),
      price: formatUintToDecimal(order.price),
      timestamp: formatHexToDate(get(order, 'timestamp._hex', '0x00')),
      token: token,
      status: (formatHexToDecimal(get(order, 'amount._hex', '0x00'))) === 0 ? 'confirmed' : 'processing',
    }));
  };

  const getUserPendingSell = (orders: OrderType[]) => {
    return orders.reduce((prevValue, order) => {
      let currentValue = 0;
      if (formatHexToDecimal(get(order, 'amount._hex', '0x00')) > 0) {
        currentValue = formatUintToDecimal(order.originalAmount) - formatUintToDecimal(order.amount);
      }
      return prevValue + currentValue;
    }, 0);
  };

  const requestSellOrders = () => {
    callFunction(
      configExchange.nmilk.exchangeContract,
      library,
      [account],
      "getUserSellOrders",
      configExchange.nmilk.exchangeAbi,
    ).then((orders: any) => {
      setNmilkUserPendingSell(getUserPendingSell(orders));
      setNmilkOrders(mapOrders(orders, 'nmilk'));
    });

    callFunction(
      configExchange.nland.exchangeContract,
      library,
      [account],
      "getUserSellOrders",
      configExchange.nland.exchangeAbi,
    ).then((orders: any) => {
      setNlandUserPendingSell(getUserPendingSell(orders));
      setNlandOrders(mapOrders(orders, 'nland'));
    });

    callFunction(
      configExchange.nbeef.exchangeContract,
      library,
      [account],
      "getUserSellOrders",
      configExchange.nbeef.exchangeAbi,
    ).then((orders: any) => {
      setNbeefUserPendingSell(getUserPendingSell(orders));
      setNbeefOrders(mapOrders(orders, 'nbeef'));
    });
  };

  useEffect(() => {
    if (account && library) {
      requestSellOrders();
    }
  }, [account]);

  useEffect(() => {
    // setSellOrders(nmilkOrders.concat(nlandOrders).concat(nbeefOrders));

    setSellOrders(nmilkOrders.concat(nlandOrders));
  }, [nmilkOrders, nlandOrders, nbeefOrders]);

  return (
    <SellOrdersContext.Provider
      value={{
        nmilkUserPendingSell,
        nlandUserPendingSell,
        nbeefUserPendingSell,

        sellOrders,
        requestSellOrders
      }}
    >
      {children}
    </SellOrdersContext.Provider>
  );
};

export { SellOrdersContext, SellOrdersProvider };
