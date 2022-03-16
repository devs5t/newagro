import React, {useCallback, useContext, useEffect, useMemo, useState} from "react";
import { useTranslation } from "react-i18next";
import Textfield from "src/components/Inputs/Textfield";
import {min, upperCase} from "lodash";
import Button from "src/components/Buttons/Button";
import {ReactSVG} from "react-svg";
import {CHAIN_ID} from "src/config";
import contracts from "src/config/constants/contracts";
import NMILKExchange from "src/config/abi/NMILKExchange.json";
import {callViewFunction, callFunction, approveContract} from "reblox-web3-utils";
import {formatDecimalToUint, formatUintToDecimal} from "src/utils/formatUtils";
import {useDebounce} from "src/hooks/useDebounce";
import {PriceContext} from "src/contexts/PriceContext";
import {useEthers} from "@usedapp/core";
import {ModalContext} from "src/contexts/ModalContext";
import ExchangeARSForm from "src/components/forms/ExchangeARSForm";

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

  const config: any = {
    nmilk: {abi: NMILKExchange, contract: contracts.exchangeNmilk[CHAIN_ID]},
    nbeef: {abi: NMILKExchange, contract: contracts.exchangeNmilk[CHAIN_ID]},
    nland: {abi: NMILKExchange, contract: contracts.exchangeNmilk[CHAIN_ID]}
  };

  const selectedAbi: any[] = config[selectedToCurrency].abi;
  const selectedContract: string = config[selectedToCurrency].contract;

  const getValueBasedOnSelectedFromCurrency = useCallback((value: number) => {
    if (selectedFromCurrency === 'nac') {
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
      selectedContract,
      [formatDecimalToUint(debouncedFromAmount)],
      "getTokenOutputAmount",
      selectedAbi
    ).then((value: number) => setToAmount(getValueBasedOnSelectedFromCurrency(formatUintToDecimal(value))));

  }, [debouncedFromAmount, selectedFromCurrency, selectedToCurrency]);

  useEffect(() => {

    callViewFunction(
      CHAIN_ID,
      selectedContract,
      [],
      "getMaxInputAmount",
      selectedAbi
    ).then((value: number) => setFromMaxInput(getValueBasedOnSelectedFromCurrency(formatUintToDecimal(value))));

    callViewFunction(
      CHAIN_ID,
      selectedContract,
      [],
      "getSuggestedPrice",
      selectedAbi
    ).then((value: number) => setSuggestedPrice(formatUintToDecimal(value)));

    callViewFunction(
      CHAIN_ID,
      selectedContract,
      [],
      "getTotalTokensForSell",
      selectedAbi
    ).then((value: number) => setTotalTokensForSell(formatUintToDecimal(value)));

  }, [selectedToCurrency]);

  const maxValue: number = useMemo(() => {
    if (selectedFromCurrency === 'nac') {
      return min([nacUserAssets, (fromMaxInput * nacExchangeRate)]);
    }
    return min([usdtUserAssets, fromMaxInput]);
  }, [fromMaxInput, selectedFromCurrency, usdtUserAssets, nacUserAssets, nacExchangeRate]);

  const canSubmit: boolean = useMemo(() => {
    return !!(account && library && fromAmount);
  }, [account, library, fromAmount]);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();
    if (canSubmit) {

      if (selectedFromCurrency === 'ars') {
        setModal({
          component: () => ExchangeARSForm({ tab: 'buy', token: selectedToCurrency, amount: fromAmount, price: suggestedPrice}),
          title: `${t("exchange_ars_form.title", {tab: t("exchange_ars_form.buy")})}`,
        });
        return;
      }

      approveContract(library, account, contracts[selectedFromCurrency][CHAIN_ID])
        .then((result: any) => {
          const method: string = selectedFromCurrency === 'nac' ? 'buyWithRewards' : 'buy';
          callFunction(
            selectedContract,
            library,
            [formatDecimalToUint(fromAmount)],
            method,
            selectedAbi
          );
        })
    }
  };

  return (
    <form onSubmit={submit} className="w-full">

      <div className="flex flex-col w-full mt-12">
        <p className="text-blue text-left">{t(`exchange.helper_top_buy`)}</p>

        <h3 className="mt-6 text-blue font-bold text-2xl md:text-3xl">{t(`exchange.from`)}</h3>

        <div className="relative flex flex-col border-4 border-green rounded-lg w-full mt-6 py-4 px-6">
          <div className="flex justify-between items-center">
            <div className="flex flex-row items-center justify-between">
              <div className="hidden md:flex h-full items-center font-bold text-xl text-blue mr-10">{t(`exchange.amount`)}</div>
              <Textfield
                id="amount"
                onChange={setFromAmount}
                value={fromAmount}
                containerClasses="w-full mr-4"
                inputClasses="md:placeholder-transparent"
                type="number"
                placeholder={t(`exchange.amount`)}
                step={0.01}
                max={maxValue}
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
                  className="text-blue font-bold text-xl uppercase"
                >
                  {fromCurrency}
                </option>
              ))}
            </select>
          </div>
        </div>

        <p className="text-blue text-left mt-4">
          {t('exchange.user_from_assets', {token: upperCase(selectedFromCurrency), amount: selectedFromCurrency === 'nac' ? nacUserAssets : usdtUserAssets})}
        </p>

        <div className="flex justify-center mt-6">
          <ReactSVG
            src="icons/arrow.svg"
            beforeInjection={(svg) => {
              svg.classList.add('fill-blue');
              svg.classList.add('w-4');
              svg.classList.add('md:w-5');
            }}
          />
        </div>

        <h3 className="mt-2 text-blue font-bold text-2xl md:text-3xl">{t(`exchange.to`)}</h3>

        <div className="relative flex border-4 border-green rounded-lg w-full mt-6 justify-between items-center py-4 px-6">
          <div className="flex flex-row items-center justify-between">
            <div className="hidden md:flex h-full items-center font-bold text-xl text-blue mr-10">{t(`exchange.amount`)}</div>
            <Textfield
              id="amount"
              onChange={setToAmount}
              value={toAmount}
              containerClasses="w-full mr-4"
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
              >
                {toCurrency}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-between mt-4">
          <p className="text-blue text-left mr-6">{t(`exchange.helper_bottom_buy`, {token: upperCase(selectedToCurrency), amount: totalTokensForSell})}</p>

          <p className="text-blue text-lg font-semibold">
            {upperCase(selectedToCurrency)} ${t(`exchange.price`)} ${suggestedPrice}
          </p>
        </div>

        <div className="flex justify-around mt-12">
          <Button
            text={t(`exchange.button_buy`)}
            extraClasses="h-12 bg-green border-green text-white text-center w-48 text-md uppercase w-full shadow"
            type="submit"
            disabled={!canSubmit}
          />
        </div>
      </div>

    </form>
  );
};

export default Buy;
