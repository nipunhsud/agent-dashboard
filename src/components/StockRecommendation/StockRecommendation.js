import React, { useEffect } from 'react';
import useStockAnalyses from '../../hooks/useStockAnalyses';
import StockRecommendationCard from './StockRecommendationCard/StockRecommendationCard';

const StockRecommendation = ({ openModal }) => {
  const { stockAnalyses, loading, error, fetchStockAnalyses } = useStockAnalyses();

  // Call fetchStockAnalyses when component mounts
  useEffect(() => {
    fetchStockAnalyses();
  }, [fetchStockAnalyses]);

  // Just to see the data in console
  useEffect(() => {
    console.log('Stock Analyses:', stockAnalyses);
  }, [stockAnalyses]);

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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center py-4">
        Error loading analyses: {error}
      </div>
    );
  }

  // ticker 
  // 

  return (
    <div className="space-y-4">
      {stockAnalyses.map((stockData) => {
        const analysis = stockData.analysis.stock_summary;
        return (
          <StockRecommendationCard
            key={stockData.id}
            stock={{
              id: stockData.id,
              name: analysis.ticker,
              svg: `/images/stock-icon.svg`,
              by: "Stock Analysis",
              price: analysis.current_metrics.price,
              volume: analysis.current_metrics.volume,
              recommendation: {
                action: analysis.recommendation.action,
                trade_setup: analysis.trade_setup
              },
              technicalAnalysis: analysis.technical_analysis
            }}
            openModal={openModal}
          />
        );
      })}
    </div>
  );
};

export default StockRecommendation;
