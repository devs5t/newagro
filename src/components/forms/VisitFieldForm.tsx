import React, {useContext} from "react";
import {useTranslation} from "react-i18next";
import Button from "src/components/Buttons/Button";
import {ModalContext} from "src/contexts/ModalContext";

const VisitFieldForm: React.FC = () => {

  const {t} = useTranslation();
  const {setModal} = useContext(ModalContext);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }

  return (
    <form className="w-full px-10" onSubmit={onSubmit}>

      <p className="text-blue text-sm mb-6">{t("field_visit_form.description")}</p>

      <div className="flex flex-wrap mb-4">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            className="block tracking-wide text-blue text-xs font-semibold mb-2"
            htmlFor="name"
          >
            {t("field_visit_form.name")}*
          </label>
          <input
            className="appearance-none block w-full border border-blue text-blue rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="name"
            type="text"
            required={true}
          />
        </div>

        <div className="w-full md:w-1/2 px-3">
          <label
            className="block tracking-wide text-blue text-xs font-semibold mb-2"
            htmlFor="lastname"
          >
            {t("field_visit_form.lastname")}*
          </label>
          <input
            className="appearance-none block w-full border border-blue text-blue rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="grid-last-name"
            type="text"
            required={true}
          />
        </div>
      </div>

      <div className="flex flex-wrap mb-4">
        <div className="w-full px-3">
          <label
            className="block tracking-wide text-blue text-xs font-semibold mb-2"
            htmlFor="email"
          >
            {t("field_visit_form.mail")}*
          </label>
          <input
            className="appearance-none block w-full border border-blue text-blue rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="email"
            type="email"
            required={true}
          />
        </div>
      </div>

      <div className="flex flex-wrap mb-4">
        <div className="w-full px-3">
          <label
            className="block tracking-wide text-blue text-xs font-semibold mb-2"
            htmlFor="date"
          >
            {t("field_visit_form.tentative_date")}*
          </label>
          <input
            className="appearance-none block w-full border border-blue text-blue rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="date"
            type="date"
            required={true}
          />
        </div>
      </div>

      <div className="flex justify-around py-6 mb-8">
        <Button
          text={t('form.cancel')}
          extraClasses="bg-white border-blue text-blue text-center h-8 text-xs uppercase"
          type="button"
          onClick={() => setModal(undefined)}
        />
        <Button
          text={t('field_visit_form.submit')}
          extraClasses="bg-blue border-blue text-white text-center h-8 text-xs uppercase"
          type="submit"
        />
      </div>
    </form>
  );
}

export default VisitFieldForm;