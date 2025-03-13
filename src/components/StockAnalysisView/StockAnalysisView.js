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

  // Add this dummy data object
  const dummyStockData = {
    ticker: "DEMO",
    current_metrics: {
      price: 150.25,
      volume: 1234567,
      fifty_two_week: {
        high: 180.50,
        low: 120.75
      }
    },
    recommendation: {
      action: "STRONG BUY",
      triggers: [
        "Breaking out of consolidation pattern",
        "Strong volume confirmation",
        "Positive earnings momentum"
      ],
      risk_factors: [
        "Market volatility",
        "Sector rotation risk",
        "Technical resistance at $160"
      ],
      risk_management: "Set stop loss at $145 to limit downside risk. Consider scaling in positions."
    },
    trade_setup: {
      buy_point: 152.50,
      target_price: 175.00,
      stop_loss: 145.00,
      setup_type: "Bull Flag Breakout"
    },
    technical_analysis: {
      moving_averages: {
        ema_50: 148.50,
        ema_150: 145.75,
        ema_200: 142.25
      },
      trend: "Bullish",
      distance_from_52_week_high: "-16.8%",
      volume_analysis: "Above average volume showing institutional interest",
      volatility_pattern: "Decreasing volatility indicating potential breakout",
      technical_setup: "Forming bullish consolidation pattern",
      technical_setup_trigger: "Watch for breakout above $152 with volume"
    },
    fundamental_analysis: {
      quarterly_eps_growth: [0.25, 0.32, 0.28],
      quarterly_eps_growth_trend: "Consistent growth over last 4 quarters",
      annual_growth_trend: "Strong year-over-year revenue growth",
      industry_position: "Market leader in sector",
      sector_performance: "Technology sector showing strength"
    },
    institutional_ownership: {
      institutional_ownership: "72% institutional ownership",
      institutional_ownership_trend: "Increasing institutional accumulation"
    },
    market_analysis: {
      market_sentiment: "Bullish",
      market_trend: "Uptrend"
    },
    risk_assessment: {
      market_conditions: "Favorable market conditions with strong sector performance",
      technical_risks: "Watch for potential resistance at previous highs",
      setup_risks: "Monitor volume for confirmation of breakout"
    }
  };

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
    return /^[A-Z]{1,10}$/.test(ticker);
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
        <div className="bg-white text-[#0C0B0B] shadow-md rounded-[12px] p-6 max-w-4xl mx-auto mb-6">
          {/* Stock Analysis Title */}
          <div className="flex flex-col items-center justify-center p-4 mb-4">  
            <div className="flex items-center justify-center p-4 bg-[#f5f5f7] rounded-[12px] w-16 h-16 sm:w-20 sm:h-20 sm:mb-2 sm:mb-0 transition-all duration-300 hover:bg-[#e5e5e7] hover:scale-105">
                <img src={imageSrc} alt={'hola'} className="w-8 h-8 sm:w-12 sm:h-12 transition-transform duration-300 group-hover:scale-110 object-contain"/>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold break-words text-center text-[#0C0B0B]">
              {stockData.ticker} Analysis
            </h2>
          
          </div>
          
          {/* Current Metrics */}
          <div className="mb-6">
            <div className="flex items-center mb-3">
              <div className="bg-[#f5f5f7] rounded-[12px] w-12 h-12 flex items-center justify-center mr-3">
                <span className="text-lg">📊</span>
              </div>
              <h4 className="text-xl font-bold text-[#0C0B0B]">Important Metrics</h4>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-3 bg-[#f5f5f7] rounded-[12px] hover:bg-[#e5e5e7] transition-all duration-300">
                <span className="block font-bold text-[#0C0B0B]">Current Price</span>
                <span className="text-lg text-[#0C0B0B]">${stockData.current_metrics?.price?.toFixed(2) || 'N/A'}</span>
              </div>
              <div className="p-3 bg-[#f5f5f7] rounded-[12px] hover:bg-[#e5e5e7] transition-all duration-300">
                <span className="block font-bold text-[#0C0B0B]">Volume</span>
                <span className="text-lg text-[#0C0B0B]">{stockData.current_metrics?.volume?.toLocaleString() || 'N/A'}</span>
              </div>
              <div className="p-3 bg-[#f5f5f7] rounded-[12px] hover:bg-[#e5e5e7] transition-all duration-300">
                <span className="block font-bold text-[#0C0B0B]">52W High</span>
                <span className="text-lg text-[#0C0B0B]">${stockData.current_metrics?.fifty_two_week?.high?.toFixed(2) || 'N/A'}</span>
              </div>
              <div className="p-3 bg-[#f5f5f7] rounded-[12px] hover:bg-[#e5e5e7] transition-all duration-300">
                <span className="block font-bold text-[#0C0B0B]">52W Low</span>
                <span className="text-lg text-[#0C0B0B]">${stockData.current_metrics?.fifty_two_week?.low?.toFixed(2) || 'N/A'}</span>
              </div>
            </div>
          </div>

          {/* Recommendation Section */}
          <div className="border-t border-[#f5f5f7] py-4">
            {/* Recommendation Title */}
            <div className="flex flex-col items-center justify-center p-4 mb-4">
              <div className="flex items-center justify-center p-4 bg-[#f5f5f7] rounded-[12px] w-16 h-16 sm:w-20 sm:h-20 mb-2 sm:mb-0 transition-all duration-300 hover:bg-[#e5e5e7] hover:scale-105">
                  <img src={imageSrc} alt={'hola'} className="w-8 h-8 sm:w-12 sm:h-12 transition-transform duration-300 group-hover:scale-110 object-contain"/>
              </div> 
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold break-words text-center text-[#0C0B0B]">Recommendation</h3>
            </div>

            {/* Action Recommendation */}
            <div className="p-6 bg-[#f5f5f7] rounded-[12px] mb-4 hover:bg-[#e5e5e7] transition-all duration-300">
              <div className={`text-3xl font-bold text-center py-3 px-6 rounded-[12px] ${
                stockData.recommendation.action.toLowerCase().includes('buy') ? 'bg-green-100 text-green-600' :
                stockData.recommendation.action.toLowerCase().includes('sell') ? 'bg-red-100 text-red-600' :
                'bg-yellow-100 text-yellow-600'
              }`}>
                {stockData.recommendation.action}
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-[#f5f5f7] rounded-[12px] hover:bg-[#e5e5e7] transition-all duration-300">
                <div className="flex items-center mb-3">
                  <div className="bg-white rounded-[12px] w-12 h-12 flex items-center justify-center mr-3 shadow-sm">
                    <span className="text-lg">🎯</span>
                  </div>
                  <h4 className="text-xl font-bold text-[#0C0B0B]">Key Triggers</h4>
                </div>
                <ul className="list-disc list-inside ml-11 text-[#0C0B0B]">
                  {stockData.recommendation.triggers.map((trigger, index) => (
                    <li key={index}>{trigger}</li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-[#f5f5f7] rounded-[12px] hover:bg-[#e5e5e7] transition-all duration-300">
                <div className="flex items-center mb-3">
                  <div className="bg-white rounded-[12px] w-12 h-12 flex items-center justify-center mr-3 shadow-sm">
                    <span className="text-lg">⚠️</span>
                  </div>
                  <h4 className="text-xl font-bold text-[#0C0B0B]">Risk Factors</h4>
                </div>
                <ul className="list-disc list-inside ml-11 text-[#0C0B0B]">
                  {stockData.recommendation.risk_factors.map((risk, index) => (
                    <li key={index}>{risk}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Trade Setup Section */}
            <div className="mt-6">
              <div className="flex items-center mb-3">
                <div className="bg-white rounded-[12px] w-12 h-12 flex items-center justify-center mr-3">
                  <span className="text-lg">📈</span>
                </div>
                <h4 className="text-xl font-bold text-[#0C0B0B]">Trade Setup</h4>
              </div>
              
              <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-3">
                  <div className="p-3 bg-[#f5f5f7] rounded-[12px] hover:bg-[#e5e5e7] transition-all duration-300">
                    <span className="block font-bold text-[#0C0B0B]">Buy Point</span>
                    <span className="text-lg text-[#0C0B0B]">${stockData.trade_setup?.buy_point?.toFixed(2) || 'N/A'}</span>
                  </div>
                  <div className="p-3 bg-[#f5f5f7] rounded-[12px] hover:bg-[#e5e5e7] transition-all duration-300">
                    <span className="block font-bold text-[#0C0B0B]">Target</span>
                    <span className="text-lg text-[#0C0B0B]">${stockData.trade_setup?.target_price?.toFixed(2) || 'N/A'}</span>
                  </div>
                  <div className="p-3 bg-[#f5f5f7] rounded-[12px] hover:bg-[#e5e5e7] transition-all duration-300">
                    <span className="block font-bold text-[#0C0B0B]">Stop Loss</span>
                    <span className="text-lg text-[#0C0B0B]">${stockData.trade_setup?.stop_loss?.toFixed(2) || 'N/A'}</span>
                  </div>
                </div>
                <div className="p-3 bg-[#f5f5f7] rounded-[12px] hover:bg-[#e5e5e7] transition-all duration-300">
                  <span className="block font-bold text-[#0C0B0B]">Setup Type</span>
                  <span className="text-lg text-[#0C0B0B]">{stockData.trade_setup?.setup_type || 'N/A'}</span>
                </div>
              </div>
            </div>

            {/* Risk Management Section */}
            <div className="mt-6">
              <div className="flex items-center mb-3">
                <div className="bg-white rounded-[12px] w-12 h-12 flex items-center justify-center mr-3">
                  <span className="text-lg">🛡️</span>
                </div>
                <h4 className="text-xl font-bold text-[#0C0B0B]">Risk Management</h4>
              </div>
              
              <div className="p-4 bg-[#f5f5f7] rounded-[12px] hover:bg-[#e5e5e7] transition-all duration-300">
                <p className="text-lg text-[#0C0B0B]">{stockData.recommendation.risk_management || 'N/A'}</p>
              </div>
            </div>
          </div>
          {/* Chart Section */}
          {/* <Chart/> */}

          {/* Technical Analysis */}
          <div className="border-t border-[#f5f5f7] py-4 space-y-4">
            {/* Technical Analysis Title */}
            <div className="flex flex-col items-center justify-center p-4 mb-4">
              <div className="flex items-center justify-center p-4 bg-[#f5f5f7] rounded-[12px] w-16 h-16 sm:w-20 sm:h-20 mb-2 sm:mb-0 transition-all duration-300 hover:bg-[#e5e5e7] hover:scale-105">
                  <img src={imageSrc} alt={'hola'} className="w-8 h-8 sm:w-12 sm:h-12 transition-transform duration-300 group-hover:scale-110 object-contain"/>
              </div> 
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold break-words text-center text-[#0C0B0B]">Technical Analysis</h3>
            </div>

            {/* Moving Averages Section */}
            <div className="mb-6">
              <div className="flex items-center mb-3">
                <div className="bg-white rounded-[12px] w-12 h-12 flex items-center justify-center mr-3">
                  <span className="text-lg">📈</span>
                </div>
                <h4 className="text-xl font-bold text-[#0C0B0B]">Moving Averages (EMA)</h4>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-3">
                <div className="p-3 bg-[#f5f5f7] rounded-[12px] hover:bg-[#e5e5e7] transition-all duration-300">
                  <span className="block font-bold text-[#0C0B0B]">EMA 50</span>
                  <span className="text-lg text-[#0C0B0B]">${stockData.technical_analysis?.moving_averages?.ema_50?.toFixed(2) || 'N/A'}</span>
                </div>
                <div className="p-3 bg-[#f5f5f7] rounded-[12px] hover:bg-[#e5e5e7] transition-all duration-300">
                  <span className="block font-bold text-[#0C0B0B]">EMA 150</span>
                  <span className="text-lg text-[#0C0B0B]">${stockData.technical_analysis?.moving_averages?.ema_150?.toFixed(2) || 'N/A'}</span>
                </div>
                <div className="p-3 bg-[#f5f5f7] rounded-[12px] hover:bg-[#e5e5e7] transition-all duration-300">
                  <span className="block font-bold text-[#0C0B0B]">EMA 200</span>
                  <span className="text-lg text-[#0C0B0B]">${stockData.technical_analysis?.moving_averages?.ema_200?.toFixed(2) || 'N/A'}</span>
                </div>
              </div>
            </div>

            {/* Trend Analysis Section */}
            <div className="mb-6">
              <div className="flex items-center mb-3">
                <div className="bg-white rounded-[12px] w-12 h-12 flex items-center justify-center mr-3">
                  <span className="text-lg">🎯</span>
                </div>
                <h4 className="text-xl font-bold text-[#0C0B0B]">Trend Analysis</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-[#f5f5f7] rounded-[12px] hover:bg-[#e5e5e7] transition-all duration-300">
                  <span className="block font-bold mb-2 text-[#0C0B0B]">Overall Trend</span>
                  <div className={`text-lg font-semibold ${
                    stockData.technical_analysis?.trend?.includes('Bullish') ? 'text-green-500' :
                    stockData.technical_analysis?.trend?.includes('Bearish') ? 'text-red-500' :
                    'text-yellow-500'
                  }`}>
                    {stockData.technical_analysis?.trend || 'N/A'}
                  </div>
                </div>
                <div className="p-4 bg-[#f5f5f7] rounded-[12px] hover:bg-[#e5e5e7] transition-all duration-300">
                  <span className="block font-bold mb-2 text-[#0C0B0B]">Distance from 52W High</span>
                  <span className="text-lg text-[#0C0B0B]">
                    {stockData.technical_analysis?.distance_from_52_week_high || 'N/A'}
                  </span>
                </div>
              </div>
            </div>

            {/* Volume Analysis */}
            <div className="p-3 bg-[#f5f5f7] rounded-[12px] hover:bg-[#e5e5e7] transition-all duration-300">
              <span className="block font-bold mb-2 text-[#0C0B0B]">Volume and Volatility Pattern Analysis</span>
              <p className="text-sm text-[#0C0B0B]">{stockData.technical_analysis?.volume_analysis || 'N/A'}</p>
              <p className="text-sm text-[#0C0B0B]">{stockData.technical_analysis?.volatility_pattern || 'N/A'}</p>
            </div>

            {/* Technical Setup */}
            <div className="space-y-3">
              <div className="p-3 bg-[#f5f5f7] rounded-[12px] hover:bg-[#e5e5e7] transition-all duration-300">
                <span className="block font-bold mb-2 text-[#0C0B0B]">Technical Setup</span>
                <p className="text-sm text-[#0C0B0B]">{stockData.technical_analysis?.technical_setup || 'N/A'}</p>
                <p className="text-sm text-[#0C0B0B]">{stockData.technical_analysis?.technical_setup_trigger || 'N/A'}</p>
              </div>

              {/* Key Triggers */}
              <div className="p-3 bg-[#f5f5f7] rounded-[12px] hover:bg-[#e5e5e7] transition-all duration-300">
                <span className="block font-bold mb-2 text-[#0C0B0B]">Key Triggers and Risks</span>
                <p className="text-sm text-[#0C0B0B]">{stockData.technical_analysis?.technical_setup_trigger_key_triggers || 'N/A'}</p>
                <p className="text-sm text-[#0C0B0B]">{stockData.technical_analysis?.technical_setup_trigger_risk_factors || 'N/A'}</p>
              </div>
            </div>
          </div>
        
          {/* Fundamental Analysis */}
          <div className="border-t border-[#f5f5f7] py-4 space-y-4">
            {/* Fundamental Analysis Title */}
            <div className="flex flex-col items-center justify-center p-4 mb-4">
                <div className="flex items-center justify-center p-4 bg-[#f5f5f7] rounded-[12px] w-16 h-16 sm:w-20 sm:h-20 mb-2 sm:mb-0 transition-all duration-300 hover:bg-[#e5e5e7] hover:scale-105">
                  <img src={imageSrc} alt={'hola'} className="w-8 h-8 sm:w-12 sm:h-12 transition-transform duration-300 group-hover:scale-110 object-contain"/>
                </div> 
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold break-words text-center text-[#0C0B0B]">Fundamental Analysis</h3>
            </div>
            
            {/* EPS Growth */}
            <div className="mb-6">
              <div className="flex items-center mb-3">
                <div className="bg-white rounded-[12px] w-12 h-12 flex items-center justify-center mr-3">
                  <span className="text-lg">📈</span>
                </div>
                <h4 className="text-xl font-bold text-[#0C0B0B]">Quarterly EPS Growth</h4>
              </div>
              
              <div className="p-4 bg-[#f5f5f7] rounded-[12px] hover:bg-[#e5e5e7] transition-all duration-300">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-3">
                  {stockData.fundamental_analysis?.quarterly_eps_growth?.map((growth, index) => (
                    <div key={index} className="text-center p-2 bg-white rounded-[12px]">
                      <span className="block font-bold text-[#0C0B0B]">Q{3 - index}</span>
                      <span className={`text-lg font-semibold ${growth > 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {(growth * 100).toFixed(1)}%
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-[#0C0B0B] mt-2">{stockData.fundamental_analysis?.quarterly_eps_growth_trend}</p>
              </div>
            </div>

            {/* Growth Trends */}  
            <div className="mb-6">
              <div className="flex items-center mb-3">
                <div className="bg-white rounded-[12px] w-12 h-12 flex items-center justify-center mr-3">
                  <span className="text-lg">📊</span>
                </div>
                <h4 className="text-xl font-bold text-[#0C0B0B]">Growth Analysis</h4>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3 bg-[#f5f5f7] rounded-[12px] hover:bg-[#e5e5e7] transition-all duration-300">
                  <div className="flex items-center mb-2">
                    <div className="bg-white rounded-[12px] w-12 h-12 flex items-center justify-center mr-2">
                      <span className="text-sm text-[#0C0B0B]">📅</span>
                    </div>
                    <h4 className="font-bold text-[#0C0B0B]">Annual Growth</h4>
                  </div>
                  <p className="text-sm text-[#0C0B0B]">{stockData.fundamental_analysis?.annual_growth_trend}</p>
                </div>
                <div className="p-3 bg-[#f5f5f7] rounded-[12px] hover:bg-[#e5e5e7] transition-all duration-300">
                  <div className="flex items-center mb-2">
                    <div className="bg-white rounded-[12px] w-12 h-12 flex items-center justify-center mr-2">
                      <span className="text-sm text-[#0C0B0B]">🏢</span>
                    </div>
                    <h4 className="font-bold text-[#0C0B0B]">Industry Position</h4>
                  </div>
                  <p className="text-sm text-[#0C0B0B]">{stockData.fundamental_analysis?.industry_position}</p>
                </div>
              </div>
            </div>

            {/* Sector Performance */}
            <div className="p-3 bg-[#f5f5f7] rounded-[12px] hover:bg-[#e5e5e7] transition-all duration-300">
              <h4 className="font-bold mb-2 text-[#0C0B0B]">Sector Performance</h4>
              <p className="text-sm text-[#0C0B0B]">{stockData.fundamental_analysis?.sector_performance}</p>
            </div>
          </div>

          {/* Institutional Ownership */}
          <div className="border-t border-[#f5f5f7] py-4">    
              <div className="flex flex-col items-center justify-center p-4 mb-4">
                <div className="flex items-center justify-center p-4 bg-[#f5f5f7] rounded-[12px] w-16 h-16 sm:w-20 sm:h-20 mb-2 sm:mb-0 transition-all duration-300 hover:bg-[#e5e5e7] hover:scale-105">
                    <img src={imageSrc} alt={'hola'} className="w-8 h-8 sm:w-12 sm:h-12 transition-transform duration-300 group-hover:scale-110 object-contain"/>
                </div>  
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold break-words text-center text-[#0C0B0B]">Institutional Ownership</h3>
              </div>
              
              <div className="space-y-3">
                <div className="p-4 bg-[#f5f5f7] rounded-[12px] hover:bg-[#e5e5e7] transition-all duration-300">
                  <div className="flex items-center mb-2">
                    <div className="bg-white rounded-[12px] w-12 h-12 flex items-center justify-center mr-3">
                      <span className="text-lg text-[#0C0B0B]">🏦</span>
                    </div>
                    <span className="text-xl font-bold text-[#0C0B0B]">Current Ownership</span>
                  </div>
                  <p className="text-sm text-[#0C0B0B] ml-11">
                    {stockData.institutional_ownership?.institutional_ownership || 'No ownership data available'}
                  </p>
                </div>
                <div className="p-4 bg-[#f5f5f7] rounded-[12px] hover:bg-[#e5e5e7] transition-all duration-300">
                  <div className="flex items-center mb-2">
                    <div className="bg-white rounded-[12px] w-12 h-12 flex items-center justify-center mr-3">
                      <span className="text-lg text-[#0C0B0B]">📈</span>
                    </div>
                    <span className="text-xl font-bold text-[#0C0B0B]">Ownership Trend</span>
                  </div>
                  <p className="text-sm text-[#0C0B0B] ml-11">
                    {stockData.institutional_ownership?.institutional_ownership_trend || 'No trend data available'}
                  </p>
                </div>
              </div>
          </div>

          {/* Market Analysis */}
          <div className="border-t border-[#f5f5f7] py-4">
            {/* Market Analysis Title */}
            <div className="flex flex-col items-center justify-center p-4 mb-4">
                <div className="flex items-center justify-center p-4 bg-[#f5f5f7] rounded-[12px] w-16 h-16 sm:w-20 sm:h-20 mb-2 sm:mb-0 transition-all duration-300 hover:bg-[#e5e5e7] hover:scale-105">
                  <img src={imageSrc} alt={'hola'} className="w-8 h-8 sm:w-12 sm:h-12 transition-transform duration-300 group-hover:scale-110 object-contain"/>
                </div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold break-words text-center text-[#0C0B0B]">Market Analysis</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-[#f5f5f7] rounded-[12px] hover:bg-[#e5e5e7] transition-all duration-300">
                <div className="flex items-center mb-2">
                  <div className="bg-white rounded-[12px] w-12 h-12 flex items-center justify-center mr-3">
                    <span className="text-lg text-[#0C0B0B]">🎯</span>
                  </div>
                  <span className="text-xl font-bold text-[#0C0B0B]">Market Sentiment</span>
                </div>
                <div className={`ml-11 text-lg font-semibold ${
                  stockData.market_analysis?.market_sentiment?.toLowerCase().includes('bullish') ? 'text-green-400' :
                  stockData.market_analysis?.market_sentiment?.toLowerCase().includes('bearish') ? 'text-red-400' :
                  'text-yellow-400'
                }`}>
                  {stockData.market_analysis?.market_sentiment || 'N/A'}
                </div>
              </div>
              <div className="p-4 bg-[#f5f5f7] rounded-[12px] hover:bg-[#e5e5e7] transition-all duration-300">
                <div className="flex items-center mb-2">
                  <div className="bg-white rounded-[12px] w-12 h-12 flex items-center justify-center mr-3">
                    <span className="text-lg text-[#0C0B0B]">📊</span>
                  </div>
                  <span className="text-xl font-bold text-[#0C0B0B]">Market Trend</span>
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
          <div className="border-t border-[#f5f5f7] py-4">
            {/* Risk Assessment Title */}
            <div className="flex flex-col items-center justify-center p-4 mb-4">
               <div className="flex items-center justify-center p-4 bg-[#f5f5f7] rounded-[12px] w-16 h-16 sm:w-20 sm:h-20 mb-2 sm:mb-0 transition-all duration-300 hover:bg-[#e5e5e7] hover:scale-105">
                  <img src={imageSrc} alt={'hola'} className="w-8 h-8 sm:w-12 sm:h-12 transition-transform duration-300 group-hover:scale-110 object-contain"/>
                </div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold break-words text-center text-[#0C0B0B]">Risk Assessment</h3>
            </div>
            <div className="space-y-3">
              <div className="p-4 bg-[#f5f5f7] rounded-[12px] hover:bg-[#e5e5e7] transition-all duration-300">
                <div className="flex items-center mb-2">
                  <div className="bg-white rounded-[12px] w-12 h-12 flex items-center justify-center mr-3">
                    <span className="text-lg text-[#0C0B0B]">🌍</span>
                  </div>
                  <span className="text-xl font-bold text-[#0C0B0B]">Market Conditions</span>
                </div>
                <p className="text-sm text-[#0C0B0B] ml-11">{stockData.risk_assessment?.market_conditions || 'N/A'}</p>
              </div>
              <div className="p-4 bg-[#f5f5f7] rounded-[12px] hover:bg-[#e5e5e7] transition-all duration-300">
                <div className="flex items-center mb-2">
                  <div className="bg-white rounded-[12px] w-12 h-12 flex items-center justify-center mr-3">
                    <span className="text-lg text-[#0C0B0B]">⚠️</span>
                  </div>
                  <span className="text-xl font-bold text-[#0C0B0B]">Technical Risks</span>
                </div>
                <p className="text-sm text-[#0C0B0B] ml-11">{stockData.risk_assessment?.technical_risks || 'N/A'}</p>
              </div>
              <div className="p-4 bg-[#f5f5f7] rounded-[12px] hover:bg-[#e5e5e7] transition-all duration-300">
                <div className="flex items-center mb-2">
                  <div className="bg-white rounded-[12px] w-12 h-12 flex items-center justify-center mr-3">
                    <span className="text-lg text-[#0C0B0B]">🎯</span>
                  </div>
                  <span className="text-xl font-bold text-[#0C0B0B]">Setup Risks</span>
                </div>
                <p className="text-sm text-[#0C0B0B] ml-11">{stockData.risk_assessment?.setup_risks || 'N/A'}</p>
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
    <div className="bg-[#f5f5f7] text-[#0C0B0B] min-h-screen flex flex-col items-center justify-start py-4 px-4 relative">
      {successMessage && (
        <div className="text-green-600 text-center mt-3 mb-3 robotoFont text-[13px]">
          {successMessage}
        </div>
      )}
      <div className="w-full max-w-3xl mt-4 mx-auto">
        {/* <div className="flex flex-col items-center">
          <img
            src={brainLogo}
            alt="Quanta AI Logo"
            className="w-60 h-60 rounded-[12px]"
          />
          <h1 className="text-[28px] font-bold text-[#6366f1] text-center mt-4 mb-4">
            Quanta AI
          </h1>
        </div> */}

        <Link 
          to="/dashboard" 
          className="mb-4 border-2 text-nowrap robotoFont font-bold text-[13px] text-[#0C0B0B] border-[#0C0B0B] px-[24px] py-[8px] rounded-[8px] hover:bg-[#0C0B0B] hover:text-white transform transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center justify-center space-x-2 max-w-2xl w-full mx-auto"
        >
          <span className="text-lg">📊</span>
          <span>View Historical Analysis</span>
          <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
        </Link>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-[12px] p-6 mb-6 max-w-2xl mx-auto"
          method="post"
        >
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label
                htmlFor="ticker"
                className="block text-[20px] font-bold text-[#0C0B0B] robotoFont"
              >
                Enter Stock Ticker or Company Name
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowTradingRules(!showTradingRules)}
                  className="bg-[#0C0B0B] text-[#f5f5f7] py-2 px-4 rounded-[12px] hover:bg-opacity-80 flex items-center space-x-2"
                >
                  <span className="robotoFont text-[13px]">Trading Rules</span>
                  <span>📋</span>
                </button>
                
                {showTradingRules && (
                  <div className="absolute z-50 w-96 p-4 bg-[#0C0B0B] border border-[#f5f5f7] rounded-[12px] shadow-xl mt-2 right-0">
                    <h3 className="font-bold mb-3 text-[#6366f1] text-[20px]">Buy Rules</h3>
                    <ul className="list-decimal pl-4 mb-4 space-y-2 robotoFont text-[13px] text-[#f5f5f7]">
                      <li>Concentrate on listed stocks that sell for more than $20 a share with institutional acceptance.</li>
                      <li>Insist on increasing earnings per share in past 3-4 quarters and current quarterly earnings up at least 20%.</li>
                      <li>Buy at new highs after sound correction and consolidation, with 50%+ above average volume.</li>
                      <li>For confirmation, the stock has a strong technical setup, such as a breakout from a consolidation pattern.</li>
                      <li>Base decisions on price points, not attachment</li>
                    </ul>
                    
                    <h3 className="font-bold mb-3 text-[#6366f1] text-[20px]">Sell Rules</h3>
                    <ul className="list-disc pl-4 space-y-2 robotoFont text-[13px] text-[#f5f5f7]">
                      <li>Sell if price drops 8% below purchase price</li>
                      <li>Set specific profit potential expectations</li>
                      <li>Consider selling when P/E ratio doubles</li>
                      <li>Don't hold losing positions based on emotions</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
            <p className="robotoFont text-[13px] text-[#6C7280]">
              Enter a stock symbol (e.g., AAPL) or company name for instant AI analysis
            </p>
            <div className="relative">
              <input
                id="ticker"
                type="text"
                value={ticker}
                onChange={handleTickerChange}
                className="w-full p-4 text-[20px] border-2 border-[#6C7280] rounded-[12px] focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:border-transparent bg-[#0C0B0B] text-[#f5f5f7] placeholder-[#6C7280]"
                placeholder="AAPL"
                autoComplete="off"
                spellCheck="false"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#6C7280]">
                <span className="robotoFont text-[13px]">Stock Symbol</span>
              </div>
            </div>
            <button
              onClick={(e) => {
                e.preventDefault();
                handleSubmit(e);
              }}
              className="w-full border-2 text-nowrap robotoFont font-bold text-[13px] text-[#0C0B0B] border-[#0C0B0B] px-[24px] py-[8px] rounded-[8px] hover:bg-[#0C0B0B] hover:text-white transform transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center justify-center space-x-2"
            >
              <span>Analyze Stock</span>
              <span className="text-xl">📈</span>
            </button>
          </div>
        </form>

        <button
          onClick={handleAskAi}
          className="mb-4 border-2 text-nowrap robotoFont font-bold text-[13px] text-[#0C0B0B] border-[#0C0B0B] px-[24px] py-[8px] rounded-[8px] hover:bg-[#0C0B0B] hover:text-white transform transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center justify-center space-x-2 max-w-2xl w-full mx-auto"
        >
          <span className="text-lg">💬</span>
          <span>Chat with Quanta</span>
          <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
        </button>

        {response && <div>{response}</div>}
        {error && <div className="text-red-600 text-center mt-3 robotoFont text-[13px]">{error}</div>}
      </div>

      {/* Share and Print Buttons */}
      <div className="fixed bottom-4 right-4 flex space-x-2">
        <button
          onClick={handleShare}
          className="border-2 text-nowrap robotoFont font-bold text-[13px] text-[#0C0B0B] border-[#0C0B0B] px-[24px] py-[8px] rounded-[8px] hover:bg-[#0C0B0B] hover:text-white transform transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center space-x-2"
        >
          <span>Share</span>
          <span className="text-xl">📤</span>
        </button>
        <button
          onClick={() => window.print()}
          className="border-2 text-nowrap robotoFont font-bold text-[13px] text-[#0C0B0B] border-[#0C0B0B] px-[24px] py-[8px] rounded-[8px] hover:bg-[#0C0B0B] hover:text-white transform transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center space-x-2"
        >
          <span>Print</span>
          <span className="text-xl">🖨️</span>
        </button>
      </div>

      {/* Authentication Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-custom-purple p-6 rounded-lg shadow-xl max-w-md w-full mx-4 relative">
            {/* Close button */}
            <button
              onClick={() => setShowAuthModal(false)}
              className="absolute top-2 right-2 text-gray-300 hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <h2 className="text-xl font-bold mb-4 text-center">Unlock Quanta AI</h2>
            <p className="text-center mb-6">
            Get instant access to powerful AI-driven stock analysis - create your free account now! 🚀
            </p>
            <div className="flex justify-center">
              <button
                onClick={() => window.location.href = '/signup'}
                className="bg-black text-white px-6 py-2 rounded-lg hover:bg-opacity-80 transition-colors"
              >
                Start Free Analysis
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Chat Confirmation Modal */}
      {showChatModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-custom-purple p-6 rounded-lg shadow-xl max-w-md w-full mx-4 relative">
            <button
              onClick={() => setShowChatModal(false)}
              className="absolute top-2 right-2 text-gray-300 hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <h2 className="text-xl font-bold mb-4 text-center">Start a New Chat?</h2>
            <p className="text-center mb-6">
              Would you like to start a new chat? For the best experience, analyze a stock first - Quanta provides more detailed and accurate responses with stock analysis data. 🎯
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => {
                  setShowChatModal(false);
                  window.open(`${ragUrl}/ask`, '_blank');
                }}
                className="bg-black text-white px-6 py-2 rounded-lg hover:bg-opacity-80 transition-colors"
              >
                Start Chat
              </button>
              <button
                onClick={() => setShowChatModal(false)}
                className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-opacity-80 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Subscription Modal */}
      {showSubscribeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-custom-purple p-6 rounded-lg shadow-xl max-w-md w-full mx-4 relative">
            <button
              onClick={() => setShowSubscribeModal(false)}
              className="absolute top-2 right-2 text-gray-300 hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <h2 className="text-xl font-bold mb-4 text-center">Upgrade to Premium</h2>
            <p className="text-center mb-6">
              You've reached your free analysis limit. Upgrade to Premium for unlimited AI-powered stock analysis! 🚀
            </p>
            
            <div className="flex justify-center">
              <stripe-buy-button
                buy-button-id="buy_btn_1QmFZGP0joiUG98hoXRbIhpp"
                publishable-key="pk_test_51QlJZJP0joiUG98hPgEP93spbGIC35pWJHThVy3wlxkNba2URZr1krOL62jgVEuw9wEgObmcWsagvhndaBTaoBIk00m9aHsLPP"
              >
              </stripe-buy-button>
            </div>
          </div>
        </div>
      )}

      {/* Add the verification modal */}
      {!emailVerified && <EmailVerificationModal />}
    </div>
  );
};

export default StockAnalysisView;



