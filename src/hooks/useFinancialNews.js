import { useState, useEffect } from 'react';
import { auth } from '../config/firebase';


export const useFinancialNews = (page = 0, size = 10) => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchNews = async () => {
        try {
          setLoading(true);
          const response = await fetch(
            `${BASE_URL}?page=${page}&size=${size}&apikey=${API_KEY}`
          );
          
          if (!response.ok) {
            throw new Error('Failed to fetch news');
          }
  
          const data = await response.json();
          setNews(data.content);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
  
      fetchNews();
    }, [page, size]);
  
    return { news, loading, error };
};
