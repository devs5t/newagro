import React from "react";
import Button from '../Buttons/Button';
import CountUp from "react-countup";

interface HomeCardColoredProps {
  title: string;
  amount: number;
  currency: string;
  subtitle?: string;
  onClickButton?: () => void;
  containerClasses?: string;
}

const HomeCardColored: React.FC<HomeCardColoredProps> = ({
  title,
  amount,
  currency,
  subtitle,
  onClickButton,
  containerClasses
}) => {

  return (
    <div className={`flex flex-col justify-center items-center w-full rounded-lg bg-lightblue/[.15] p-8 shadow ${containerClasses}`}>
      <h3 className="text-blue font-medium text-center text-lg md:text-2xl">{title}</h3>
      <CountUp
        className="text-green my-3 text-center font-bold text-3xl md:text-4xl font-extrabold"
        prefix={`${currency} `}
        end={amount}
        decimals={2}
        separator=","
        decimal="."
        preserveValue={true}
      />
      {!onClickButton ? (
        <p className="text-blue text-center px-5 md:my-4 md:px-10 text-sm">{subtitle}</p>
      ) : (
        <Button text={subtitle} onClick={onClickButton} extraClasses="md:my-4 bg-blue border-blue font-bold text-white px-4 py-4" />
      )}
    </div>
  );
}


export default HomeCardColored;