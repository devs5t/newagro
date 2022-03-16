import React, {useCallback, useContext, useEffect, useMemo, useState} from "react";
import { useTranslation } from "react-i18next";
import Textfield from "src/components/Inputs/Textfield";
import {upperCase} from "lodash";
import Button from "src/components/Buttons/Button";
import {ReactSVG} from "react-svg";
import {CHAIN_ID} from "src/config";
import contracts from "src/config/constants/contracts";
import NMILKExchange from "src/config/abi/NMILKExchange.json";
import RedeemRewards from "src/config/abi/RedeemRewards.json";
import {callViewFunction, callFunction} from "reblox-web3-utils";
import {formatDecimalToUint, formatUintToDecimal} from "src/utils/formatUtils";
import {useDebounce} from "src/hooks/useDebounce";
import {PriceContext} from "src/contexts/PriceContext";
import {useEthers} from "@usedapp/core";
import {ModalContext} from "src/contexts/ModalContext";
import ExchangeARSForm from "src/components/forms/ExchangeARSForm";
import {NmilkContext} from "src/contexts/NmilkContext";
import {NlandContext} from "src/contexts/NlandContext";
import {NbeefContext} from "src/contexts/NbeefContext";

const Sell: React.FC = () => {
  const { t } = useTranslation();
  const {setModal} = useContext(ModalContext);

  const { account, library } = useEthers();
  const { nacUserAssets } = useContext(PriceContext);
  const { nmilkUserAssets } = useContext(NmilkContext);
  const { nlandUserAssets } = useContext(NlandContext);
  const { nbeefUserAssets } = useContext(NbeefContext);

  const [fromAmount, setFromAmount] = useState<number>(0);
  const debouncedFromAmount = useDebounce(fromAmount, 500);

  const [fromPrice, setFromPrice] = useState<number>(0);
  const [suggestedPrice, setSuggestedPrice] = useState<number>(0);

  const [toAmount, setToAmount] = useState<number>(0);

  const fromCurrencies: ('nac' | 'nmilk' | 'nbeef' | 'nland')[] =  ['nac', 'nmilk', 'nbeef', 'nland'];
  const [selectedFromCurrency, setSelectedFromCurrency] = useState<'nac' | 'nmilk' | 'nbeef' | 'nland'>(fromCurrencies[0]);

  const toCurrencies: ('usdt' | 'ars')[] = ['usdt', 'ars'];
  const [selectedToCurrency, setSelectedToCurrency] = useState<'usdt' | 'ars'>(toCurrencies[0]);

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

  useEffect(() => {
    if (selectedToCurrency === 'ars') {
      setModal({
        component: () => ExchangeARSForm({ tab: 'sell' }),
        title: `${t("exchange_ars_form.title", {tab: t("exchange_ars_form.sell")})}`,
      });
    }
  }, [selectedToCurrency]);

  const config: any = {
    nac: {abi: RedeemRewards, contract: contracts.redeemRewards[CHAIN_ID]},
    nmilk: {abi: NMILKExchange, contract: contracts.exchangeNmilk[CHAIN_ID]},
    nbeef: {abi: NMILKExchange, contract: contracts.exchangeNmilk[CHAIN_ID]},
    nland: {abi: NMILKExchange, contract: contracts.exchangeNmilk[CHAIN_ID]}
  }

  const selectedAbi: any[] = config[selectedFromCurrency].abi;
  const selectedContract: string = config[selectedFromCurrency].contract;

  useEffect(() => {
    setToAmount(fromAmount * fromAmount);
  }, [fromAmount, fromAmount]);

  useEffect(() => {
    if (selectedFromCurrency === 'nac') {
      return;
    }

    if (['nmilk', 'nbeef', 'nland'].includes(selectedFromCurrency)) {
      callViewFunction(
        CHAIN_ID,
        selectedContract,
        [],
        "getSuggestedPrice",
        selectedAbi
      ).then((value: number) => setSuggestedPrice(formatUintToDecimal(value)));
    }

  }, [selectedFromCurrency]);

  const canSubmit: boolean = useMemo(() => {
    return (account && library && fromAmount && fromPrice);
  }, [account, library, fromAmount, fromPrice]);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (canSubmit) {
      if (selectedFromCurrency === 'nac') {
        callFunction(
          selectedContract,
          library,
          [formatDecimalToUint(fromAmount)],
          'deposit',
          selectedAbi
        )
          .then(console.log)
      }

      if (['nmilk', 'nland', 'nbeef'].includes(selectedFromCurrency)) {
        callFunction(
          selectedContract,
          library,
          [formatDecimalToUint(fromAmount), formatDecimalToUint(fromPrice)],
          'sell',
          selectedAbi
        )
          .then(console.log)
      }
    }
  };

  return (
    <form onSubmit={submit} className="w-full">

      <div className="flex flex-col w-full mt-12">
        <p className="text-blue text-left">{t(`exchange.helper_top_sell`)}</p>

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
                max={fromUserAssets}
              />
            </div>


            {selectedFromCurrency !== 'nac' && (
              <div className="hidden relative md:flex flex-row items-center justify-between">
                <div className="h-full items-center font-bold text-xl text-blue mr-10">{t(`exchange.price`)}</div>
                <Textfield
                  id="price"
                  onChange={setFromPrice}
                  value={fromPrice}
                  containerClasses="w-full max-w-[8rem]"
                  inputClasses="md:placeholder-transparent"
                  type="number"
                  disabled={false}
                  placeholder={t(`exchange.price`)}
                />
              </div>
            )}

            {selectedFromCurrency !== 'nac' && (
              <div className="hidden md:flex absolute right-40 -mt-40 w-48 h-10 justify-center items-center rounded-full text-center text-sm font-semibold text-white bg-green">
                {`${t(`exchange.suggested_price`)}: $${suggestedPrice}`}
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
                >
                  {fromCurrency}
                </option>
              ))}
            </select>
          </div>

          {selectedFromCurrency !== 'nac' && (
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
          )}

        </div>

        <p className="text-blue text-left mt-4">
          {t('exchange.user_from_assets', {token: upperCase(selectedFromCurrency), amount: fromUserAssets})}
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
              disabled={false}
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
          <p className="text-blue text-left mr-6">{t(`exchange.helper_bottom_sell`)}</p>
        </div>

        <div className="flex justify-around mt-12">
          <Button
            text={t(`exchange.button_sell`)}
            extraClasses="h-12 bg-green border-green text-white text-center w-48 text-md uppercase w-full shadow"
            type="submit"
            disabled={!canSubmit}
          />
        </div>
      </div>

    </form>
  );
};

export default Sell;
