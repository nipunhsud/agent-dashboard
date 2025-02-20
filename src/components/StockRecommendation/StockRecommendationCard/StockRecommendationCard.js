import React from "react";
import Card from "./Card";
import StockInfo from "./StockInfo";
import StockStats from "./StockStats";

const StockRecommendationCard = ({ agent, openModal }) => (
  <Card className="flex flex-col gap-5 p-4 bg-[#f5f5f7] rounded-[12px] cursor-pointer transform transition-transform duration-300 hover:-translate-y-1">
    <div className="md:flex items-center justify-between">
      <StockInfo agent={agent} />
      <StockStats agent={agent} openModal={openModal} />
    </div>
  </Card>
);

export default StockRecommendationCard; 