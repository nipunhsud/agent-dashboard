import { useState, useEffect } from 'react';

export const useRecommendedStocks = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        setLoading(true);
        const response = await fetch('/recommended-stocks');
        
        console.log('Response:', response);

        if (!response.ok) {
          throw new Error(`Failed to fetch stocks: ${response.status}`);
        }

        const text = await response.text();
        console.log('Raw response text:', text);

        try {
          const data = JSON.parse(text);
          console.log('Parsed stocks data:', data);
          setStocks(data || []);
        } catch (parseError) {
          console.error('Failed to parse JSON:', parseError);
          if (text.includes('<!DOCTYPE html>')) {
            setError('API returned HTML instead of JSON. Please check API access.');
          }
        }
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStocks();
  }, []); // Empty dependency array since we don't have any parameters

  return { stocks, loading, error };
};
