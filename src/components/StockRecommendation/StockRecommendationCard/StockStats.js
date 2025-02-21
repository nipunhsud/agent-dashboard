import React from "react";

const StockStats = ({ stock, openModal }) => (
  <div className="flex justify-between md:justify-normal items-center gap-4">
    <div className="flex items-center gap-[7px]">
      <img
        src={stock.timeImg}
        alt="time"
        className="w-[16px] h-[16px]"
      />
      <span className="robotoFont text-[13px] font-light">
        {stock.time}
      </span>
    </div>
    <div className="flex items-center gap-[7px]">
      <img
        src={stock.ratingImg}
        alt="rating"
        className="w-[16px] h-[16px]"
      />
      <span className={`robotoFont text-[13px] font-bold ${
        stock.rating.includes('BUY') ? 'text-green-600' : 
        stock.rating.includes('SELL') ? 'text-red-600' : 
        'text-yellow-600'
      }`}>
        {stock.rating}
      </span>
    </div>
    <div>
      <button
        onClick={() => openModal(stock.id)}
        className="border-2 text-nowrap robotoFont font-bold text-[13px] text-[#0C0B0B] border-[#0C0B0B] px-[24px] py-[8px] rounded-[8px] hover:bg-[#0C0B0B] hover:text-white transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
      >
        View Details
      </button>
    </div>
  </div>
);

export default StockStats;