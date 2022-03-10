import React, {useCallback, useContext, useEffect, useMemo, useState} from "react";
import { useTranslation } from "react-i18next";
import Textfield from "src/components/Inputs/Textfield";
import Tabs from "src/components/tabs/Tabs";
import {min, upperCase} from "lodash";
import Button from "src/components/Buttons/Button";
import {ReactSVG} from "react-svg";
import {CHAIN_ID} from "src/config";
import contracts from "src/config/constants/contracts";
import NMILKExchange from "src/config/abi/NMILKExchange.json";
import {callViewFunction, callFunction} from "reblox-web3-utils";
import {formatDecimalToUint, formatUintToDecimal} from "src/utils/formatUtils";
import {useDebounce} from "src/hooks/useDebounce";
import {PriceContext} from "src/contexts/PriceContext";
import {useEthers} from "@usedapp/core";
import {ModalContext} from "src/contexts/ModalContext";
import ExchangeARSForm from "src/components/forms/ExchangeARSForm";

const Exchange: React.FC = () => {
  const { t } = useTranslation();
  const {setModal} = useContext(ModalContext);

  const { account, library } = useEthers();
  const { nacExchangeRate, nacUserAssets, usdtUserAssets } = useContext(PriceContext);

  const [selectedTab, setSelectedTab] = useState<'buy' | 'sell'>('buy');

  const [fromMaxInput, setFromMaxInput] = useState<number>(0);

  const [fromAmount, setFromAmount] = useState<number>();
  const debouncedFromAmount = useDebounce(fromAmount, 500);

  const [fromPrice, setFromPrice] = useState<number>();
  const [suggestedPrice, setSuggestedPrice] = useState<number>(23.4);

  const [toAmount, setToAmount] = useState<number>(0);

  const fromCurrencies: string[] = selectedTab === 'buy' ? ['usdt', 'nac', 'ars'] : ['nmilk', 'nbeef', 'nland'];
  const [selectedFromCurrency, setSelectedFromCurrency] = useState<'usdt' | 'nac' | 'ars' | 'nmilk' | 'nbeef' | 'nland'>(fromCurrencies[0]);

  const toCurrencies: ('nmilk' | 'nbeef' | 'nland' | 'usdt')[] = selectedTab === 'buy' ? ['nmilk', 'nbeef', 'nland'] : ['usdt'];
  const [selectedToCurrency, setSelectedToCurrency] = useState<'nmilk' | 'nbeef' | 'nland' | 'usdt'>(toCurrencies[0]);

  useEffect(() => {
    if (selectedFromCurrency === 'ars') {
      setModal({
        component: () => ExchangeARSForm({ tab: selectedTab }),
        title: `${t("exchange_ars_form.title", {tab: t(`exchange_ars_form.${selectedTab}`)})}`,
      });
    }
  }, [selectedFromCurrency]);

  const config: any = {
    nmilk: {abi: NMILKExchange, contract: contracts.exchangeNmilk[CHAIN_ID]},
    nbeef: {abi: NMILKExchange, contract: contracts.exchangeNmilk[CHAIN_ID]},
    nland: {abi: NMILKExchange, contract: contracts.exchangeNmilk[CHAIN_ID]}
  }

  const selectedAbi: any = config[selectedToCurrency].abi;
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

  }, [selectedToCurrency]);

  const maxValue: number = useMemo(() => {
    if (selectedFromCurrency === 'nac') {
      return min([nacUserAssets, (fromMaxInput * nacExchangeRate)]);
    }
    return min([usdtUserAssets, fromMaxInput]);
  }, [fromMaxInput, selectedFromCurrency, usdtUserAssets, nacUserAssets, nacExchangeRate]);


  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (library && account && fromAmount) {
      const method: string = selectedFromCurrency === 'nac' ? 'buyWithRewards' : 'buy';

      callFunction(
        selectedContract,
        library,
        [formatDecimalToUint(fromAmount)],
        method,
        selectedAbi
      ).then(console.log);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="flex flex-col w-full items-center w-full max-w-3xl">

        <Tabs
          tabs={[
            {name: t(`exchange.tab_buy`), selected: selectedTab === "buy", onClick: () => setSelectedTab("buy")},
            {name: t(`exchange.tab_sell`), selected: selectedTab === "sell", onClick: () => setSelectedTab("sell")}
          ]}
          containerClass="w-64 mt-6"
        />

        <form onSubmit={submit}>

          <div className="flex flex-col w-full mt-12">
            <p className="text-blue text-left">{t(`exchange.helper_top_${selectedTab}`)}</p>

            <h3 className="mt-6 text-blue font-bold text-2xl md:text-3xl">{t(`exchange.from`)}</h3>

            <div className="relative flex flex-col border-4 border-green rounded-lg w-full mt-6 py-4 px-6">
              <div className="flex justify-between items-center">
                <div className="flex flex-row items-center justify-between">
                  <div className="hidden md:flex h-full items-center font-bold text-xl text-blue mr-10">{t(`exchange.amount`)}</div>
                  <Textfield
                    id="amount"
                    onChange={setFromAmount}
                    value={fromAmount}
                    containerClasses={`w-full mr-4 ${selectedTab === 'sell' ? 'md:max-w-[8rem]' : ''}`}
                    inputClasses="md:placeholder-transparent"
                    type="number"
                    placeholder={t(`exchange.amount`)}
                    step={0.01}
                    max={maxValue}
                  />
                </div>

                {selectedTab === 'sell' && (
                  <>
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

                    <div className="hidden md:flex absolute right-40 -mt-40 w-48 h-10 justify-center items-center rounded-full text-center text-sm font-semibold text-white bg-green">
                      {`${t(`exchange.suggested_price`)}: $${suggestedPrice}`}
                    </div>
                  </>
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

              {selectedTab === 'sell' && (
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

            <p className="text-blue text-left text-lg mt-4 font-semibold md:hidden">
              {selectedTab === 'buy' ?
                `$${upperCase(selectedToCurrency)} ${t(`exchange.price`)} $${suggestedPrice}`
                : `${t(`exchange.suggested_price`)}: $${suggestedPrice}`
              }
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
                  containerClasses={`w-full mr-4 ${selectedTab === 'sell' ? 'md:max-w-[8rem]' : ''}`}
                  inputClasses="md:placeholder-transparent"
                  type="number"
                  placeholder={t(`exchange.amount`)}
                  disabled={selectedTab === 'buy'}
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

            <p className="text-blue text-left mt-4">{`* 125.000 ${upperCase(selectedToCurrency)} ${t(`exchange.helper_bottom_${selectedTab}`)}`}</p>

            <div className="flex justify-around mt-12">
              <Button
                text={t(`exchange.button_${selectedTab}`)}
                extraClasses="h-12 bg-green border-green text-white text-center w-48 text-md uppercase w-full shadow"
                type="submit"
              />
            </div>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Exchange;
