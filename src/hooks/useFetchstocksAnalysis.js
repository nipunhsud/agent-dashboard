import { useState } from 'react';
import parseAIData from '../components/StockAnalysisView/utils/parseAIData';

const useFetchStockAnalysis = (backendUrl, csrfToken, token, setAnalysisData) => {
  const [error, setError] = useState("");

  const fetchStockAnalysis = async (ticker) => {
    try {
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

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to fetch stock analysis");
      }

      const data = await res.json();
      const stockData = parseAIData(data, setAnalysisData);
      return stockData;
    } catch (err) {
      setError(err.message);
      return null;
    }
  };

  return { fetchStockAnalysis, error };
};

export default useFetchStockAnalysis;