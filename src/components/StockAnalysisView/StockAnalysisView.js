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
import StockAnalysisResponse from "./StockAnalysisResponse";
import useSubscriptionCheck from "../../hooks/useSubscriptionCheck";
import parseAIData from "./utils/parseAIData";
import useFetchStockAnalysis from "../../hooks/useFetchstocksAnalysis";
import EmailVerificationModal from "./Modals/EmailVerificationModal";
import SubscribeModal from './Modals/SubscribeModal';
import ChatModal from './Modals/ChatModal';
import AuthModal from './Modals/AuthModal';
import TradingRules from './TradingRules/TradingRules';
import { 
   isValidTickerSymbol, 
   handlePrintAnalysis, 
   handleShare 
} from './utils/utilityFunctions';


const StockAnalysisView = () => {
  const [ticker, setTicker] = useState("");
  const [aiQuestion, setAiQuestion] = useState("");
  const [response, setResponse] = useState(null);
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
  const [error, setError]=useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const requestPendingRef = useRef(false);
  const MAX_RETRIES = 5;
  const RETRY_DELAY = 1000;
  const [showTradingRules, setShowTradingRules] = useState(false);
  const [emailVerified, setEmailVerified] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const { checkSubscription, showSubscribeModal, setShowSubscribeModal } = useSubscriptionCheck();
  const { fetchStockAnalysis, error: fetchError } = useFetchStockAnalysis(backendUrl, csrfToken, token, setAnalysisData);

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
    setError("");
    setResponse(<LoadingState />);
    const stockData = await fetchStockAnalysis(cleanTicker);
    if (stockData) {
      setResponse(formatResponse(stockData));
    }
  };
  
  const formatResponse = (stockData) => {
    const imageSrc = "/images/mind.svg"
    return (
      <StockAnalysisResponse stockData={stockData}/>
    );
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

  const handleLimitReached = async () => {
    const hasSubscription = await checkSubscription();
    if (!hasSubscription) {
      setShowSubscribeModal(true);
    } else {
      setError("Unexpected error: Limit reached with active subscription. Please contact support.");
    }
  };

  const handleTickerChange = (e) => {
    const newTicker = e.target.value.toUpperCase();
    setTicker(newTicker);
  };

  const attachEventListeners = () => {
    document.querySelector('.print-button').onclick = () => handlePrintAnalysis(attachEventListeners);
  };

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
                  <TradingRules/>
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
          <span className="text-lg">��</span>
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
         <AuthModal setShowAuthModal={setShowAuthModal}/>
      )}

      {/* Chat Confirmation Modal */}
      {showChatModal && (
        <ChatModal setShowChatModal={setShowChatModal} ragUrl={ragUrl}/>
      )}

      {/* Subscription Modal */}
      {showSubscribeModal && (
         <SubscribeModal setShowSubscribeModal={setShowSubscribeModal}/>
      )}

      {/* Add the verification modal */}
      {!emailVerified && 
        <EmailVerificationModal 
          setEmailVerified={setEmailVerified} 
          setSuccessMessage={setSuccessMessage} 
          setError={setError} 
        />
       }
    </div>
  );
};

export default StockAnalysisView;



