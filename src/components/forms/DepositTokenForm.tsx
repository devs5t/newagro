import React, {useContext, useState} from "react";
import {useTranslation} from "react-i18next";
import Button from "src/components/Buttons/Button";
import {ModalContext} from "src/contexts/ModalContext";
import Textfield from "src/components/Inputs/Textfield";
import {Warning as WarningIcon} from '@mui/icons-material';
import {Slider} from "@mui/material";
import {upperCase} from "lodash";

interface DepositTokenFormProps {
  token: 'nmilk' | 'nbeef' | 'nland',
}

const DepositTokenForm: React.FC<DepositTokenFormProps> = ({
  token
}) => {

  const {t} = useTranslation();
  const {setModal} = useContext(ModalContext);

  const [amount, setAmount] = useState<number>();
  const [availableTokens, setAvailableTokens] = useState<number>(5567);
  const [formSent, setFormSent] = useState<boolean>(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setFormSent(true);
    e.preventDefault();
  }

  if (formSent) {
    return (
      <div className="flex h-84 justify-center items-center flex-col pt-10 pb-20">
        <div className="w-24 h-24 rounded-full bg-yellow/[0.3] flex justify-center items-center mb-6">
          <WarningIcon className="fill-yellow h-12 w-12 m-auto"/>
        </div>
        <h3 className="text-blue text-lg text-center font-bold mb-4">{t("form.warning")}</h3>
        <p className="text-blue text-sm text-center px-10">{t("deposit_token_form.warning_description", {token: upperCase(token)})}</p>
      </div>
    )
  }

  return (
    <form className="w-full px-10" onSubmit={onSubmit}>

      <div className="px-0 md:px-10">
        <div className="flex flex-row justify-between items-end mt-8">
          <Textfield
            id="amount"
            label={t("deposit_token_form.amount")}
            onChange={setAmount}
            value={amount}
            required={true}
            type="number"
            placeholder="0.00000"
          />
          <Button text="MAX" extraClasses="h-12 ml-2 w-24 -mb-0.25 rounded-md text-white bg-blue text-lg font-normal" />
        </div>

        <p className="text-sm text-blue mt-2">*{availableTokens} {token} {t('deposit_token_form.available')}</p>

        <Slider
          defaultValue={50}
          aria-label="Default"
          valueLabelDisplay="auto"
          color="secondary"
          className="text-green mt-6"
          valueLabelFormat={(value) => `${value}%`}
          marks={[
            {
              value: 0,
              label: '0%',
            },
            {
              value: 100,
              label: '100%',
            }
          ]}
        />

        <div className="flex justify-around py-6 mb-8">
          <Button
            text={t('form.cancel')}
            extraClasses="h-10 bg-white border-blue text-blue text-center h-8 text-xs uppercase w-full mr-3"
            type="button"
            onClick={() => setModal(undefined)}
          />
          <Button
            text={`${t('deposit_token_form.deposit')} ${upperCase(token)}`}
            extraClasses="h-10 bg-blue border-blue text-white text-center h-8 text-xs uppercase w-full ml-3"
            type="submit"
          />
        </div>
      </div>
    </form>
  );
}

export default DepositTokenForm;