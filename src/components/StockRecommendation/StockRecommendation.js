import React from 'react';
import { useRecommendedStocks } from '../../hooks/useRecommendedStocks';
import AgentCard from '../AgentsList/AgentCard/AgentCard';

const StockRecommendation = ({ openModal }) => {
  const { stocks, loading, error } = useRecommendedStocks();

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
        Error loading recommendations: {error}
      </div>
    );
  }

  if (!stocks || stocks.length === 0) {
    return (
      <div className="text-gray-500 text-center py-4">
        No stock recommendations available at the moment.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {stocks.map((stock, index) => (
        <AgentCard
          key={index}
          agent={{
            name: stock.name || 'Stock Researcher',
            description: stock.description || 'Analysis not available',
            rating: stock.rating || 4.9,
            timeAgo: stock.timeAgo || '6h 30min',
            provider: 'Purnam'
          }}
          openModal={openModal}
        />
      ))}
    </div>
  );
};

export default StockRecommendation;
