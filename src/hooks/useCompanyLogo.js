import { useState, useEffect } from 'react';

const useCompanyLogo = (ticker) => {
  const [logoUrl, setLogoUrl] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!ticker) {
      console.log('No ticker provided, skipping logo fetch.');
      return;
    }

    const fetchLogo = async () => {
      setLoading(true);
      try {
        const baseUrl = process.env.REACT_APP_STOCK_LOGO_BASE_URL;
        const url = `${baseUrl}${ticker}.png`;

        console.log('url', baseUrl, url);
      
        const response = await fetch(url, { method: 'HEAD' });

        if (response.ok) {
          console.log(`Logo found for ticker: ${ticker}`);
          setLogoUrl(url);
        } else {
          console.error(`Logo not found for ticker: ${ticker}`);
          throw new Error('Logo not found');
        }
      } catch (err) {
        console.error(`Error fetching logo for ticker: ${ticker}`, err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLogo();
  }, [ticker]);

  return { logoUrl, error, loading };
};

export default useCompanyLogo; 