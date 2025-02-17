import React from "react";
import Card from "./Card";
import AgentInfo from "./AgentInfo";
import AgentStats from "./AgentStats";

const AgentCard = ({ agent, openModal }) => (
  <Card className="flex flex-col gap-5 p-4 bg-[#f5f5f7] rounded-[12px] cursor-pointer transform transition-transform duration-300 hover:-translate-y-1">
    <div className="md:flex items-center justify-between">
      <AgentInfo agent={agent} />
      <AgentStats agent={agent} openModal={openModal} />
    </div>
  </Card>
);

export default AgentCard;