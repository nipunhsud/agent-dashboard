import React, { useEffect } from 'react';
import useStockAnalyses from '../../hooks/useStockAnalyses';
import useExpandedAnalysis from '../../hooks/useExpandedAnalysis';
import StockRecommendationCard from './StockRecommendationCard/StockRecommendationCard';
import StockAnalysisCard from '../Shared/StockAnalysisCard/StockAnalysisCard';

const StockRecommendation = () => {
  const { stockAnalyses, loading, error, fetchStockAnalyses } = useStockAnalyses();
  const { expandedAnalysis, setExpandedAnalysis, closeExpandedView } = useExpandedAnalysis();

  // Call fetchStockAnalyses when component mounts
  useEffect(() => {
    fetchStockAnalyses();
  }, [fetchStockAnalyses]);

  /////////
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlTicker = params.get('ticker');
    fetchStockAnalyses(urlTicker);
  }, [fetchStockAnalyses]);

  // Just to see the data in console
  useEffect(() => {
    console.log('Stock Analyses:', stockAnalyses);
  }, [stockAnalyses]);

  const handleDetailsClick = (stock) => {
    setExpandedAnalysis(stock);
  };

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
        const analysis = stockData.analysis;
        return (
          <StockRecommendationCard
            key={stockData.id}
            stock={{
              id: stockData.id,
              name: analysis.stock_summary.ticker,
              svg: `/images/stock-icon.svg`,
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

      {expandedAnalysis && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <StockAnalysisCard analysis={expandedAnalysis} onClose={closeExpandedView} />
        </div>
      )}
    </div>
  );
};

export default StockRecommendation;
