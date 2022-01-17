import React from "react";
import {ReactSVG} from "react-svg";

interface RentabilityCardProps {
  title1: string;
  title2: string;
  description?: string;
  subtitle1: string;
  subtitle2: string;
  currentBalance: string;
  containerClasses?: string;
  icon?: string
}

const RentabilityCard: React.FC<RentabilityCardProps> =
  ({
  containerClasses,
  title1,
  title2,
  description,
  subtitle1,
  subtitle2,
  currentBalance,
  icon
}) => {

  return (
    <div className={`flex flex-col items-center w-full rounded-lg border-green border-2 shadow ${containerClasses}`}>
      <div className={`w-full flex flex-col px-10 py-5 border-b-green border-b-2 border-green`}>
        <h3 className="text-blue font-bold text-lg">{title1}</h3>
        <p className="text-blue text-3xl mb-3">500</p>
        <p className="text-blue text-sm">{description}</p>
        <h3 className="text-blue font-bold text-lg mt-3">{subtitle1}</h3>
        <h4 className="text-blue font-bold">48 NMILK por vaca, por mes</h4>
      </div>
      <div className={`w-full flex flex-col px-10 py-5 border-bottom-2 border-green/[.5]`}>
        <h3 className="text-blue font-bold text-lg mb-4">{title2}</h3>
        <div className="h-full flex flex-col justify-evenly mb-4 md:justify-betweenmd:px-7">
          <h3 className="text-green font-semibold text-sm md:text-lg">{currentBalance}</h3>
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
            <p className="text-green font-semibold text-sm md:text-lg">1.3 Vacas</p>
          </div>
      </div>
        <h4 className="text-blue font-bold">{subtitle2}</h4>
        <h3 className="text-green font-bold text-lg">560 NAC</h3>
      </div>
    </div>
  );
}


export default RentabilityCard;