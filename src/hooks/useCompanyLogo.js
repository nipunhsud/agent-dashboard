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
      setError(null);
      try {
        const baseUrl = process.env.REACT_APP_FINANCIAL_MODEL_BASE_URL;
        const url = `${baseUrl}/image-stock/${ticker}.png`;

        const response = await fetch(url, { method: 'HEAD' });

        if (response.ok) {
          setLogoUrl(url);
        } else {
          setError('Logo not found');
          setLogoUrl('');
        }
      } catch (err) {
        setError(err.message);
        setLogoUrl('');
      } finally {
        setLoading(false);
      }
    };

    fetchLogo();
  }, [ticker]);

  return { logoUrl, error, loading };
};

export default useCompanyLogo;