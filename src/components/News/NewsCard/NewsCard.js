import React from 'react';
import NewsCardTickers from '../NewsCardTickers/NewsCardTickers';

const NewsCard = ({ item }) => (
    <div className="bg-black text-gray-300 rounded-lg shadow-md overflow-hidden hover:bg-opacity-80 transition-all duration-300 w-72">
      <div className="flex flex-col">
        <div className="h-32">
          <img 
            src={item.image} 
            alt={item.title}
            className="w-full h-full object-cover"
            onError={(e) => {e.target.src = '/images/placeholder.jpg'}}
          />
        </div>
        <div className="p-4 bg-custom-purple rounded-b-lg">
          <h3 className="text-sm font-semibold mb-2">
            <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-[#6366f1]">
              {item.title}
            </a>
          </h3>
          <div className="text-xs text-gray-400 mb-2">
            {new Date(item.date).toLocaleDateString()} • {item.author}
          </div>
          <div 
            className="text-xs text-gray-400 mb-3"
            dangerouslySetInnerHTML={{ __html: item.content.substring(0, 100) + '...' }}
          />
          <NewsCardTickers tickers={item.tickers} />
        </div>
      </div>
    </div>
);
  
export default NewsCard;