import React, { useState, useEffect } from "react";
import brainLogo from '../../assets/brain-logo.png';
import useCSRFToken from "../../hooks/useCSRFToken"
import { useAuth } from "../../utils/AuthContext";
import LoadingState from "./LoadingState/LoadingState";
import useBackendUrl from "../../hooks/useBackendUrl";
import useRagUrl from "../../hooks/useChatUrl";


const StockAnalysisView = () => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [aiQuestion, setAiQuestion] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [analysisData, setAnalysisData] = useState({
    ticker: '',
  });
  const ragUrl = useRagUrl();
  const csrfToken = useCSRFToken();
  const { token } = useAuth();
  const backendUrl = useBackendUrl();

  const handlePrintAnalysis = () => {
    const analysisContent = document.getElementById('analysis-content');
    const originalContent = document.body.innerHTML;

    document.body.innerHTML = analysisContent.innerHTML;
    window.print();
    document.body.innerHTML = originalContent;

    attachEventListeners();
  };

  const attachEventListeners = () => {
    document.querySelector('.print-button').onclick = handlePrintAnalysis;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!csrfToken) {
      console.error("CSRF token is not set yet.");
      setError("Unable to submit the form. CSRF token is missing.");
      return;
    }

    setError("");
    setResponse(<LoadingState />);

    try {
      const formData = new FormData();
      formData.append("input", input);

      console.log('this is the backend url', backendUrl)

      const res = await fetch(`${backendUrl}/research/stocks/`, {
        method: "POST",
        credentials: "include",
        headers: {
          "X-CSRFToken": csrfToken,
          "Authorization": `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to fetch stock analysis");
      }

      const data = await res.json();
      const stockData = parseAIData(data);
      setResponse(formatResponse(stockData));
    } catch (err) {
      setError(err.message);
    }
  };

  const formatResponse = (stockData) => {
    const imageSrc = "/images/mind.svg"
    return (
      <div>
        {/* Primary Analysis Section */}
        <div className="bg-black text-gray-300 shadow-md rounded-lg p-6 max-w-4xl mx-auto mb-6">
          {/* Stock Analysis Title */}
          <div className="flex flex-col items-center justify-center p-4 mb-4">  
            <div className="flex items-center justify-center p-4 bg-[#6366f1]/10 rounded-2xl w-16 h-16 sm:w-20 sm:h-20 sm:mb-2 sm:mb-0 transition-all duration-300 group-hover:bg-[#6366f1]/20 group-hover:scale-110">
                <img src={imageSrc} alt={'hola'} className="w-8 h-8 sm:w-12 sm:h-12 transition-transform duration-300 group-hover:scale-110 object-contain"/>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold break-words text-center text-custom-purple">
              {stockData.ticker} Analysis
            </h2>
          </div>
          
          {/* Current Metrics */}
          <div className="mb-6">
            <div className="flex items-center mb-3">
              <div className="bg-black rounded-full w-12 h-12 flex items-center justify-center mr-3">
                <span className="text-lg">📊</span>
              </div>
              <h4 className="text-xl font-bold">Important Metrics</h4>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-3 bg-custom-purple rounded-lg hover:bg-opacity-80 transition-all duration-300">
                <span className="block font-bold">Current Price</span>
                <span className="text-lg">${stockData.current_metrics?.price?.toFixed(2) || 'N/A'}</span>
              </div>
              <div className="p-3 bg-custom-purple rounded-lg hover:bg-opacity-80 transition-all duration-300">
                <span className="block font-bold">Volume</span>
                <span className="text-lg">{stockData.current_metrics?.volume?.toLocaleString() || 'N/A'}</span>
              </div>
              <div className="p-3 bg-custom-purple rounded-lg hover:bg-opacity-80 transition-all duration-300">
                <span className="block font-bold">52W High</span>
                <span className="text-lg">${stockData.current_metrics?.fifty_two_week?.high?.toFixed(2) || 'N/A'}</span>
              </div>
              <div className="p-3 bg-custom-purple rounded-lg hover:bg-opacity-80 transition-all duration-300">
                <span className="block font-bold">52W Low</span>
                <span className="text-lg">${stockData.current_metrics?.fifty_two_week?.low?.toFixed(2) || 'N/A'}</span>
              </div>
            </div>
          </div>

          {/* Recommendation Section */}
          <div className="border-t border-custom-purple py-4">
            {/* Recommendation Title */}
            <div className="flex flex-col items-center justify-center p-4 mb-4">
              <div className="flex items-center justify-center p-4 bg-[#6366f1]/10 rounded-2xl w-16 h-16 sm:w-20 sm:h-20 mb-2 sm:mb-0 transition-all duration-300 group-hover:bg-[#6366f1]/20 group-hover:scale-110">
                  <img src={imageSrc} alt={'hola'} className="w-8 h-8 sm:w-12 sm:h-12 transition-transform duration-300 group-hover:scale-110 object-contain"/>
              </div> 
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold break-words text-center">Recommendation</h3>
            </div>

            {/* Action Recommendation */}
            <div className="p-6 bg-custom-purple rounded-lg mb-4 hover:bg-opacity-80 transition-all duration-300">
              <div className={`text-3xl font-bold text-center py-3 px-6 rounded-lg ${
                stockData.recommendation.action.toLowerCase().includes('buy') ? 'bg-green-500/20 text-green-400' :
                stockData.recommendation.action.toLowerCase().includes('sell') ? 'bg-red-500/20 text-red-400' :
                'bg-yellow-500/20 text-yellow-400'
              }`}>
                {stockData.recommendation.action}
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-custom-purple rounded-lg hover:bg-opacity-80 transition-all duration-300">
                <div className="flex items-center mb-3">
                  <div className="bg-black rounded-full w-12 h-12 flex items-center justify-center mr-3">
                    <span className="text-lg">🎯</span>
                  </div>
                  <h4 className="text-xl font-bold">Key Triggers</h4>
                </div>
                <ul className="list-disc list-inside ml-11">
                  {stockData.recommendation.triggers.map((trigger, index) => (
                    <li key={index}>{trigger}</li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-custom-purple rounded-lg hover:bg-opacity-80 transition-all duration-300">
                <div className="flex items-center mb-3">
                  <div className="bg-black rounded-full w-12 h-12 flex items-center justify-center mr-3">
                    <span className="text-lg">⚠️</span>
                  </div>
                  <h4 className="text-xl font-bold">Risk Factors</h4>
                </div>
                <ul className="list-disc list-inside ml-11">
                  {stockData.recommendation.risk_factors.map((risk, index) => (
                    <li key={index}>{risk}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Trade Setup Section */}
            <div className="mt-6">
              <div className="flex items-center mb-3">
                <div className="bg-black rounded-full w-12 h-12 flex items-center justify-center mr-3">
                  <span className="text-lg">📈</span>
                </div>
                <h4 className="text-xl font-bold">Trade Setup</h4>
              </div>
              
              <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-3">
                  <div className="p-3 bg-custom-purple rounded-lg hover:bg-opacity-80 transition-all duration-300">
                    <span className="block font-bold">Buy Point</span>
                    <span className="text-lg">${stockData.trade_setup?.buy_point?.toFixed(2) || 'N/A'}</span>
                  </div>
                  <div className="p-3 bg-custom-purple rounded-lg hover:bg-opacity-80 transition-all duration-300">
                    <span className="block font-bold">Target</span>
                    <span className="text-lg">${stockData.trade_setup?.target_price?.toFixed(2) || 'N/A'}</span>
                  </div>
                  <div className="p-3 bg-custom-purple rounded-lg hover:bg-opacity-80 transition-all duration-300">
                    <span className="block font-bold">Stop Loss</span>
                    <span className="text-lg">${stockData.trade_setup?.stop_loss?.toFixed(2) || 'N/A'}</span>
                  </div>
                </div>
                <div className="p-3 bg-custom-purple rounded-lg hover:bg-opacity-80 transition-all duration-300">
                  <span className="block font-bold">Setup Type</span>
                  <span className="text-lg">{stockData.trade_setup?.setup_type || 'N/A'}</span>
                </div>
              </div>
            </div>

            {/* Risk Management Section */}
            <div className="mt-6">
              <div className="flex items-center mb-3">
                <div className="bg-black rounded-full w-12 h-12 flex items-center justify-center mr-3">
                  <span className="text-lg">🛡️</span>
                </div>
                <h4 className="text-xl font-bold">Risk Management</h4>
              </div>
              
              <div className="p-4 bg-custom-purple rounded-lg hover:bg-opacity-80 transition-all duration-300">
                <p className="text-lg">{stockData.recommendation.risk_management || 'N/A'}</p>
              </div>
            </div>
          </div>
          {/* Chart Section */}
          {/* <Chart/> */}

          {/* Technical Analysis */}
          <div className="border-t border-custom-purple py-4 space-y-4">
            {/* Technical Analysis Title */}
            <div className="flex flex-col items-center justify-center p-4 mb-4">
              <div className="flex items-center justify-center p-4 bg-[#6366f1]/10 rounded-2xl w-16 h-16 sm:w-20 sm:h-20 mb-2 sm:mb-0 transition-all duration-300 group-hover:bg-[#6366f1]/20 group-hover:scale-110">
                  <img src={imageSrc} alt={'hola'} className="w-8 h-8 sm:w-12 sm:h-12 transition-transform duration-300 group-hover:scale-110 object-contain"/>
              </div> 
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold break-words text-center">Technical Analysis</h3>
            </div>

            {/* Moving Averages Section */}
            <div className="mb-6">
              <div className="flex items-center mb-3">
                <div className="bg-black rounded-full w-12 h-12 flex items-center justify-center mr-3">
                  <span className="text-lg">📈</span>
                </div>
                <h4 className="text-xl font-bold">Moving Averages (EMA)</h4>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-3">
                <div className="p-3 bg-custom-purple rounded-lg hover:bg-opacity-80 transition-all duration-300">
                  <span className="block font-bold">EMA 50</span>
                  <span>${stockData.technical_analysis?.moving_averages?.ema_50?.toFixed(2) || 'N/A'}</span>
                </div>
                <div className="p-3 bg-custom-purple rounded-lg hover:bg-opacity-80 transition-all duration-300">
                  <span className="block font-bold">EMA 150</span>
                  <span>${stockData.technical_analysis?.moving_averages?.ema_150?.toFixed(2) || 'N/A'}</span>
                </div>
                <div className="p-3 bg-custom-purple rounded-lg hover:bg-opacity-80 transition-all duration-300">
                  <span className="block font-bold">EMA 200</span>
                  <span>${stockData.technical_analysis?.moving_averages?.ema_200?.toFixed(2) || 'N/A'}</span>
                </div>
              </div>
            </div>

            {/* Trend Analysis Section */}
            <div className="mb-6">
              <div className="flex items-center mb-3">
                <div className="bg-black rounded-full w-12 h-12 flex items-center justify-center mr-3">
                  <span className="text-lg">🎯</span>
                </div>
                <h4 className="text-xl font-bold">Trend Analysis</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-custom-purple rounded-lg hover:bg-opacity-80 transition-all duration-300">
                  <span className="block font-bold mb-2">Overall Trend</span>
                  <div className={`text-lg font-semibold ${
                    stockData.technical_analysis?.trend?.includes('Bullish') ? 'text-green-500' :
                    stockData.technical_analysis?.trend?.includes('Bearish') ? 'text-red-500' :
                    'text-yellow-500'
                  }`}>
                    {stockData.technical_analysis?.trend || 'N/A'}
                  </div>
                </div>
                <div className="p-4 bg-custom-purple rounded-lg hover:bg-opacity-80 transition-all duration-300">
                  <span className="block font-bold mb-2">Distance from 52W High</span>
                  <span className="text-lg">
                    {stockData.technical_analysis?.distance_from_52_week_high || 'N/A'}
                  </span>
                </div>
              </div>
            </div>

            {/* Volume Analysis */}
            <div className="p-3 bg-custom-purple rounded-lg hover:bg-opacity-80 transition-all duration-300">
              <span className="block font-bold mb-2">Volume and Volatility Pattern Analysis</span>
              <p className="text-sm">{stockData.technical_analysis?.volume_analysis || 'N/A'}</p>
              <p className="text-sm">{stockData.technical_analysis?.volatility_pattern || 'N/A'}</p>
            </div>

            {/* Technical Setup */}
            <div className="space-y-3">
              <div className="p-3 bg-custom-purple rounded-lg hover:bg-opacity-80 transition-all duration-300">
                <span className="block font-bold mb-2">Technical Setup</span>
                <p className="text-sm">{stockData.technical_analysis?.technical_setup || 'N/A'}</p>
                <p className="text-sm">{stockData.technical_analysis?.technical_setup_trigger || 'N/A'}</p>
              </div>

              {/* Key Triggers */}
              <div className="p-3 bg-custom-purple rounded-lg hover:bg-opacity-80 transition-all duration-300">
                <span className="block font-bold mb-2">Key Triggers and Risks</span>
                <p className="text-sm">{stockData.technical_analysis?.technical_setup_trigger_key_triggers || 'N/A'}</p>
                <p className="text-sm">{stockData.technical_analysis?.technical_setup_trigger_risk_factors || 'N/A'}</p>
              </div>
            </div>
          </div>
        
          {/* Fundamental Analysis */}
          <div className="border-t border-custom-purple py-4 space-y-4">
            {/* Fundamental Analysis Title */}
            <div className="flex flex-col items-center justify-center p-4 mb-4">
                <div className="flex items-center justify-center p-4 bg-[#6366f1]/10 rounded-2xl w-16 h-16 sm:w-20 sm:h-20 mb-2 sm:mb-0 transition-all duration-300 group-hover:bg-[#6366f1]/20 group-hover:scale-110">
                  <img src={imageSrc} alt={'hola'} className="w-8 h-8 sm:w-12 sm:h-12 transition-transform duration-300 group-hover:scale-110 object-contain"/>
                </div> 
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold break-words text-center">Fundamental Analysis</h3>
            </div>
            
            {/* EPS Growth */}
            <div className="mb-6">
              <div className="flex items-center mb-3">
                <div className="bg-black rounded-full w-12 h-12 flex items-center justify-center mr-3">
                  <span className="text-lg">📈</span>
                </div>
                <h4 className="text-xl font-bold">Quarterly EPS Growth</h4>
              </div>
              
              <div className="p-4 bg-custom-purple rounded-lg hover:bg-opacity-80 transition-all duration-300">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-3">
                  {stockData.fundamental_analysis?.quarterly_eps_growth?.map((growth, index) => (
                    <div key={index} className="text-center p-2 bg-black rounded-lg">
                      <span className="block font-bold">Q{3 - index}</span>
                      <span className={`text-lg font-semibold ${growth > 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {(growth * 100).toFixed(1)}%
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-sm mt-2">{stockData.fundamental_analysis?.quarterly_eps_growth_trend}</p>
              </div>
            </div>

            {/* Growth Trends */}  
            <div className="mb-6">
              <div className="flex items-center mb-3">
                <div className="bg-black rounded-full w-12 h-12 flex items-center justify-center mr-3">
                  <span className="text-lg">📊</span>
                </div>
                <h4 className="text-xl font-bold">Growth Analysis</h4>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3 bg-custom-purple rounded-lg hover:bg-opacity-80 transition-all duration-300">
                  <div className="flex items-center mb-2">
                    <div className="bg-black rounded-full w-12 h-12 flex items-center justify-center mr-2">
                      <span className="text-sm">📅</span>
                    </div>
                    <h4 className="font-bold">Annual Growth</h4>
                  </div>
                  <p className="text-sm">{stockData.fundamental_analysis?.annual_growth_trend}</p>
                </div>
                <div className="p-3 bg-custom-purple rounded-lg hover:bg-opacity-80 transition-all duration-300">
                  <div className="flex items-center mb-2">
                    <div className="bg-black rounded-full w-12 h-12 flex items-center justify-center mr-2">
                      <span className="text-sm">🏢</span>
                    </div>
                    <h4 className="font-bold">Industry Position</h4>
                  </div>
                  <p className="text-sm">{stockData.fundamental_analysis?.industry_position}</p>
                </div>
              </div>
            </div>

            {/* Sector Performance */}
            <div className="p-3 bg-custom-purple rounded-lg hover:bg-opacity-80 transition-all duration-300">
              <h4 className="font-bold mb-2">Sector Performance</h4>
              <p className="text-sm">{stockData.fundamental_analysis?.sector_performance}</p>
            </div>
          </div>

          {/* Institutional Ownership */}
          <div className="border-t border-custom-purple py-4">    
              <div className="flex flex-col items-center justify-center p-4 mb-4">
                <div className="flex items-center justify-center p-4 bg-[#6366f1]/10 rounded-2xl w-16 h-16 sm:w-20 sm:h-20 mb-2 sm:mb-0 transition-all duration-300 group-hover:bg-[#6366f1]/20 group-hover:scale-110">
                    <img src={imageSrc} alt={'hola'} className="w-8 h-8 sm:w-12 sm:h-12 transition-transform duration-300 group-hover:scale-110 object-contain"/>
                </div>  
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold break-words text-center">Institutional Ownership</h3>
              </div>
              
              <div className="space-y-3">
                <div className="p-4 bg-custom-purple rounded-lg hover:bg-opacity-80 transition-all duration-300">
                  <div className="flex items-center mb-2">
                    <div className="bg-black rounded-full w-12 h-12 flex items-center justify-center mr-3">
                      <span className="text-lg">🏦</span>
                    </div>
                    <span className="text-xl font-bold">Current Ownership</span>
                  </div>
                  <p className="text-sm ml-11">
                    {stockData.institutional_ownership?.institutional_ownership || 'No ownership data available'}
                  </p>
                </div>
                <div className="p-4 bg-custom-purple rounded-lg hover:bg-opacity-80 transition-all duration-300">
                  <div className="flex items-center mb-2">
                    <div className="bg-black rounded-full w-12 h-12 flex items-center justify-center mr-3">
                      <span className="text-lg">📈</span>
                    </div>
                    <span className="text-xl font-bold">Ownership Trend</span>
                  </div>
                  <p className="text-sm ml-11">
                    {stockData.institutional_ownership?.institutional_ownership_trend || 'No trend data available'}
                  </p>
                </div>
              </div>
          </div>

          {/* Market Analysis */}
          <div className="border-t border-custom-purple py-4">
            {/* Market Analysis Title */}
            <div className="flex flex-col items-center justify-center p-4 mb-4">
                <div className="flex items-center justify-center p-4 bg-[#6366f1]/10 rounded-2xl w-16 h-16 sm:w-20 sm:h-20 mb-2 sm:mb-0 transition-all duration-300 group-hover:bg-[#6366f1]/20 group-hover:scale-110">
                  <img src={imageSrc} alt={'hola'} className="w-8 h-8 sm:w-12 sm:h-12 transition-transform duration-300 group-hover:scale-110 object-contain"/>
                </div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold break-words text-center">Market Analysis</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-custom-purple rounded-lg hover:bg-opacity-80 transition-all duration-300">
                <div className="flex items-center mb-2">
                  <div className="bg-black rounded-full w-12 h-12 flex items-center justify-center mr-3">
                    <span className="text-lg">🎯</span>
                  </div>
                  <span className="text-xl font-bold">Market Sentiment</span>
                </div>
                <div className={`ml-11 text-lg font-semibold ${
                  stockData.market_analysis?.market_sentiment?.toLowerCase().includes('bullish') ? 'text-green-400' :
                  stockData.market_analysis?.market_sentiment?.toLowerCase().includes('bearish') ? 'text-red-400' :
                  'text-yellow-400'
                }`}>
                  {stockData.market_analysis?.market_sentiment || 'N/A'}
                </div>
              </div>
              <div className="p-4 bg-custom-purple rounded-lg hover:bg-opacity-80 transition-all duration-300">
                <div className="flex items-center mb-2">
                  <div className="bg-black rounded-full w-12 h-12 flex items-center justify-center mr-3">
                    <span className="text-lg">📊</span>
                  </div>
                  <span className="text-xl font-bold">Market Trend</span>
                </div>
                <div className={`ml-11 text-lg font-semibold ${
                  stockData.market_analysis?.market_trend?.toLowerCase().includes('up') ? 'text-green-400' :
                  stockData.market_analysis?.market_trend?.toLowerCase().includes('down') ? 'text-red-400' :
                  'text-yellow-400'
                }`}>
                  {stockData.market_analysis?.market_trend || 'N/A'}
                </div>
              </div>
            </div>
          </div>

          {/* Risk Assessment */}
          <div className="border-t border-custom-purple py-4">
            {/* Risk Assessment Title */}
            <div className="flex flex-col items-center justify-center p-4 mb-4">
               <div className="flex items-center justify-center p-4 bg-[#6366f1]/10 rounded-2xl w-16 h-16 sm:w-20 sm:h-20 mb-2 sm:mb-0 transition-all duration-300 group-hover:bg-[#6366f1]/20 group-hover:scale-110">
                  <img src={imageSrc} alt={'hola'} className="w-8 h-8 sm:w-12 sm:h-12 transition-transform duration-300 group-hover:scale-110 object-contain"/>
                </div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold break-words text-center">Risk Assessment</h3>
            </div>
            <div className="space-y-3">
              <div className="p-4 bg-custom-purple rounded-lg hover:bg-opacity-80 transition-all duration-300">
                <div className="flex items-center mb-2">
                  <div className="bg-black rounded-full w-12 h-12 flex items-center justify-center mr-3">
                    <span className="text-lg">🌍</span>
                  </div>
                  <span className="text-xl font-bold">Market Conditions</span>
                </div>
                <p className="text-sm ml-11">{stockData.risk_assessment?.market_conditions || 'N/A'}</p>
              </div>
              <div className="p-4 bg-custom-purple rounded-lg hover:bg-opacity-80 transition-all duration-300">
                <div className="flex items-center mb-2">
                  <div className="bg-black rounded-full w-12 h-12 flex items-center justify-center mr-3">
                    <span className="text-lg">⚠️</span>
                  </div>
                  <span className="text-xl font-bold">Technical Risks</span>
                </div>
                <p className="text-sm ml-11">{stockData.risk_assessment?.technical_risks || 'N/A'}</p>
              </div>
              <div className="p-4 bg-custom-purple rounded-lg hover:bg-opacity-80 transition-all duration-300">
                <div className="flex items-center mb-2">
                  <div className="bg-black rounded-full w-12 h-12 flex items-center justify-center mr-3">
                    <span className="text-lg">🎯</span>
                  </div>
                  <span className="text-xl font-bold">Setup Risks</span>
                </div>
                <p className="text-sm ml-11">{stockData.risk_assessment?.setup_risks || 'N/A'}</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  };

  const parseAIData = (data) => {
    const analysis = JSON.parse(data.response);
    const stockData = analysis.stock_summary;

    setAnalysisData({
      ticker: stockData.ticker,
      trade_setup: {
        buy_point: stockData.trade_setup?.buy_point,
        target_price: stockData.trade_setup?.target_price,
        stop_loss: stockData.trade_setup?.stop_loss,
        setup_type: stockData.trade_setup?.setup_type
      },
      technical_analysis: {
        trend: stockData.technical_analysis?.trend,
        distance_from_52_week_high: stockData.technical_analysis?.distance_from_52_week_high,
        volume_analysis: stockData.technical_analysis?.volume_analysis,
        technical_setup_trigger_key_triggers: stockData.technical_analysis?.technical_setup_trigger_key_triggers,
        technical_setup_trigger_risk_factors: stockData.technical_analysis?.technical_setup_trigger_risk_factors
      },
      fundamental_analysis: {
        quarterly_eps_growth: stockData.fundamental_analysis?.quarterly_eps_growth,
        annual_growth_trend: stockData.fundamental_analysis?.annual_growth_trend,
        industry_position: stockData.fundamental_analysis?.industry_position,
        sector_performance: stockData.fundamental_analysis?.sector_performance
      },
      institutional_ownership: {
        institutional_ownership_trend: stockData.institutional_ownership?.institutional_ownership_trend
      },
      market_analysis: {
        market_sentiment: stockData.market_analysis?.market_sentiment,
        market_trend: stockData.market_analysis?.market_trend
      },
      risk_assessment: {
        market_conditions: stockData.risk_assessment?.market_conditions,
        technical_risks: stockData.risk_assessment?.technical_risks,
        setup_risks: stockData.risk_assessment?.setup_risks
      }
    });

    return stockData;
  };

  const handleAskAi = () => {
    try {
      if (analysisData.ticker) {
        // Encode the data as URL parameters
        const params = new URLSearchParams({
          data: JSON.stringify(analysisData)
        }).toString();

        // Open the URL with parameters
        window.open(`${useRagUrl}/ask?${params}`, '_blank');
      } else {
        // Open URL without parameters if no data
        window.open(`${useRagUrl}/ask`, '_blank');
      }
    } catch (err) {
      console.error('Error processing data:', err);
      // Open URL without parameters if there's an error
      window.open(`${useRagUrl}/ask`, '_blank');
    }
  };

  return (
    <div className="bg-black text-gray-300 min-h-screen flex flex-col items-center justify-start py-4 px-4 relative">
      <div className="w-full max-w-3xl mt-4 mx-auto">
        <div className="flex flex-col items-center">
          <img
            src={brainLogo}
            alt="Logo"
            className="w-60 h-60 rounded-full"
          />
          <h1 className="text-3xl font-extrabold text-custom-purple text-center mt-4 mb-4">
            Stock Analysis Assistant
          </h1>
          <button
            onClick={handleAskAi}
            className="mb-4 bg-custom-purple text-white py-2 px-4 rounded-lg hover:bg-black hover:text-custom-purple hover:border hover:border-custom-purple"
          >
            Ask AI
          </button>
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-custom-purple shadow-md rounded-lg p-4 mb-4"
          method="post"
        >
          <label
            htmlFor="input"
            className="block text-lg font-normal text-gray-300 mb-2"
          >
            Enter Stock Ticker or Company Name:
          </label>
          <textarea
            id="input"
            rows="3"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-black text-gray-300"
            placeholder="e.g., AAPL, MSFT, GOOGL"
          ></textarea>
          <button
            type="submit"
            className="mt-3 bg-custom-purple border border-white text-white py-2 px-4 rounded-lg w-full hover:bg-black"
          >
            Analyze Stock
          </button>
        </form>

        {response && <div>{response}</div>}
        {error && <div className="text-red-400 text-center mt-3">{error}</div>}
      </div>

      {/* Print Button */}
      <button
        onClick={() => window.print()}
        className="fixed bottom-4 right-4 bg-custom-purple text-white py-2 px-4 rounded-lg shadow-lg hover:bg-black hover:text-custom-purple hover:border hover:border-custom-purple"
      >
        Print Analysis
      </button>
    </div>
  );
};

export default StockAnalysisView;



