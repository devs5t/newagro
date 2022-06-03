import React, {useCallback, useContext, useState} from "react";
import Button from "../Buttons/Button";
import {Link, useNavigate} from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ModalContext } from "src/contexts/ModalContext";
import DepositTokenForm from "src/components/forms/DepositTokenForm";
import { upperCase } from "lodash";
import {TokenKeyMap} from "src/config/constants";
import contracts from "src/config/constants/contracts";
import { callFunction } from "reblox-web3-utils";
import { CHAIN_ID } from "src/config";
import { useEthers } from "@usedapp/core";
import MainStaking from "src/config/abi/MainStaking.json";
import WithdrawTokenForm from "../forms/WithdrawTokenForm";
import {useReloadPrices} from "src/hooks/useReloadPrices";
import CountUp from "react-countup";

interface InvestmentCardProps {
  apr: number;
  token: "nmilk" | "nbeef" | "nland";
  selectedToken: "nmilk" | "nbeef" | "nland" | undefined;
  setSelectedToken: (token: "nmilk" | "nbeef" | "nland" | undefined) => void;
  image: string;
  deposit: number;
  depositAuxiliary: number;
  assets: number;
  earn: number;
  earnAuxiliary: number;
  totalAssets: number;
  disabled?: boolean;
}

const InvestmentCard: React.FC<InvestmentCardProps> = ({
  apr,
  token,
  selectedToken,
  setSelectedToken,
  image,
  deposit,
  depositAuxiliary,
  assets,
  earn,
  earnAuxiliary,
  totalAssets,
  disabled= false
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { reloadPrices } = useReloadPrices();
  const { setModal } = useContext(ModalContext);

  const [isHarvestingLoading, setIsHarvestingLoading] = useState<boolean>(false);
  const [isReinvestingLoading, setIsReinvestingLoading] = useState<boolean>(false);

  const { account, library } = useEthers();

  const onHarvest = (e: any) => {
    e.stopPropagation();
    setIsHarvestingLoading(true);
    callFunction(
      contracts.mainStaking[CHAIN_ID],
      library,
      [TokenKeyMap[token]?.pId, "0"],
      "deposit",
      MainStaking
    ).finally(() => {
      setIsHarvestingLoading(false);
      reloadPrices();
    });
  };

  const onReinvest = (e: any) => {
    e.stopPropagation();
    setIsReinvestingLoading(true);
    callFunction(
      contracts.mainStaking[CHAIN_ID],
      library,
      [TokenKeyMap[token]?.pId],
      "compound",
      MainStaking
    ).finally(() => {
      setIsReinvestingLoading(false);
      reloadPrices();
    });
  };

  const handleOpenClick = useCallback(() => {
    if (token === selectedToken) {
      setSelectedToken(undefined);
    } else {
      setSelectedToken(token);
    }
  }, [selectedToken]);

  return (
    <div
      className={`flex flex-col w-full rounded-lg bg-lightblue/[.15] py-5 px-5 shadow relative cursor-pointer mb-6 md:mb-0 ${disabled ? 'opacity-50 pointer-events-none' : ''}`}
      onClick={handleOpenClick}
    >
      <div className={`flex flex-col md:flex-row grid grid-cols-1 md:grid-cols-2`}>
        <div
          style={{ backgroundImage: `url(${image})` }}
          className="absolute rounded-full -top-8 -right-2 h-28 w-28 bg-center bg-cover opacity-75 md:h-32 md:w-32 md:top-6 md:-left-16"
        />
        <div className="flex flex-col justify-around w-full mt-5 relative md:pl-16 md:mt-0 py-4">
          <h3 className="text-blue font-bold text-left text-lg md:text-2xl">
            {t(`investment.cards.${token}.title`)}
          </h3>
          <CountUp
            className="text-blue font-bold text-left font-bold md:text-xl"
            end={apr}
            prefix={`${t('investment.apr')} `}
            suffix="%"
            decimals={2}
            separator=","
            decimal="."
            preserveValue={true}
          />
          <div>
            <Link
              className="underline text-blue pointer text-xs md:text-sm"
              to={`/exchange`}
            >
              {t("investment.buy")} {upperCase(token)}
            </Link>
          </div>

          {selectedToken === token && (
            <a className="w-full underline text-blue font-bold pointer text-xs md:text-base uppercase" href="https://www.twitch.tv/newagrocoin" target="_blank">
              {t("investment.watch_cams")}
            </a>
          )}
        </div>
        <div className={"grid grid-cols-2 gap-2 mt-5 w-full md:mt-0"}>
          <div className="flex flex-col justify-between border-2 border-green/[.5] rounded-lg w-full">
            <h3 className="p-1 text-green font-bold text-center text-xs border-b-green/[.5] border-b-2 border-green md:text-sm">
              {upperCase(token)} - {upperCase(t("investment.deposited"))}
            </h3>
            <CountUp
              className=" flex justify-center w-full text-3xl text-green text-center mt-2 md:mt-0"
              end={deposit}
              decimals={2}
              separator=","
              decimal="."
              preserveValue={true}
            />

            <CountUp
              className=" flex justify-center w-full text-xs font-medium text-blue text-center mb-2 md:text-sm"
              end={depositAuxiliary}
              suffix={` ${t(`investment.cards.${token}.auxiliaryDescription`)}`}
              decimals={2}
              separator=","
              decimal="."
              preserveValue={true}
            />
          </div>
          <div className="flex flex-col justify-between border-2 border-green/[.5] rounded-lg w-full">
            <h3 className="p-1 text-green font-bold text-center text-xs border-b-green/[.5] border-b-2 border-green md:text-sm md:px-4 ">
              NAC - {upperCase(t("investment.earnings"))}
            </h3>
            <CountUp
              className=" flex justify-center w-full text-3xl text-green text-center mt-2 md:mt-0"
              end={earn}
              decimals={2}
              separator=","
              decimal="."
              preserveValue={true}
            />
            <CountUp
              className=" flex justify-center w-full text-xs font-medium text-blue text-center mb-2 md:text-sm"
              end={earnAuxiliary}
              suffix={` ${t(`investment.cards.${token}.auxiliaryDescription`)}`}
              decimals={2}
              separator=","
              decimal="."
              preserveValue={true}
            />
          </div>
        </div>
      </div>

      {selectedToken === token && (
        <div className="flex flex-col md:flex-row w-full pt-8">
          <div className="w-full mb-8 md:mb-0 md:px-16 md:w-1/2">
            <p className="w-full text-blue text-xs">
              {t(`investment.cards.${token}.description`)}
            </p>
          </div>
          <div className="md:w-1/2 w-full">
            <div className={"grid grid-cols-2 gap-2 w-full"}>
              <Button
                text={assets > 0 ? t("investment.deposit") : t("investment.buy")}
                extraClasses="px-2 md:px-0 w-full border-2 border-blue font-bold text-blue py-2 px-0"
                onClick={(e) => {
                  e.stopPropagation();
                  if (assets > 0) {
                    setModal({
                      component: () => DepositTokenForm({ token }),
                      title: `${t("deposit_token_form.deposit")} ${upperCase(
                        token
                      )}`,
                    });
                  } else {
                    navigate('/exchange');
                  }
                }}
                needWallet={true}
                disabled={!account}
              />
              <Button
                text={`${t("investment.retire")} NAC`}
                extraClasses="px-2 md:px-0 w-full border-2 border-blue font-bold text-blue py-2 px-0"
                onClick={onHarvest}
                isLoading={isHarvestingLoading}
                isLoadingColor="blue"
                needWallet={true}
                disabled={!account}
              />
              <Button
                text={`${t("investment.withdraw")} ${upperCase(token)}`}
                extraClasses="px-2 md:px-0 w-full border-2 border-blue font-bold text-blue py-2 px-0"
                onClick={(e) => {
                  e.stopPropagation();
                  setModal({
                    component: () => WithdrawTokenForm({ token }),
                    title: `${t("withdraw_token_form.withdraw")} ${upperCase(
                      token
                    )}`,
                  });
                }}
                needWallet={true}
                disabled={!account || deposit === 0}
              />
              <Button
                text={`${t("investment.reinvest")} NAC`}
                extraClasses="px-2 md:px-0 w-full border-2 border-blue font-bold text-blue py-2 px-0"
                onClick={onReinvest}
                isLoading={isReinvestingLoading}
                isLoadingColor="blue"
                needWallet={true}
                disabled={!account}
              />
            </div>
            <div
              className={
                "rounded-lg border-2 border-green bg-green/[.15] w-full mt-5 p-2"
              }
            >
              <h4 className="text-blue text-center font-bold text-lg">
                {t("investment.total_assets", { token: token.toUpperCase() })}
              </h4>
              <CountUp
                className="flex justify-center text-center text-blue text-2xl"
                end={totalAssets}
                prefix="USD "
                decimals={2}
                separator=","
                decimal="."
                preserveValue={true}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvestmentCard;
