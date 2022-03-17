import React, { useContext, useState } from "react";
import Button from "../Buttons/Button";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ModalContext } from "src/contexts/ModalContext";
import DepositTokenForm from "src/components/forms/DepositTokenForm";
import { upperCase } from "lodash";
import { NMILK_POOL_ID, NMILK_TOKENS_BY_COW, NBEEF_POOL_ID, NLAND_POOL_ID } from "src/config/constants";
import { formatCurrency } from "src/utils/currency";
import contracts from "src/config/constants/contracts";
import { callFunction } from "reblox-web3-utils";
import { CHAIN_ID } from "src/config";
import { useEthers } from "@usedapp/core";
import MainStaking from "src/config/abi/MainStaking.json";
import WithdrawTokenForm from "../forms/WithdrawTokenForm";
import { formatUintToDecimal } from "src/utils/formatUtils";

interface InvestCardProps {
  title: string;
  subtitle: string;
  token: "nmilk" | "nbeef" | "nland";
  containerClasses?: string;
  image: string;
  deposit: number;
  earn: number;
  totalAssets: number;
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
  subtitle,
  token,
  containerClasses,
  image,
  deposit,
  earn,
  totalAssets,
}) => {
  const { t } = useTranslation();
  const { setModal } = useContext(ModalContext);
  const [open, setOpen] = useState(false);

  const { library } = useEthers();

  return (
    <div
      className={`flex flex-col md:flex-row  w-full rounded-lg bg-lightblue/[.15] py-5 px-5 shadow relative grid grid-cols-1 md:grid-cols-2 cursor-pointer ${containerClasses}`}
      onClick={() => setOpen(!open)}
    >
      <div
        style={{ backgroundImage: `url(${image})` }}
        className="absolute rounded-full -top-6 -right-2 right-0 h-24 w-24 bg-center bg-cover opacity-75 md:h-32 md:w-32 md:top-1/2 md:transform md:-translate-y-1/2 md:-left-16"
      />
      <div className="w-full mt-5 relative md:pl-16 md:mt-0">
        <h3 className="text-blue font-bold text-left text-lg md:text-2xl">
          {title}
        </h3>
        <h2 className="text-blue font-bold text-left font-bold md:text-2xl mb-2">
          {subtitle}
        </h2>
        <Link
          className="absolute bottom-0 right-0 md:relative"
          to={`/exchange?token=${token}`}
          target={"_self"}
        >
          <span className="text-blue text-xs underline md:text-base mt-4">
            {t("investment.card_beef.buy")} {upperCase(token)}
          </span>
        </Link>
      </div>
      <div className={"grid grid-cols-2 gap-2 mt-5 w-full md:mt-0"}>
        <div className="border-2 border-green/[.5] rounded-lg w-full">
          <h3 className="p-1 text-green font-bold text-center text-xs border-b-green/[.5] border-b-2 border-green md:text-sm">
            {upperCase(token)} - {upperCase(t("investment.deposited"))}
          </h3>
          <p className="text-3xl lg:text-4xl text-green text-center mt-2 md:mt-0">
            {formatUintToDecimal(deposit)}
          </p>
          <p className="text-xs font-medium text-blue text-center mb-2 md:text-sm">
            {t("investment.cows", {
              value: formatUintToDecimal(Math.round(deposit / NMILK_TOKENS_BY_COW)).toFixed(5),
            })}
          </p>
        </div>
        <div className="border-2 border-green/[.5] rounded-lg w-full">
          <h3 className="p-1 text-green font-bold text-center text-xs border-b-green/[.5] border-b-2 border-green md:text-sm md:px-4 ">
            NAC - {upperCase(t("investment.earnings"))}
          </h3>
          <p className="text-3xl lg:text-4xl text-green text-center mt-2 md:mt-0">
            {formatUintToDecimal(earn).toFixed(5)}
          </p>
          <p className="text-xs font-medium text-blue text-center mb-2 md:text-sm">
            {t("investment.cows", {
              value: formatUintToDecimal(Math.round(earn / NMILK_TOKENS_BY_COW)).toFixed(5),
            })}
          </p>
        </div>
      </div>

      {open && (
        <>
          <div className="mt-4 w-full md:pl-32">
            <a className="w-full underline text-blue font-bold pointer">
              <p className="w-full underline text-blue font-bold">
                {t("investment.watch_cams")}
              </p>
            </a>
          </div>
          <div className={"grid grid-cols-2 gap-2 mt-5 w-full mt-5"}>
            <Button
              text={t("investment.deposit_buy")}
              extraClasses="px-2 md:px-0 w-full border-2 border-blue font-bold text-blue py-2 px-0"
              onClick={(e) => {
                e.stopPropagation();
                setModal({
                  component: () => DepositTokenForm({ token }),
                  title: `${t("deposit_token_form.deposit")} ${upperCase(
                    token
                  )}`,
                });
              }}
            />
            <Button
              text={`${t("investment.retire")} NAC`}
              extraClasses="px-2 md:px-0 w-full border-2 border-blue font-bold text-blue py-2 px-0"
              onClick={(e) => {
                callFunction(
                  contracts.mainStaking[CHAIN_ID],
                  library,
                  [tokenKeyMap[token]?.pId, "0"],
                  "deposit",
                  MainStaking
                );
                e.stopPropagation();
              }}
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
            />
            <Button
              text={`${t("investment.reinvest")} NAC`}
              extraClasses="px-2 md:px-0 w-full border-2 border-blue font-bold text-blue py-2 px-0"
              onClick={(e) => {
                callFunction(
                  contracts.mainStaking[CHAIN_ID],
                  library,
                  [tokenKeyMap[token]?.pId],
                  "compound",
                  MainStaking
                );
                e.stopPropagation();
              }}
            />
          </div>
          <div className="mt-6  w-full md:pl-32">
            <p className="w-full text-blue text-xs">
              Acá va a ir más info desplegada para el inversor desconocido /
              usuarios nuevos
            </p>
          </div>
          <div
            className={
              "rounded-lg border-2 border-green bg-blue/[.10] w-full mt-5 p-2"
            }
          >
            <h4 className="text-blue text-center font-bold text-lg">
              {t("investment.assets", { token: token.toUpperCase() })}
            </h4>
            <p className="text-center text-blue text-2xl">
              USD {formatCurrency(formatUintToDecimal(totalAssets))}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default InvestCard;
