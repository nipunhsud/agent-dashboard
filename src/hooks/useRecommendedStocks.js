import { useState, useEffect, useCallback } from 'react';
import useBackendUrl from './useBackendUrl';

export const useRecommendedStocks = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const backendUrl = useBackendUrl();

  const fetchStockRecommendations = useCallback(async () => {
   
    setLoading(true);
    
    try {
      const url = `${backendUrl}/api/public-buy-stocks/`;
      console.log('Fetching from URL:', url);
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch stock recommendations: ${response.status}`);
      }

      const data = await response.json();
      console.log('Raw stock data:', data);
      setStocks(data.analyses || []); 
    } catch (err) {
      console.error('Error fetching stock recommendations:', err);
      setError(`Failed to load stock recommendations: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }, [backendUrl]);

  useEffect(() => {
    console.log('useEffect triggered in useRecommendedStocks');
    fetchStockRecommendations();
  }, [fetchStockRecommendations]);

  return { stocks, loading, error, refetch: fetchStockRecommendations };
};

