import React, {useContext, useState} from "react";
import {useTranslation} from "react-i18next";
import Button from "src/components/Buttons/Button";
import {ModalContext} from "src/contexts/ModalContext";
import Textfield from "src/components/Inputs/Textfield";
import DoneIcon from '@mui/icons-material/Done';
import {upperCase} from "lodash";

interface ExchangeARSFormProps {
  tab: 'buy' | 'sell';
  token: 'nac' | 'nmilk' | 'nbeef' | 'nland';
  amount: number;
  price: number;
}

const ExchangeARSForm: React.FC<ExchangeARSFormProps> = ({
  tab,
  token,
  amount,
  price
}) => {

  const {t} = useTranslation();
  const {setModal} = useContext(ModalContext);

  const [name, setName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [dni, setDni] = useState<number>();
  const [phone, setPhone] = useState<string>('');

  const [formSent, setFormSent] = useState<boolean>(false);

  const encode = (data: any) => {
    return Object.keys(data)
      .map(
        (key) =>
          encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
      )
      .join("&");
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": "purchase-or-sale-with-ars",
        type: tab,
        name,
        lastName,
        email,
        dni,
        phone
      }),
    })
      .then(() => setFormSent(true))
      .catch((error) => alert(error));
  }

  if (formSent) {
    return (
      <div className="flex h-84 justify-center items-center flex-col pt-10 pb-20 px-10">
        <div className="w-24 h-24 rounded-full bg-green/[0.3] flex justify-center items-center mb-6">
          <DoneIcon className="fill-green h-12 w-12 m-auto"/>
        </div>
        <h3 className="text-blue text-lg text-center font-bold mb-4">{t("exchange_ars_form.successfully_sent_title")}</h3>
        <p className="text-blue text-sm text-center">{t("exchange_ars_form.successfully_sent_description", {tab: t(`exchange_ars_form.${tab}`)})}</p>
      </div>
    )
  }

  return (
    <form
      className="w-full px-10"
      onSubmit={onSubmit}
      name="purchase-or-sale-with-ars"
      method="POST"
      data-netlify="true"
    >
      <input
        type="hidden"
        name="form-name"
        value="purchase-or-sale-with-ars"
      />

      <input
        type="hidden"
        name="type"
        value={tab}
      />

      <p className="text-blue text-sm mb-6">{t("exchange_ars_form.description")}</p>

      <div className="px-0">
        <div className="flex flex-wrap mb-6">
          <Textfield
            id="name"
            label={t("exchange_ars_form.name")}
            onChange={setName}
            value={name}
            required={true}
            containerClasses="md:w-1/2 mb-6 md:mb-0 pr-0 md:pr-3"
            type="text"
          />
          <Textfield
            id="name"
            label={t("exchange_ars_form.lastname")}
            onChange={setLastName}
            value={lastName}
            required={true}
            containerClasses="md:w-1/2 mb-6 md:mb-0 pl-0 md:pl-3"
            type="text"
          />
        </div>

        <Textfield
          id="email"
          label={t("exchange_ars_form.mail")}
          onChange={setEmail}
          value={email}
          required={true}
          type="email"
          containerClasses="mb-6"
        />

        <div className="flex flex-wrap mb-6">
          <Textfield
            id="dni"
            label={t("exchange_ars_form.dni")}
            onChange={setDni}
            value={dni}
            required={true}
            containerClasses="md:w-1/2 mb-6 md:mb-0 pr-0 md:pr-3"
            type="number"
          />
          <Textfield
            id="phone"
            label={t("exchange_ars_form.phone")}
            onChange={setPhone}
            value={phone}
            required={true}
            containerClasses="md:w-1/2 mb-6 md:mb-0 pl-0 md:pl-3"
            type="text"
          />
        </div>

        <Textfield
          id="token"
          label={t("exchange_ars_form.token")}
          onChange={console.log}
          value={upperCase(token)}
          required={true}
          type="text"
          containerClasses="mb-6"
          disabled={true}
        />

        <Textfield
          id="amount"
          label={t("exchange_ars_form.amount")}
          onChange={console.log}
          value={amount}
          required={true}
          type="number"
          containerClasses="mb-6"
          disabled={true}
        />

        {(price > 0) && (
          <Textfield
            id="price"
            label={t("exchange_ars_form.price")}
            onChange={console.log}
            value={price}
            required={true}
            type="number"
            containerClasses="mb-6"
            disabled={true}
          />
        )}

        <div className="flex justify-around py-6 mb-8">
          <Button
            text={t('form.cancel')}
            extraClasses="h-10 bg-white border-blue text-blue text-center h-8 text-xs uppercase w-full mr-3"
            type="button"
            onClick={() => setModal(undefined)}
          />
          <Button
            text={t('exchange_ars_form.submit', {tab: t(`exchange_ars_form.${tab}`)})}
            extraClasses="h-10 bg-blue border-blue text-white text-center h-8 text-xs uppercase w-full ml-3"
            type="submit"
          />
        </div>
      </div>
    </form>
  );
}

export default ExchangeARSForm;