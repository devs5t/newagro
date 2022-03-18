import React, {useContext, useMemo, useState} from "react";
import { useTranslation } from "react-i18next";
import Button from "src/components/Buttons/Button";
import { ModalContext } from "src/contexts/ModalContext";
import Textfield from "src/components/Inputs/Textfield";
import { Slider } from "@mui/material";
import { upperCase } from "lodash";
import {
  NMILK_POOL_ID,
  NBEEF_POOL_ID,
  NLAND_POOL_ID,
} from "src/config/constants";
import {
  callFunction,
} from "reblox-web3-utils";
import contracts from "src/config/constants/contracts";
import { useEthers } from "@usedapp/core";
import { CHAIN_ID } from "src/config";
import MainStaking from "src/config/abi/MainStaking.json";
import { formatDecimalToUint } from "src/utils/formatUtils";
import DoneIcon from "@mui/icons-material/Done";
import {NmilkContext} from "src/contexts/NmilkContext";
import {NlandContext} from "src/contexts/NlandContext";
import {NbeefContext} from "src/contexts/NbeefContext";

interface WithdrawTokenFormProps {
  token: "nmilk" | "nbeef" | "nland";
}

const WithdrawTokenForm: React.FC<WithdrawTokenFormProps> = ({ token }) => {
  const { t } = useTranslation();
  const { setModal } = useContext(ModalContext);
  const { nmilkUserAssets } = useContext(NmilkContext);
  const { nlandUserAssets } = useContext(NlandContext);
  const { nbeefUserAssets } = useContext(NbeefContext);

  const [amount, setAmount] = useState<number>();
  const [formSent, setFormSent] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { library } = useEthers();

  const tokenKeyMap = {
    nmilk: {
      pId: NMILK_POOL_ID,
      asset: "nmilkUserDeposited",
      contract: contracts.nmilk[CHAIN_ID],
    },
    nbeef: {
      pId: NBEEF_POOL_ID,
      asset: "nbeefUserDeposited",
      contract: contracts.nmilk[CHAIN_ID],
    },
    nland: {
      pId: NLAND_POOL_ID,
      asset: "nlandUserDeposited",
      contract: contracts.nmilk[CHAIN_ID],
    },
  };

  const availableTokens = useMemo(() => {
    switch (token) {
      case "nmilk":
        return nmilkUserAssets;
      case "nland":
        return nlandUserAssets;
      case "nbeef":
        return nbeefUserAssets;
    }
  }, [token, nmilkUserAssets, nlandUserAssets, nbeefUserAssets]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    callFunction(
      contracts.mainStaking[CHAIN_ID],
      library,
      [tokenKeyMap[token]?.pId, formatDecimalToUint(amount)],
      "withdraw",
      MainStaking
    )
      .then(() => {
        setFormSent(true);
      })
      .finally(() => setIsLoading(false));
  };


  const onMax = () => {
    setAmount(availableTokens)
  }

  const onChange = (value: number) => {
    if (value > availableTokens) {
      setAmount(availableTokens);
    } else {
      setAmount(value);
    }
  };

  const handleSlide = (event: Event, newValue: number) => {
    setAmount((availableTokens * newValue) / 100);
  };

  if (formSent) {
    return (
      <div className="flex h-84 justify-center items-center flex-col pt-10 pb-20">
        <div className="w-24 h-24 rounded-full bg-green/[0.3] flex justify-center items-center mb-6">
          <DoneIcon className="fill-green h-12 w-12 m-auto" />
        </div>
        <h3 className="text-blue text-lg text-center font-bold mb-4">
          {t("form.success")}
        </h3>
        <p className="text-blue text-sm text-center px-10">
          {t("withdraw_token_form.warning_description", {
            amount,
            token: upperCase(token),
          })}
        </p>
      </div>
    );
  }

  return (
    <form className="w-full px-10" onSubmit={onSubmit}>
      <div className="px-0 md:px-10">
        <div className="flex flex-row justify-between items-end mt-8">
          <Textfield
            id="amount"
            label={t("withdraw_token_form.amount")}
            onChange={onChange}
            value={amount}
            required={true}
            type="number"
            placeholder="0.00000"
          />
          <Button
            onClick={onMax}
            text="MAX"
            extraClasses="h-12 ml-2 w-24 -mb-0.25 rounded-md text-white bg-blue text-lg font-normal"
          />
        </div>

        <p className="text-sm text-blue mt-2">
          *{availableTokens} {upperCase(token)} {t("withdraw_token_form.available")}
        </p>

        <Slider
          defaultValue={0}
          aria-label="Default"
          valueLabelDisplay="auto"
          color="secondary"
          className="text-green mt-6"
          valueLabelFormat={(value) => `${value}%`}
          onChange={handleSlide}
          marks={[
            {
              value: 0,
              label: "0%",
            },
            {
              value: 100,
              label: "100%",
            },
          ]}
        />

        <div className="flex justify-around py-6 mb-8">
          <Button
            text={t("form.cancel")}
            extraClasses="h-10 bg-white border-blue text-blue text-center h-8 text-xs uppercase w-full mr-3"
            type="button"
            onClick={() => setModal(undefined)}
          />
          <Button
            isLoading={isLoading}
            text={`${t("withdraw_token_form.withdraw")} ${upperCase(token)}`}
            extraClasses="h-10 bg-blue border-blue text-white text-center h-8 text-xs uppercase w-full ml-3"
            type="submit"
          />
        </div>
      </div>
    </form>
  );
};

export default WithdrawTokenForm;
