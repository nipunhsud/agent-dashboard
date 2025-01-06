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
        consideration: "The current price is within 6% of the 52-week high of $201.42, making it a potential buy point if other conditions align."
      },
      target_price: "A reasonable target price could be set around 15-20% above the buy point, approximately $217.69 to $227.16.",
      supply_and_demand: {
        volume_analysis: "Current volume is at 17,396,853, which is lower than the average volume of 27,419,177.",
        moving_averages: {
          day_ema_50: 180.15,
          day_ema_150: 170.56,
          day_ema_200: 166.87
        }
      },
      technical_analysis: {
        market_direction: "The overall market appears to be in a positive trend with the 150-day EMA above the 200-day EMA and the 50-day EMA above the 150-day EMA.",
        eps_growth: "Positive quarterly EPS growth of 27.23% signals accelerating earnings."
      },
      quarterly_earnings_analysis: {
        quarterly_revenue: "88.27 billion USD",
        quarterly_net_income: "26.30 billion USD",
        quarterly_eps: "2.14 in xyz quarter and growth of 27.23%"
      },
      recommendations: {
        considerations: "The stock is a potential buy given its strong earnings growth, favorable technical indicators, and trending interest, but be cautious of current volume, which is lower than average.",
        recommendations_for_action: "Consider entering when volume increases or if there is a breakout above the current resistance levels."
      },
      conclusion: {
        summary: "GOOGL is showing strong financial growth and positive market interest, making it a potentially attractive investment.",
        investment_outlook: "Positive"
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setResponse(<div className="text-center text-gray-500">Analyzing stock data...</div>);

    try {
      setResponse(formatResponse(dummyData));
    } catch (err) {
      setError(err.message);
    }
  };

  const formatResponse = (data) => {
    const stockData = data.stock_summary;

    return (
      <div className="bg-black text-gray-300 shadow-md rounded-lg p-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-medium mb-6 text-blue-400">
          📊 {stockData.ticker} Analysis
        </h2>

        <div className="space-y-6">
          {/* Price Section */}
          <div className="border-b border-blue-500 pb-4">
            <h3 className="text-lg font-normal">💵 Current Price:</h3>
            <p className="text-gray-300 text-lg">${stockData.current_price}</p>
          </div>

          {/* Buy Point Section */}
          <div className="border-b border-blue-500 pb-4 flex flex-col">
            <h3 className="text-lg font-normal">🎯 Buy Point:</h3>
            <p className="text-gray-300">{stockData.buy_point.consideration}</p>
          </div>

          {/* Target Price Section */}
          <div className="border-b border-blue-500 pb-4 flex flex-col">
            <h3 className="text-lg font-normal">📈 Target Price:</h3>
            <p className="text-gray-300">{stockData.target_price}</p>
          </div>

          {/* Supply & Demand Section */}
          <div className="border-b border-blue-500 pb-4">
            <h3 className="text-lg font-normal">📊 Supply & Demand</h3>
            <p className="text-gray-300 mb-2">{stockData.supply_and_demand.volume_analysis}</p>
            <div className="grid grid-cols-3 gap-4">
              <div className="p-3 bg-gray-800 rounded-lg flex flex-col">
                <span className="font-normal">50d EMA:</span> 
                <span>{stockData.supply_and_demand.moving_averages.day_ema_50}</span>
              </div>
              <div className="p-3 bg-gray-800 rounded-lg flex flex-col">
                <span className="font-normal">150d EMA:</span> 
                <span>{stockData.supply_and_demand.moving_averages.day_ema_150}</span>
              </div>
              <div className="p-3 bg-gray-800 rounded-lg flex flex-col">
                <span className="font-normal">200d EMA:</span> 
                <span>{stockData.supply_and_demand.moving_averages.day_ema_200}</span>
              </div>
            </div>
          </div>

          {/* Technical Section */}
          <div className="border-b border-blue-500 pb-4">
            <h3 className="text-lg font-normal">📈 Technical</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <span className="block font-normal">🎯 Market:</span>
                <span className="text-gray-300">{stockData.technical_analysis.market_direction}</span>
              </div>
              <div className="flex flex-col">
                <span className="block font-normal">📈 EPS Growth:</span>
                <span className="text-gray-300">{stockData.technical_analysis.eps_growth}</span>
              </div>
            </div>
          </div>

          {/* Financial Section */}
          <div className="border-b border-blue-500 pb-4">
            <h3 className="text-lg font-normal">💰 Financials</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col">
                <span className="font-normal">📈 Revenue:</span> 
                <span>{stockData.quarterly_earnings_analysis.quarterly_revenue}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-normal">💵 Net Income:</span> 
                <span>{stockData.quarterly_earnings_analysis.quarterly_net_income}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-normal">📊 EPS:</span> 
                <span>{stockData.quarterly_earnings_analysis.quarterly_eps}</span>
              </div>
            </div>
          </div>

          {/* Recommendations Section */}
          <div className="border-b border-blue-500 pb-4">
            <h3 className="text-lg font-normal">🎯 Actions</h3>
            <div className="space-y-2">
              <div className="flex flex-col">
                <span className="block font-normal">💭 Consider:</span>
                <span className="text-gray-300">{stockData.recommendations.considerations}</span>
              </div>
              <div className="flex flex-col">
                <span className="block font-normal">⚡ Action:</span>
                <span className="text-gray-300">{stockData.recommendations.recommendations_for_action}</span>
              </div>
            </div>
          </div>

          {/* Conclusion Section */}
          <div>
            <h3 className="text-lg font-normal">📝 Summary</h3>
            <p className="text-gray-300 mb-2">{stockData.conclusion.summary}</p>
            <p className="text-gray-300">
              <span className="font-normal">🔮 Outlook:</span>
              <span>{stockData.conclusion.investment_outlook}</span> 
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-black text-gray-300 min-h-screen flex flex-col items-center justify-start py-4 px-4">
      <div className="w-full max-w-3xl mt-4">
        <h1 className="text-3xl font-extrabold text-blue-400 text-center mb-4">
          Stock Analysis Assistant
        </h1>
  
        <form
          onSubmit={handleSubmit}
          className="bg-gray-800 shadow-md rounded-lg p-4 mb-4"
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
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-gray-300"
            placeholder="e.g., AAPL, MSFT, GOOGL"
          ></textarea>
          <button
            type="submit"
            className="mt-3 bg-blue-500 text-white py-2 px-4 rounded-lg w-full hover:bg-blue-600"
          >
            Analyze Stock
          </button>
        </form>
  
        {response && <div>{response}</div>}
        {error && <div className="text-red-400 text-center mt-3">{error}</div>}
      </div>
    </div>
  );
  
};

export default StockAnalysisAssistant;
