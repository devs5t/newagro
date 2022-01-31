import React from "react";
import {ReactSVG} from "react-svg";

interface AdminCardProps {
  title: string;
  quantity?: number;
  containerClasses?: string;
}



const AdminCard: React.FC<AdminCardProps> = ({
     title,
     quantity,
     containerClasses,
   }) => {
  return (
    <div className={`flex flex-col w-full rounded-lg bg-lightblue/[.15] py-8 px-4 md:p-8 shadow ${containerClasses}`}>
      <div className="w-full flex flex-row">
        <div className="w-2/3 md:w-1/2">
          <h3 className="text-blue text-xl font-bold font-medium text-lg md:text-2xl mr-2">{title}</h3>
        </div>
        <div className="w-1/3 md:w-1/2 flex flex-col md:flex-row justify-end md:justify-around">
          <p className="text-blue my-3 text-lg text-center lg:text-2xl xl:text-4xl" > Actual: {quantity}</p>
          <div className="flex flex-col pointer w-12 justify-end r-0">
            <ReactSVG
              src={"icons/edit.svg"}
              beforeInjection={(svg) => {
                svg.classList.add('fill-blue');
                svg.classList.add('w-6');
                svg.classList.add('mt-4');
                svg.classList.add('mr-2');
                svg.classList.add('text-lg');
              }}
            />
            <span className="text-blue underline">Editar</span>
          </div>
        </div>
      </div>
    </div>
  );
}


export default AdminCard;