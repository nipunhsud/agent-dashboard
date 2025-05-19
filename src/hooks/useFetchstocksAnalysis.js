import { useState } from 'react';
import parseAIData from '../components/StockAnalysisView/utils/parseAIData';

const useFetchStockAnalysis = ({
  backendUrl, 
  csrfToken, 
  token, 
  setAnalysisData, 
  handleAuthPrompt, 
  handleLimitReached
}) => {
  const [error, setError] = useState("");

  const fetchStockAnalysis = async (ticker) => {
    try {
      if (!ticker) {
        throw new Error("Ticker symbol is required");
      }

      if (!csrfToken) {
        throw new Error("CSRF token is missing");
      }

      if (!token) {
        handleAuthPrompt();
        return null;
      }

      const formData = new FormData();
      formData.append('input', ticker);

      const res = await fetch(`${backendUrl}/research/stocks/`, {
        method: "POST",
        credentials: "include",
        headers: {
          "X-CSRFToken": csrfToken,
          "Authorization": `Bearer ${token}`,
        },
        body: formData,
      });

      if (res.status === 401) {
        handleAuthPrompt();
        return null;
      }

      if (res.status === 429) {
        handleLimitReached();
        return null;
      }

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ error: "Unknown error occurred" }));
        if (errorData.error?.toLowerCase().includes('daily limit')) {
          handleLimitReached();
          return null;
        }
        throw new Error(errorData.error || `Failed to fetch stock analysis: ${res.status} ${res.statusText}`);
      }

      const data = await res.json();
      
      // Validate response structure
      if (!data || typeof data !== 'object') {
        throw new Error("Invalid response format from server");
      }

      if (!data.response) {
        throw new Error("Missing analysis data in response");
      }

      try {
        const stockData = parseAIData(data, setAnalysisData);
        return stockData;
      } catch (parseError) {
        console.error('Error parsing stock data:', parseError);
        throw new Error(`Failed to parse stock analysis: ${parseError.message}`);
      }
    } catch (err) {
      console.error('Error in fetchStockAnalysis:', err);
      setError(err.message);
      return null;
    }
  };

  return { fetchStockAnalysis, error };
};

export default useFetchStockAnalysis;