import React, {useState } from "react";
import AgentModel from "./AgentModel/AgentModel";
import Sidebar from "./Sidebar";
import AvatarCard from "./AvatarCard/AvatarCard";
import AgentsList from "./AgentsList/AgentsList";
import CallToAction from "./CallToAction/CallToAction";
import Statistic from "./Statistic/Statistic";
import AgentsCount from "./AgentsCount/AgentsCount";

const Dashboard = () => {
  const filters = ["All Agents", "The Newest", "Top Rated", "Most Popular"];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenNotification, setIsOpenNotification] = useState(false);
  const [activeTab, setActiveTab] = useState("Learning Hours");

  const openModal = (id) => {
    const agent = agents.find((agent) => agent.id === id);
    setSelectedAgent(agent);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAgent(null);
  };
  const openNotificatiClose = () => {
    setIsOpenNotification(true);
  };
  const NotificatiClose = () => {
    setIsOpenNotification(false);
  };

  const validProgress = Math.min(100, Math.max(0, 0));
  const dashOffset = 100 - validProgress;

  const [selectedFilter, setSelectedFilter] = useState(filters[0]);

  const agents = [
    {
      id: 1,
      name: "Stock  Researcher",
      svg: "/images/Researcher.svg",
      by: "Purnam",
      time: "6h 30min",
      rating: "4.9",
      timeImg: "/images/time.svg",
      ratingImg: "/images/flame.svg",
    },
    {
      id: 2,
      name: "Web Scraper",
      svg: "/images/web.svg",
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
    <>
      <div className="flex min-h-screen items-center bg-gray-50">
        <Sidebar isOpen={isOpen}/>

        <div className="flex-1 p-2 md:p-8 h-screen overflow-y-auto  agentSection">
          <div className="flex items-center pt-[50.25px]  flex-col-reverse lg:flex-row justify-between gap-[63.9px] mb-8">
            <AvatarCard/>
            <AgentsCount isOpen={isOpen} setIsOpen={setIsOpen} />
          </div>

          <div className="mb-8 flex flex-col lg:flex-row justify-between gap-[63.9px] ">
            <AgentsList 
              dashOffset={dashOffset}  
              validProgress={validProgress}
              agents={agents}
              filters={filters}
              selectedFilter={selectedFilter}
              setSelectedFilter={setSelectedFilter}
              openModal={openModal}
            />
            <div className="agentSection xl:w-[50%]">
              <Statistic
               activeTab={activeTab}
               setActiveTab={setActiveTab}       
              />
              <CallToAction/>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && selectedAgent && (
        <AgentModel closeModal={closeModal} selectedAgent={selectedAgent} />
      )}
    </>
  );
};

export default Dashboard;
