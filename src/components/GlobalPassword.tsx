import React, {useState} from "react";
import {useLocalStorage} from "react-use";
import Button from "src/components/Buttons/Button";
import {useTranslation} from "react-i18next";
import Textfield from "src/components/Inputs/Textfield";

const GlobalPassword: React.FC = () => {
  const {t} = useTranslation();
  const [, setLocalStoragePassword] = useLocalStorage("password", '');
  const globalPassword = String(import.meta.env.VITE_APP_GLOBAL_PASSWORD);

  const [password, setPassword] = useState<string>('');
  const [wrongPassword, setWrongPassword] = useState<boolean>(false);

  const onSubmit = (e: any) => {
    e.preventDefault();
    if (globalPassword !== password) {
      setWrongPassword(true);
      setInterval(() => setWrongPassword(false), 3000);
      return;
    }
    setLocalStoragePassword(password);
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-lightgray flex sm:items-center justify-center pt-5 px-2 sm:p-0 -mt-16">
      <div className="flex flex-col">
        <div className="flex justify-center mb-8">
          <img
            className="h-8 w-auto"
            src="logos/logo.svg"
            alt="logo"
          />
        </div>
        <form className="flex flex-col" onSubmit={onSubmit}>
          <Textfield
            id="name"
            label={t("global_password.password_label")}
            onChange={setPassword}
            value={password}
            required={true}
            containerClasses="w-full"
            type="password"
          />
          {wrongPassword && (
            <p className="text-xs mt-2 text-red">{t('global_password.wrong_password')}</p>
          )}
          <Button
            text={t('global_password.submit')}
            extraClasses="h-10 bg-blue border-blue text-white text-center text-xs uppercase w-full mt-6"
            type="submit"
          />
        </form>
      </div>
    </div>
  )
}

export default GlobalPassword