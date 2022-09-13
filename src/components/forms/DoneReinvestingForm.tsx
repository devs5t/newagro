import React, {useContext, useEffect, useMemo, useState} from "react";
import { useTranslation } from "react-i18next";
import Button from "src/components/Buttons/Button";
import { ModalContext } from "src/contexts/ModalContext";
import Textfield from "src/components/Inputs/Textfield";
import { Slider } from "@mui/material";
import { upperCase } from "lodash";
import {TokenKeyMap} from "src/config/constants";
import {callFunction, getTokenAllowance, approveContract} from "reblox-web3-utils";
import contracts from "src/config/constants/contracts";
import { useEthers } from "@usedapp/core";
import { CHAIN_ID } from "src/config";
import MainStaking from "src/config/abi/MainStaking.json";
import {formatDecimalToUint, formatUintToDecimal} from "src/utils/formatUtils";
import DoneIcon from "@mui/icons-material/Done";
import {NmilkContext} from "src/contexts/NmilkContext";
import {NbeefContext} from "src/contexts/NbeefContext";
import {NlandContext} from "src/contexts/NlandContext";
import {useReloadPrices} from "src/hooks/useReloadPrices";

interface DoneReinvestingFormProps {
  token: "nmilk" | "nbeef" | "nland";
  previousDeposit: number;
  previousEarnings: number;
}

const DoneReinvestingForm: React.FC<DoneReinvestingFormProps> = ({ token, previousDeposit, previousEarnings }) => {
  const { t } = useTranslation();
  const { reloadPrices } = useReloadPrices();
  const { setModal } = useContext(ModalContext);
  const { nmilkUserDeposited } = useContext(NmilkContext);
  const { nlandUserDeposited } = useContext(NlandContext);
  const { nbeefUserDeposited } = useContext(NbeefContext);

  const [amount, setAmount] = useState<number>();

  const { account, library } = useEthers();

  const depositedTokens = token == "nmilk" ? 
    formatUintToDecimal(nmilkUserDeposited) : token == "nland" ? 
    formatUintToDecimal(nlandUserDeposited) : formatUintToDecimal(nbeefUserDeposited);

  console.log(nmilkUserDeposited,nlandUserDeposited,nbeefUserDeposited);
  console.log(depositedTokens, previousDeposit, previousEarnings)

  return (
    <div className="flex h-84 justify-center items-center flex-col pt-10 pb-20 px-10">
      <div className="w-24 h-24 rounded-full bg-green/[0.3] flex justify-center items-center mb-6">
        <DoneIcon className="fill-green h-12 w-12 m-auto" />
      </div>
      <h3 className="text-blue text-lg text-center font-bold mb-4">
        {t("form.success")}
      </h3>
      <p className="text-blue text-sm text-center px-10">
        {t("done_reinvesting_form.description", {
          amountBought: depositedTokens - previousDeposit,
          amountHarvested: previousEarnings,
          token: upperCase(token),
        })}
      </p>
    </div>
  );
};

export default DoneReinvestingForm;
