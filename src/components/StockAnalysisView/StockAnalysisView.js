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
  const csrfToken = useCSRFToken();
  const { token } = useAuth();
  const backendUrl = useBackendUrl();
  const [aiQuestion, setAiQuestion] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [analysisData, setAnalysisData] = useState({
    ticker: '',
  });
  const ragUrl = useRagUrl();
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
      console.log('this is the data from the backend', data)
      setResponse(formatResponse(data));
    } catch (err) {
      setError(err.message);
    }
  };

  const formatResponse = (data) => {
    const analysis = JSON.parse(data.response);
    const stockData = analysis.stock_summary;
    
    // Set the analysis data for the AI chat
    setAnalysisData({
      ticker: stockData.ticker,
      trade_setup: {
        buy_point: stockData.trade_setup.buy_point,
        target_price: stockData.trade_setup.target_price,
        stop_loss: stockData.trade_setup.stop_loss,
        setup_type: stockData.trade_setup.setup_type
      },
      technical_analysis: {
        trend: stockData.technical_analysis.trend,
        distance_from_52_week_high: stockData.technical_analysis.distance_from_52_week_high,
        volume_analysis: stockData.technical_analysis.volume_analysis,
        technical_setup_trigger_key_triggers: stockData.technical_analysis.technical_setup_trigger_key_triggers,
        technical_setup_trigger_risk_factors: stockData.technical_analysis.technical_setup_trigger_risk_factors
      },
      fundamental_analysis: {
        quarterly_eps_growth: stockData.fundamental_analysis.quarterly_eps_growth,
        annual_growth_trend: stockData.fundamental_analysis.annual_growth_trend,
        industry_position: stockData.fundamental_analysis.industry_position,
        sector_performance: stockData.fundamental_analysis.sector_performance
      },
      institutional_ownership: {
        institutional_ownership_trend: stockData.institutional_ownership.institutional_ownership_trend
      },
      market_analysis: {
        market_sentiment: stockData.market_analysis.market_sentiment,
        market_trend: stockData.market_analysis.market_trend
      },
      risk_assessment: {
        market_conditions: stockData.risk_assessment.market_conditions,
        technical_risks: stockData.risk_assessment.technical_risks,
        setup_risks: stockData.risk_assessment.setup_risks
      }
    });
    
    return (
      <div>
        {/* Primary Analysis Section */}
        <div className="bg-black text-gray-300 shadow-md rounded-lg p-6 max-w-4xl mx-auto mb-6">
          <h2 className="text-2xl font-bold mb-6 text-custom-purple">
            📊 {stockData.ticker} Analysis
          </h2>

          {/* Current Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="p-3 bg-custom-purple rounded-lg">
              <span className="block font-bold">Current Price</span>
              <span>${stockData.current_metrics?.price?.toFixed(2) || 'N/A'}</span>
            </div>
            <div className="p-3 bg-custom-purple rounded-lg">
              <span className="block font-bold">Volume</span>
              <span>{stockData.current_metrics?.volume?.toLocaleString() || 'N/A'}</span>
            </div>
            <div className="p-3 bg-custom-purple rounded-lg">
              <span className="block font-bold">52W High</span>
              <span>${stockData.current_metrics?.fifty_two_week?.high?.toFixed(2) || 'N/A'}</span>
            </div>
            <div className="p-3 bg-custom-purple rounded-lg">
              <span className="block font-bold">52W Low</span>
              <span>${stockData.current_metrics?.fifty_two_week?.low?.toFixed(2) || 'N/A'}</span>
            </div>
          </div>

          {/* Recommendation */}
          <div className="border-t border-custom-purple py-4">
            <h3 className="text-lg font-bold mb-4">🎯 Recommendation</h3>
            <div className="p-4 bg-custom-purple rounded-lg">
              <div className="text-2xl font-bold mb-4">{stockData.recommendation.action}</div>

              <div className="mb-4">
                <h4 className="font-bold mb-2">Key Triggers:</h4>
                <ul className="list-disc list-inside">
                  {stockData.recommendation.triggers.map((trigger, index) => (
                    <li key={index}>{trigger}</li>
                  ))}
                </ul>
              </div>

              <div className="mb-4">
                <h4 className="font-bold mb-2">Risk Factors:</h4>
                <ul className="list-disc list-inside">
                  {stockData.recommendation.risk_factors.map((risk, index) => (
                    <li key={index}>{risk}</li>
                  ))}
                </ul>
              </div>

              {/* Trade Setup */}
              <div className="border-t border-custom-purple py-4 space-y-4">
                <h3 className="text-lg font-bold">🎯 Trade Setup</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-3 bg-custom-purple rounded-lg">
                    <span className="block font-bold">Buy Point</span>
                    <span>${stockData.trade_setup?.buy_point?.toFixed(2) || 'N/A'}</span>
                  </div>
                  <div className="p-3 bg-custom-purple rounded-lg">
                    <span className="block font-bold">Target</span>
                    <span>${stockData.trade_setup?.target_price?.toFixed(2) || 'N/A'}</span>
                  </div>
                  <div className="p-3 bg-custom-purple rounded-lg">
                    <span className="block font-bold">Stop Loss</span>
                    <span>${stockData.trade_setup?.stop_loss?.toFixed(2) || 'N/A'}</span>
                  </div>
                </div>
                <div className="p-3 bg-custom-purple rounded-lg">
                  <span className="block font-bold">Setup Type</span>
                  <span>{stockData.trade_setup?.setup_type || 'N/A'}</span>
                </div>
              </div>
              <div>
                <h4 className="font-bold mb-2">Risk Management:</h4>
                <p>{stockData.recommendation.risk_management || 'N/A'}</p>
              </div>
            </div>
          </div>
          {/* Chart Section */}
          {/* <Chart/> */}

          {/* Technical Analysis */}
          <div className="border-t border-custom-purple py-4 space-y-4">
            <h3 className="text-lg font-bold">📈 Technical Analysis</h3>

            {/* Moving Averages */}
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="p-3 bg-custom-purple rounded-lg">
                  <span className="block font-bold">EMA 50</span>
                  <span>${stockData.technical_analysis?.moving_averages?.ema_50?.toFixed(2) || 'N/A'}</span>
                </div>
                <div className="p-3 bg-custom-purple rounded-lg">
                  <span className="block font-bold">EMA 150</span>
                  <span>${stockData.technical_analysis?.moving_averages?.ema_150?.toFixed(2) || 'N/A'}</span>
                </div>
                <div className="p-3 bg-custom-purple rounded-lg">
                  <span className="block font-bold">EMA 200</span>
                  <span>${stockData.technical_analysis?.moving_averages?.ema_200?.toFixed(2) || 'N/A'}</span>
                </div>
              </div>

              {/* Trend Analysis */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3 bg-custom-purple rounded-lg">
                  <span className="block font-bold">Overall Trend</span>
                  <span>{stockData.technical_analysis?.trend || 'N/A'}</span>
                </div>
                <div className="p-3 bg-custom-purple rounded-lg">
                  <span className="block font-bold">Distance from 52W High</span>
                  <span>{stockData.technical_analysis?.distance_from_52_week_high || 'N/A'}</span>
                </div>
              </div>

              {/* Volume Analysis */}
              <div className="p-3 bg-custom-purple rounded-lg">
                <span className="block font-bold mb-2">Volume and Volatility Pattern Analysis</span>
                <p className="text-sm">{stockData.technical_analysis?.volume_analysis || 'N/A'}</p>
                <p className="text-sm">{stockData.technical_analysis?.volatility_pattern || 'N/A'}</p>
              </div>

              {/* Technical Setup */}
              <div className="space-y-3">
                <div className="p-3 bg-custom-purple rounded-lg">
                  <span className="block font-bold mb-2">Technical Setup</span>
                  <p className="text-sm">{stockData.technical_analysis?.technical_setup || 'N/A'}</p>
                  <p className="text-sm">{stockData.technical_analysis?.technical_setup_trigger || 'N/A'}</p>
                </div>

                {/* Key Triggers */}
                <div className="p-3 bg-custom-purple rounded-lg">
                  <span className="block font-bold mb-2">Key Triggers and Risks</span>
                  <p className="text-sm">{stockData.technical_analysis?.technical_setup_trigger_key_triggers || 'N/A'}</p>
                  <p className="text-sm">{stockData.technical_analysis?.technical_setup_trigger_risk_factors || 'N/A'}</p>
                </div>
              </div>
            </div>
          </div>
        
          {/* Fundamental Analysis */}
          <div className="border-t border-custom-purple py-4 space-y-4">
            <h3 className="text-lg font-bold">📊 Fundamental Analysis</h3>
            
            {/* EPS Growth */}
            <div className="p-3 bg-custom-purple rounded-lg mb-4">
              <h4 className="font-bold mb-2">Quarterly EPS Growth</h4>
              <div className="grid grid-cols-3 gap-4 mb-3">
                {stockData.fundamental_analysis?.quarterly_eps_growth?.map((growth, index) => (
                  <div key={index} className="text-center">
                    <span className="block font-bold">Q{3 - index}</span>
                    <span className={`${growth > 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {(growth * 100).toFixed(1)}%
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-sm mt-2">{stockData.fundamental_analysis?.quarterly_eps_growth_trend}</p>
            </div>

            {/* Growth Trends */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-custom-purple rounded-lg">
                <h4 className="font-bold mb-2">Annual Growth</h4>
                <p className="text-sm">{stockData.fundamental_analysis?.annual_growth_trend}</p>
              </div>
              <div className="p-3 bg-custom-purple rounded-lg">
                <h4 className="font-bold mb-2">Industry Position</h4>
                <p className="text-sm">{stockData.fundamental_analysis?.industry_position}</p>
              </div>
            </div>

            {/* Sector Performance */}
            <div className="p-3 bg-custom-purple rounded-lg">
              <h4 className="font-bold mb-2">Sector Performance</h4>
              <p className="text-sm">{stockData.fundamental_analysis?.sector_performance}</p>
            </div>
            </div>

            {/* Institutional Ownership */}
            <div className="border-t border-custom-purple py-4 space-y-4">
              <h3 className="text-lg font-bold">🏢 Institutional Ownership</h3>
              <div className="space-y-3">
                <div className="p-3 bg-custom-purple rounded-lg">
                  <span className="block font-bold mb-2">Current Ownership</span>
                  <p className="text-sm">
                    {stockData.institutional_ownership?.institutional_ownership || 'No ownership data available'}
                  </p>
                </div>
                <div className="p-3 bg-custom-purple rounded-lg">
                  <span className="block font-bold mb-2">Ownership Trend</span>
                  <p className="text-sm">
                    {stockData.institutional_ownership?.institutional_ownership_trend || 'No trend data available'}
                  </p>
                </div>
              </div>
            </div>

          {/* Market Analysis */}
          <div className="border-t border-custom-purple py-4 space-y-4">
            <h3 className="text-lg font-bold">🌍 Market Analysis</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-custom-purple rounded-lg">
                <span className="block font-bold">Market Sentiment</span>
                <span>{stockData.market_analysis?.market_sentiment || 'N/A'}</span>
              </div>
              <div className="p-3 bg-custom-purple rounded-lg">
                <span className="block font-bold">Market Trend</span>
                <span>{stockData.market_analysis?.market_trend || 'N/A'}</span>
              </div>
            </div>
          </div>



          {/* Risk Assessment */}
          <div className="border-t border-custom-purple py-4 space-y-4">
            <h3 className="text-lg font-bold">⚠️ Risk Assessment</h3>
            <div className="space-y-2">
              <div className="p-3 bg-custom-purple rounded-lg">
                <span className="block font-bold">Market Conditions</span>
                <span>{stockData.risk_assessment?.market_conditions || 'N/A'}</span>
              </div>
              <div className="p-3 bg-custom-purple rounded-lg">
                <span className="block font-bold">Technical Risks</span>
                <span>{stockData.risk_assessment?.technical_risks || 'N/A'}</span>
              </div>
              <div className="p-3 bg-custom-purple rounded-lg">
                <span className="block font-bold">Setup Risks</span>
                <span>{stockData.risk_assessment?.setup_risks || 'N/A'}</span>
              </div>
            </div>
          </div>


        </div>
      </div>
    );
  };

  const handleAskAi = () => {
    try {
      // Only add parameters if we have valid data
      if (analysisData.ticker) {
        // Encode the data as URL parameters
        const params = new URLSearchParams({
          data: JSON.stringify(analysisData)
        }).toString();

        // Open the URL with parameters
        window.open(`${ragUrl}/ask?${params}`, '_blank');
      } else {
        // Open URL without parameters if no data
        window.open(`${ragUrl}/ask`, '_blank');
      }
    } catch (err) {
      console.error('Error processing data:', err);
      // Open URL without parameters if there's an error
      window.open(`${ragUrl}/ask`, '_blank');
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