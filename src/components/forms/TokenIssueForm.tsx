import React, {useContext, useMemo, useState} from "react";
import {useTranslation} from "react-i18next";
import Button from "src/components/Buttons/Button";
import {ModalContext} from "src/contexts/ModalContext";
import Textfield from "src/components/Inputs/Textfield";
import DoneIcon from '@mui/icons-material/Done';
import {upperCase} from "lodash";
import { callFunction } from "reblox-web3-utils";
import {useEthers} from "@usedapp/core";
import {TokenKeyMap} from "src/config/constants";
import {formatDecimalToUint} from "src/utils/formatUtils";
import {useReloadPrices} from "src/hooks/useReloadPrices";

interface TokenIssueFormProps {
  token: 'nmilk' | 'nbeef' | 'nland';
  tokenEmitted: number;
}

const TokenIssueForm: React.FC<TokenIssueFormProps> = ({
  token,
  tokenEmitted
}) => {

  const {t} = useTranslation();
  const {setModal} = useContext(ModalContext);
  const { account, library } = useEthers();
  const { reloadPrices } = useReloadPrices();

  const [confirmationPhrase, setConfirmationPhrase] = useState<string>('');
  const [tokensToEmmit, setTokensToEmmit] = useState<number>(0);
  const [links, setLinks] = useState<string[]>(['', '', '']);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formSent, setFormSent] = useState<boolean>(false);

  const canSubmit: boolean = useMemo(() => {
    if (
      library && account &&
      confirmationPhrase === t("admin.token_issue.confirmation_phrase", {token: upperCase(token)}) &&
      tokensToEmmit
    ) {
      return true;
    }
    return false;
  }, [library, account, confirmationPhrase, tokensToEmmit]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    callFunction(
      TokenKeyMap[token]?.contract,
      library,
      [account, formatDecimalToUint(tokensToEmmit), links[0], links[1], links[2]],
      "mint",
      TokenKeyMap[token]?.abi
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
        <h3 className="text-blue text-lg text-center font-bold mb-4">{t("admin.token_issue.successfully_sent_title", {token: upperCase(token)})}</h3>
      </div>
    )
  }

  return (
    <form
      className="w-full px-10"
      onSubmit={onSubmit}
    >
      <p className="text-blue text-sm mb-6">{t("admin.token_issue.description", {token: upperCase(token)})}</p>

      <div className="flex flex-col bg-red/[.15] rounded-lg w-full text-center px-4 py-2 mb-6">
        <p className="text-red text-xs mb-4">{t('admin.token_issue.warning_title')}</p>
        <p className="text-red text-xs">{t('admin.token_issue.warning_description')}</p>
      </div>

      <div className="px-0">

        <p className="flex justify-center text-blue text-sm mb-2">
          {t("admin.token_issue.confirmation_phrase_aux", {confirmationPhrase: t("admin.token_issue.confirmation_phrase", {token: upperCase(token)})})}
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
            id="tokenEmitted"
            label={t("admin.token_issue.total_issue")}
            onChange={console.log}
            value={tokenEmitted}
            type="number"
            containerClasses="md:w-1/2 mb-6 md:mb-0 pr-0 md:pr-3"
            disabled={true}
          />
          <Textfield
            id="tokenToEmmit"
            label={t("admin.token_issue.new_issue")}
            onChange={setTokensToEmmit}
            value={tokensToEmmit}
            required={true}
            type="number"
            containerClasses="md:w-1/2 mb-6 md:mb-0 pr-0 md:pr-3"
          />
        </div>

        {[1, 2, 3].map((index: number, key: number) => (
          <Textfield
            key={key}
            id={`link-${index}`}
            label={t("admin.token_issue.link_new_issue", {index})}
            onChange={(value: string) => {
              setLinks(prevLinks => {
                return prevLinks.map((link: string, linkKey: number) => {
                  if (linkKey === key) {
                    return value;
                  }
                  return link;
                })
              })
            }}
            value={links[key]}
            required={false}
            type="url"
            containerClasses="mb-6"
          />
        ))}

        <div className="flex justify-around py-6 mb-8">
          <Button
            text={t('form.cancel')}
            extraClasses="h-10 bg-white border-blue text-blue text-center h-8 text-xs uppercase w-full mr-3"
            type="button"
            onClick={() => setModal(undefined)}
          />
          <Button
            text={t('admin.token_issue.submit')}
            extraClasses="h-10 bg-blue border-blue text-white text-center h-8 text-xs uppercase w-full ml-3"
            disabled={!canSubmit}
            isLoading={isLoading}
            type="submit"
          />
        </div>
      </div>
    </form>
  );
}

export default TokenIssueForm;