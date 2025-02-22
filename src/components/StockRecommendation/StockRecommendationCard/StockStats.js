import React from "react";

const StockStats = ({ stock, openModal }) => (
  <div className="flex justify-between md:justify-normal items-center gap-4">
    <div className="flex items-center gap-[7px]">
      <svg 
        className="w-[16px] h-[16px]" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2"
        style={{ color: '#22c55e' }} // green-600
      >
        <path d="M7 13L12 8L17 13" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <div className="flex flex-col">
        <span className="text-gray-500 text-[10px] robotoFont">Buy Point</span>
        <span className="robotoFont text-[13px] font-bold text-green-600">
          ${stock.recommendation.trade_setup.buy_point?.toFixed(2)}
        </span>
      </div>
    </div>
    <div className="flex items-center gap-[7px]">
      <svg 
        className="w-[16px] h-[16px]" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2"
        style={{ color: '#dc2626' }} // red-600
      >
        <path d="M7 11L12 16L17 11" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <div className="flex flex-col">
        <span className="text-gray-500 text-[10px] robotoFont">Stop Loss</span>
        <span className="robotoFont text-[13px] font-bold text-red-600">
          ${stock.recommendation.trade_setup.stop_loss?.toFixed(2)}
        </span>
      </div>
    </div>
    <div>
      <button
        onClick={() => openModal(stock.id)}
        className="border-2 text-nowrap robotoFont font-bold text-[13px] text-[#0C0B0B] border-[#0C0B0B] px-[24px] py-[8px] rounded-[8px] hover:bg-[#0C0B0B] hover:text-white transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
      >
        Details
      </button>
    </div>
  </div>
);

export default StockStats;