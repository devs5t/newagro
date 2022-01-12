import React, {useState} from "react";
import { useTranslation } from "react-i18next";
import Textfield from "src/components/Inputs/Textfield";
import Tabs from "src/components/tabs/Tabs";
import {upperCase} from "lodash";
import Button from "src/components/Buttons/Button";

const Exchange: React.FC = () => {
  const { t } = useTranslation();
  const [selectedTab, setSelectedTab] = useState<'buy' | 'sell'>('buy');
  const [fromAmount, setFromAmount] = useState<number>();
  const [fromPrice, setFromPrice] = useState<number>();

  const [toAmount, setToAmount] = useState<number>();

  const fromCurrencies: string[] = ['usdt', 'nac', 'ars'];
  const [selectedFromCurrency, setSelectedFromCurrency] = useState<string>(fromCurrencies[0]);

  const toCurrencies: string[] = ['nmilk', 'nbeef', 'nland'];
  const [selectedToCurrency, setSelectedToCurrency] = useState<string>(toCurrencies[0]);

  return (
    <div className="flex justify-center">
      <div className="flex flex-col w-full items-center w-full max-w-3xl">

        <Tabs
          tabs={[
            {name: t(`exchange.tab_buy`), selected: selectedTab === "buy", onClick: () => setSelectedTab("buy")},
            {name: t(`exchange.tab_sell`), selected: selectedTab === "sell", onClick: () => setSelectedTab("sell")}
          ]}
          containerClass="w-64 md:mt-10"
        />

        <div className="flex flex-col w-full mt-24">
          <p className="text-blue text-left">{t(`exchange.helper_top_${selectedTab}`)}</p>

          <h3 className="mt-6 text-blue font-bold text-3xl">{t(`exchange.from`)}</h3>

          <div className="relative flex border-4 border-green rounded-lg w-full h-20 mt-6 justify-around items-center">
            <div className="flex h-full items-center font-bold text-xl text-blue">{t(`exchange.amount`)}</div>
            <Textfield
              id="amount"
              onChange={setFromAmount}
              value={fromAmount}
              containerClasses="w-32"
              type="number"
              placeholder={t(`exchange.amount`)}
            />
            <div className="flex h-full items-center font-bold text-xl text-blue">{t(`exchange.price`)}</div>
            <Textfield
              id="amount"
              onChange={setFromPrice}
              value={fromPrice}
              containerClasses="w-32"
              inputClasses="bg-blue/[.5] text-white placeholder-white"
              type="number"
              disabled={true}
              placeholder={t(`exchange.price`)}
            />
            <select
              className="text-blue font-bold text-xl uppercase w-32 cursor-pointer"
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

          <h3 className="mt-6 text-blue font-bold text-3xl">{t(`exchange.to`)}</h3>

          <div className="relative flex border-4 border-green rounded-lg w-full h-20 mt-6 justify-around items-center">
            <div className="flex h-full items-center font-bold text-xl text-blue">{t(`exchange.amount`)}</div>
            <Textfield
              id="amount"
              onChange={setToAmount}
              value={toAmount}
              containerClasses="w-32"
              type="number"
              placeholder={t(`exchange.amount`)}
            />

            <div className="w-60"/>

            <select
              className="text-blue font-bold text-xl uppercase w-32 cursor-pointer"
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
              extraClasses="h-10 bg-green border-green text-white text-center w-40 h-8 text-xs uppercase w-full ml-3 shadow"
              type="submit"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Exchange;
