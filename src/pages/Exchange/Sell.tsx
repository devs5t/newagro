import React, {useCallback, useContext, useEffect, useMemo, useState} from "react";
import { useTranslation } from "react-i18next";
import Textfield from "src/components/Inputs/Textfield";
import {get, upperCase} from "lodash";
import Button from "src/components/Buttons/Button";
import {ReactSVG} from "react-svg";
import {CHAIN_ID} from "src/config";
import contracts from "src/config/constants/contracts";
import NewTokenExchange from "src/config/abi/NewTokenExchange.json";
import RedeemRewards from "src/config/abi/RedeemRewards.json";
import {callFunction, approveContract, getTokenAllowance} from "reblox-web3-utils";
import {
  formatDateToDisplay,
  formatDecimalToUint,
  formatHexToDate,
  formatHexToDecimal,
  formatHexToUintToDecimal,
} from "src/utils/formatUtils";
import {PriceContext} from "src/contexts/PriceContext";
import {useEthers} from "@usedapp/core";
import {ModalContext} from "src/contexts/ModalContext";
import {NmilkContext} from "src/contexts/NmilkContext";
import {NlandContext} from "src/contexts/NlandContext";
import {NbeefContext} from "src/contexts/NbeefContext";
import ExchangeARSForm from "src/components/forms/ExchangeARSForm";
import {formatCurrency} from "src/utils/currency";
import {useReloadPrices} from "src/hooks/useReloadPrices";

type OrderType ={
  index: number,
  originalAmount: number,
  amount: number,
  price: number,
  timestamp: Date,
  token: 'nmilk' | 'nland' | 'nbeef',
  status: 'confirmed' | 'processing',
};

