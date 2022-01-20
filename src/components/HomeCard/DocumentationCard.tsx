import React from "react";
import {ReactSVG} from "react-svg";

interface DocumentationCardProps {
  title: string;
  subtitle?: string;
  link: string;
  linkText?: () => void;
  containerClasses?: string;
}

const DocumentationCard: React.FC<DocumentationCardProps> = ({
   title,
   subtitle,
   link,
   linkText,
   containerClasses
 }) => {

  return (
    <div className={`flex flex-row w-full rounded-lg bg-lightblue/[.15] p-4 shadow ${containerClasses}`}>
      <div className="w-1/2">
        <h3 className="text-blue text-xl font-bold font-medium text-lg md:text-2xl mr-2">{title}</h3>
        <p className="text-blue my-3" >{subtitle}</p>
      </div>
      <div className="w-1/2 flex flex-col">
        <a className="text-sm w-full font-bold text-blue text-right underline" href={link} >{linkText}</a>
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
  );
}


export default DocumentationCard;