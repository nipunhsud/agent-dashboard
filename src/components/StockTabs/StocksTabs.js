import React, { useState } from "react";
import FilterTabs from "./FilterTabs/FilterTabs";
import News from "../News/News";
import StockRecommendation from '../StockRecommendation/StockRecommendation';

const StocksTabs = ({ 
  dashOffset, 
  validProgress,  
  filters, 
  selectedFilter, 
  setSelectedFilter, 
  openModal 
}) => {
  const filterComponents = {
    "Stocks to buy": <StockRecommendation key="buy" filter="BUY" openModal={openModal}/>,
    "Stocks to watch": <StockRecommendation key="watch" filter="WATCH" openModal={openModal} />,
    "News to read": <News key="news" />,
  };

  return (
    <div className="px-8 py-6">
      <div className="agentSection">
        <h2 className="text-[24px] font-bold font-jakarta">Passionate about stocks</h2>
        <FilterTabs
          filters={filters}
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
        />
        {filterComponents[selectedFilter]}
      </div>
    </div>
  );
};

export default StocksTabs;