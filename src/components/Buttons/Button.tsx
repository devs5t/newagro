import { CircularProgress } from "@mui/material";
import React, { ReactNode } from "react";

interface ButtonProps {
  text?: string;
  link?: string;
  onClick?: () => void | undefined;
  extraClasses?: string;
  linkTarget?: string;
  type?: "button" | "submit" | "reset";
  children?: ReactNode;
  isLoading?: boolean;
  disabled?: boolean;
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
  disabled = false
}) => {
  const Content = () => {
    return (
      <button
        className={`inline-block text-sm px-4 py-2 leading-none font-semibold border rounded-full ${extraClasses} ${disabled ? 'disabled opacity-50' : ''}`}
        onClick={isLoading ? () => {} : onClick}
        type={type}
        disabled={disabled}
      >
        {!isLoading && (children || text)}
        {isLoading && <CircularProgress size={10} sx={{ color: "white" }} />}
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
