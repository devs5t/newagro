import { CircularProgress } from "@mui/material";
import React, {ReactNode, useContext, useMemo} from "react";
import {useEthers} from "@usedapp/core";
import {ModalContext} from "src/contexts/ModalContext";
import NoWallet from "src/components/forms/NoWallet";
import {useTranslation} from "react-i18next";

interface ButtonProps {
  text?: string;
  link?: string;
  onClick?: (e: any) => void | undefined;
  extraClasses?: string;
  linkTarget?: string;
  type?: "button" | "submit" | "reset";
  children?: ReactNode;
  isLoading?: boolean;
  isLoadingColor?: string;
  disabled?: boolean;
  needWallet?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  text,
  link,
  onClick = () => {},
  extraClasses,
  linkTarget,
  type = "button",
  children,
  isLoading = false,
  isLoadingColor = 'white',
  disabled = false,
  needWallet= false
}) => {
  const {account} = useEthers();
  const {setModal} = useContext(ModalContext);
  const {t} = useTranslation();

  const handleOnClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (isLoading || (disabled && !needWallet)) {
      e.preventDefault();
      return;
    }

    if (needWallet && !account) {
      e.preventDefault();
      setModal({
        component: NoWallet,
        title: t("no_wallet.title"),
      });
      return;
    }

    onClick(e);
  };

  const isDisabled: boolean = useMemo(() => {
    if (needWallet && !account) {
      return false;
    }
    return disabled;
  }, [disabled, needWallet, account]);

  const Content = () => {
    return (
      <button
        className={`inline-block text-sm px-4 py-2 leading-none font-semibold border rounded-full ${extraClasses} ${isDisabled ? 'disabled opacity-50' : ''}`}
        onClick={handleOnClick}
        type={type}
        disabled={isDisabled}
      >
        {!isLoading && (children || text)}
        {isLoading && <CircularProgress size={10} sx={{ color: isLoadingColor }} />}
      </button>
    );
  };

  if (link) {
    return (
      <a href={link} target={linkTarget || "_self"}>
        <Content />
      </a>
    );
  }

  return <Content />;
};

export default Button;
