import React from 'react';

const NewsCardTickers = ({ tickers }) => {
    if (!tickers) return null;
    
    return (
      <div className="flex flex-wrap gap-2">
        {tickers.split(',').map(ticker => (
          <span key={ticker} className="px-2 py-1 text-xs bg-[#6366f1]/10 text-[#6366f1] rounded-full">
            {ticker.trim()}
          </span>
        ))}
      </div>
    );
};

export default NewsCardTickers;