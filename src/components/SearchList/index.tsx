import React, {useState} from "react";
import Button from '../Buttons/Button';
import Textfield from "src/components/Inputs/Textfield";
import {ReactSVG} from "react-svg";

type ListItem = {
  name: string,
  link?: string,
  timestamp?: string,
}

interface SearchListProps {
  listItems: ListItem[];
  containerClasses?: string;
  onDownload: any;
}
const SearchList: React.FC<SearchListProps> = ({
 listItems,
 containerClasses,
 onDownload
}) => {
  const [search, setSearch] = useState("");

  const items: ListItem[] = (search.length)
      ? listItems.filter(item => item.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
      : listItems

  return (
    <div className={`flex flex-col w-full border-2 border-blue rounded-lg bg-white ${containerClasses}`}>
      <div className="bg-green/[.05]">
        <div className={"w-full border-b-2 border-b-blue grid grid-cols-2 py-2 px-8"}>
          <div></div>
          <div className={`appearance-none block w-full border border-green text-blue rounded-lg py-3 px-4 leading-tight focus:outline-none bg-grey/[.20] pointer flex flex-row`}>
            <ReactSVG
              src={"icons/glass.svg"}
              beforeInjection={(svg) => {
                svg.classList.add('mr-4');
                svg.classList.add('text-sm');
                svg.classList.add('md:text-lg');
              }}
            />
            <input
              className={`appearance-none block text-blue leading-tight focus:outline-none bg-grey/[.10] w-full`}
              id={"search"}
              type={"text"}
              onChange={e => {setSearch(e.target.value)}}
              value={search}
            />
          </div>
        </div>
        <div className="w-full">
          {items.map((item) =>
            <div className="py-4 px-8 border-b border-blue flex flex-row justify-around">
              <p className="text-blue w-10/12 md:w-11/12 text-ellipsis overflow-hidden">{item.name}</p>
              <div className="text-blue w-2/12 md:w-1/12  flex flex-row right">
                <ReactSVG
                  onClick={() => onDownload(item)}
                  src={"icons/download.svg"}
                  beforeInjection={(svg) => {
                    svg.classList.add('mr-4');
                    svg.classList.add('text-sm');
                    svg.classList.add('md:text-lg');
                    svg.classList.add('pointer');
                  }}
                />
                {/* <ReactSVG
                  src={"icons/delete.svg"}
                  beforeInjection={(svg) => {
                    svg.classList.add('mr-4');
                    svg.classList.add('text-sm');
                    svg.classList.add('md:text-lg');
                    svg.classList.add('pointer');
                  }}
                /> */}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


export default SearchList;