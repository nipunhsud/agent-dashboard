import React from "react";

const StockInfo = ({ stock }) => (
  <div className="flex items-center gap-[24px]">
    <div className="w-[64px] h-[64px] bg-white rounded-[12px] flex items-center justify-center">
      <img src={stock.svg} alt={stock.name} />
    </div>
    <div className="flex flex-col text-nowrap gap-[2px]">
      <div className="font-bold text-[20px]">
        {stock.name}
      </div>
      <div className="flex items-center gap-2 text-[13px] font-medium robotoFont">
        <span className="text-gray-500">Price:</span>
        <span className="text-[#0C0B0B]">${stock.price?.toFixed(2)}</span>
        <span className="text-gray-400 mx-1">|</span>
        <span className="text-gray-500">Vol:</span>
        <span className="text-[#0C0B0B]">{stock.volume?.toLocaleString()}</span>
      </div>
    </div>
  </div>
);

export default StockInfo;