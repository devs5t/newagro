import React, {useState} from "react";
import { useTranslation } from "react-i18next";
import Textfield from "src/components/Inputs/Textfield";

const Exchange: React.FC = () => {
  const { t } = useTranslation();
  const [selectedTab, setSelectedTab] = useState<'buy' | 'sell'>('buy');
  const [fromAmount, setFromAmount] = useState<number>();
  const [fromPrice, setFromPrice] = useState<number>();

  return (
    <div className="flex justify-center">
      <div className="flex flex-col w-full items-center w-full max-w-3xl">
        <div className="flex flex-row w-64 h-12 border-2 border-green/[.5] rounded-lg justify-around md: mt-10">
          {['buy', 'sell'].map((tab: any, index: number) => (
            <div
              className={`flex w-full h-12 -m-[2px] justify-center items-center rounded-lg text-center text-lg font-semibold cursor-pointer ${selectedTab === tab ? 'text-white bg-green' : 'text-green/[.5]'}`}
              key={index}
              onClick={() => setSelectedTab(tab)}
            >
              {t(`exchange.tab_${tab}`)}
            </div>
          ))}
        </div>

        <div className="flex flex-col w-full mt-24">
          <p className="text-blue text-left">{t(`exchange.helper_${selectedTab}`)}</p>
          <h3 className="mt-6 text-blue font-bold text-3xl">{t(`exchange.from`)}</h3>

          <div className="flex border-4 border-green rounded-lg w-full h-20 mt-6 justify-around items-center">
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
          </div>

          <h3 className="mt-6 text-blue font-bold text-3xl">{t(`exchange.to`)}</h3>
        </div>
      </div>
    </div>
  );
};

export default Exchange;
