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
        {loading ? (
          <div className="flex justify-center items-center h-40">
             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
          </div>
        ) : (
          <>
            <StockInfo stock={{ ...stock, svg: logoUrl }} />
            <StockStats stock={stock} onDetailsClick={onDetailsClick} />
          </>
        )}
      </div>
      {error && <div className="text-red-500 text-center">Error loading logo: {error}</div>}
    </Card>
  );
};

export default StockRecommendationCard; 