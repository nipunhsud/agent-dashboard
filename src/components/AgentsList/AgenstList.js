import React, { useState } from "react";
import FilterTabs from "./FilterTabs/FilterTabs";
import AgentCard from "./AgentCard/AgentCard";
import News from "../News/News";

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
    "Stock to watch": (
      <div className="space-y-4">
        {agents.map((agent, index) => (
          <AgentCard key={index} agent={agent} openModal={openModal} />
        ))}
      </div>
    ),
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