import React from "react";

const TokenSelector: React.FC = () => {
  return (
    <div className={`grid grid-cols-3 w-full rounded-xl border-green/[.5] border-2 shadow max-w-xl`}>
      <div className={`h-full bg-green rounded-lg flex-grow-1 px-4 py-2 cursor-pointer`}>
        <p className="text-white text-center font-semibold text-lg">New Milk</p>
      </div>
      <div className={`h-full rounded-lg flex-grow-1 px-4 py-2 cursor-not-allowed`}>
        <p className="text-green/[.5] text-center font-semibold text-lg">New Beef</p>
      </div>
      <div className={`h-full rounded-lg flex-grow-1 px-4 py-2 cursor-not-allowed`}>
        <p className="text-green/[.5] text-center font-semibold text-lg">New Land</p>
      </div>
    </div>
  );
}

export default TokenSelector;