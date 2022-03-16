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
    <div className={`flex flex-col justify-center items-center w-full rounded-lg bg-lightblue/[.15] p-8 shadow ${containerClasses}`}>
      <h3 className="text-blue font-medium text-center text-lg md:text-3xl">{title}</h3>
      <h2 className="text-green my-3 text-center font-bold text-3xl lg:text-4xl xl:text-5xl" >{mainText}</h2>
      {!onClickButton ? (
        <p className="text-md text-blue text-center px-5 md:my-4 md:px-10">{thirdText}</p>
      ) : (
        <Button text={thirdText} onClick={onClickButton} extraClasses="md:my-4 bg-blue border-blue font-bold text-white px-4 py-4" />
      )}
    </div>
  );
}


export default HomeCardColored;