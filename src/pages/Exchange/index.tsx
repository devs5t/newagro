import React, {useState} from "react";
import { useTranslation } from "react-i18next";
import Textfield from "src/components/Inputs/Textfield";
import Tabs from "src/components/tabs/Tabs";

const Exchange: React.FC = () => {
  const { t } = useTranslation();
  const [selectedTab, setSelectedTab] = useState<'buy' | 'sell'>('buy');
  const [fromAmount, setFromAmount] = useState<number>();
  const [fromPrice, setFromPrice] = useState<number>();

  return (
    <div className="flex justify-center">
      <div className="flex flex-col w-full items-center w-full max-w-3xl">

        <Tabs
          tabs={[
            {name: t(`exchange.tab_buy`), selected: selectedTab === "buy", onClick: () => setSelectedTab("buy")},
            {name: t(`exchange.tab_sell`), selected: selectedTab === "sell", onClick: () => setSelectedTab("buy")}
          ]}
          containerClass="w-64 md:mt-10"
        />

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
