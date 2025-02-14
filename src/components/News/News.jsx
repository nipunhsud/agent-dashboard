import React from 'react';
import { useFinancialNews } from '../../hooks/useFinancialNews';
import NewsCard from './NewsCard';
import LoadingSpinner from './LoadingSpinner';

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
    <div className="container mx-auto px-4 sm:px-8">
      <div className="flex flex-row gap-6 overflow-x-auto py-6">
        {news.map((item) => (
          <NewsCard key={item.link} item={item} />
        ))}
      </div>
    </div>
  );
};

export default News; 
