import React from 'react';
import { useFinancialNews } from '../../hooks/useFinancialNews';
import NewsCard from './NewsCard/NewsCard';
import LoadingSpinner from '../Shared/LoadingSpinner/LoadingSpinner'

const News = () => {
  const { news, loading, error } = useFinancialNews();

  if (loading) return <LoadingSpinner />;
  
  if (error) {
    return (
      <div className="text-red-500 text-center p-4">
        {error}
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 max-h-[800px] overflow-y-auto">
      {news.map((item) => (
        <NewsCard key={item.link} item={item} />
      ))}
    </div>
  );
};

export default News; 