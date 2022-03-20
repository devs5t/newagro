import React, {useContext, useState} from "react";
import {useTranslation} from "react-i18next";
import Button from "src/components/Buttons/Button";
import {ModalContext} from "src/contexts/ModalContext";
import Textfield from "src/components/Inputs/Textfield";
import DoneIcon from '@mui/icons-material/Done';

const VisitFieldForm: React.FC = () => {

  const {t} = useTranslation();
  const {setModal} = useContext(ModalContext);

  const [name, setName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [date, setDate] = useState<string>('');
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
        "form-name": "visit-field",
        name,
        lastName,
        email,
        date
      }),
    })
      .then(() => setFormSent(true))
      .catch((error) => alert(error));
  }

  if (formSent) {
    return (
      <div className="flex h-84 justify-center items-center flex-col pt-10 pb-20">
        <div className="w-24 h-24 rounded-full bg-green/[0.3] flex justify-center items-center mb-6">
          <DoneIcon className="fill-green h-12 w-12 m-auto"/>
        </div>
        <h3 className="text-blue text-lg text-center font-bold mb-4">{t("field_visit_form.successfully_sent_title")}</h3>
        <p className="text-blue text-sm text-center">{t("field_visit_form.successfully_sent_description")}</p>
      </div>
    )
  }

  return (
    <form
      className="w-full px-10"
      onSubmit={onSubmit}
      name="visit-field"
      method="POST"
      data-netlify="true"
    >
      <input
        type="hidden"
        name="form-name"
        value="visit-field"
      />

      <p className="text-blue text-sm mb-6">{t("field_visit_form.description")}</p>

      <div className="px-0">
        <div className="flex flex-wrap mb-6">
          <Textfield
            id="name"
            label={t("field_visit_form.name")}
            onChange={setName}
            value={name}
            required={true}
            containerClasses="md:w-1/2 mb-6 md:mb-0 pr-0 md:pr-3"
            type="text"
          />
          <Textfield
            id="name"
            label={t("field_visit_form.lastname")}
            onChange={setLastName}
            value={lastName}
            required={true}
            containerClasses="md:w-1/2 mb-6 md:mb-0 pl-0 md:pl-3"
            type="text"
          />
        </div>

        <Textfield
          id="email"
          label={t("field_visit_form.mail")}
          onChange={setEmail}
          value={email}
          required={true}
          type="email"
          containerClasses="mb-6"
        />

        <Textfield
          id="date"
          label={t("field_visit_form.tentative_date")}
          onChange={setDate}
          value={date}
          required={true}
          type="date"
          containerClasses="mb-6"
        />

        <div className="flex justify-around py-6 mb-8">
          <Button
            text={t('form.cancel')}
            extraClasses="h-10 bg-white border-blue text-blue text-center h-8 text-xs uppercase w-full mr-3"
            type="button"
            onClick={() => setModal(undefined)}
          />
          <Button
            text={t('field_visit_form.submit')}
            extraClasses="h-10 bg-blue border-blue text-white text-center h-8 text-xs uppercase w-full ml-3"
            type="submit"
          />
        </div>
      </div>
    </form>
  );
}

export default VisitFieldForm;