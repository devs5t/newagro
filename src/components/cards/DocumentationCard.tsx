import React, {ReactNode, useEffect, useState} from "react";
import {ReactSVG} from "react-svg";

interface DocumentationCardProps {
  title: string;
  subtitle?: string;
  link?: string;
  linkText?: () => void;
  linkTarget?: string;
  containerClasses?: string;
  component?: ReactNode,
  currentToken?: string;
}

const DocumentationCard: React.FC<DocumentationCardProps> = ({
   title,
   subtitle,
   link,
   linkText,
   linkTarget= "_self",
   containerClasses,
   component,
   currentToken = 'nmilk',
 }) => {

  const [open, setOpen] = useState(false);
  const [token, setToken] = useState(currentToken);
  if (token !== currentToken) {
    setToken(currentToken);
  }

  useEffect(() => {
    setOpen(false);
  }, [currentToken]);

  return (
    <div className={`flex flex-col w-full rounded-lg bg-lightblue/[.15] p-6 shadow ${containerClasses}`}>
      <div className="w-full flex flex-row cursor-pointer" onClick={() => setOpen(op => !op)}>
        <div className="w-1/2">
          <h3 className="text-blue font-bold font-medium text-lg mr-2">{title}</h3>
          <p className="text-blue text-sm my-3">{subtitle}</p>
        </div>
        <div className="w-1/2 flex flex-col pr-4">
          <a className="text-sm w-full font-bold text-blue text-right underline uppercase" href={link} target={linkTarget}>{linkText}</a>
          <ReactSVG
            src={"icons/arrow.svg"}
            beforeInjection={(svg) => {
              svg.classList.add('fill-blue');
              svg.classList.add('w-4');
              svg.classList.add('float-right');
              svg.classList.add('mt-4');
              svg.classList.add('-rotate-90');
            }}
          />
        </div>
      </div>
      {(open && component) && (
        <div className="w-full py-10 px-4 md:px-20 ">
          {component}
        </div>
      )}
    </div>
  );
}


export default DocumentationCard;