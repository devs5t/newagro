import React from "react";
import {Link} from "react-router-dom";

interface ButtonProps {
  text: string;
  link?: string;
  onClick?: () => void | undefined;
  extraClasses?: string;
  linkTarget?: string;
}

const Button: React.FC<ButtonProps> = ({
  text,
  link,
  onClick = () => {},
  extraClasses,
  linkTarget
}) => {
  const Content = () => {
    return (
      <button
        className={`inline-block text-sm px-4 py-2 leading-none font-semibold border rounded-full ${extraClasses}`}
        onClick={onClick}
      >
        {text}
      </button>
    );
  };

  if (link)  {
    return (
      <Link to={link} target={linkTarget || '_self'}>
        <Content/>
      </Link>
    )
  }

  return <Content />
}

export default Button;