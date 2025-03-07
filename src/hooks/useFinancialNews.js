import { useState, useEffect } from 'react';

export const useFinancialNews = (page = 0, size = 10) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        // Using direct URL with your API key
        const url = `https://financialmodelingprep.com/api/v3/fmp/articles?page=${page}&size=${size}&apikey=auwuq0m14ftY4djuV11W8x8d6Szq6Zxx`;
        
        console.log('Fetching from:', url);
        
        const response = await fetch(url);
        console.log('Response:', response);

        if (!response.ok) {
          throw new Error(`Failed to fetch news: ${response.status}`);
        }

        const text = await response.text(); // Get response as text first
        console.log('Raw response text:', text);

        try {
          const data = JSON.parse(text); // Try to parse as JSON
          console.log('Parsed data:', data);
          setNews(data.content || []);
        } catch (parseError) {
          console.error('Failed to parse JSON:', parseError);
          // If it's HTML, we might want to handle it differently
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
