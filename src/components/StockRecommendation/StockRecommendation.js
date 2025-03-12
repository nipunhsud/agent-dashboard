import React, { useEffect } from 'react';
import { useRecommendedStocks } from '../../hooks/useRecommendedStocks';
import StockRecommendationCard from './StockRecommendationCard/StockRecommendationCard';
import StockAnalysisCard from '../Shared/StockAnalysisCard/StockAnalysisCard';
import { Link, useNavigate } from 'react-router-dom';

const StockRecommendation = () => {
  const { stocks, loading, error, refetch } = useRecommendedStocks();
  const navigate = useNavigate();
  
  useEffect(() => {
    console.log('StockRecommendation component mounted');
    // We can manually trigger a refetch if needed
    refetch();
  }, []);

  // For debugging
  useEffect(() => {
    console.log('Current stocks state:', stocks);
  }, [stocks]);

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

  // Debugging - raw data display
  return (
    <div className="space-y-4">
      <div className="bg-gray-100 p-4 rounded mb-4">
        <h3 className="font-bold mb-2">Raw Stock Data:</h3>
        <pre className="text-xs overflow-auto max-h-60">
          {JSON.stringify(stocks, null, 2)}
        </pre>
        <button 
          className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={refetch}
        >
          Refresh Data
        </button>
      </div>
      
      {/* We'll implement the proper rendering once we see the actual data structure */}
      <div className="bg-white shadow rounded-lg p-4">
        <p className="text-gray-600">Once we confirm the data structure, we'll implement the proper stock cards here.</p>
      </div>
    </div>
  );
};

export default StockRecommendation;
