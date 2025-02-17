import React from "react";
import FilterTabs from "./FilterTabs/FilterTabs";
import AgentCard from "./AgentCard/AgentCard";

const AgentsList = ({ 
  dashOffset, 
  validProgress, 
  agents, 
  filters, 
  selectedFilter, 
  setSelectedFilter, 
  openModal 
}) => {
  return (
    <div className="px-8 py-6">
      <div className="agentSection">
        <h2 className="text-[24px] font-bold">Agents</h2>
        <FilterTabs
          filters={filters}
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
        />
        <div className="space-y-4">
          {agents.map((agent, index) => (
            <AgentCard key={index} agent={agent} openModal={openModal} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AgentsList;