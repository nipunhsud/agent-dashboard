import { useState, useCallback } from 'react';
import { useAuth } from '../utils/AuthContext';
import useCSRFToken from "./useCSRFToken";
import useBackendUrl from './useBackendUrl';

const useStockAnalyses = () => {
  const [stockAnalyses, setStockAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuth();
  const csrfToken = useCSRFToken();
  const backendUrl = useBackendUrl();

  const parseAnalysisData = (analysisData) => {
    try {
      // If analysisData is already an object, return it
      if (typeof analysisData === 'object' && analysisData !== null) {
        return analysisData;
      }

      // If it's a string, parse it
      if (typeof analysisData === 'string') {
        const sanitizedString = analysisData
          .replace(/[\u0000-\u001F\u007F-\u009F]/g, '')
          .replace(/\n/g, '\\n')
          .replace(/\r/g, '\\r')
          .replace(/\t/g, '\\t');
        
        return JSON.parse(sanitizedString);
      }

      // If it's neither string nor object, return null
      console.error('Invalid analysis data type:', typeof analysisData);
      return null;
    } catch (err) {
      console.error('Error parsing analysis data:', err);
      console.log('Problematic data:', analysisData);
      return null;
    }
  };

  const fetchStockAnalyses = useCallback(async (urlTicker = null) => {
    if (!token || !csrfToken) {
      setLoading(false);
      return;
    }
    setLoading(true);
    
    try {
      const url = urlTicker 
        ? `${backendUrl}/user/stock-analyses?ticker=${urlTicker}`
        : `${backendUrl}/user/stock-analyses/`;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch analyses');
      }

      const data = await response.json();
      console.log('data at stock recom', data)
      if (data.success) {
        const parsedAnalyses = data.analyses.map(analysis => ({
          ...analysis,
          analysis: parseAnalysisData(analysis.analysis) || {}
        }));
        setStockAnalyses(parsedAnalyses);
      }
    } catch (err) {
      console.error('Error fetching stock analyses:', err);
      setError('Failed to load your stock analyses');
    } finally {
      setLoading(false);
    }
  }, [token, csrfToken, backendUrl]);

  return {
    stockAnalyses,
    loading,
    error,
    fetchStockAnalyses
  };
};

export default useStockAnalyses; 