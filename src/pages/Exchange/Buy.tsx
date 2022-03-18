import React, {useCallback, useContext, useEffect, useMemo, useState} from "react";
import { useTranslation } from "react-i18next";
import Textfield from "src/components/Inputs/Textfield";
import {min, upperCase} from "lodash";
import Button from "src/components/Buttons/Button";
import {ReactSVG} from "react-svg";
import {CHAIN_ID} from "src/config";
import contracts from "src/config/constants/contracts";
import NMILKExchange from "src/config/abi/NMILKExchange.json";
import {callViewFunction, callFunction, approveContract, getTokenAllowance} from "reblox-web3-utils";
import {formatDecimalToUint, formatUintToDecimal} from "src/utils/formatUtils";
import {useDebounce} from "src/hooks/useDebounce";
import {PriceContext} from "src/contexts/PriceContext";
import {useEthers} from "@usedapp/core";
import {ModalContext} from "src/contexts/ModalContext";
import ExchangeARSForm from "src/components/forms/ExchangeARSForm";
import {formatCurrency} from "src/utils/currency";

const Buy: React.FC = () => {
  const { t } = useTranslation();
  const {setModal} = useContext(ModalContext);

  const { account, library } = useEthers();
  const { nacExchangeRate, nacUserAssets, usdtUserAssets } = useContext(PriceContext);

  const [fromMaxInput, setFromMaxInput] = useState<number>(0);

  const [fromAmount, setFromAmount] = useState<number>(0);
  const debouncedFromAmount: number = useDebounce(fromAmount, 500);

  const [suggestedPrice, setSuggestedPrice] = useState<number>(0);

  const [totalTokensForSell, setTotalTokensForSell] = useState<number>(0);

  const [toAmount, setToAmount] = useState<number>(0);

  const fromCurrencies: ('usdt' | 'nac' | 'ars')[] = ['usdt', 'nac', 'ars'];
  const [selectedFromCurrency, setSelectedFromCurrency] = useState<'usdt' | 'nac' | 'ars'>(fromCurrencies[0]);

  const toCurrencies: ('nmilk' | 'nbeef' | 'nland')[] = ['nmilk', 'nbeef', 'nland'];
  const [selectedToCurrency, setSelectedToCurrency] = useState<'nmilk' | 'nbeef' | 'nland'>(toCurrencies[0]);

  const [needsApproval, setNeedsApproval] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const configSpender: any = {
    nac: {contract: contracts.nac[CHAIN_ID]},
    usdt: {contract: contracts.usdt[CHAIN_ID]},
    ars: {contract: ''}
  };

  const selectedSpenderContract: string = useMemo(() => {
    return configSpender[selectedFromCurrency].contract;
  }, [selectedFromCurrency]);

  const configExchange: any = {
    nmilk: {exchangeAbi: NMILKExchange, exchangeContract: contracts.exchangeNmilk[CHAIN_ID]},
    nbeef: {exchangeAbi: NMILKExchange, exchangeContract: contracts.exchangeNmilk[CHAIN_ID]},
    nland: {exchangeAbi: NMILKExchange, exchangeContract: contracts.exchangeNmilk[CHAIN_ID]}
  };

  const selectedExchangeAbi: any[] = useMemo(() => {
    return configExchange[selectedToCurrency].exchangeAbi;
  }, [selectedToCurrency]);

  const selectedExchangeContract: string = useMemo(() => {
    return configExchange[selectedToCurrency].exchangeContract;
  }, [selectedToCurrency]);

  const getValueBasedOnSelectedFromCurrency = useCallback((value: number) => {
    if (['nac', 'ars'].includes(selectedFromCurrency)) {
      return value / nacExchangeRate;
    }
    return value;
  }, [selectedFromCurrency, nacExchangeRate]);

  useEffect(() => {
    if (!debouncedFromAmount) {
      setToAmount(0);
      return;
    }

    callViewFunction(
      CHAIN_ID,
      selectedExchangeContract,
      [formatDecimalToUint(debouncedFromAmount)],
      "getTokenOutputAmount",
      selectedExchangeAbi
    ).then((value: number) => setToAmount(getValueBasedOnSelectedFromCurrency(formatUintToDecimal(value))));

  }, [debouncedFromAmount, selectedFromCurrency, selectedToCurrency]);

  useEffect(() => {

    callViewFunction(
      CHAIN_ID,
      selectedExchangeContract,
      [],
      "getMaxInputAmount",
      selectedExchangeAbi
    ).then((value: number) => setFromMaxInput(getValueBasedOnSelectedFromCurrency(formatUintToDecimal(value))));

    callViewFunction(
      CHAIN_ID,
      selectedExchangeContract,
      [],
      "getSuggestedPrice",
      selectedExchangeAbi
    ).then((value: number) => setSuggestedPrice(formatUintToDecimal(value)));

    callViewFunction(
      CHAIN_ID,
      selectedExchangeContract,
      [],
      "getTotalTokensForSell",
      selectedExchangeAbi
    ).then((value: number) => setTotalTokensForSell(formatUintToDecimal(value)));

    if (account && library) {
      getTokenAllowance(
        CHAIN_ID,
        account,
        selectedSpenderContract,
        selectedExchangeContract
      ).then((allowance: number) => setNeedsApproval(allowance == 0));
    }

  }, [account, selectedToCurrency]);

  const maxValue: number | undefined = useMemo(() => {
    if (selectedFromCurrency === 'ars') {
      return undefined;
    }
    if (selectedFromCurrency === 'nac') {
      return min([nacUserAssets, (fromMaxInput * nacExchangeRate)]);
    }
    return min([usdtUserAssets, fromMaxInput]);
  }, [fromMaxInput, selectedFromCurrency, usdtUserAssets, nacUserAssets, nacExchangeRate]);

  const canSubmit: boolean = useMemo(() => {
    return !!(account && library && fromAmount);
  }, [account, library, fromAmount]);

  const availableTokens: number = useMemo(() => {
    if (selectedFromCurrency === 'nac') {
      return nacUserAssets;
    }
    return usdtUserAssets;
  }, [selectedFromCurrency]);

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

      if (selectedFromCurrency === 'ars') {
        setModal({
          component: () => ExchangeARSForm({ tab: 'buy', token: selectedToCurrency, amount: fromAmount, price: suggestedPrice}),
          title: `${t("exchange_ars_form.title", {tab: t("exchange_ars_form.buy")})}`,
        });
        return;
      }

      const method: string = selectedFromCurrency === 'nac' ? 'buyWithRewards' : 'buy';

      callFunction(
        selectedExchangeContract,
        library,
        [formatDecimalToUint(fromAmount)],
        method,
        selectedExchangeAbi
      ).finally(() => setIsLoading(false));
    }
  };

  const onFromAmountChange = useCallback((value: number) => {
    if (value > availableTokens) {
      setFromAmount(availableTokens);
    } else {
      setFromAmount(value);
    }
  }, [availableTokens]);

  const onMax = () => setFromAmount(availableTokens);

  return (
    <form onSubmit={onSubmit} className="w-full">

      <div className="flex flex-col w-full mt-10">
        <p className="text-blue text-xs text-left">{t(`exchange.helper_top_buy`)}</p>

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
                max={maxValue}
              />
              <Button
                onClick={onMax}
                text="MAX"
                extraClasses="flex justify-center items-center h-12 mr-4 w-16 -mb-0.25 rounded-md text-white bg-blue text-base font-normal"
              />
            </div>

            <select
              className="text-blue font-bold text-xl uppercase md:w-32 cursor-pointer"
              onChange={(e) => setSelectedFromCurrency(e.target.value)}
              value={selectedFromCurrency}
            >
              {fromCurrencies.map((fromCurrency: string, index: number) => (
                <option
                  key={index}
                  className="text-blue font-bold uppercase"
                >
                  {fromCurrency}
                </option>
              ))}
            </select>
          </div>
        </div>

        {['nac', 'usdt'].includes(selectedFromCurrency) && (
          <p className="text-blue text-left text-sm mt-4">
            {t('exchange.user_from_assets', {token: upperCase(selectedFromCurrency), amount: availableTokens})}
          </p>
        )}


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
              onChange={setToAmount}
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
                className="text-blue font-bold text-xl uppercase"
                disabled={!['nmilk'].includes(toCurrency)}
              >
                {toCurrency}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-between mt-4">
          <p className="text-blue text-sm text-left mr-6">{t(`exchange.helper_bottom_buy`, {token: upperCase(selectedToCurrency), amount: formatCurrency(totalTokensForSell)})}</p>

          <p className="text-blue text-sm font-semibold">
            {upperCase(selectedToCurrency)} {t(`exchange.price`)} ${suggestedPrice}
          </p>
        </div>

        <div className="flex justify-around mt-10">

          {needsApproval && (
            <Button
              isLoading={isLoading}
              text={`${t("exchange.button_approve")} ${upperCase(selectedFromCurrency)}`}
              extraClasses="h-10 bg-green border-green text-white text-center w-48 text-sm uppercase w-full shadow"
              type="button"
              onClick={onApprove}
              disabled={!canSubmit}
            />
          )}

          {!needsApproval && (
            <Button
              isLoading={isLoading}
              text={t(`exchange.button_buy`)}
              extraClasses="h-10 bg-green border-green text-white text-center w-48 text-sm uppercase w-full shadow"
              type="submit"
              disabled={!canSubmit}
            />
          )}

        </div>
      </div>

    </form>
  );
};

export default Buy;
