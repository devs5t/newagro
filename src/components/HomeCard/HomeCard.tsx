import React from "react";
import Button from '../Buttons/Button';

interface HomeCardProps {
  title: string;
  description: string;
  thirdText: string;
  onClickButton?: () => void;
  containerClasses?: string;
  buttonText: string,
}

const HomeCard: React.FC<HomeCardProps> =
  ({
  title,
  description,
  thirdText,
  buttonText,
  onClickButton,
  containerClasses
}) => {

  return (
    <div className={`min-h-280 flex justify-center items-center w-full rounded-lg border-green/[.5] border-2 shadow p-4 ${containerClasses}`}>
      <div className={`h-full w-3/6 flex flex-col p-3  mt-3`}>
        <h3 className="text-blue text-lg font-semibold mb-5">{title}</h3>
        <p className="text-blue" >{description}</p>
      </div>
      <div className={`h-full w-3/6 flex flex-col justify-between px-3 items-end`}>
        <h3 className="text-blue text-lg text-5xl mb-5 text-right">{thirdText}</h3>
        <Button text={buttonText} onClick={onClickButton} extraClasses=" w-4/6 border-2 border-blue font-bold text-blue py-4 px-0" />

      </div>
    </div>
  );
}


export default HomeCard;