const Sell: React.FC = () => {
  const { t } = useTranslation();
  const {setModal} = useContext(ModalContext);
  const { reloadPrices } = useReloadPrices();

  const { account, library } = useEthers();
  const { nacUserAssets, nacExchangeRate } = useContext(PriceContext);
  const { nmilkUserAssets, nmilkSuggestedPrice } = useContext(NmilkContext);
  const { nlandUserAssets, nlandSuggestedPrice } = useContext(NlandContext);
  const { nbeefUserAssets, nbeefSuggestedPrice } = useContext(NbeefContext);

  const [fromAmount, setFromAmount] = useState<number>(0);

  const [fromPrice, setFromPrice] = useState<number>(0);

  const [toAmount, setToAmount] = useState<number>(0);

  const fromCurrencies: ('nac' | 'nmilk' | 'nbeef' | 'nland')[] =  ['nac', 'nmilk', 'nland', 'nbeef'];
  const [selectedFromCurrency, setSelectedFromCurrency] = useState<'nac' | 'nmilk' | 'nbeef' | 'nland'>(fromCurrencies[0]);

  const toCurrencies: ('usdt' | 'ars')[] = ['usdt', 'ars'];
  const [selectedToCurrency, setSelectedToCurrency] = useState<'usdt' | 'ars'>(toCurrencies[0]);

  const [needsApproval, setNeedsApproval] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingRemoveSellOrderIndex, setLoadingRemoveSellOrderIndex] = useState<number | undefined>(undefined);

  const [sellOrders, setSellOrders] = useState<OrderType[]>([]);

  const fromUserAssets: number = useMemo(() => {
    switch (selectedFromCurrency) {
      case "nac":
        return nacUserAssets;
      case "nmilk":
        return nmilkUserAssets;
      case "nland":
        return nlandUserAssets;
      case "nbeef":
        return nbeefUserAssets;
    }
  }, [selectedFromCurrency, nmilkUserAssets, nlandUserAssets, nbeefUserAssets]);

  const configSpender: any = {
    nac: {contract: contracts.nac[CHAIN_ID]},
    nmilk: {contract: contracts.nmilk[CHAIN_ID]},
    nland: {contract: contracts.nland[CHAIN_ID]},
    nbeef: {contract: contracts.nbeef[CHAIN_ID]},
  };

  const selectedSpenderContract: string = useMemo(() => {
    return configSpender[selectedFromCurrency].contract;
  }, [selectedFromCurrency]);

  const configExchange: any = {
    nac: {exchangeAbi: RedeemRewards, exchangeContract: contracts.redeemRewards[CHAIN_ID]},
    nmilk: {exchangeAbi: NewTokenExchange, exchangeContract: contracts.exchangeNmilk[CHAIN_ID]},
    nland: {exchangeAbi: NewTokenExchange, exchangeContract: contracts.exchangeNland[CHAIN_ID]},
    nbeef: {exchangeAbi: NewTokenExchange, exchangeContract: contracts.exchangeNbeef[CHAIN_ID]},
  };

  const selectedExchangeAbi: any[] = useMemo(() => {
    return configExchange[selectedFromCurrency].exchangeAbi;
  }, [selectedFromCurrency]);

  const selectedExchangeContract: string = useMemo(() => {
    return configExchange[selectedFromCurrency].exchangeContract;
  }, [selectedFromCurrency]);

  const requestSellOrders = () => {
    let orders: OrderType[] = [];

    Promise.all([
      callFunction(
        configExchange.nmilk.exchangeContract,
        library,
        [account],
        "getUserSellOrders",
        configExchange.nmilk.exchangeAbi,
      ),
      callFunction(
        configExchange.nland.exchangeContract,
        library,
        [account],
        "getUserSellOrders",
        configExchange.nland.exchangeAbi,
      ),
      callFunction(
        configExchange.nbeef.exchangeContract,
        library,
        [account],
        "getUserSellOrders",
        configExchange.nbeef.exchangeAbi,
      )
    ]).then(([nmilkOrders, nlandOrders, nbeefOrders]) => {
      orders = [
        ...nmilkOrders.map((nmilkOrder: any) => ({...nmilkOrder, token: 'nmilk'})),
        ...nlandOrders.map((nlandOrder: any) => ({...nlandOrder, token: 'nland'})),
        ...nbeefOrders.map((nbeefOrder: any) => ({...nbeefOrder, token: 'nbeef'})),
      ].map((order: OrderType) => ({
        index: formatHexToDecimal(get(order, 'index._hex', '0x00')),
        originalAmount: formatHexToUintToDecimal(get(order, 'originalAmount._hex', '0x00')),
        amount: formatHexToUintToDecimal(get(order, 'amount._hex', '0x00')),
        price: formatHexToUintToDecimal(get(order, 'price._hex', '0x00')),
        timestamp: formatHexToDate(get(order, 'timestamp._hex', '0x00')),
        token: order.token,
        status: (formatHexToDecimal(get(order, 'amount._hex', '0x00'))) === 0 ? 'confirmed' : 'processing',
      }));
      setSellOrders(orders);
    });
  };

  useEffect(() => {
    if (account && library) {
      requestSellOrders();
    }
  }, [account]);

  useEffect(() => {
    if (selectedFromCurrency === 'nac') {
      if (selectedToCurrency === 'usdt') {
        setToAmount(fromAmount / nacExchangeRate);
      } else if (selectedToCurrency === 'ars') {
        setToAmount(fromAmount);
      }
    } else {
      setToAmount(fromAmount * fromPrice);
    }
  }, [fromAmount, fromPrice, selectedFromCurrency, selectedToCurrency]);

  useEffect(() => {
    if (selectedToCurrency === 'ars' && selectedFromCurrency !== 'nac') {
      setSelectedToCurrency('usdt');
    }
  }, [selectedFromCurrency]);

  const suggestedPrice: number = useMemo(() => {
    switch (selectedFromCurrency) {
      case "nac":
        return 0;
      case "nmilk":
        return nmilkSuggestedPrice;
      case "nland":
        return nlandSuggestedPrice;
      case "nbeef":
        return nbeefSuggestedPrice;
    }
  }, [selectedFromCurrency, nmilkSuggestedPrice, nlandSuggestedPrice, nbeefSuggestedPrice]);

  const canSubmit: boolean = useMemo(() => {
    return !!(account && library && fromAmount && (fromPrice || selectedFromCurrency === 'nac'));
  }, [account, library, fromAmount, fromPrice, selectedFromCurrency]);

  useEffect(() => {
    if (account && library) {
      if (selectedToCurrency === 'ars') {
        setNeedsApproval(false);
        return;
      }

      getTokenAllowance(
        CHAIN_ID,
        account,
        selectedSpenderContract,
        selectedExchangeContract
      ).then((allowance: number) => setNeedsApproval(allowance == 0));
    }
  }, [account, selectedFromCurrency, selectedToCurrency]);

  const onApprove = () => {
    setIsLoading(true);
    approveContract(
      library,
      selectedExchangeContract,
      selectedSpenderContract,
    )
      .then(() => setNeedsApproval(false))
      .finally(() => setIsLoading(false));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (canSubmit) {
      setIsLoading(true);
      if (selectedToCurrency === 'ars') {
        setModal({
          component: () => ExchangeARSForm({ tab: 'sell', token: selectedFromCurrency, amount: fromAmount, price: fromPrice }),
          title: `${t("exchange_ars_form.title", {tab: t("exchange_ars_form.sell")})}`,
        });
        setIsLoading(false);
        return
      }

      if (selectedFromCurrency === 'nac') {
        callFunction(
          selectedExchangeContract,
          library,
          [formatDecimalToUint(fromAmount)],
          'deposit',
          selectedExchangeAbi
        ).finally(() => {
          setIsLoading(false);
          reloadPrices();
        });
      }

      if (['nmilk', 'nland', 'nbeef'].includes(selectedFromCurrency)) {
        callFunction(
          selectedExchangeContract,
          library,
          [formatDecimalToUint(fromAmount), formatDecimalToUint(fromPrice)],
          'sell',
          selectedExchangeAbi
        ).finally(() => {
          setIsLoading(false);
          reloadPrices();
          requestSellOrders();
        });
      }
    }
  };

  const onFromAmountChange = useCallback((value: number) => {
    if (value > fromUserAssets) {
      setFromAmount(fromUserAssets);
    } else {
      setFromAmount(value);
    }
  }, [fromUserAssets]);

  const onMax = () => setFromAmount(fromUserAssets);

  const onRemoveSellOrder = (e: any, token: 'nmilk' | 'nbeef' | 'nland', index: number) => {
    e.stopPropagation();
    setLoadingRemoveSellOrderIndex(index);
    callFunction(
      configExchange[token].exchangeContract,
      library,
      [index],
      'removeSell',
      configExchange[token].exchangeAbi
    ).finally(() => {
      setLoadingRemoveSellOrderIndex(undefined);
      requestSellOrders();
    });
  };

  return (
    <form onSubmit={onSubmit} className="w-full">

      <div className="flex flex-col w-full mt-12">
        <p className="text-blue text-left text-xs">{t(`exchange.helper_top_sell`)}</p>

        <h3 className="mt-6 text-blue font-bold text-xl">{t(`exchange.from`)}</h3>

        <div className="relative flex flex-col border-2 shadow border-green rounded-lg w-full mt-6 py-2 px-6">
          <div className="flex justify-between items-center">
            <div className="flex flex-row items-center justify-between">
              <div className="hidden md:flex h-full items-center font-bold text-sm text-blue mr-10">{t(`exchange.amount`)}</div>
              <Textfield
                id="amount"
                onChange={onFromAmountChange}
                value={fromAmount}
                containerClasses="w-full mr-4 md:max-w-[12rem]"
                inputClasses="md:placeholder-transparent"
                type="number"
                placeholder={t(`exchange.amount`)}
                step={0.01}
                max={fromUserAssets}
              />
              <Button
                onClick={onMax}
                text="MAX"
                extraClasses="flex justify-center items-center h-8 mr-10 rounded-lg text-white bg-blue text-sm font-normal"
              />
            </div>


            {selectedFromCurrency !== 'nac' && (
              <div className="hidden relative md:flex flex-row items-center justify-between">
                <div className="h-full items-center font-bold text-sm text-blue mr-10">{t(`exchange.price`)}</div>
                <Textfield
                  id="price"
                  onChange={setFromPrice}
                  value={fromPrice}
                  containerClasses="w-full max-w-[8rem] mr-10"
                  inputClasses="md:placeholder-transparent"
                  type="number"
                  disabled={false}
                  placeholder={t(`exchange.price`)}
                />
              </div>
            )}

            {selectedFromCurrency !== 'nac' && (
              <div className="flex absolute right-0 md:right-36 -mt-32 w-48 h-8 justify-center items-center rounded-full text-center text-xs font-semibold text-white bg-green">
                {`${t(`exchange.suggested_price`)}: $${formatCurrency(suggestedPrice)}`}
              </div>
            )}


            <select
              className="text-blue font-bold text-xl uppercase md:w-32 cursor-pointer"
              onChange={(e) => setSelectedFromCurrency(e.target.value)}
              value={selectedFromCurrency}
            >
              {fromCurrencies.map((fromCurrency: string, index: number) => (
                <option
                  key={index}
                  className="text-blue font-bold text-xl uppercase"
                  disabled={!['nac', 'nmilk'].includes(fromCurrency)}
                  value={fromCurrency}
                  label={upperCase(fromCurrency)}
                >
                  {fromCurrency}
                </option>
              ))}
            </select>
          </div>

          <div className="flex md:hidden h-full items-center font-bold text-sm text-blue mt-2">{t(`exchange.amount`)}</div>

          {selectedFromCurrency !== 'nac' && (
            <>
              <div className="md:hidden flex-row items-center justify-between">
                <Textfield
                  id="price"
                  onChange={setFromPrice}
                  value={fromPrice}
                  containerClasses="w-full mt-4"
                  type="number"
                  placeholder={t(`exchange.price`)}
                />
              </div>
              <div className="flex md:hidden h-full items-center font-bold text-sm text-blue mt-2">{t(`exchange.price`)}</div>
            </>
          )}

        </div>

        <p className="text-blue text-left mt-4 text-sm">
          {t('exchange.user_from_assets', {token: upperCase(selectedFromCurrency), amount: formatCurrency(fromUserAssets)})}
        </p>

        <div className="flex justify-center mt-4">
          <ReactSVG
            src="icons/arrow.svg"
            beforeInjection={(svg) => {
              svg.classList.add('fill-blue');
              svg.classList.add('w-4');
            }}
          />
        </div>

        <h3 className="mt-2 text-blue font-bold text-xl">{t(`exchange.to`)}</h3>

        <div className="relative flex border-2 shadow border-green rounded-lg w-full mt-4 justify-between items-center py-2 px-6">
          <div className="flex flex-row items-center justify-between">
            <div className="hidden md:flex h-full items-center font-bold text-sm text-blue mr-10">{t(`exchange.amount`)}</div>
            <Textfield
              id="amount"
              onChange={() => {}}
              value={toAmount}
              containerClasses="w-full mr-4 md:max-w-[12rem]"
              inputClasses="md:placeholder-transparent"
              type="number"
              placeholder={t(`exchange.amount`)}
              disabled={true}
            />
          </div>

          <select
            className="text-blue font-bold text-xl uppercase md:w-32 cursor-pointer"
            onChange={(e) => setSelectedToCurrency(e.target.value)}
            value={selectedToCurrency}
          >
            {toCurrencies.map((toCurrency: string, index: number) => (
              <option
                key={index}
                className="text-blue font-bold text-xl"
                disabled={toCurrency === 'ars' && selectedFromCurrency !== 'nac'}
                value={toCurrency}
                label={upperCase(toCurrency)}
              >
                {toCurrency}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-between mt-4">
          <p className="text-blue text-left mr-6 text-sm">{t(`exchange.helper_bottom_sell`)}</p>
        </div>

        <div className="flex justify-around mt-10">
          {needsApproval && (
            <Button
              isLoading={isLoading}
              text={`${t("exchange.button_approve")} ${upperCase(selectedFromCurrency)}`}
              extraClasses="h-10 bg-green border-green text-white text-center w-48 text-sm uppercase w-full shadow"
              type="button"
              onClick={onApprove}
              needWallet={true}
            />
          )}

          {!needsApproval && (
            <Button
              isLoading={isLoading}
              text={t(`exchange.button_sell`)}
              extraClasses="h-10 bg-green border-green text-white text-center w-48 text-sm uppercase w-full shadow"
              type="submit"
              disabled={!canSubmit}
            />
          )}
        </div>
      </div>

      {sellOrders.length > 0 && (
        <div className="flex flex-col my-16">
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full">
              <div className="overflow-hidden shadow-sm rounded-lg">
                <table className="min-w-full bg-lightgreen/[.20]">
                  <thead>
                    <tr className="pb-10">
                      {[
                        t('exchange.table.status'),
                        t('exchange.table.order_number'),
                        t('exchange.table.date'),
                        t('exchange.table.amount'),
                        t('exchange.table.price'),
                        '',
                      ].map((header, key) => (
                        <th
                          scope="col"
                          className="pt-6 pb-6 text-xs font-medium tracking-wider text-green font-bold text-base"
                          key={key}
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {sellOrders.map((order, key) => (
                      <tr key={key} className="text-green text-center text-sm font-semibold whitespace-nowrap h-12">
                        <td className="text-center text-sm font-semibold whitespace-nowrap">
                          <Button
                            text={t(`exchange.table.${order.status}`)}
                            extraClasses={`flex items-center cursor-default text-sm h-6 m-auto border-none ${order.status === 'processing' ? 'bg-green text-darkgray' : 'bg-blue text-white'}`}
                          />
                        </td>
                        <td>#{order.index + 1}</td>
                        <td>{formatDateToDisplay(order.timestamp)}</td>
                        <td>{formatCurrency(order.originalAmount - order.amount)} / ${formatCurrency(order.originalAmount)} ${upperCase(order.token)} ({(((order.originalAmount - order.amount) / order.originalAmount) * 100).toFixed(2)}%)</td>
                        <td>{`${formatCurrency(order.originalAmount)} ${upperCase(order.token)}`}</td>
                        <td>
                          <Button
                            text={t('exchange.table.remove')}
                            extraClasses="flex justify-center items-center text-sm h-6 m-auto bg-white text-blue border-blue w-20"
                            disabled={order.status === 'confirmed'}
                            isLoading={loadingRemoveSellOrderIndex === order.index}
                            isLoadingColor="blue"
                            onClick={(e) => onRemoveSellOrder(e, order.token, order.index)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </form>
  );
};

export default Sell;
