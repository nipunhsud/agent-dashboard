import React, { useState, useEffect } from "react";

const LoadingState = () => {
    const [loadingStep, setLoadingStep] = useState(0);
    const loadingSteps = [
      { message: "Fetching market data...", icon: "📊" },
      { message: "Analyzing stock patterns...", icon: "📈" },
      { message: "Calculating technical indicators...", icon: "🔍" },
      { message: "Processing financial metrics...", icon: "💹" },
      { message: "Generating insights...", icon: "🧠" },
    ];

    useEffect(() => {
      const interval = setInterval(() => {
        setLoadingStep((prev) => (prev + 1) % loadingSteps.length);
      }, 1500);

      return () => clearInterval(interval);
    }, []);

    return (
      <div className="text-center text-gray-500 p-8 animate-pulse">
        <div className="flex items-center justify-center space-x-3">
          <span className="text-3xl">{loadingSteps[loadingStep].icon}</span>
          <span className="text-lg">{loadingSteps[loadingStep].message}</span>
        </div>
      </div>
    );
};

export default LoadingState;