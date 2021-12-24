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
      <div className={`h-full w-3/6 flex flex-col md:p-3 md:mt-3`}>
        <h3 className="text-blue font-semibold mb-3 md:mb-5 md:text-lg md:text-lg">{title}</h3>
        <p className="text-blue text-tiny md:text-base">{description}</p>
      </div>
      <div className={`h-full w-3/6 flex flex-col justify-between px-3 items-end`}>
        <h3 className="text-blue text-lg text-3xl mb-5 text-right md:text-5xl">{thirdText}</h3>
        <Button text={buttonText} onClick={onClickButton} extraClasses="px-2 md:px-0 w-full border-2 border-blue font-bold text-blue py-4 px-0" />
      </div>
    </div>
  );
}


export default HomeCard;