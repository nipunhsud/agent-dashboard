import React, { useState, useEffect, useCallback, useRef } from "react";
import brainLogo from '../../assets/brain-logo.png';
import useCSRFToken from "../../hooks/useCSRFToken"
import { useAuth } from "../../utils/AuthContext";
import LoadingState from "./LoadingState/LoadingState";
import useBackendUrl from "../../hooks/useBackendUrl";
import useRagUrl from "../../hooks/useChatUrl";
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db, auth } from '../../config/firebase';
import { sendEmailVerification } from "firebase/auth";
import { useLocation, useNavigate, Link } from 'react-router-dom';


const StockAnalysisView = () => {
  const [ticker, setTicker] = useState("");
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
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const [showSubscribeModal, setShowSubscribeModal] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const requestPendingRef = useRef(false);
  const MAX_RETRIES = 5;
  const RETRY_DELAY = 1000;
  const [showTradingRules, setShowTradingRules] = useState(false);
  const [emailVerified, setEmailVerified] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    // Load Stripe script
    const script = document.createElement('script');
    script.src = 'https://js.stripe.com/v3/buy-button.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  // Sync URL ticker to input
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tickerParam = params.get('ticker');
    if (tickerParam && tickerParam !== ticker) {
      setTicker(tickerParam.toUpperCase());
    }
  }, [location.search]);

  // Sync input ticker to URL
  useEffect(() => {
    if (ticker) {
      const params = new URLSearchParams(location.search);
      const currentTicker = params.get('ticker');
      if (currentTicker !== ticker) {
        params.set('ticker', ticker);
        navigate(`?${params.toString()}`, { replace: true });
      }
    }
  }, [ticker, navigate, location.search]);

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

  const isValidTickerSymbol = (ticker) => {
    return /^[A-Z]{1,5}$/.test(ticker);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!auth.currentUser) {
      setShowAuthModal(true);
      return;
    }

    if (auth.currentUser && !auth.currentUser.emailVerified) {
      setError("Please verify your email first! Check your inbox for the verification link.");
      setEmailVerified(false);
      return;
    }

    const cleanTicker = ticker.trim().toUpperCase();

    if (!cleanTicker) {
      setError("Please enter a stock symbol");
      return;
    }

    if (!isValidTickerSymbol(cleanTicker)) {
      setError("Please enter a valid stock symbol (1-5 letters only)");
      return;
    }

    if (!csrfToken) {
      console.error("CSRF token is not set yet.");
      setError("Unable to submit the form. CSRF token is missing.");
      return;
    }

    // Only set loading state after all checks pass
    setError("");
    setResponse(<LoadingState />);

    try {
      const formData = new FormData();
      formData.append('input', cleanTicker);

      const res = await fetch(`${backendUrl}/research/stocks/`, {
        method: "POST",
        credentials: "include",
        headers: {
          "X-CSRFToken": csrfToken,
          "Authorization": `Bearer ${token}`,
        },
        body: formData,
      });
      
      if (res.status === 401) {
        handleAuthPrompt();
        return;
      }
      
      if (res.status === 429) {
        handleLimitReached();
        return;
      }
      
      if (!res.ok) {
        const errorData = await res.json();
        if (errorData.error?.toLowerCase().includes('daily limit')) {
          handleLimitReached();
          return;
        }
        throw new Error(errorData.error || "Failed to fetch stock analysis");
      }

      const data = await res.json();
      const stockData = parseAIData(data);
      setResponse(formatResponse(stockData));
    } catch (err) {
      setError(err.message);
      if (err.message?.toLowerCase().includes('daily limit')) {
        handleLimitReached();
      }
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

    // Set the analysis data for the chat feature
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
    // Check if user is logged in first
    if (!auth.currentUser) {
      setShowAuthModal(true);
      return;
    }

    if (auth.currentUser && !auth.currentUser.emailVerified) {
      setEmailVerified(false);
      return;
    }

    setShowChatModal(true);
  };

  const handleAuthPrompt = () => {
    setShowAuthModal(true);
  };

  const checkSubscription = async () => {
    try {
      // Get current user's email from auth context
      const userEmail = auth.currentUser?.email;
      
      if (!userEmail) {
        console.error("No user email found");
        return false;
      }

      // Query Firestore for stripe_customers collection
      const stripeCustomersRef = collection(db, 'stripe_customers');
      const q = query(stripeCustomersRef, where('email', '==', userEmail));
      const querySnapshot = await getDocs(q);

      // If document exists, user has subscription
      const hasSubscription = !querySnapshot.empty;
      
      if (!hasSubscription) {
        setShowSubscribeModal(true);
      }
      
      return hasSubscription;

    } catch (err) {
      console.error("Error checking subscription:", err);
      setShowSubscribeModal(true); // Show modal by default if check fails
      return false;
    }
  };

  // Update handleLimitReached to use this check
  const handleLimitReached = async () => {
    const hasSubscription = await checkSubscription();
    if (!hasSubscription) {
      setShowSubscribeModal(true);
    } else {
      setError("Unexpected error: Limit reached with active subscription. Please contact support.");
    }
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        // Mobile share API
        await navigator.share({
          title: `${analysisData.ticker} Stock Analysis by Quanta AI`,
          text: ` Buy point: ${analysisData.trade_setup?.buy_point} Target Price: ${analysisData.trade_setup?.target_price} Stop Loss: ${analysisData.trade_setup?.stop_loss}`,
          triggers: analysisData.technical_analysis?.technical_setup_trigger_key_triggers,
          url: window.location.href
        });
      } else {
        // Fallback to copy link
        const url = window.location.href;
        await navigator.clipboard.writeText(url);
        // You might want to add a toast notification here
        alert("Link copied to clipboard!");
      }
    } catch (err) {
      console.error("Error sharing:", err);
    }
  };

  const handleTickerChange = (e) => {
    const newTicker = e.target.value.toUpperCase();
    setTicker(newTicker);
  };

  // Add this modal component
  const EmailVerificationModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-custom-purple p-6 rounded-lg shadow-xl max-w-md w-full mx-4 relative">
        <button
          onClick={() => setEmailVerified(true)}
          className="absolute top-2 right-2 text-gray-300 hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <h2 className="text-xl font-bold mb-4 text-center">Email Verification Required</h2>
        <p className="text-center mb-6">
          Please verify your email address to continue using Quanta AI. Check your inbox for the verification link.
        </p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={async () => {
              try {
                await sendEmailVerification(auth.currentUser);
                setSuccessMessage("Verification email sent! Please check your inbox.");
                setEmailVerified(true);
              } catch (error) {
                setError("Error sending verification email. Please try again later.");
              }
            }}
            className="bg-black text-white px-6 py-2 rounded-lg hover:bg-opacity-80 transition-colors"
          >
            Resend Verification Email
          </button>
          <button
            onClick={() => setEmailVerified(true)}
            className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-opacity-80 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-[#f5f5f7] min-h-screen flex flex-col items-center justify-start py-8 px-4 relative">
      {successMessage && (
        <div className="text-green-600 text-center mt-3 mb-3">
          {successMessage}
        </div>
      )}
      <div className="w-full max-w-3xl mt-4 mx-auto">
        {/* Logo and Title Section */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-[120px] h-[120px] bg-white rounded-[20px] flex items-center justify-center">
            <img
              src={brainLogo}
              alt="Logo"
              className="w-24 h-24"
            />
          </div>
          <h1 className="text-[32px] font-bold text-[#0C0B0B] mt-6">
            Quanta AI
          </h1>
        </div>

        {/* Dashboard Link */}
        <Link 
          to="/dashboard" 
          className="mb-6 bg-white text-[#0C0B0B] py-[8px] px-[24px] rounded-[8px] border-2 border-[#0C0B0B] hover:bg-[#0C0B0B] hover:text-white transform transition-all duration-300 flex items-center justify-center gap-2 font-bold text-[13px] robotoFont"
        >
          <span>View Historical Analysis</span>
          <span>→</span>
        </Link>

        {/* Analysis Form */}
        <div className="bg-white rounded-[12px] p-6 mb-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <label
              htmlFor="ticker"
              className="font-bold text-[20px] text-[#0C0B0B]"
            >
              Enter Stock Ticker or Company Name
            </label>
            <button
              type="button"
              onClick={() => setShowTradingRules(!showTradingRules)}
              className="border-2 text-[13px] text-[#0C0B0B] border-[#0C0B0B] px-[24px] py-[8px] rounded-[8px] hover:bg-[#0C0B0B] hover:text-white transform transition-all duration-300 font-bold robotoFont"
            >
              Trading Rules
            </button>
          </div>

          <p className="text-gray-500 text-[13px] robotoFont mb-4">
            Enter a stock symbol (e.g., AAPL) or company name for instant AI analysis
          </p>

          <div className="flex flex-col gap-4">
            <input
              id="ticker"
              type="text"
              value={ticker}
              onChange={handleTickerChange}
              className="w-full p-4 border-2 border-gray-200 rounded-[8px] focus:outline-none focus:border-[#0C0B0B] text-[#0C0B0B] text-[13px] robotoFont"
              placeholder="AAPL"
              autoComplete="off"
              spellCheck="false"
            />

            <button
              type="submit"
              onClick={handleSubmit}
              className="border-2 text-[13px] text-[#0C0B0B] border-[#0C0B0B] px-[24px] py-[8px] rounded-[8px] hover:bg-[#0C0B0B] hover:text-white transform transition-all duration-300 font-bold robotoFont"
            >
              Analyze Stock
            </button>
          </div>
        </div>

        {/* Chat Button */}
        <button
          onClick={handleAskAi}
          className="border-2 w-full text-[13px] text-[#0C0B0B] border-[#0C0B0B] px-[24px] py-[8px] rounded-[8px] hover:bg-[#0C0B0B] hover:text-white transform transition-all duration-300 font-bold robotoFont flex items-center justify-center gap-2"
        >
          <span>💬</span>
          <span>Chat with Quanta</span>
          <span>→</span>
        </button>

        {response && <div className="mt-4">{response}</div>}
        {error && <div className="text-red-600 text-center mt-3">{error}</div>}
      </div>

      {/* Share and Print Buttons */}
      <div className="fixed bottom-4 right-4 flex gap-2">
        <button
          onClick={handleShare}
          className="border-2 text-[13px] text-[#0C0B0B] border-[#0C0B0B] px-[24px] py-[8px] rounded-[8px] hover:bg-[#0C0B0B] hover:text-white transition-all duration-300 font-bold robotoFont flex items-center gap-2"
        >
          <span>Share</span>
          <span>📤</span>
        </button>
        <button
          onClick={() => window.print()}
          className="border-2 text-[13px] text-[#0C0B0B] border-[#0C0B0B] px-[24px] py-[8px] rounded-[8px] hover:bg-[#0C0B0B] hover:text-white transition-all duration-300 font-bold robotoFont flex items-center gap-2"
        >
          <span>Print</span>
          <span>🖨️</span>
        </button>
      </div>

      {/* Modals with matching styling */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-[12px] shadow-sm max-w-md w-full mx-4 relative">
            <button
              onClick={() => setShowAuthModal(false)}
              className="absolute top-2 right-2 text-[#0C0B0B] hover:opacity-70 transition-opacity"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <h2 className="text-[20px] font-bold text-[#0C0B0B] mb-4">Unlock Quanta AI</h2>
            <p className="text-gray-500 text-[13px] robotoFont mb-6">
              Get instant access to powerful AI-driven stock analysis - create your free account now! 🚀
            </p>
            <button
              onClick={() => window.location.href = '/signup'}
              className="border-2 w-full text-[13px] text-[#0C0B0B] border-[#0C0B0B] px-[24px] py-[8px] rounded-[8px] hover:bg-[#0C0B0B] hover:text-white transition-all duration-300 font-bold robotoFont"
            >
              Start Free Analysis
            </button>
          </div>
        </div>
      )}

      {/* Other modals follow the same styling pattern */}
    </div>
  );
};

export default StockAnalysisView;



