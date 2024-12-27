import React from "react";
import SlackAgentHeader  from "./SlackAgentHeader/SlackAgentHeader";
import NavigationButtons from  "./NavigationButtons/NavigationButtons";
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
    <div className="flex-1">
      <div className="md:flex justify-between gap-5 h-max items-center mb-4">
        <SlackAgentHeader dashOffset={dashOffset} validProgress={validProgress} />
        <NavigationButtons />
      </div>
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