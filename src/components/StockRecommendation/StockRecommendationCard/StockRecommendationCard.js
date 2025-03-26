import React from "react";
import Card from "./Card";
import StockInfo from "./StockInfo";
import StockStats from "./StockStats";
import useCompanyLogo from '../../../hooks/useCompanyLogo';

const StockRecommendationCard = ({ stock, onDetailsClick }) => {
  const { logoUrl, error, loading } = useCompanyLogo(stock.name);

  return (
    <Card className="flex flex-col gap-5 p-4 bg-[#f5f5f7] rounded-[12px] cursor-pointer transform transition-transform duration-300 hover:-translate-y-1">
      <div className="md:flex items-center justify-between">
        <StockInfo stock={{ ...stock, svg: error ? '' : logoUrl }} isLoading={loading} />
        <StockStats stock={stock} onDetailsClick={onDetailsClick} />
      </div>
    </Card>
  );
};

export default StockRecommendationCard; 