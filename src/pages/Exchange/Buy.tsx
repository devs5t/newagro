import React, {useCallback, useContext, useEffect, useMemo, useState} from "react";
import { useTranslation } from "react-i18next";
import Textfield from "src/components/Inputs/Textfield";
import {upperCase} from "lodash";
import Button from "src/components/Buttons/Button";
import {ReactSVG} from "react-svg";
import {CHAIN_ID} from "src/config";
import contracts from "src/config/constants/contracts";
import {callViewFunction, callFunction, approveContract, getTokenAllowance} from "reblox-web3-utils";
import {formatDecimalToUint, formatUintToDecimal, minFromString} from "src/utils/formatUtils";
import {useDebounce} from "src/hooks/useDebounce";
import {PriceContext} from "src/contexts/PriceContext";
import {useEthers} from "@usedapp/core";
import {ModalContext} from "src/contexts/ModalContext";
import ExchangeARSForm from "src/components/forms/ExchangeARSForm";
import {useReloadPrices} from "src/hooks/useReloadPrices";
import {NmilkContext} from "src/contexts/NmilkContext";
import {NlandContext} from "src/contexts/NlandContext";
import {NbeefContext} from "src/contexts/NbeefContext";
import {TokenKeyMap} from "src/config/constants";
import NewTokenExchange from "src/config/abi/NewTokenExchange.json";
import RedeemRewards from "src/config/abi/RedeemRewards.json";
import SuccessModal from "src/components/Modal/SuccessModal";

