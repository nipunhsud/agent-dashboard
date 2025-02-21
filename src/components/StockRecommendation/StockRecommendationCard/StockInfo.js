import React from "react";

const StockInfo = ({ stock }) => (
  <div className="flex items-center gap-[24px]">
    <div className="w-[64px] h-[64px] bg-white rounded-[12px] flex items-center justify-center">
      <img src={stock.svg} alt={stock.name} />
    </div>
    <div className="flex flex-col text-nowrap gap-[2px]">
      <div className="font-bold text-[12px]">
        {stock.name}
      </div>
      <div className="text-[10px] font-light robotoFont text-gray-500">
        by {stock.by}
      </div>
      <div className="text-[12px] font-medium robotoFont">
        ${stock.price?.toFixed(2)} | Vol: {stock.volume?.toLocaleString()}
      </div>
    </div>
  </div>
);

export default StockInfo;