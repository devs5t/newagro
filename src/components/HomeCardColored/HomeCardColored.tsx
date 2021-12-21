import React from "react";
import Button from '../Buttons/Button';

interface HomeCardColoredProps {
  title: string;
  mainText: string;
  thirdText: string;
  onClickButton?: () => void;
  containerClasses?: string;
}

const HomeCardColored: React.FC<HomeCardColoredProps> = ({
  title,
  mainText,
  thirdText,
  onClickButton,
  containerClasses
}) => {

  return (
    <div className={`flex flex-col justify-center items-center w-full rounded-lg bg-lightblue/[.15] p-8 ${containerClasses}`}>
      <h3 className="text-blue text-3xl">{title}</h3>
      <h2 className="text-green font-bold text-6xl" >{mainText}</h2>
      {!onClickButton ? (
        <p className="text-md text-blue text-center my-4">{thirdText}</p>
      ) : (
        <Button text={thirdText} onClick={onClickButton} extraClasses="bg-blue border-blue font-bold text-white py-4" />
      )}
    </div>
  );
}


export default HomeCardColored;