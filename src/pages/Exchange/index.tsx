import React, {useState} from "react";
import { useTranslation } from "react-i18next";
import Tabs from "src/components/tabs/Tabs";
import Buy from "src/pages/Exchange/Buy";
import Sell from "src/pages/Exchange/Sell";

const Exchange: React.FC = () => {
  const { t } = useTranslation();

  const [selectedTab, setSelectedTab] = useState<'buy' | 'sell'>('buy');

  return (
    <div className="flex justify-center">
      <div className="flex flex-col w-full items-center w-full max-w-4xl">

        <Tabs
          tabs={[
            {name: t(`exchange.tab_buy`), selected: selectedTab === "buy", onClick: () => setSelectedTab("buy")},
            {name: t(`exchange.tab_sell`), selected: selectedTab === "sell", onClick: () => setSelectedTab("sell")}
          ]}
          containerClass="w-64 mt-6"
        />

        {selectedTab === "buy" && (
          <Buy />
        ) || (
          <Sell />
        )}

      </div>
    </div>
  );
};

export default Exchange;
