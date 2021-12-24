import React from "react";
import Button from '../Buttons/Button';
import {ReactSVG} from "react-svg";

interface HomeCardSecondaryProps {
  title: string;
  description: string;
  thirdText: string;
  onClickButton?: () => void;
  containerClasses?: string;
  buttonText: string,
  fourthText: string;
  fifthText: string;
  icon?: string;
}

const HomeCardSecondary: React.FC<HomeCardSecondaryProps> = ({
  title,
  description,
  thirdText,
  buttonText,
  onClickButton,
  containerClasses,
  fourthText,
  fifthText,
  icon
}) => {
  return (
    <div className={`min-h-280 flex flex-col w-full rounded-lg border-green/[.5] border-2 shadow ${containerClasses}`}>
      <div className={`flex justify-center items-center w-full p-4 pb-0 md:pb-4`}>
        <div className={`h-full w-3/6 flex flex-col md:p-3 md:mt-3`}>
          <h3 className="text-blue font-semibold mb-3 md:mb-5 md:text-lg">{title}</h3>
          <p className="text-blue text-tiny md:text-base">{description}</p>
        </div>
        <div className={`h-full w-3/6 flex flex-col justify-between px-3`}>
          <h3 className="text-blue text-lg text-3xl mb-5 md:text-5xl text-right">{thirdText}</h3>
        </div>
      </div>
      <div className="flex justify-between items-center w-full md:border-green/[.25] md:border-t-2">
        <div className="h-full w-3/6 flex p-4 flex-col justify-evenly md:justify-betweenmd:px-7 md:p-4">
          <h3 className="text-green font-semibold text-sm md:text-lg">{fourthText}</h3>
          <div className="flex">
            {icon && (
              <ReactSVG
                src={icon}
                beforeInjection={(svg) => {
                  svg.classList.add('fill-green');
                  svg.classList.add('mr-4');
                  svg.classList.add('text-sm');
                  svg.classList.add('md:text-lg');
                }}
              />
            )}
            <p className="text-green font-semibold text-sm md:text-lg">{fifthText}</p>
          </div>
        </div>
        <div className="h-full w-3/6 flex flex-col justify-between md:px-7 p-4">
          <Button text={buttonText} onClick={onClickButton} extraClasses="border-2 border-blue font-bold text-blue py-4 px-0"/>
        </div>
      </div>
    </div>
  );
}


export default HomeCardSecondary;