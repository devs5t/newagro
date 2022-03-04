import React, {ReactNode} from "react";
import {Link} from "react-router-dom";

interface ButtonProps {
  text?: string;
  link?: string;
  onClick?: () => void | undefined;
  extraClasses?: string;
  linkTarget?: string;
  type?: 'button' | 'submit' | 'reset'
  children?: ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  text,
  link,
  onClick = () => {},
  extraClasses,
  linkTarget,
  type = 'button',
  children
}) => {
  const Content = () => {
    return (
      <button
        className={`inline-block text-sm px-4 py-2 leading-none font-semibold border rounded-full ${extraClasses}`}
        onClick={onClick}
        type={type}
      >
        {children || text}
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