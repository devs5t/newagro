import React, {useState} from "react";
import {ReactSVG} from "react-svg";
import SearchList from "src/components/SearchList";

interface AdminCardTableProps {
  title: string;
  quantity?: number;
  containerClasses?: string;
  data: emitItem[];
}

type emitItem = {
  quanitity: number,
  link1: string,
  link2?: string,
  link3?: string,
}

const AdminCardTable: React.FC<AdminCardTableProps> = ({
  title,
  quantity,
  data,
  containerClasses,
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={`flex flex-col w-full rounded-lg bg-lightblue/[.15] p-8 shadow ${containerClasses}`}>
      <div className="w-full flex flex-row items-center" onClick={() => setOpen(!open)}>
        <div className="w-2/3 md:w-1/2">
          <h3 className="text-blue text-lg font-bold font-medium mr-2">{title}</h3>
        </div>
        <div className="w-1/3 md:w-1/2 flex flex-col md:flex-row justify-end md:justify-around">
          <p className="flex items-center text-blue my-3 text-lg text-center">Actual: {quantity}</p>
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
      {open && (
        <div className="w-full py-10 ">
          <h4 className="text-blue font-bold font-medium text-sm md:text-lg mb-2">Emisiones anteriores</h4>
          <div className="flex flex-wrap overflow-hidden mb-2">
            <p className="w-1/4"/>
            <p className="text-sm w-1/4 overflow-hidden font-bold text-blue text-center text-tiny md:text-base">Link 1</p>
            <p className="text-sm w-1/4 overflow-hidden font-bold text-blue text-center text-tiny md:text-base">Link 2</p>
            <p className="text-sm w-1/4 overflow-hidden font-bold text-blue text-center text-tiny md:text-base">Link 3</p>
          </div>
          {data.map(item => (
            <div className="flex flex-wrap overflow-hidden">
              <p className="text-sm w-1/4 overflow-hidden font-bold text-blue text-left text-tiny md:text-base" >{item.quanitity}</p>
              <a className="text-sm w-1/4 overflow-hidden font-bold text-blue text-center text-tiny md:text-base underline" href={item.link1} >{item.link1}</a>
              <a className="text-sm w-1/4 overflow-hidden font-bold text-blue text-center text-tiny md:text-base underline" href={item.link2} >{item.link2 || "-"}</a>
              <a className="text-sm w-1/4 overflow-hidden font-bold text-blue text-center text-tiny md:text-base underline" href={item.link3} >{item.link3 || "-"}</a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


export default AdminCardTable;