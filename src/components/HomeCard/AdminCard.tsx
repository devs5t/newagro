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
      <div className="w-full flex flex-row items-center">
        <div className="w-2/3 md:w-1/2">
          <h3 className="text-blue text-lg font-bold font-medium mr-2">{title}</h3>
        </div>
        <div className="w-1/3 md:w-1/2 flex flex-col md:flex-row justify-end md:justify-around">
          <p className="flex items-center text-blue my-3 text-lg text-center"> Actual: {quantity}</p>
          <div className="flex flex-col pointer w-12 items-center">
            <ReactSVG
              src={"icons/edit.svg"}
              beforeInjection={(svg) => {
                svg.classList.add('fill-blue');
                svg.classList.add('w-4');
                svg.classList.add('mt-4');
                svg.classList.add('mr-2');
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