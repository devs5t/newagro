import React, {useState} from "react";
import {ReactSVG} from "react-svg";
import {useTranslation} from "react-i18next";
import CountUp from "react-countup";

interface AdminCardProps {
  title: string;
  quantity: number;
  containerClasses?: string;
  data?: {
    quantity: number,
    link1: string,
    link2?: string,
    link3?: string,
  }[];
  onClick?: Function;
  extraButton?: any;
}

const AdminCard: React.FC<AdminCardProps> = ({
  title,
  quantity,
  data,
  containerClasses,
  onClick,
  extraButton
}) => {
  const {t} = useTranslation();
  const [open, setOpen] = useState(false);
  return (
    <div className={`flex flex-col w-full rounded-lg bg-lightblue/[.15] p-8 shadow ${containerClasses}`}>
      <div className="w-full flex justify-between" onClick={() => setOpen(!open)}>

        <div className="flex flex-col">
          <h3 className="flex items-center text-blue text-lg font-bold font-medium mr-2 max-w-sm">{title}</h3>
          {extraButton}
        </div>

        <CountUp
          className="flex items-center text-blue my-3 text-lg text-center"
          end={quantity}
          separator=","
          decimal="."
          decimals={2}
          prefix="Actual: "
          preserveValue={true}
        />

        <button
          className="flex items-center flex-col pointer w-12"
          onClick={() => {
            if (onClick) {
              onClick();
            }
          }}
        >
          <ReactSVG
            src={"icons/edit.svg"}
            beforeInjection={(svg) => {
              svg.classList.add('fill-blue');
              svg.classList.add('w-6');
            }}
          />
          <span className="text-blue underline">{t('admin.edit')}</span>
        </button>

      </div>
      {open && data && data.length > 0 && (
        <div className="w-full py-10 ">
          <h4 className="text-blue font-bold font-medium text-sm md:text-lg mb-2">{t('admin.old_issues')}</h4>
          <div className="flex flex-wrap overflow-hidden mb-2">
            <p className="w-1/4"/>
            <p className="text-sm w-1/4 overflow-hidden font-bold text-blue text-center text-tiny md:text-base">Link 1</p>
            <p className="text-sm w-1/4 overflow-hidden font-bold text-blue text-center text-tiny md:text-base">Link 2</p>
            <p className="text-sm w-1/4 overflow-hidden font-bold text-blue text-center text-tiny md:text-base">Link 3</p>
          </div>
          {data.map((item, key) => (
            <div className="flex flex-wrap overflow-hidden" key={key}>
              <p className="text-sm w-1/4 overflow-hidden font-bold text-blue text-left text-tiny md:text-base" >{item.quantity}</p>
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


export default AdminCard;