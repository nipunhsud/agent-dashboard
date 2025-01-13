import React, { useState } from 'react';
import testimonialsData from '../../helpers/testimonialsData';
import 'bootstrap/dist/css/bootstrap.min.css';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonialsData.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonialsData.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-6 relative">
      <div className="relative w-full max-w-[600px] mx-auto flex flex-col items-center">
        <div className="w-full bg-black border border-[#6366f1] rounded-2xl p-12 pt-16 shadow-[0_0_15px_rgba(99,102,241,0.2)] backdrop-blur-sm transition-all duration-300 hover:bg-gray-900/50 hover:shadow-[0_0_20px_rgba(99,102,241,0.3)] group cursor-pointer">
          <div className="relative">
            <div className="absolute -top-24 left-1/2 transform -translate-x-1/2">
              <div className="w-32 h-32 rounded-full border-4 border-[#6366f1] overflow-hidden shadow-[0_0_15px_rgba(99,102,241,0.3)] transition-transform duration-300 group-hover:scale-105">
                <img
                  src={testimonialsData[currentIndex].image}
                  alt={testimonialsData[currentIndex].name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <h3 className="text-2xl font-bold text-white mb-4 transition-colors duration-300 group-hover:text-[#6366f1]">
              {testimonialsData[currentIndex].name}
            </h3>
            <p className="text-gray-400 leading-relaxed text-lg transition-colors duration-300 group-hover:text-gray-300">
              {testimonialsData[currentIndex].testimonial}
            </p>
          </div>
        </div>

        <div className="flex justify-between w-full mt-12 px-4">
          <button
            onClick={handlePrev}
            className="w-14 h-14 rounded-full bg-black border-2 border-[#6366f1] text-[#6366f1] flex items-center justify-center hover:bg-[#6366f1] hover:text-white transition-all duration-300 text-2xl"
          >
            ←
          </button>
          <button
            onClick={handleNext}
            className="w-14 h-14 rounded-full bg-black border-2 border-[#6366f1] text-[#6366f1] flex items-center justify-center hover:bg-[#6366f1] hover:text-white transition-all duration-300 text-2xl"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
