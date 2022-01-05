import React, {useContext, useState} from "react";
import {useTranslation} from "react-i18next";
import Button from "src/components/Buttons/Button";
import {ModalContext} from "src/contexts/ModalContext";
import Textfield from "src/components/Inputs/Textfield";

const VisitFieldForm: React.FC = () => {

  const {t} = useTranslation();
  const {setModal} = useContext(ModalContext);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }

  const [name, setName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [date, setDate] = useState<string>('');

  return (
    <form className="w-full px-10" onSubmit={onSubmit}>

      <p className="text-blue text-sm mb-6">{t("field_visit_form.description")}</p>

      <div className="px-0 md:px-10">
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