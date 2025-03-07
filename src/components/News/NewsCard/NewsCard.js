import React from 'react';
import NewsCardTickers from '../NewsCardTickers/NewsCardTickers';

const NewsCard = ({ item }) => (
    <div className="bg-[#F7F7F7] rounded-[12px] shadow-md overflow-hidden p-6">
      <div className="flex gap-6">
        {/* Image section */}
        <div className="w-[64px] h-[64px] bg-white rounded-[12px] flex-shrink-0 overflow-hidden flex items-center justify-center">
          <img 
            src={item.image} 
            alt={item.title}
            className="w-full h-full object-cover"
            onError={(e) => {e.target.src = '/images/placeholder.jpg'}}
          />
        </div>

        {/* Content section */}
        <div className="flex flex-col flex-grow">
          {/* Title and author */}
          <div className="flex flex-col gap-[2px] mb-3">
            <h3 className="font-bold text-[12px] text-[#0C0B0B]">
              <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-[#0C0B0B] no-underline">
                {item.title}
              </a>
            </h3>
            <div className="text-[10px] font-light robotoFont text-[#0C0B0B]">
              by {item.author}
            </div>
          </div>

          {/* Content preview */}
          <div 
            className="text-[13px] font-light robotoFont text-[#0C0B0B] mb-3"
            dangerouslySetInnerHTML={{ __html: item.content.substring(0, 100) + '...' }}
          />

          {/* Bottom section with date and tickers */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-[7px]">
              <span className="robotoFont text-[13px] font-light text-[#0C0B0B]">
                {new Date(item.date).toLocaleDateString()}
              </span>
            </div>
            <NewsCardTickers tickers={item.tickers} />
          </div>
        </div>
      </div>
    </div>
);
  
export default NewsCard;