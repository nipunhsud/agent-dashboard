import React from "react";

const AgentInfo = ({ agent }) => (
  <div className="flex items-center gap-[24px]">
    <div className="w-[64px] h-[64px] bg-white rounded-[12px] flex items-center justify-center">
      <img src={agent.svg} alt={agent.name} />
    </div>
    <div className="flex flex-col text-nowrap gap-[2px]">
      <div className="font-bold text-[12px]">
        {agent.name}
      </div>
      <div className="text-[10px] font-light robotoFont text-gray-500">
        by {agent.by}
      </div>
    </div>
  </div>
);

export default AgentInfo;