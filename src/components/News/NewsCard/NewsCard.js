import React from 'react';
import NewsCardTickers from '../NewsCardTickers/NewsCardTickers';

const NewsCard = ({ item }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-64 h-48 md:h-auto">
          <img 
            src={item.image} 
            alt={item.title}
            className="w-full h-full object-cover"
            onError={(e) => {e.target.src = '/images/placeholder.jpg'}}
          />
        </div>
        <div className="p-4 flex-1">
          <h3 className="text-xl font-semibold mb-2">
            <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-[#6366f1]">
              {item.title}
            </a>
          </h3>
          <div className="text-sm text-gray-500 mb-3">
            {new Date(item.date).toLocaleDateString()} • {item.author} • {item.site}
          </div>
          <div 
            className="text-gray-600 mb-4"
            dangerouslySetInnerHTML={{ __html: item.content.substring(0, 200) + '...' }}
          />
          <NewsCardTickers tickers={item.tickers} />
        </div>
      </div>
    </div>
);
  
export default NewsCard;