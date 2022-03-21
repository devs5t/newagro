import React, { useContext, useState } from "react";
import Button from "../Buttons/Button";
import {Link, useNavigate} from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ModalContext } from "src/contexts/ModalContext";
import DepositTokenForm from "src/components/forms/DepositTokenForm";
import { upperCase } from "lodash";
import { NMILK_POOL_ID, NMILK_TOKENS_BY_COW, NBEEF_POOL_ID, NLAND_POOL_ID } from "src/config/constants";
import contracts from "src/config/constants/contracts";
import { callFunction } from "reblox-web3-utils";
import { CHAIN_ID } from "src/config";
import { useEthers } from "@usedapp/core";
import MainStaking from "src/config/abi/MainStaking.json";
import WithdrawTokenForm from "../forms/WithdrawTokenForm";
import {useReloadPrices} from "src/hooks/useReloadPrices";
import CountUp from "react-countup";

interface InvestCardProps {
  title: string;
  apr: number;
  token: "nmilk" | "nbeef" | "nland";
  containerClasses?: string;
  image: string;
  deposit: number;
  earn: number;
  totalAssets: number;
  descriptionText?: string;
}

const tokenKeyMap = {
  nmilk: {
    pId: NMILK_POOL_ID,
    asset: "nmilkUserAssets",
    contract: contracts.nmilk[CHAIN_ID],
  },
  nbeef: {
    pId: NBEEF_POOL_ID,
    asset: "nbeefUserAssets",
    contract: contracts.nmilk[CHAIN_ID],
  },
  nland: {
    pId: NLAND_POOL_ID,
    asset: "nlandUserAssets",
    contract: contracts.nmilk[CHAIN_ID],
  },
};

const InvestCard: React.FC<InvestCardProps> = ({
  title,
  apr,
  token,
  containerClasses,
  image,
  deposit,
  earn,
  totalAssets,
  descriptionText,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { reloadPrices } = useReloadPrices();
  const { setModal } = useContext(ModalContext);
  const [open, setOpen] = useState(false);

  const [isHarvestingLoading, setIsHarvestingLoading] = useState<boolean>(false);
  const [isReinvestingLoading, setIsReinvestingLoading] = useState<boolean>(false);

  const { account, library } = useEthers();

  const onHarvest = (e: any) => {
    e.stopPropagation();
    setIsHarvestingLoading(true);
    callFunction(
      contracts.mainStaking[CHAIN_ID],
      library,
      [tokenKeyMap[token]?.pId, "0"],
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
      [tokenKeyMap[token]?.pId],
      "compound",
      MainStaking
    ).finally(() => {
      setIsReinvestingLoading(false);
      reloadPrices();
    });
  };

  return (
    <div
      className={`flex flex-col w-full rounded-lg bg-lightblue/[.15] py-5 px-5 shadow relative cursor-pointer ${containerClasses}`}
      onClick={() => setOpen(!open)}
    >
      <div className={`flex flex-col md:flex-row grid grid-cols-1 md:grid-cols-2`}>
        <div
          style={{ backgroundImage: `url(${image})` }}
          className="absolute rounded-full -top-6 -right-2 right-0 h-24 w-24 bg-center bg-cover opacity-75 md:h-32 md:w-32 md:top-4 md:-left-16"
        />
        <div className="flex flex-col w-full mt-5 relative md:pl-16 md:mt-0">
          <h3 className="text-blue font-bold text-left text-lg md:text-2xl">
            {title}
          </h3>
          <CountUp
            className="text-blue font-bold text-left font-bold md:text-2xl mb-2"
            end={apr}
            prefix={`${t('investment.apr')} `}
            suffix="%"
            decimals={2}
            separator=","
            decimal="."
            preserveValue={true}
          />
          <Link
            className="w-full underline text-blue font-bold pointer"
            to={`/exchange?token=${token}`}
            target={"_self"}
          >
          <span className="text-blue text-xs underline md:text-base mt-4">
            {t("investment.card_beef.buy")} {upperCase(token)}
          </span>
          </Link>
          {open &&
          <a className="w-full underline text-blue font-bold pointer">
            <p className="w-full underline text-blue font-bold text-xs md:text-base">
              {t("investment.watch_cams")}
            </p>
          </a>
          }
        </div>
        <div className={"grid grid-cols-2 gap-2 mt-5 w-full md:mt-0"}>
          <div className="border-2 border-green/[.5] rounded-lg w-full">
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
              end={deposit / NMILK_TOKENS_BY_COW}
              suffix={` ${t("investment.cows")}`}
              decimals={2}
              separator=","
              decimal="."
              preserveValue={true}
            />
          </div>
          <div className="border-2 border-green/[.5] rounded-lg w-full">
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
              end={earn / NMILK_TOKENS_BY_COW}
              suffix={` ${t("investment.cows")}`}
              decimals={2}
              separator=","
              decimal="."
              preserveValue={true}
            />
          </div>
        </div>
      </div>

      {open && (
        <div className="flex flex-col md:flex-row w-full">
          <div className="w-full py-2 md:px-16 md:w-1/2">
            <p className="w-full text-blue text-xs">
              {descriptionText}
            </p>
          </div>
          <div className="md:w-1/2 w-full">
            <div className={"grid grid-cols-2 gap-2 mt-5 w-full mt-5"}>
              <Button
                text={deposit > 0 ? t("investment.deposit") : t("investment.buy")}
                extraClasses="px-2 md:px-0 w-full border-2 border-blue font-bold text-blue py-2 px-0"
                onClick={(e) => {
                  e.stopPropagation();
                  if (deposit > 0) {
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
                disabled={!account}
              />
              <Button
                text={`${t("investment.retire")} NAC`}
                extraClasses="px-2 md:px-0 w-full border-2 border-blue font-bold text-blue py-2 px-0"
                onClick={onHarvest}
                isLoading={isHarvestingLoading}
                isLoadingColor="blue"
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
                disabled={!account}
              />
              <Button
                text={`${t("investment.reinvest")} NAC`}
                extraClasses="px-2 md:px-0 w-full border-2 border-blue font-bold text-blue py-2 px-0"
                onClick={onReinvest}
                isLoading={isReinvestingLoading}
                isLoadingColor="blue"
                disabled={!account}
              />
            </div>
            <div
              className={
                "rounded-lg border-2 border-green bg-green/[.25] w-full mt-5 p-2"
              }
            >
              <h4 className="text-blue text-center font-bold text-lg">
                {t("investment.assets", { token: token.toUpperCase() })}
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

export default InvestCard;
