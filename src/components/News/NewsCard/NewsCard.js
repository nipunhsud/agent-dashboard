import React from 'react';
import NewsCardTickers from '../NewsCardTickers/NewsCardTickers';

const NewsCard = ({ item }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="flex flex-col">
        <div className="h-32">
          <img 
            src={item.image} 
            alt={item.title}
            className="w-full h-full object-cover"
            onError={(e) => {e.target.src = '/images/placeholder.jpg'}}
          />
        </div>
        <div className="p-3">
          <h3 className="text-sm font-semibold mb-1">
            <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-[#6366f1]">
              {item.title}
            </a>
          </h3>
          <div className="text-xs text-gray-500 mb-2">
            {new Date(item.date).toLocaleDateString()} • {item.author}
          </div>
          <div 
            className="text-xs text-gray-600 mb-2"
            dangerouslySetInnerHTML={{ __html: item.content.substring(0, 100) + '...' }}
          />
          <NewsCardTickers tickers={item.tickers} />
        </div>
      </div>
    </div>
);
  
export default NewsCard;