import React, { useState } from "react";

const StockAnalysisAssistant = () => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");

  const dummyData = {
    stock_summary: {
      ticker: "GOOGL",
      current_price: 189.3,
      buy_point: {
        consideration:
          "The current price is within 6% of the 52-week high of $201.42, making it a potential buy point if other conditions align.",
      },
      target_price:
        "A reasonable target price could be set around 15-20% above the buy point, approximately $217.69 to $227.16.",
      supply_and_demand: {
        volume_analysis:
          "Current volume is at 17,396,853, which is lower than the average volume of 27,419,177.",
        moving_averages: {
          day_ema_50: 180.15,
          day_ema_150: 170.56,
          day_ema_200: 166.87,
        },
      },
      technical_analysis: {
        market_direction:
          "The overall market appears to be in a positive trend with the 150-day EMA above the 200-day EMA and the 50-day EMA above the 150-day EMA.",
        eps_growth: "Positive quarterly EPS growth of 27.23% signals accelerating earnings.",
      },
      quarterly_earnings_analysis: {
        quarterly_revenue: "88.27 billion USD",
        quarterly_net_income: "26.30 billion USD",
        quarterly_eps: "2.14 in xyz quarter and growth of 27.23%",
      },
      recommendations: {
        considerations:
          "The stock is a potential buy given its strong earnings growth, favorable technical indicators, and trending interest, but be cautious of current volume, which is lower than average.",
        recommendations_for_action:
          "Consider entering when volume increases or if there is a breakout above the current resistance levels.",
      },
      conclusion: {
        summary:
          "GOOGL is showing strong financial growth and positive market interest, making it a potentially attractive investment.",
        investment_outlook: "Positive",
      },
    },
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setResponse(
      <div className="analysis-section">Analyzing stock data...</div>
    );

    try {
      // Simulate the API call using dummy data
      setResponse(formatResponse(dummyData));
    } catch (err) {
      setError(err.message);
    }
  };

  const formatResponse = (data) => {
    const stockData = data.stock_summary;

    return (
      <div className="mt-8 bg-white shadow-md rounded-lg p-6 text-gray-800 max-w-4xl mx-auto">
        <h2 className="text-3xl font-extrabold text-blue-600 mb-4">
          📊 {stockData.ticker} Analysis
        </h2>
        <div className="mb-4 flex flex-col">
          <span className="font-semibold">💵 Price:</span>
          <span className="ml-2">${stockData.current_price}</span>
        </div>
        <div className="mb-4 flex flex-col">
          <span className="font-semibold">🎯 Buy Point:</span>
          <span className="ml-2">{stockData.buy_point.consideration}</span>
        </div>
        <div className="mb-4 flex flex-col">
          <span className="font-semibold">📈 Target:</span>
          <span className="ml-2">{stockData.target_price}</span>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold text-lg text-gray-700">📊 Supply & Demand</h3>
          <div className="mb-2">
            <span className="font-semibold">📈 Volume:</span>
            <span className="ml-2">{stockData.supply_and_demand.volume_analysis}</span>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gray-100 p-2 rounded">
              50d EMA: {stockData.supply_and_demand.moving_averages.day_ema_50}
            </div>
            <div className="bg-gray-100 p-2 rounded">
              150d EMA: {stockData.supply_and_demand.moving_averages.day_ema_150}
            </div>
            <div className="bg-gray-100 p-2 rounded">
              200d EMA: {stockData.supply_and_demand.moving_averages.day_ema_200}
            </div>
          </div>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold text-lg text-gray-700">📈 Technical</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="font-semibold">🎯 Market:</span>
              <span className="ml-2">{stockData.technical_analysis.market_direction}</span>
            </div>
            <div>
              <span className="font-semibold">📈 EPS Growth:</span>
              <span className="ml-2">{stockData.technical_analysis.eps_growth}</span>
            </div>
          </div>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold text-lg text-gray-700">💰 Financials</h3>
          <div className="grid grid-cols-3 gap-4">
            <div>📈 Revenue: {stockData.quarterly_earnings_analysis.quarterly_revenue}</div>
            <div>💵 Net Income: {stockData.quarterly_earnings_analysis.quarterly_net_income}</div>
            <div>📊 EPS: {stockData.quarterly_earnings_analysis.quarterly_eps}</div>
          </div>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold text-lg text-gray-700">🎯 Actions</h3>
          <div>
            <span className="font-semibold">💭 Consider:</span>
            <span className="ml-2">{stockData.recommendations.considerations}</span>
          </div>
          <div>
            <span className="font-semibold">⚡ Action:</span>
            <span className="ml-2">{stockData.recommendations.recommendations_for_action}</span>
          </div>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold text-lg text-gray-700">📝 Summary</h3>
          <p>{stockData.conclusion.summary}</p>
          <div>
            <span className="font-semibold">🔮 Outlook:</span>
            <span className="ml-2">{stockData.conclusion.investment_outlook}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center bg-blue-600 text-white py-10 px-4 min-h-screen">
      <h1 className="text-4xl font-bold mb-4">Stock Analysis Assistant</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg text-gray-800"
      >
        <label htmlFor="input" className="block font-semibold mb-2">
          Enter Stock Ticker or Company Name:
        </label>
        <textarea
          id="input"
          name="input"
          rows="3"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="e.g., AAPL, MSFT, GOOGL"
        ></textarea>
        <button
          type="submit"
          className="bg-blue-700 text-white px-4 py-2 rounded mt-4 hover:bg-blue-800 w-full"
        >
          Analyze Stock
        </button>
      </form>
      {response && <div className="mt-8 w-full">{response}</div>}
      {error && <div className="mt-4 text-red-500">{error}</div>}
    </div>
  );
};

export default StockAnalysisAssistant;
