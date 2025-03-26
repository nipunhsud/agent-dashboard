import { useState, useEffect, useCallback } from 'react';
import useBackendUrl from './useBackendUrl';

const INVALID_BUY_POINTS = [null, 0, 0.0, "0", "N/A"];

// useRecommendedStocks.js
export const useRecommendedStocks = (ticker = null, filter = null) => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const backendUrl = useBackendUrl();

  const isValidBuyPoint = (buyPoint) => !INVALID_BUY_POINTS.includes(buyPoint);

  const parseStockAnalysis = (stock) => {
    try {
      return JSON.parse(stock.analysis);
    } catch (err) {
      console.error('Error parsing stock analysis:', err);
      return null;
    }
  };

  const fetchStockRecommendations = useCallback(async () => {
    setLoading(true);
    
    try {
      const url = `${backendUrl}/api/public-buy-stocks${ticker ? `?ticker=${ticker}` : ''}`;  
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch stock recommendations: ${response.status}`);
      }

      const data = await response.json();
      let filteredStocks = data.analyses || [];
      
      filteredStocks = filteredStocks.filter(stock => {
        const analysis = parseStockAnalysis(stock);
        if (!analysis) return false;

        const buyPoint = analysis.stock_summary.trade_setup.buy_point;
        const isValid = isValidBuyPoint(buyPoint);
        
        return isValid;
      });
      
      // Apply action filter if specified
      if (filter) {
        filteredStocks = filteredStocks.filter(stock => {
          const analysis = parseStockAnalysis(stock);
          if (!analysis) return false;
          
          const action = analysis.stock_summary.recommendation.action;
          return action === filter;
        });
      }
      
      setStocks(filteredStocks); 
    } catch (err) {
      console.error('Error fetching stock recommendations:', err);
      setError(`Failed to load stock recommendations: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }, [backendUrl, ticker, filter]);

  useEffect(() => {
    fetchStockRecommendations();
  }, [fetchStockRecommendations]);

  return { stocks, loading, error, refetch: fetchStockRecommendations };
};