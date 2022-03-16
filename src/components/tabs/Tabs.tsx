import React from "react";

type TabType = {
  name: string,
  selected?: boolean,
  disabled?: boolean,
  onClick?: () => void
}

interface TabsProps {
  tabs: TabType[];
  containerClass?: string;
}

const Tabs: React.FC<TabsProps> = ({
  tabs,
  containerClass= ''
}) => {
  return (
    <div className={`flex flex-row h-8 border-2 border-green/[.5] rounded-lg justify-around shadow w-full ${containerClass}`}>
      {tabs.map((tab: TabType, index: number) => (
        <div
          key={index}
          className={`flex w-full h-8 -m-[2px] justify-center items-center rounded-lg text-center text-sm font-semibold ${tab.selected ? 'text-white bg-green' : 'text-green/[.5]'} ${tab.disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
          onClick={tab.onClick || console.log}
        >
          {tab.name}
        </div>
      ))}
    </div>
  );
}

export default Tabs;