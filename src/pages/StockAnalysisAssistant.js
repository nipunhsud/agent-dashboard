import React, { useState } from "react";
import brainLogo from '../assets/brain-logo.png';

const StockAnalysisAssistant = () => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");

  const dummyData = {
    stock_summary: {
      ticker: "GOOGL",
      current_price: 194.97,
      buy_point: {
        consideration: "The current price is within 3% of the 52-week high of $201.42, making it a potential buy point if other conditions align."
      },
      target_price: "",
      industry_leader: "GOOGL is a leading stock in the technology industry, with a strong market position and a history of innovation.",
      supply_and_demand: {
        volume_analysis: "Current volume is at 15,991,873, which is lower than the average volume of 27,647,703.",
        moving_averages: {
          day_ema_50: 182.64,
          day_ema_15: 172.06,
          day_ema_200: 168.18
        },
        google_trends: {
          market_trends: "No specific data available.",
          top_related_queries: [],
          rising_related_queries: []
        },
        support_levels: "The stock is currently trading above the 50-day, 150-day, and 200-day EMAs, suggesting strong support levels."
      },
      tight_areas: "The stock is trading near its highs with low volatility, indicating potential consolidation.",
      technical_analysis: {
        market_direction: "Market Direction: Analyze the price action of QQQ and SPY to get the market direction. Series of higher highs and higher lows is preferred.",
        eps_growth: "Positive quarterly EPS growth signals accelerating earnings."
      },
      quarterly_earnings_analysis: {
        quarterly_revenue: "88.27 billion USD",
        quarterly_net_income: "26.30 billion USD",
        quarterly_eps: "2.14 in Q3 2024"
      },
      annual_financial_growth: {
        annual_eps_growth: "27.23% in 2023",
        annual_revenue_growth: "8.68% in 2023"
      },
      new_product_or_service: {
        new_product_or_service: "No specific data available."
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
  }

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
  
  const handleSubmitDjango = async (event) => {
    event.preventDefault();
    setError("");
    setResponse(<div className="text-center text-gray-500">Fetching data from server...</div>);

    try {
        const formData = new URLSearchParams();
        formData.append("input", input);

        const res = await fetch("http://127.0.0.1:8000/stock_assistant/", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: formData.toString(),
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error || "Failed to fetch stock analysis");
        }

        // Parse response JSON
        const data = await res.json();

        // Log or structure the response into JSON
        console.log("Parsed JSON response:", data.response);

        // If needed, reformat the response here
        const formattedData = {
            ticker: data.response.ticker,
            currentPrice: data.response.current_price,
            buyPoint: data.response.buy_point.consideration,
            targetPrice: data.response.target_price,
            recommendations: data.response.recommendations,
            conclusion: data.response.conclusion.summary,
        };

        console.log("Formatted JSON:", formattedData);

        // Render the response or pass formattedData to a component
        setResponse(<pre>{JSON.stringify(formattedData, null, 2)}</pre>);
    } catch (err) {
        setError(err.message);
    }
  };

  const formatResponse = (data) => {
    const stockData = data.stock_summary;

    return (
      <div>
        <div className="bg-black text-gray-300 shadow-md rounded-lg p-6 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-custom-purple">
            📊 {stockData.ticker} Analysis
          </h2>
          <p className="text-gray-300 flex space-x-4">
            <span
              className="inline-block px-4 py-2 bg-custom-purple border border-custom-purple text-white rounded-full max-w-max"
            >
              ${stockData.current_price}
            </span>
            <span
              className="inline-block px-4 py-2 bg-custom-purple border border-custom-purple text-white rounded-full max-w-max"
            >
              {stockData.conclusion.investment_outlook}
            </span>
          </p>

          <div className="space-y-6">
          
            {/* Buy Point Section */}
            <div className="border-t border-b border-custom-purple py-4 flex flex-col">
              <h3 className="text-lg font-bold">🎯 Buy Point:</h3>
              <p className="text-gray-300">{stockData.buy_point.consideration}</p>
            </div>

            {/* Target Price Section */}
            <div className="border-b border-custom-purple py-2 flex flex-col">
              <h3 className="text-lg font-bold">📈 Target Price:</h3>
              <p className="text-gray-300">{stockData.target_price  || "No available data"}</p>
            </div>
            
            {/* Supply & Demand Section */}
            <div className="border-b border-custom-purple pb-4">
              <h3 className="text-lg font-bold">📊 Supply & Demand</h3>
              <p className="text-gray-300 mb-2">
                {stockData.supply_and_demand.volume_analysis || "No available data"}
              </p>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-3 bg-custom-purple rounded-lg flex flex-col">
                  <span className="font-semibold">50d EMA:</span>
                  <span>{stockData.supply_and_demand.moving_averages.day_ema_50 || "No available data"}</span>
                </div>
                <div className="p-3 bg-custom-purple rounded-lg flex flex-col">
                  <span className="font-semibold">150d EMA:</span>
                  <span>{stockData.supply_and_demand.moving_averages.day_ema_15 || "No available data"}</span>
                </div>
                <div className="p-3 bg-custom-purple rounded-lg flex flex-col">
                  <span className="font-semibold">200d EMA:</span>
                  <span>{stockData.supply_and_demand.moving_averages.day_ema_200 || "No available data"}</span>
                </div>
              </div>
            </div>

            {/* Technical Section */}
            <div className="border-b border-custom-purple pb-4">
              <h3 className="text-lg font-bold">📈 Technical</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <span className="block font-bold">🎯 Market:</span>
                  <span className="text-gray-300">{stockData.technical_analysis.market_direction || "No available data"}</span>
                </div>
                <div className="flex flex-col">
                  <span className="block font-bold">📈 EPS Growth:</span>
                  <span className="text-gray-300">{stockData.technical_analysis.eps_growth || "No available data"}</span>
                </div>
              </div>
            </div>

            {/* Financial Section */}
            <div className="border-b border-custom-purple pb-4">
              <h3 className="text-lg font-bold">💰 Financials</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-3 flex flex-col bg-custom-purple rounded-lg">
                  <span className="font-semibold">📈 Revenue:</span> 
                  <span>{stockData.quarterly_earnings_analysis.quarterly_revenue || "No available data"}</span>
                </div>
                <div className="p-3 flex flex-col bg-custom-purple rounded-lg">
                  <span className="font-semibold">💵 Net Income:</span> 
                  <span>{stockData.quarterly_earnings_analysis.quarterly_net_income || "No available data"}</span>
                </div>
                <div className="p-3 flex flex-col bg-custom-purple rounded-lg">
                  <span className="font-semibold">📊 EPS:</span> 
                  <span>{stockData.quarterly_earnings_analysis.quarterly_eps || "No available data"}</span>
                </div>
              </div>
            </div>

            {/* Recommendations Section */}
            <div className="border-b border-custom-purple pb-4">
              <h3 className="text-lg font-bold">🎯 Actions</h3>
              <div className="space-y-2">
                <div className="flex flex-col">
                  <span className="block font-bold">💭 Consider:</span>
                  <span className="text-gray-300">{stockData.recommendations.considerations || "No available data"}</span>
                </div>
                <div className="flex flex-col">
                  <span className="block font-bold">⚡ Action:</span>
                  <span className="text-gray-300">{stockData.recommendations.recommendations_for_action || "No available data"}</span>
                </div>
              </div>
            </div>

            {/* Conclusion Section */}
            <div>
              <h3 className="text-lg font-bold">📝 Summary</h3>
              <p className="text-gray-300 mb-2">{stockData.conclusion.summary || "No available data"}</p>
            </div>
          </div>
        </div>
        <div className="bg-black text-gray-300 shadow-md rounded-lg p-6 max-w-4xl mx-auto">
          <div className="bg-custom-purple rounded-lg">
            <h2 className="text-2xl font-medium mb-6 text-white p-3">
              Below is the detailed trading strategy and stock summary for {stockData.ticker || "No available data"}
            </h2>
          </div>
          <p className="text-gray-300 flex space-x-4">
            <span
              className="inline-block px-4 py-2 bg-custom-purple border border-custom-purple text-white rounded-full max-w-max"
            >
              {stockData.current_price || "No available data"}
            </span>
            <span
              className="inline-block px-4 py-2 bg-custom-purple border border-custom-purple text-white rounded-full max-w-max"
            >
              {stockData.conclusion.investment_outlook || "No available data"}
            </span>
          </p>

          <div className="space-y-6">
          
            {/* Buy Point Section */}
            <div className="border-t border-b border-custom-purple py-4 flex flex-col">
              <h3 className="text-lg font-bold">🎯 Buy Point:</h3>
              <div className="text-gray-300">
                <p className="flex flex-col">
                  <span className="font-bold">Buy Point:</span>
                  <span>{stockData.buy_point.consideration || "No available data"}</span>
                </p>
                <p className="flex flex-col">
                  <span className="font-bold">52 Week High/Low:</span>
                  <span>$201.42 / $130.67</span>
                </p>
                <p className="flex flex-col">
                  <span className="font-bold">Buy Point Consideration:</span>
                  <span>
                    <span>{stockData.buy_point.consideration || "No available data"}</span>
                  </span>
                </p>
              </div>
            </div>

            {/* Supply & Demand Section */}
            <div className="border-b border-custom-purple pb-4">
              <h3 className="text-lg font-normal">📊 Supply & Demand</h3>
              <p className="text-gray-300 mb-2">
                {stockData.supply_and_demand.volume_analysis || "Volume data unavailable"}
              </p>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-3 bg-custom-purple rounded-lg flex flex-col">
                  <span className="font-semibold">50d EMA:</span>
                  <span>{stockData.supply_and_demand.moving_averages.day_ema_50 || "No available data"}</span>
                </div>
                <div className="p-3 bg-custom-purple rounded-lg flex flex-col">
                  <span className="font-semibold">150d EMA:</span>
                  <span>{stockData.supply_and_demand.moving_averages.day_ema_15 || "No available data"}</span>
                </div>
                <div className="p-3 bg-custom-purple rounded-lg flex flex-col">
                  <span className="font-semibold">200d EMA:</span>
                  <span>{stockData.supply_and_demand.moving_averages.day_ema_200 || "No available data"}</span>
                </div>
              </div>
            </div>

            {/* Tight Areas */}
            <div className="border-b border-custom-purple pb-4">
              <h3 className="text-lg font-bold">📊 Tight areas</h3>
              <p className="text-gray-300 mb-2">{stockData.tight_areas || "No available data"}</p>
            </div>

            {/* Technical Section */}
            <div className="border-b border-custom-purple pb-4">
              <h3 className="text-lg font-bold">📈 Technical Analysis</h3>
              <div className="grid grid-cols-2 gap-4">
                {/* Market Direction */}
                <div className="flex flex-col">
                  <span className="block font-bold">🎯 Market Direction:</span>
                  <span className="text-gray-300">
                    {stockData.technical_analysis.market_direction || "No available data"}
                  </span>
                </div>
                {/* EPS Growth */}
                <div className="flex flex-col">
                  <span className="block font-bold">📈 EPS Growth:</span>
                  <span className="text-gray-300">
                    {stockData.technical_analysis.eps_growth || "No available data"}
                  </span>
                  {/* <ul className="list-disc list-inside text-gray-300">
                    {stockData.technical_analysis.eps_growth.map((eps, index) => (
                      <li key={index}>
                        {eps.quarter}: {eps.value}
                      </li>
                    ))}
                  </ul> */}
                  <div className="grid grid-cols-2 gap-2 text-gray-300">
                    <div>
                      <span className="font-medium">Q3 2024:</span> <span>$2.14</span>
                    </div>
                    <div>
                      <span className="font-medium">Q2 2024:</span> <span>$1.91</span>
                    </div>
                    <div>
                      <span className="font-medium">Q1 2024:</span> <span>$1.91</span>
                    </div>
                    <div>
                      <span className="font-medium">Q4 2023:</span> <span>$1.66</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Google trends */}
            <div className="border-b border-custom-purple pb-4">
              <h3 className="text-lg font-bold">📊 Google trends</h3>
              <p className="text-gray-300 mb-2 flex flex-column">
                <span className="font-bold">Market trends:</span>
                <span>{stockData.supply_and_demand.google_trends.market_trends || "No available data"}</span>
              </p>
            </div>

             {/* Earnings and financial goals */}
             <div className="border-b border-custom-purple pb-4">
              <h3 className="text-lg font-bold">📊Earnings and financial goals</h3>
              <p className="text-gray-300 mb-2 flex flex-column">
                <span className="font-bold">Annual Revenue Growth:</span>
                <span>GOOGL's revenue grew to $307.39 billion in the fiscal year 2023.</span>
              </p>
              <p className="text-gray-300 mb-2 flex flex-column">
                <span className="font-bold">Annual EPS Growth:</span>
                <span>$5.84 in 2023, which is a significant increase from previous years.</span>
              </p>
              <p className="text-gray-300 mb-2 flex flex-column">
                <span className="font-bold">Quarterly Revenue Growth:</span>
                <span>8.68% in Q3 2024.</span>
              </p>
              <p className="text-gray-300 mb-2 flex flex-column">
                <span className="font-bold">Quarterly EPS Growth:</span>
                <span>Consistent growth over the past three quarters.</span>
              </p>
            </div>

            {/* Industry Leadership */}
            <div className="border-b border-custom-purple pb-4">
              <h3 className="text-lg font-bold">📊 Industry Leadership</h3>
              <p className="text-gray-300 mb-2">{stockData.industry_leader || "No available data"}</p>
            </div>

            {/* Recommendations Section */}
            <div className="border-b border-custom-purple pb-4">
              <h3 className="text-lg font-bold">🎯 Recommendations</h3>
              <div className="space-y-2">
                <div className="flex flex-col">
                  <span className="block font-bold">💭 Considerations:</span>
                  <span className="text-gray-300">{stockData.recommendations.considerations || "No available data"}</span>
                </div>
                <div className="flex flex-col">
                  <span className="block font-bold">⚡ Action:</span>
                  <span className="text-gray-300">{stockData.recommendations.recommendations_for_action || "No available data"}</span>
                </div>
              </div>
            </div>

            {/* Conclusion Section */}
            <div>
              <h3 className="text-lg font-bold">📝 Summary</h3>
              <p className="text-gray-300 mb-2">{stockData.conclusion.summary || "No available data"}</p>
            </div>
            <p className="text-gray-300 mb-2">By considering the above factors, you can make an informed decision on trading GOOGL. Always continue monitoring market conditions and updates related to this stock.</p>

          </div>
        </div>
      </div>
    );
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
        </div>
  
        <form
          onSubmit={handleSubmit}
          className="bg-custom-purple shadow-md rounded-lg p-4 mb-4"
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

export default StockAnalysisAssistant;


// const handlePrintAnalysis = () => {
//   const analysisContent = document.getElementById('analysis-content'); 
//   const originalContent = document.body.innerHTML; 

//   document.body.innerHTML = analysisContent.innerHTML;
//   window.print();
//   document.body.innerHTML = originalContent;

//   attachEventListeners();
// };

// const attachEventListeners = () => {
//   document.querySelector('form').onsubmit = handleSubmit;
//   document.querySelector('.print-button').onclick = handlePrintAnalysis;
// };

// const parsedData = () => {

// }