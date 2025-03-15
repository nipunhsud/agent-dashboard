import { useState, useEffect, useCallback } from 'react';
import useBackendUrl from './useBackendUrl';

export const useRecommendedStocks = (ticker = null) => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const backendUrl = useBackendUrl();

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
      setStocks(data.analyses || []); 
    } catch (err) {
      console.error('Error fetching stock recommendations:', err);
      setError(`Failed to load stock recommendations: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }, [backendUrl, ticker]);

  useEffect(() => {
    fetchStockRecommendations();
  }, [fetchStockRecommendations]);

  return { stocks, loading, error, refetch: fetchStockRecommendations };
};

