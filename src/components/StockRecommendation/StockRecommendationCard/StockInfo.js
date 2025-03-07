import React from "react";

const StockInfo = ({ stock }) => {
  const { svg } = stock; // Ensure logoUrl is extracted from stock

  // Log the stock and logoUrl for debugging
  console.log('Stock Info:', stock);
  console.log('Logo URL in StockInfo:', svg);

  return (
    <div className="flex items-center gap-[24px]">
      <div className="w-[64px] h-[64px] rounded-[12px] flex items-center justify-center">
        {svg ? (
          <img src={svg} alt={`${stock.name} logo`} className="object-contain w-full h-full" />
        ) : (
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
        )}
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
};

export default StockInfo;