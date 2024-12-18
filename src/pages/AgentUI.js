import React, { useState } from "react";
import AgentModel from "../components/AgentModel";

const Card = ({ children, className = "" }) => (
  <div className={` rounded-[14px]  ${className}`}>{children}</div>
);

const Dashboard = () => {
  const filters = ["All Agents", "The Newest", "Top Rated", "Most Popular"];
  const [selectedFilter, setSelectedFilter] = useState(filters[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(null);
  
  const openModal = (id) => {
    const agent = agents.find((agent) => agent.id === id);
    setSelectedAgent(agent);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAgent(null);
  };
  const agents = [
    {
      id: 1,
      name: "Email Agent",
      svg: "/images/Frame.svg",
      by: "Purnam",
      time: "6h 30min",
      rating: "4.9",
      timeImg: "/images/time.svg",
      ratingImg: "/images/flame.svg",
    },
    {
      id: 2,
      name: "Web Scraper",
      svg: "/images/chrome.svg",
      by: "Purnam",
      time: "3h 15min",
      rating: "4.7",
      timeImg: "/images/time.svg",
      ratingImg: "/images/flame.svg",
    },
    {
      id: 3,
      name: "Instagram Agent",
      svg: "/images/insta.svg",

      by: "Purnam",
      time: "7h 40min",
      rating: "4.6",
      timeImg: "/images/time.svg",
      ratingImg: "/images/flame.svg",
    },
    {
      id: 4,
      name: "Image Generator",
      svg: "/images/pencil.svg",
      icon: "🖼️",
      by: "Purnam",
      time: "11h 30min",
      rating: "4.8",
      timeImg: "/images/time.svg",
      ratingImg: "/images/flame.svg",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="flex-1 p-2 md:p-8">
        <div className=" ">
          <div className="agentSection">
            <h2 className="text-[24px] font-bold ">Agents</h2>
            <div className="flex gap-[38px] my-[15px] items-center">
              {filters.map((elem, i) => (
                <h4
                  key={i}
                  onClick={() => setSelectedFilter(elem)}
                  className={`text-[16px] font-bold cursor-pointer hover:text-[#0c0b0b] ${
                    selectedFilter === elem
                      ? "text-[#0c0b0b]"
                      : "text-[#b6b6b6]"
                  }`}
                >
                  {elem}
                </h4>
              ))}
            </div>

            <div className="space-y-4">
              {agents.map((agent, index) => (
                <Card
                  key={index}
                  className="flex flex-col gap-5 p-4 bg-[#f5f5f7] rounded-[12px] cursor-pointer transform transition-transform duration-300 hover:-translate-y-1"
                >
                  <div className="sm:flex items-center justify-between">
                    <div className="flex items-center gap-[24px]">
                      <div className="w-[64px] h-[64px] bg-white rounded-[12px] flex items-center justify-center">
                        <img src={agent.svg} alt={agent.name} />
                      </div>
                      <div className="flex flex-col gap-[2px]">
                        <div className="font-bold text-[16px]">
                          {agent.name}
                        </div>
                        <div className="text-[13px] font-light robotoFont text-gray-500">
                          by {agent.by}
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between sm:justify-normal items-center gap-[40px]">
                      <div className="flex items-center gap-[7px]">
                        <img
                          src={agent.timeImg}
                          alt="time"
                          className="w-[16px] h-[16px]"
                        />
                        <span className="robotoFont text-[13px] font-light">
                          {agent.time}
                        </span>
                      </div>
                      <div className="flex items-center gap-[7px]">
                        <img
                          src={agent.ratingImg}
                          alt="rating"
                          className="w-[16px] h-[16px]"
                        />
                        <span className="robotoFont text-[13px] font-light">
                          {agent.rating}
                        </span>
                      </div>
                      <div>
                        <button
                          onClick={() => openModal(agent.id)}
                          className="border-2 text-nowrap robotoFont font-bold text-[13px] text-[#0C0B0B] border-[#0C0B0B] px-[24px] py-[8px] rounded-[8px]  hover:bg-[#0C0B0B] hover:text-white transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
                        >
                          View agent
                        </button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
          <div>
            {isModalOpen && selectedAgent && (
              <AgentModel
                closeModal={closeModal}
                selectedAgent={selectedAgent}
              />
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
