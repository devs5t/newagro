import React from "react";
import Button from '../Buttons/Button';

interface HomeCardSecondaryProps {
  title: string;
  description: string;
  thirdText: string;
  onClickButton?: () => void;
  containerClasses?: string;
  buttonText: string,
  fourthText: string;
  fifthText: string;
}

const HomeCardSecondary: React.FC<HomeCardSecondaryProps> =
  ({
     title,
     description,
     thirdText,
     buttonText,
     onClickButton,
     containerClasses,
     fourthText,
     fifthText,
   }) => {

    return (
      <div className={`min-h-280 flex flex-col w-full rounded-lg border-green/[.5] border-2 shadow ${containerClasses}`}>
        <div className={`flex justify-center items-center w-full p-4`}>
          <div className={`h-full w-3/6 flex flex-col p-3 mt-3`}>
            <h3 className="text-blue text-lg font-semibold mb-5">{title}</h3>
            <p className="text-blue" >{description}</p>
          </div>
          <div className={`h-full w-3/6 flex flex-col justify-between px-3`}>
            <h3 className="text-blue text-lg text-5xl mb-5 text-right">{thirdText}</h3>
          </div>
        </div>
        <div className={`flex justify-between items-center w-full border-green/[.25] border-t-2`}>
          <div className={`h-full w-3/6 flex flex-col justify-between px-7 p-4`}>
            <h3 className="text-green font-semibold text-lg">{fourthText}</h3>
            <p className="text-green font-semibold text-lg">{fifthText}</p>
          </div>
          <div className={`h-full w-2/6 flex flex-col justify-between px-7 p-4`}>
            <Button text={buttonText} onClick={onClickButton} extraClasses="border-2 border-blue font-bold text-blue py-4 px-0" />
          </div>
        </div>
      </div>
    );
  }


export default HomeCardSecondary;