import React from 'react';
import { useRecommendedStocks } from '../../hooks/useRecommendedStocks';
import StockRecommendationCard from './StockRecommendationCard/StockRecommendationCard';

const StockRecommendation = ({ openModal }) => {
  // const { stocks, loading, error } = useRecommendedStocks();

  const agents = [
    {
      id: 1,
      name: "Stock  Researcher",
      svg: "/images/Researcher.svg",
      by: "Purnam",
      time: "6h 30min",
      rating: "4.9",
      timeImg: "/images/time.svg",
      ratingImg: "/images/flame.svg",
    },
    {
      id: 2,
      name: "Web Scraper",
      svg: "/images/web.svg",
      by: "Purnam",
      time: "3h 15min",
      rating: "4.7",
      timeImg: "/images/time.svg",
      ratingImg: "/images/flame.svg",
    },
    {
      id: 3,
      name: "Instagram Agent",
      svg: "/images/insta.svg",

      by: "Purnam",
      time: "7h 40min",
      rating: "4.6",
      timeImg: "/images/time.svg",
      ratingImg: "/images/flame.svg",
    },
    {
      id: 4,
      name: "Image Generator",
      svg: "/images/pencil.svg",
      icon: "🖼️",
      by: "Purnam",
      time: "11h 30min",
      rating: "4.8",
      timeImg: "/images/time.svg",
      ratingImg: "/images/flame.svg",
    },
  ];

  

  // if (loading) {
  //   return (
  //     <div className="flex justify-center items-center h-40">
  //       <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
  //     </div>
  //   );
  // }

  // if (error) {
  //   return (
  //     <div className="text-red-500 text-center py-4">
  //       Error loading recommendations: {error}
  //     </div>
  //   );
  // }

  // if (!stocks || stocks.length === 0) {
  //   return (
  //     <div className="text-gray-500 text-center py-4">
  //       No stock recommendations available at the moment.
  //     </div>
  //   );
  // }

  return (
    <div className="space-y-4">
      {agents.map((agent, index) => (
        <StockRecommendationCard
          key={index}
          agent={{
            name: agent.name,
            svg: agent.svg,
            by: agent.by,
            time: agent.time,
            rating: agent.rating,
            timeImg: agent.timeImg,
            ratingImg: agent.ratingImg
          }}
          openModal={openModal}
        />
      ))}
    </div>
  );
};

export default StockRecommendation;
