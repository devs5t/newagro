import React, {useContext, useMemo, useState} from "react";
import { useTranslation } from "react-i18next";
import Tabs from "src/components/tabs/Tabs";
import AdminCard from "src/components/cards/AdminCard";
import contracts from "src/config/constants/contracts";
import {CHAIN_ID} from "src/config";
import {PriceContext} from "src/contexts/PriceContext";
import CountUp from "react-countup";
import {useTotalSupply} from "src/hooks/useTotalSupply";
import {upperCase} from "lodash";
import {NmilkContext} from "src/contexts/NmilkContext";
import {NlandContext} from "src/contexts/NlandContext";
import {NbeefContext} from "src/contexts/NbeefContext";
import {NMILK_TOKENS_BY_COW} from "src/config/constants";
import {ModalContext} from "src/contexts/ModalContext";
import TokenIssueForm from "src/components/forms/TokenIssueForm";
import NACIssueForm from "src/components/forms/NACIssueForm";

const Admin: React.FC = () => {
  const { t } = useTranslation();
  const {setModal} = useContext(ModalContext);

  const {liquidityFundAssets, burnAddressAssets} = useContext(PriceContext);
  const {nmilkAssetsPerMonth, nmilkTotalSupply} = useContext(NmilkContext);
  const {nlandAssetsPerMonth, nlandTotalSupply} = useContext(NlandContext);
  const {nbeefAssetsPerMonth, nbeefTotalSupply} = useContext(NbeefContext);

  const totalSupply = useTotalSupply();

  const [selectedToken, setSelectedToken] = useState<'nmilk' | 'nland' | 'nbeef'>('nland');

  const address: string = contracts.redeemRewards[CHAIN_ID];

  const [selectedTokenNacEmitted, selectedTokenTotalSupply] = useMemo(() => {
    switch (selectedToken) {
      case "nmilk":
        return [nmilkAssetsPerMonth * NMILK_TOKENS_BY_COW, nmilkTotalSupply];
      case "nland":
        return [nlandAssetsPerMonth, nlandTotalSupply];
      case "nbeef":
        return [nbeefAssetsPerMonth, nbeefTotalSupply];
    }
  }, [selectedToken, nmilkAssetsPerMonth, nlandAssetsPerMonth, nbeefAssetsPerMonth, nmilkTotalSupply, nlandTotalSupply, nbeefTotalSupply]);

  return (
    <div className="flex justify-center mt-8">
      <div className="max-w-3xl w-full">
        <div className="w-full grid grid-cols-1 mt-8">
          <div className="w-full flex justify-center mb-6">
            <h3 className="text-blue font-semibold md:font-bold text-sm mr-6">{t('admin.available_funds')}</h3>
            <CountUp
              className="text-green font-bold text-base text-sm mr-4"
              end={liquidityFundAssets}
              decimals={2}
              separator=","
              decimal="."
              suffix=" USDT"
              preserveValue={true}
            />
            <a
              href={`https://bscscan.com/address/${address}`}
              target="_blank"
              rel="noreferrer"
              className="text-green font-bold text-base underline text-sm"
            >
              {address.slice(0, 10)}...
            </a>
          </div>

          <div className="w-full flex justify-center mb-6">
            <h3 className="text-blue font-semibold md:font-bold text-sm mr-4">{t('admin.nac_in_circulation')}</h3>
            <CountUp
              className="text-green font-bold text-base text-sm"
              end={totalSupply - burnAddressAssets}
              decimals={2}
              separator=","
              decimal="."
              preserveValue={true}
            />
          </div>

          <div className="w-full justify-center flex mb-6">
            <Tabs
              tabs={[
                {name: 'New Land', selected: selectedToken === 'nland', onClick: () => setSelectedToken('nland')},
                {name: 'New Milk', selected: selectedToken === 'nmilk', onClick: () => setSelectedToken('nmilk')},
                {name: 'New Beef', selected: selectedToken === 'nbeef', onClick: () => setSelectedToken('nbeef'), disabled: true},
              ]}
              containerClass="max-w-md"
            />
          </div>

          <AdminCard
            title={t("admin.nac_emitted", {token: upperCase(selectedToken)})}
            quantity={selectedTokenNacEmitted}
            onClick={() => {
              setModal({
                component: () => NACIssueForm({
                  token: selectedToken,
                  nacEmitted: selectedTokenNacEmitted
                }),
                title: t("admin.nac_issue.title"),
              });
            }}
          />
          <br/>
          <br/>
          <AdminCard
            title={t("admin.token_emitted", {token: upperCase(selectedToken)})}
            quantity={selectedTokenTotalSupply}
            onClick={() => {
              setModal({
                component: () => TokenIssueForm({
                  token: selectedToken,
                  tokenEmitted: selectedTokenTotalSupply
                }),
                title: t("admin.token_issue.title", {selectedToken}),
              });
            }}
          />
          <br />
        </div>
      </div>
    </div>
  );
};

export default Admin;
