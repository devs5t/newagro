import React, {useContext, useMemo, useState} from "react";
import {useTranslation} from "react-i18next";
import Button from "src/components/Buttons/Button";
import {ModalContext} from "src/contexts/ModalContext";
import Textfield from "src/components/Inputs/Textfield";
import DoneIcon from '@mui/icons-material/Done';
import { callFunction } from "reblox-web3-utils";
import {useEthers} from "@usedapp/core";
import contracts from "src/config/constants/contracts";
import {CHAIN_ID} from "src/config";
import {TokenKeyMap} from "src/config/constants";
import {formatDecimalToUint} from "src/utils/formatUtils";
import MainStaking from "src/config/abi/MainStaking.json";
import {useReloadPrices} from "src/hooks/useReloadPrices";

interface NACIssueFormProps {
  token: 'nmilk' | 'nbeef' | 'nland';
  nacEmitted: number;
}

const NACIssueForm: React.FC<NACIssueFormProps> = ({
  token,
  nacEmitted,
}) => {

  const {t} = useTranslation();
  const {setModal} = useContext(ModalContext);
  const { account, library } = useEthers();
  const { reloadPrices } = useReloadPrices();

  const [confirmationPhrase, setConfirmationPhrase] = useState<string>('');
  const [nacToEmmit, setNacToEmmit] = useState<number>(0);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formSent, setFormSent] = useState<boolean>(false);

  const canSubmit: boolean = useMemo(() => {
    if (
      library && account &&
      confirmationPhrase === t("admin.nac_issue.confirmation_phrase") &&
      nacToEmmit
    ) {
      return true;
    }
    return false;
  }, [library, account, confirmationPhrase, nacToEmmit]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    callFunction(
      contracts.mainStaking[CHAIN_ID],
      library,
      [TokenKeyMap[token]?.pId, formatDecimalToUint(nacToEmmit)],
      "setAssetPerMonthPerFullWantToken",
      MainStaking
    )
      .then(() => {
        setFormSent(true);
        reloadPrices();
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  if (formSent) {
    return (
      <div className="flex h-84 justify-center items-center flex-col pt-10 pb-20 px-10">
        <div className="w-24 h-24 rounded-full bg-green/[0.3] flex justify-center items-center mb-6">
          <DoneIcon className="fill-green h-12 w-12 m-auto"/>
        </div>
        <h3 className="text-blue text-lg text-center font-bold mb-4">{t("admin.nac_issue.successfully_sent_title")}</h3>
      </div>
    )
  }

  return (
    <form
      className="w-full px-10"
      onSubmit={onSubmit}
    >
      <p className="text-blue text-sm mb-6">{t("admin.nac_issue.description")}</p>

      <div className="flex flex-col bg-red/[.15] rounded-lg w-full text-center px-4 py-2 mb-6">
        <p className="text-red text-xs mb-4">{t('admin.nac_issue.warning_title')}</p>
        <p className="text-red text-xs">{t('admin.nac_issue.warning_description')}</p>
      </div>

      <div className="px-0">

        <p className="flex justify-center text-blue text-sm mb-2">
          {t("admin.nac_issue.confirmation_phrase_aux", {confirmationPhrase: t("admin.nac_issue.confirmation_phrase")})}
        </p>
        <Textfield
          id="confirmation_phrase"
          onChange={setConfirmationPhrase}
          value={confirmationPhrase}
          required={true}
          type="text"
          containerClasses="mb-6"
        />

        <div className="flex flex-wrap mb-6">
          <Textfield
            id="nacEmitted"
            label={t("admin.nac_issue.actual_issue")}
            onChange={console.log}
            value={nacEmitted}
            type="number"
            containerClasses="md:w-1/2 mb-6 md:mb-0 pr-0 md:pr-3"
            disabled={true}
          />
          <Textfield
            id="nacToEmmit"
            label={t("admin.nac_issue.new_issue")}
            onChange={setNacToEmmit}
            value={nacToEmmit}
            required={true}
            type="number"
            containerClasses="md:w-1/2 mb-6 md:mb-0 pr-0 md:pr-3"
          />
        </div>

        <div className="flex justify-around py-6 mb-8">
          <Button
            text={t('form.cancel')}
            extraClasses="h-10 bg-white border-blue text-blue text-center h-8 text-xs uppercase w-full mr-3"
            type="button"
            onClick={() => setModal(undefined)}
          />
          <Button
            text={t('admin.nac_issue.submit')}
            extraClasses="h-10 bg-blue border-blue text-white text-center h-8 text-xs uppercase w-full ml-3"
            disabled={!canSubmit}
            type="submit"
            isLoading={isLoading}
          />
        </div>
      </div>
    </form>
  );
}

export default NACIssueForm;