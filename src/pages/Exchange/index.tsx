import React, {useState} from "react";
import { useTranslation } from "react-i18next";
import Textfield from "src/components/Inputs/Textfield";
import Tabs from "src/components/tabs/Tabs";
import {upperCase} from "lodash";
import Button from "src/components/Buttons/Button";
import {ReactSVG} from "react-svg";

const Exchange: React.FC = () => {
  const { t } = useTranslation();
  const [selectedTab, setSelectedTab] = useState<'buy' | 'sell'>('buy');
  const [fromAmount, setFromAmount] = useState<number>();
  const [fromPrice, setFromPrice] = useState<number>();
  const [suggestedPrice, setSuggestedPrice] = useState<number>(23.4);

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
          containerClass="w-64 mt-6 md:mt-10"
        />

        <div className="flex flex-col w-full mt-8 md:mt-24">
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
                  containerClasses="w-full md:max-w-[8rem] mr-4"
                  inputClasses="md:placeholder-transparent"
                  type="number"
                  placeholder={t(`exchange.amount`)}
                />
              </div>

              <div className="hidden md:flex flex-row items-center justify-between">
                <div className="h-full items-center font-bold text-xl text-blue mr-10">{t(`exchange.price`)}</div>
                <Textfield
                  id="price"
                  onChange={setFromPrice}
                  value={fromPrice}
                  containerClasses="w-full max-w-[8rem]"
                  inputClasses={`md:placeholder-transparent ${selectedTab === 'buy' ? 'bg-blue/[.5] text-white placeholder-white' : ''}`}
                  type="number"
                  disabled={selectedTab === 'buy'}
                  placeholder={t(`exchange.price`)}
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

          {selectedTab === 'buy' ? (
            <p className="text-blue text-left text-lg mt-4 font-semibold md:hidden">
              {`$${upperCase(selectedToCurrency)} ${t(`exchange.price`)} $${suggestedPrice}`}
            </p>
          ) : (
            <p className="text-blue text-left text-lg mt-4 font-semibold">
              {`${t(`exchange.suggested_price`)}: $${suggestedPrice}`}
            </p>
          )}

          <div className="flex justify-center mt-4 md:mt-10">
            <ReactSVG
              src="icons/arrow.svg"
              beforeInjection={(svg) => {
                svg.classList.add('fill-blue');
                svg.classList.add('w-4');
                svg.classList.add('md:w-5');
              }}
            />
          </div>

          <h3 className="mt-4 md:mt-6 text-blue font-bold text-2xl md:text-3xl">{t(`exchange.to`)}</h3>

          <div className="relative flex border-4 border-green rounded-lg w-full mt-6 justify-between items-center py-4 px-6">
            <div className="flex flex-row items-center justify-between">
              <div className="hidden md:flex h-full items-center font-bold text-xl text-blue mr-10">{t(`exchange.amount`)}</div>
              <Textfield
                id="amount"
                onChange={setToAmount}
                value={toAmount}
                containerClasses="w-full md:max-w-[8rem] mr-4"
                inputClasses="md:placeholder-transparent"
                type="number"
                placeholder={t(`exchange.amount`)}
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
