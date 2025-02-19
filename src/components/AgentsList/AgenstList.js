import React, { useState } from "react";
import FilterTabs from "./FilterTabs/FilterTabs";
import AgentCard from "./AgentCard/AgentCard";
import News from "../News/News";
import StockRecommendation from '../StockRecommendation/StockRecommendation';

const AgentsList = ({ 
  dashOffset, 
  validProgress, 
  agents, 
  filters, 
  selectedFilter, 
  setSelectedFilter, 
  openModal 
}) => {
  const filterComponents = {
    "Stock to watch": <StockRecommendation openModal={openModal} />,
    "News to read": <News />,
  };

  return (
    <div className="px-8 py-6">
      <div className="agentSection">
        <h2 className="text-[24px] font-bold">Agents</h2>
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

export default AgentsList;