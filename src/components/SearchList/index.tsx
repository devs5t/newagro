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
}
const SearchList: React.FC<SearchListProps> = ({
 listItems,
 containerClasses
}) => {
  const [search, setSearch] = useState("");
  return (
    <div className={`flex flex-col w-full border-2 border-blue rounded-lg bg-white ${containerClasses}`}>
      <div className="bg-green/[.05]">
        <div className={"w-full border-b-2 border-b-blue grid grid-cols-2 py-2 px-8"}>
          <div></div>
          <input
            className={`appearance-none block w-full border border-green text-blue rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white pointer`}
            id={"search"}
            type={"text"}
            onChange={e => setSearch(e.target.value)}
            value={search}
          />
        </div>
        <div className="w-full">
          {listItems.map((item) =>
            <div className="py-4 px-8 border-b border-blue flex flex-row">
              <p className="text-blue w-10/12 text-ellipsis overflow-hidden">{item.name}</p>
              <div className="text-blue w-2/12 flex flex-row">
                <ReactSVG
                  src={"icons/download.svg"}
                  beforeInjection={(svg) => {
                    svg.classList.add('fill-green');
                    svg.classList.add('mr-4');
                    svg.classList.add('text-sm');
                    svg.classList.add('md:text-lg');
                    svg.classList.add('pointer');
                  }}
                />
                <ReactSVG
                  src={"icons/delete.svg"}
                  beforeInjection={(svg) => {
                    svg.classList.add('fill-green');
                    svg.classList.add('mr-4');
                    svg.classList.add('text-sm');
                    svg.classList.add('md:text-lg');
                    svg.classList.add('pointer');
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


export default SearchList;