import { useState, useEffect } from 'react';

export const useFinancialNews = (page = 0, size = 10) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const apiKey =  process.env.REACT_APP_FINANCIAL_MODEL_API_KEY
        const url = `https://financialmodelingprep.com/api/v3/fmp/articles?page=${page}&size=${size}&apikey=${apiKey}`;
        const response = await fetch(url);
      
        if (!response.ok) {
          throw new Error(`Failed to fetch news: ${response.status}`);
        }

        const text = await response.text(); 

        try {
          const data = JSON.parse(text); 
          setNews(data.content || []);
        } catch (parseError) {
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

    fetchNews();
  }, [page, size]);

  return { news, loading, error };
};
