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
import {NBEEF_TOKENS_BY_STEER, NLAND_TOKENS_BY_HECTARE, NMILK_TOKENS_BY_COW} from "src/config/constants";
import {ModalContext} from "src/contexts/ModalContext";
import TokenIssueForm from "src/components/forms/TokenIssueForm";
import NACIssueForm from "src/components/forms/NACIssueForm";
import {useEthers} from "@usedapp/core";
import {isAdminAddress} from "src/utils/addressHelpers";
import {formatUintToDecimal} from "src/utils/formatUtils";
import {Helmet} from "react-helmet-async";
import Button from "src/components/Buttons/Button";
import MainStaking from "src/config/abi/MainStaking.json";
import { callFunction } from "reblox-web3-utils";

const Admin: React.FC = () => {
  const { t } = useTranslation();
  const {setModal} = useContext(ModalContext);
  const { account, library } = useEthers();

  const {liquidityFundAssets, burnAddressAssets, nacExchangeRate} = useContext(PriceContext);
  const {nmilkAssetsPerMonth, nmilkTotalSupply} = useContext(NmilkContext);
  const {nlandAssetsPerMonth, nlandTotalSupply} = useContext(NlandContext);
  const {nbeefAssetsPerMonth, nbeefTotalSupply} = useContext(NbeefContext);

  const totalSupply = useTotalSupply();

  const [selectedToken, setSelectedToken] = useState<'nmilk' | 'nland' | 'nbeef'>('nmilk');
  const [isReallocingEmissionsLoading, setIsReallocingEmissionsLoading] = useState<boolean>(false);

  const address: string = contracts.redeemRewards[CHAIN_ID];

  const [selectedTokenNacEmitted, selectedTokenPeriod, selectedTokenAuxiliary, selectedTokenTotalSupply] = useMemo(() => {
    switch (selectedToken) {
      case "nmilk":
        return [nmilkAssetsPerMonth, 1, NMILK_TOKENS_BY_COW, nmilkTotalSupply];
      case "nland":
        return [nlandAssetsPerMonth, 12, NLAND_TOKENS_BY_HECTARE, nlandTotalSupply];
      case "nbeef":
        return [nbeefAssetsPerMonth, 1, NBEEF_TOKENS_BY_STEER, nbeefTotalSupply];
    }
  }, [selectedToken, nmilkAssetsPerMonth, nlandAssetsPerMonth, nbeefAssetsPerMonth, nmilkTotalSupply, nlandTotalSupply, nbeefTotalSupply]);

  if (!(account && isAdminAddress(account))) {
    return <></>;
  }

  const reallocEmissions = () => {
    setIsReallocingEmissionsLoading(true);
    callFunction(
      contracts.mainStaking[CHAIN_ID],
      library,
      [],
      "reallocEmissions",
      MainStaking
    ).finally(() => {
      setIsReallocingEmissionsLoading(false);
    });
  }

  return (
    <div className="flex justify-center mt-8">
      <Helmet defer={false}>
        <title>{`${t('navbar.admin')} - New Agro`}</title>
      </Helmet>
      <div className="max-w-3xl w-full">
        <div className="w-full flex justify-center items-center mt-8 mb-6">
          <h3 className="text-blue font-semibold md:font-bold text-sm mr-6">{t('admin.available_funds')}</h3>
          <CountUp
            className="text-green font-bold text-base"
            end={formatUintToDecimal(liquidityFundAssets)}
            decimals={2}
            separator=","
            decimal="."
            suffix=" USDT"
            preserveValue={true}
          />
          <p className="text-green font-bold text-base mx-6">|</p>
          <a
            href={`https://bscscan.com/address/${address}`}
            target="_blank"
            rel="noreferrer"
            className="text-green font-bold text-base underline"
          >
            {address.slice(0, 10)}...
          </a>
        </div>

        <div className="w-full flex justify-center items-center mb-6">
          <h3 className="text-blue font-semibold md:font-bold text-sm mr-4">{t('admin.nac_in_circulation')}</h3>
          <CountUp
            className="text-green font-bold text-base"
            end={totalSupply - formatUintToDecimal(burnAddressAssets)}
            decimals={2}
            separator=","
            decimal="."
            preserveValue={true}
          />

          <p className="text-green font-bold text-base mx-6">|</p>
          <CountUp
            className="text-green font-bold text-base"
            end={(totalSupply - formatUintToDecimal(burnAddressAssets)) / formatUintToDecimal(nacExchangeRate)}
            decimals={2}
            separator=","
            decimal="."
            suffix=" USDT"
            preserveValue={true}
          />
        </div>

        <div className="w-full justify-center flex mb-6">
          <Tabs
            tabs={[
              {name: 'New Milk', selected: selectedToken === 'nmilk', onClick: () => setSelectedToken('nmilk')},
              {name: 'New Land', selected: selectedToken === 'nland', onClick: () => setSelectedToken('nland'), disabled: true},
              {name: 'New Beef', selected: selectedToken === 'nbeef', onClick: () => setSelectedToken('nbeef'), disabled: true},
            ]}
            containerClass="max-w-md"
          />
        </div>

        <AdminCard
          title={t(`admin.nac_emitted_${selectedToken}`)}
          quantity={formatUintToDecimal(selectedTokenNacEmitted, 18) * selectedTokenAuxiliary * selectedTokenPeriod}
          onClick={() => {
            setModal({
              component: () => NACIssueForm({
                token: selectedToken,
                tokenAuxiliary: selectedTokenAuxiliary,
                tokenPeriod: selectedTokenPeriod,
                nacEmitted: formatUintToDecimal(selectedTokenNacEmitted, 18) * selectedTokenAuxiliary * selectedTokenPeriod
              }),
              title: t("admin.nac_issue.title"),
            });
          }}
        />
        <br/>
        <br/>
        <AdminCard
          title={t("admin.token_emitted", {token: upperCase(selectedToken)})}
          quantity={formatUintToDecimal(selectedTokenTotalSupply)}
          extraButton={
            <Button
              text={t("admin.token_issue.refresh_nac_emission")}
              extraClasses="border-blue border-2 text-blue px-4 font-bold text-tiny md:text-xs whitespace-nowrap text-center h-8 w-52 mt-2"
              onClick={reallocEmissions}
              isLoading={isReallocingEmissionsLoading}
              isLoadingColor="blue"
              disabled={!account}
              needWallet={true}
            />
          }
          onClick={() => {
            setModal({
              component: () => TokenIssueForm({
                token: selectedToken,
                tokenEmitted: formatUintToDecimal(selectedTokenTotalSupply)
              }),
              title: t("admin.token_issue.title", {selectedToken}),
            });
          }}
        />
        <br />
      </div>
    </div>
  );
};

export default Admin;