const Buy: React.FC = () => {
  const { t } = useTranslation();
  const {setModal} = useContext(ModalContext);
  const { reloadPrices } = useReloadPrices();

  const { account, library } = useEthers();
  const { nacExchangeRate, nacUserAssets, usdtUserAssets } = useContext(PriceContext);
  const { nmilkSuggestedPrice } = useContext(NmilkContext);
  const { nlandSuggestedPrice } = useContext(NlandContext);
  const { nbeefSuggestedPrice } = useContext(NbeefContext);

  const [fee, setFee] = useState<number>();
  const [fromMaxInput, setFromMaxInput] = useState<number>(0);

  const [fromAmount, setFromAmount] = useState<number>();
  const debouncedFromAmount: number = useDebounce(fromAmount, 500);

  const [totalTokensForSell, setTotalTokensForSell] = useState<number>(0);

  const [toAmount, setToAmount] = useState<number>();

  const fromCurrencies: ('usdt' | 'nac' | 'ars')[] = ['usdt', 'nac', 'ars'];
  const [selectedFromCurrency, setSelectedFromCurrency] = useState<'usdt' | 'nac' | 'ars'>(fromCurrencies[0]);

  const toCurrencies: ('nmilk' | 'nbeef' | 'nland')[] = ['nmilk', 'nland', 'nbeef'];
  const [selectedToCurrency, setSelectedToCurrency] = useState<'nmilk' | 'nbeef' | 'nland'>(toCurrencies[0]);

  const [needsApproval, setNeedsApproval] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [step, setStep] = useState<number[]>([]);

  const configSpender: any = {
    nac: {contract: contracts.nac[CHAIN_ID]},
    usdt: {contract: contracts.usdt[CHAIN_ID]},
    ars: {contract: ''}
  };

  const selectedSpenderContract: string = useMemo(() => {
    return configSpender[selectedFromCurrency].contract;
  }, [selectedFromCurrency]);

  const selectedExchangeContract: string = useMemo(() => {
    return TokenKeyMap[selectedToCurrency].exchangeContract;
  }, [selectedToCurrency]);

  const getValueBasedOnSelectedFromCurrency = useCallback((value: number) => {
    if (['nac', 'ars'].includes(selectedFromCurrency)) {
      return value / formatUintToDecimal(nacExchangeRate);
    }
    return value;
  }, [selectedFromCurrency, nacExchangeRate]);

  useEffect(() => {
    if (selectedFromCurrency === 'ars') {
      setFee(undefined);
      return;
    }
    let method = "buyFeeBPS";
    let abi = NewTokenExchange;
    if (selectedFromCurrency === "nac") {
      method = "feeBPS";
      abi = RedeemRewards;
    }
    callViewFunction(
      CHAIN_ID,
      selectedExchangeContract,
      [],
      method,
      abi
    ).then((value: number) => setFee(value / 100));

  }, [selectedFromCurrency, selectedToCurrency]);

  useEffect(() => {
    if (account && library) {
      if (selectedFromCurrency === 'ars') {
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
  }, [account, selectedFromCurrency]);

  useEffect(() => {
    if (!debouncedFromAmount) {
      setToAmount(0);
      return;
    }

    callViewFunction(
      CHAIN_ID,
      selectedExchangeContract,
      [formatDecimalToUint(getValueBasedOnSelectedFromCurrency(debouncedFromAmount))],
      "getTokenOutputAmount",
      NewTokenExchange
    ).then((value: number) => setToAmount(formatUintToDecimal(value)));

  }, [debouncedFromAmount, selectedFromCurrency, selectedToCurrency]);

  const requestTotalTokensForSell = () => {
    callViewFunction(
      CHAIN_ID,
      selectedExchangeContract,
      [],
      "getTotalTokensForSell",
      NewTokenExchange
    ).then((value: number) => setTotalTokensForSell(formatUintToDecimal(value)));
  };

  useEffect(() => {

    callViewFunction(
      CHAIN_ID,
      selectedExchangeContract,
      [],
      "getMaxInputAmount",
      NewTokenExchange
    ).then((value: number) => setFromMaxInput(getValueBasedOnSelectedFromCurrency(formatUintToDecimal(value, 18, false))));

    requestTotalTokensForSell();

  }, [account, selectedToCurrency]);

  const maxValue: number | undefined = useMemo(() => {
    if (selectedFromCurrency === 'ars') {
      return undefined;
    }
    if (selectedFromCurrency === 'nac') {
      return minFromString(formatUintToDecimal(nacUserAssets, 18, false), (fromMaxInput * formatUintToDecimal(nacExchangeRate, 18, false)));
    }
    return minFromString(formatUintToDecimal(usdtUserAssets, 18, false), fromMaxInput);
  }, [fromMaxInput, selectedFromCurrency, usdtUserAssets, nacUserAssets, nacExchangeRate]);

  const canSubmit: boolean = useMemo(() => {
    return !!(account && library && fromAmount);
  }, [account, library, fromAmount]);

  const suggestedPrice: number = useMemo(() => {
    switch (selectedToCurrency) {
      case "nmilk":
        return nmilkSuggestedPrice;
      case "nland":
        return nlandSuggestedPrice;
      case "nbeef":
        return nbeefSuggestedPrice;
    }
  }, [selectedToCurrency, nmilkSuggestedPrice, nlandSuggestedPrice, nbeefSuggestedPrice]);

  const availableTokens: number = useMemo(() => {
    switch (selectedFromCurrency) {
      case "ars":
        return 0;
      case "nac":
        return formatUintToDecimal(nacUserAssets);
      case "usdt":
        return formatUintToDecimal(usdtUserAssets);
    }
  }, [selectedFromCurrency, nacUserAssets, usdtUserAssets]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();
    if (canSubmit) {
      setIsLoading(true);

      if (selectedFromCurrency === 'ars') {
        setModal({
          component: () => ExchangeARSForm({ tab: 'buy', token: selectedToCurrency, amount: fromAmount, price: formatUintToDecimal(suggestedPrice)}),
          title: `${t("exchange_ars_form.title", {tab: t("exchange_ars_form.buy")})}`,
        });
        setIsLoading(false);
        return;
      }

      if (needsApproval) {
        try {
          setStep([1, 2]);
          await approveContract(
            library,
            selectedExchangeContract,
            selectedSpenderContract,
          );
          setNeedsApproval(true);
          setStep([2, 2]);
        } catch (e) {
          setStep([]);
          setIsLoading(false);
          console.error(e)
          return;
        }
      }

      const method: string = selectedFromCurrency === 'nac' ? 'buyWithRewards' : 'buy';
      callFunction(
        selectedExchangeContract,
        library,
        [formatDecimalToUint(fromAmount)],
        method,
        NewTokenExchange
      ).then(() => {
        setModal({
          component: () => SuccessModal({
            subtitle: t('exchange.buy_success_subtitle'),
            description: t('exchange.buy_success_description'),
            buttonText: t('exchange.buy_success_button'),
            buttonLink: '/investment'
          }),
          title: t('exchange.buy_success_title', {token: upperCase(selectedToCurrency)}),
        });

      }).finally(() => {
        setIsLoading(false);
        reloadPrices();
        requestTotalTokensForSell();
      });
    }
  };

  const onFromAmountChange = useCallback((value: number) => {
    if (['usdt', 'nac'].includes(selectedFromCurrency) && Number(value) > maxValue) {
      setFromAmount(maxValue);
      return;
    }
    setFromAmount(value);
  }, [selectedFromCurrency, maxValue]);

  const onMax = () => setFromAmount(maxValue);

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
                step="any"
                max={maxValue}
              />
              <Button
                onClick={onMax}
                text="MAX"
                extraClasses="flex justify-center items-center h-8 mr-10 rounded-lg text-white bg-blue text-sm font-normal"
              />
            </div>

            <select
              className="text-blue font-bold text-xl md:w-32 cursor-pointer"
              onChange={(e) => setSelectedFromCurrency(e.target.value)}
              value={selectedFromCurrency}
            >
              {fromCurrencies.map((fromCurrency: string, index: number) => (
                <option
                  key={index}
                  className="text-blue font-bold"
                  value={fromCurrency}
                >
                  {upperCase(fromCurrency)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-between mt-4">
          {['nac', 'usdt'].includes(selectedFromCurrency) && (
            <p className="text-blue text-sm">
              {t('exchange.user_from_assets', {token: upperCase(selectedFromCurrency), amount: availableTokens})}
            </p>
          )}

          {fee && (
            <p className="text-blue text-sm">
              {t('exchange.exchange_fee', {fee})}
            </p>
          )}
        </div>

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
            className="text-blue font-bold text-xl md:w-32 cursor-pointer"
            onChange={(e) => setSelectedToCurrency(e.target.value)}
            value={selectedToCurrency}
          >
            {toCurrencies.map((toCurrency: string, index: number) => (
              <option
                key={index}
                className="text-blue font-bold text-xl"
                disabled={!['nmilk', 'nland'].includes(toCurrency)}
                value={toCurrency}
              >
                {upperCase(toCurrency)}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-between mt-4">
          <p className="text-blue text-sm text-left mr-6">{t(`exchange.helper_bottom_buy`, {token: upperCase(selectedToCurrency), amount: totalTokensForSell})}</p>

          <p className="text-blue text-sm font-semibold">
            {upperCase(selectedToCurrency)} {t(`exchange.price`)} ${formatUintToDecimal(suggestedPrice)}
          </p>
        </div>

        <div className="flex justify-around mt-10">
          <Button
            isLoading={isLoading}
            text={t(`exchange.button_buy`)}
            extraClasses="h-10 bg-green border-green text-white text-center w-48 text-sm uppercase w-full shadow"
            type="submit"
            disabled={!canSubmit}
            needWallet={true}
            step={step}
          />
        </div>
      </div>

    </form>
  );
};

export default Buy;
