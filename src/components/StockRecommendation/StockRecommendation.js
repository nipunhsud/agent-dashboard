import React, { useEffect } from 'react';
import { useRecommendedStocks } from '../../hooks/useRecommendedStocks';
import StockRecommendationCard from './StockRecommendationCard/StockRecommendationCard';
import StockAnalysisCard from '../Shared/StockAnalysisCard/StockAnalysisCard';
import { Link, useNavigate } from 'react-router-dom';

const StockRecommendation = () => {
  const { stocks, loading, error, refetch } = useRecommendedStocks();
  const navigate = useNavigate();
  
  useEffect(() => {  
    refetch();
  }, []);

  const handleDetailsClick = (stock) => {
    navigate(`/stock/${stock.name}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500">
        </div>
        <div className="ml-2">Loading stock recommendations...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center py-4">
        Error loading recommendations: {error}
        <button 
          className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={refetch}
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!stocks || (Array.isArray(stocks) && stocks.length === 0)) {
    return (
      <div className="text-center py-4">
        No recommended stocks available.
        <button 
          className="ml-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={refetch}
        >
          Refresh
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {stocks.map((stockData) => {
        const analysis = JSON.parse(stockData.analysis);
        const ticker = analysis.stock_summary.ticker;

        return (
          <StockRecommendationCard
            key={stockData.id}
            stock={{
              id: stockData.id,
              name: ticker,
              by: "Stock Analysis",
              price: analysis.stock_summary.current_metrics.price,
              volume: analysis.stock_summary.current_metrics.volume,
              fiftyTwoWeekHigh: analysis.stock_summary.current_metrics.fifty_two_week?.high,
              fiftyTwoWeekLow: analysis.stock_summary.current_metrics.fifty_two_week?.low,
              recommendation: {
                action: analysis.stock_summary.recommendation.action,
                triggers: analysis.stock_summary.recommendation.triggers,
                risk_factors: analysis.stock_summary.recommendation.risk_factors,
                risk_management: analysis.stock_summary.recommendation.risk_management,
                trade_setup: analysis.stock_summary.trade_setup
              },
              technicalAnalysis: analysis.stock_summary.technical_analysis,
              fundamentalAnalysis: analysis.stock_summary.fundamental_analysis,
              institutionalOwnership: analysis.stock_summary.institutional_ownership,
              marketAnalysis: analysis.stock_summary.market_analysis,
              riskAssessment: analysis.stock_summary.risk_assessment
            }}
            onDetailsClick={handleDetailsClick}
          />
        );
      })}
    </div>
  )
};

export default StockRecommendation;
