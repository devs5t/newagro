import React from "react";
import Button from '../Buttons/Button';
import CountUp from "react-countup";

interface HomeCardProps {
  title: string;
  description: string;
  amount: number;
  onClickButton?: () => void;
  containerClasses?: string;
  buttonText: string,
}

const HomeCard: React.FC<HomeCardProps> = ({
  title,
  description,
  amount,
  buttonText,
  onClickButton,
  containerClasses
}) => {
  return (
    <div className={`flex justify-center items-center w-full rounded-lg border-green/[.5] border-2 shadow p-4 ${containerClasses}`}>
      <div className={`h-full w-3/6 flex flex-col md:p-3`}>
        <h3 className="text-blue font-bold mb-3 md:mb-5">{title}</h3>
        <p className="text-blue text-tiny md:text-xs">{description}</p>
      </div>
      <div className={`h-full w-3/6 flex flex-col justify-between px-3 items-end`}>
        <CountUp
          className="text-blue text-lg text-3xl text-right md:text-4xl"
          end={amount}
          separator=","
        />
        <Button text={buttonText} onClick={onClickButton} extraClasses="px-2 md:px-0 w-full border-2 border-blue font-bold text-blue py-2 px-0 text-xs" />
      </div>
    </div>
  );
}


export default HomeCard;