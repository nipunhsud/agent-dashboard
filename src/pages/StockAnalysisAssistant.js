import React, { useState } from "react";
import brainLogo from '../assets/brain-logo.png';
import CSRFToken from "../components/CSRFtoken/CSRFtoken";

const StockAnalysisAssistant = () => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const csrfToken = useCSRFToken();
  
  
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
  
  const handleSubmitDjango = async (event) => {
    event.preventDefault();
    setError("");
    setResponse(<div className="text-center text-gray-500">Fetching data from server...</div>);

    console.log('csrf handle submit', csrfToken)

    try {
        const formData = new URLSearchParams();
        formData.append("input", input);

        const res = await fetch("http://127.0.0.1:8000/stock_assistant/", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "X-CSRFToken": csrfToken, 
            },
            credentials: "include", 
            body: formData.toString(),
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error || "Failed to fetch stock analysis");
        }

        const data = await res.json();
        setResponse(formatResponse(data));
    } catch (err) {
        setError(err.message);
    }
  };

  const formatResponse = (data) => {
    const analysis = JSON.parse(data.response);   
    console.log("Type of data.response:", typeof data.response);

    console.log('this is analysis', analysis)
    const stockData = analysis.stock_summary;
  
    console.log('stockData', stockData)

    return (
      <div>
        <div className="bg-black text-gray-300 shadow-md rounded-lg p-6 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-custom-purple">
            📊 {stockData.ticker} Analysis
          </h2>
          <p className="text-gray-300 flex space-x-4">
            <span
              className="inline-block px-4 py-1.5 bg-custom-purple border border-custom-purple text-white rounded-full max-w-max"
            >
              ${stockData.current_price}
            </span>
            <span
              className="inline-block px-4 py-1.5 bg-custom-purple border border-custom-purple text-white rounded-full max-w-max"
            >
              {stockData.conclusion?.investment_outlook}
            </span>
          </p>

          <div className="space-y-6">
          
            {/* Buy Point Section */}
            <div className="border-t border-b border-custom-purple py-4 flex flex-col">
              <h3 className="text-lg font-bold">🎯 Buy Point:</h3>
              <p className="text-gray-300">{stockData.buy_point?.consideration}</p>
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
                {stockData.supply_and_demand?.volume_analysis || "No available data"}
              </p>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-3 bg-custom-purple rounded-lg flex flex-col">
                  <span className="font-semibold">50d EMA:</span>
                  <span>{stockData.supply_and_demand?.moving_averages.day_ema_50 || "No available data"}</span>
                </div>
                <div className="p-3 bg-custom-purple rounded-lg flex flex-col">
                  <span className="font-semibold">150d EMA:</span>
                  <span>{stockData.supply_and_demand?.moving_averages.day_ema_150 || "No available data"}</span>
                </div>
                <div className="p-3 bg-custom-purple rounded-lg flex flex-col">
                  <span className="font-semibold">200d EMA:</span>
                  <span>{stockData.supply_and_demand?.moving_averages.day_ema_200 || "No available data"}</span>
                </div>
              </div>
            </div>

            {/* Technical Section */}
            <div className="border-b border-custom-purple pb-4">
              <h3 className="text-lg font-bold">📈 Technical</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <span className="block font-bold">🎯 Market:</span>
                  <span className="text-gray-300">{stockData.technical_analysis?.market_direction || "No available data"}</span>
                </div>
                <div className="flex flex-col">
                  <span className="block font-bold">📈 EPS Growth:</span>
                  <span className="text-gray-300">{stockData.technical_analysis?.eps_growth || "No available data"}</span>
                </div>
              </div>
            </div>

            {/* Financial Section */}
            <div className="border-b border-custom-purple pb-4">
              <h3 className="text-lg font-bold">💰 Financials</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-3 flex flex-col bg-custom-purple rounded-lg">
                  <span className="font-semibold">📈 Revenue:</span> 
                  <span>{stockData.quarterly_earnings_analysis?.quarterly_revenue || "No data"}</span>
                </div>
                <div className="p-3 flex flex-col bg-custom-purple rounded-lg">
                  <span className="font-semibold">💵 Net Income:</span> 
                  <span>{stockData.quarterly_earnings_analysis?.quarterly_net_income || "No data"}</span>
                </div>
                <div className="p-3 flex flex-col bg-custom-purple rounded-lg">
                  <span className="font-semibold">📊 EPS:</span> 
                  <span>{stockData.quarterly_earnings_analysis?.quarterly_eps || "No data"}</span>
                </div>
              </div>
            </div>

            {/* Recommendations Section */}
            <div className="border-b border-custom-purple pb-4">
              <h3 className="text-lg font-bold">🎯 Actions</h3>
              <div className="space-y-2">
                <div className="flex flex-col">
                  <span className="block font-bold">💭 Consider:</span>
                  <span className="text-gray-300">{stockData.recommendations?.considerations || "No data"}</span>
                </div>
                <div className="flex flex-col">
                  <span className="block font-bold">⚡ Action:</span>
                  <span className="text-gray-300">{stockData.recommendations?.recommendations_for_action || "No data"}</span>
                </div>
              </div>
            </div>

            {/* Conclusion Section */}
            <div>
              <h3 className="text-lg font-bold">📝 Summary</h3>
              <p className="text-gray-300 mb-2">{stockData?.conclusion?.summary || "No data"}</p>
            </div>
          </div>
        </div>
        <div className="bg-black text-gray-300 shadow-md rounded-lg p-6 max-w-4xl mx-auto">
          <div className="bg-custom-purple rounded-lg">
            <h2 className="text-2xl font-medium mb-6 text-white p-3">
              Below is the detailed trading strategy and stock summary for {stockData?.ticker || "No data"}
            </h2>
          </div>
          <p className="text-gray-300 flex space-x-4">
            <span
              className="inline-block px-4 py-2 bg-custom-purple border border-custom-purple text-white rounded-full max-w-max"
            >
              ${stockData?.current_price || "No data"}
            </span>
            <span
              className="inline-block px-4 py-2 bg-custom-purple border border-custom-purple text-white rounded-full max-w-max"
            >
              {stockData?.conclusion?.investment_outlook || "No data"}
            </span>
          </p>

          <div className="space-y-6">
          
            {/* Buy Point Section */}
            <div className="border-t border-b border-custom-purple py-4 flex flex-col">
              <h3 className="text-lg font-bold">🎯 Buy Point:</h3>
              <div className="text-gray-300">
                <p className="flex flex-col">
                  <span className="font-bold">Buy Point:</span>
                  <span>{stockData.buy_point?.consideration || "No data"}</span>
                </p>
                <p className="flex flex-col">
                  <span className="font-bold">52 Week High/Low:</span>
                  <span>$201.42 / $130.67</span>
                </p>
                <p className="flex flex-col">
                  <span className="font-bold">Buy Point Consideration:</span>
                  <span>
                    <span>{stockData.buy_point?.consideration || "No data"}</span>
                  </span>
                </p>
              </div>
            </div>

            {/* Supply & Demand Section */}
            <div className="border-b border-custom-purple pb-4">
              <h3 className="text-lg font-normal">📊 Supply & Demand</h3>
              <p className="text-gray-300 mb-2">
                {stockData.supply_and_demand?.volume_analysis || "No data"}
              </p>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-3 bg-custom-purple rounded-lg flex flex-col">
                  <span className="font-semibold">50d EMA:</span>
                  <span>{stockData.supply_and_demand?.moving_averages?.day_ema_50 || "No data"}</span>
                </div>
                <div className="p-3 bg-custom-purple rounded-lg flex flex-col">
                  <span className="font-semibold">150d EMA:</span>
                  <span>{stockData.supply_and_demand?.moving_averages?.day_ema_150 || "No data"}</span>
                </div>
                <div className="p-3 bg-custom-purple rounded-lg flex flex-col">
                  <span className="font-semibold">200d EMA:</span>
                  <span>{stockData.supply_and_demand?.moving_averages?.day_ema_200 || "No data"}</span>
                </div>
              </div>
            </div>

            {/* Tight Areas */}
            <div className="border-b border-custom-purple pb-4">
              <h3 className="text-lg font-bold">📊 Tight areas</h3>
              <p className="text-gray-300 mb-2">{stockData?.tight_areas || "No data"}</p>
            </div>

            {/* Technical Section */}
            <div className="border-b border-custom-purple pb-4">
              <h3 className="text-lg font-bold">📈 Technical Analysis</h3>
              <div className="grid grid-cols-2 gap-4">
                {/* Market Direction */}
                <div className="flex flex-col">
                  <span className="block font-bold">🎯 Market Direction:</span>
                  <span className="text-gray-300">
                    {stockData.technical_analysis?.market_direction || "No data"}
                  </span>
                </div>
                {/* EPS Growth */}
                <div className="flex flex-col">
                  <span className="block font-bold">📈 EPS Growth:</span>
                  <span className="text-gray-300">
                    {stockData.technical_analysis?.eps_growth || "No data"}
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
                <span>{stockData.supply_and_demand?.google_trends?.market_trends || "No data"}</span>
              </p>
            </div>

             {/* Earnings and financial goals */}
             <div className="border-b border-custom-purple pb-4">
              <h3 className="text-lg font-bold">📊Earnings and financial goals</h3>
              <p className="text-gray-300 mb-2 flex flex-column">
                <span className="font-bold">Annual Revenue Growth:</span>
                <span>{stockData?.annual_financial_growth?.annual_revenue_growth || "No data"}</span>
              </p>
              <p className="text-gray-300 mb-2 flex flex-column">
                <span className="font-bold">Annual EPS Growth:</span>
                <span>{stockData?.annual_financial_growth?.annual_eps_growth || "No data"}</span>
              </p>
              <p className="text-gray-300 mb-2 flex flex-column">
                <span className="font-bold">Quarterly Revenue Growth:</span>
                <span>{stockData?.quarterly_earnings_analysis?.quarterly_revenue || "No data"}</span>
              </p>
              <p className="text-gray-300 mb-2 flex flex-column">
                <span className="font-bold">Quarterly EPS Growth:</span>
                <span>{stockData?.quarterly_earnings_analysis?.quarterly_eps || "No data"}</span>
              </p>
            </div>

            {/* Industry Leadership */}
            <div className="border-b border-custom-purple pb-4">
              <h3 className="text-lg font-bold">📊 Industry Leadership</h3>
              <p className="text-gray-300 mb-2">{stockData?.industry_leader || "No data"}</p>
            </div>

            {/* Recommendations Section */}
            <div className="border-b border-custom-purple pb-4">
              <h3 className="text-lg font-bold">🎯 Recommendations</h3>
              <div className="space-y-2">
                <div className="flex flex-col">
                  <span className="block font-bold">💭 Considerations:</span>
                  <span className="text-gray-300">{stockData?.recommendations?.considerations || "No data"}</span>
                </div>
                <div className="flex flex-col">
                  <span className="block font-bold">⚡ Action:</span>
                  <span className="text-gray-300">{stockData?.recommendations?.recommendations_for_action || "No data"}</span>
                </div>
              </div>
            </div>

            {/* Conclusion Section */}
            <div>
              <h3 className="text-lg font-bold">📝 Summary</h3>
              <p className="text-gray-300 mb-2">{stockData?.conclusion?.summary || "No data"}</p>
            </div>
            <p className="text-gray-300 mb-2">By considering the above factors, you can make an informed decision on trading {stockData.ticker}. Always continue monitoring market conditions and updates related to this stock.</p>

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
        // ADD THE CSRF TOKEN INPUT HERE
        <form
          onSubmit={handleSubmitDjango}
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




// import React, { useState } from "react";
// import brainLogo from '../assets/brain-logo.png';

// // Separate components for better readability and maintainability
// const AnalysisResult = ({ response }) => {
//     if (!response) return null;
//     const stockData = response.stock_summary;

//     return (
//         <div className="bg-black text-gray-300 shadow-md rounded-lg p-6 max-w-4xl mx-auto">
//             <h2 className="text-2xl font-bold mb-6 text-custom-purple">
//                 📊 {stockData.ticker} Analysis
//             </h2>
//             <p className="text-gray-300 flex space-x-4">
//                 <span className="inline-block px-4 py-2 bg-custom-purple border border-custom-purple text-white rounded-full max-w-max">
//                     ${stockData.current_price}
//                 </span>
//                 <span className="inline-block px-4 py-2 bg-custom-purple border border-custom-purple text-white rounded-full max-w-max">
//                     {stockData.conclusion?.investment_outlook}
//                 </span>
//             </p>

//             <div className="space-y-6">
//                 {/* Sections for detailed stock information */}
//                 <DetailSection title="🎯 Buy Point:" content={stockData.buy_point?.consideration} />
//                 <DetailSection title="📈 Target Price:" content={stockData.target_price || "No available data"} />
//                 <SupplyDemandSection data={stockData.supply_and_demand} />
//                 <TechnicalAnalysisSection data={stockData.technical_analysis} />
//                 <FinancialsSection data={stockData.quarterly_earnings_analysis} />
//                 <RecommendationsSection data={stockData.recommendations} />
//                 <ConclusionSection summary={stockData.conclusion?.summary} />
//             </div>
//         </div>
//     );
// };

// const DetailSection = ({ title, content }) => (
//     <div className="border-t border-b border-custom-purple py-4 flex flex-col">
//         <h3 className="text-lg font-bold">{title}</h3>
//         <p className="text-gray-300">{content}</p>
//     </div>
// );

// const SupplyDemandSection = ({ data }) => (
//     <div className="border-b border-custom-purple pb-4">
//         <h3 className="text-lg font-bold">📊 Supply & Demand</h3>
//         <p className="text-gray-300 mb-2">{data?.volume_analysis || "No available data"}</p>
//         <div className="grid grid-cols-3 gap-4">
//             <EMABox label="50d EMA:" value={data?.moving_averages?.day_ema_50} />
//             <EMABox label="150d EMA:" value={data?.moving_averages?.day_ema_150} />
//             <EMABox label="200d EMA:" value={data?.moving_averages?.day_ema_200} />
//         </div>
//     </div>
// );

// const EMABox = ({ label, value }) => (
//     <div className="p-3 bg-custom-purple rounded-lg flex flex-col">
//         <span className="font-semibold">{label}</span>
//         <span>{value || "No available data"}</span>
//     </div>
// );

// const TechnicalAnalysisSection = ({ data }) => (
//     <div className="border-b border-custom-purple pb-4">
//         <h3 className="text-lg font-bold">📈 Technical Analysis</h3>
//         <div className="grid grid-cols-2 gap-4">
//             <DetailBox label="🎯 Market:" content={data?.market_direction} />
//             <DetailBox label="📈 EPS Growth:" content={data?.eps_growth} />
//         </div>
//     </div>
// );

// const FinancialsSection = ({ data }) => (
//     <div className="border-b border-custom-purple pb-4">
//         <h3 className="text-lg font-bold">💰 Financials</h3>
//         <div className="grid grid-cols-3 gap-4">
//             <DetailBox label="📈 Revenue:" content={data?.quarterly_revenue} />
//             <DetailBox label="💵 Net Income:" content={data?.quarterly_net_income} />
//             <DetailBox label="📊 EPS:" content={data?.quarterly_eps} />
//         </div>
//     </div>
// );

// const RecommendationsSection = ({ data }) => (
//     <div className="border-b border-custom-purple pb-4">
//         <h3 className="text-lg font-bold">🎯 Recommendations</h3>
//         <div className="space-y-2">
//             <DetailBox label="💭 Considerations:" content={data?.considerations} />
//             <DetailBox label="⚡ Action:" content={data?.recommendations_for_action} />
//         </div>
//     </div>
// );

// const ConclusionSection = ({ summary }) => (
//     <div>
//         <h3 className="text-lg font-bold">📝 Summary</h3>
//         <p className="text-gray-300 mb-2">{summary || "No data"}</p>
//     </div>
// );

// const DetailBox = ({ label, content }) => (
//     <div className="flex flex-col">
//         <span className="block font-bold">{label}</span>
//         <span className="text-gray-300">{content || "No data"}</span>
//     </div>
// );

// const StockAnalysisAssistant = () => {
//     const [input, setInput] = useState("");
//     const [response, setResponse] = useState(null);
//     const [error, setError] = useState("");

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         setError("");
//         setResponse(null);

//         try {
//             const formData = new URLSearchParams();
//             formData.append("input", input);

//             const res = await fetch("http://127.0.0.1:8000/stock_assistant/", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/x-www-form-urlencoded",
//                 },
//                 body: formData.toString(),
//             });

//             if (!res.ok) {
//                 const errorData = await res.json();
//                 throw new Error(errorData.error || "Failed to fetch stock analysis");
//             }

//             const data = await res.json();
//             setResponse(data.response);
//         } catch (err) {
//             setError(err.message);
//         }
//     };

//     return (
//         <div className="bg-black text-gray-300 min-h-screen flex flex-col items-center py-4 px-4">
//             <Header />
//             <form onSubmit={handleSubmit} className="bg-custom-purple shadow-md rounded-lg p-4 mb-4">
//                 <label htmlFor="input" className="block text-lg font-normal text-gray-300 mb-2">
//                     Enter Stock Ticker or Company Name:
//                 </label>
//                 <textarea
//                     id="input"
//                     rows="3"
//                     value={input}
//                     onChange={(e) => setInput(e.target.value)}
//                     className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-black text-gray-300"
//                     placeholder="e.g., AAPL, MSFT, GOOGL"
//                 ></textarea>
//                 <button
//                     type="submit"
//                     className="mt-3 bg-custom-purple border border-white text-white py-2 px-4 rounded-lg w-full hover:bg-black"
//                 >
//                     Analyze Stock
//                 </button>
//             </form>

//             {response && <AnalysisResult response={response} />}
//             {error && <div className="text-red-400 text-center mt-3">{error}</div>}

//             <Footer />
//         </div>
//     );
// };

// const Header = () => (
//     <div className="flex flex-col items-center">
//         <img src={brainLogo} alt="Logo" className="w-60 h-60 rounded-full" />
//         <h1 className="text-3xl font-extrabold text-custom-purple text-center mt-4 mb-4">
//             Stock Analysis Assistant
//         </h1>
//     </div>
// );

// const Footer = () => (
//     <button
//         onClick={() => window.print()}
//         className="fixed bottom-4 right-4 bg-custom-purple text-white py-2 px-4 rounded-lg shadow-lg hover:bg-black hover:text-custom-purple hover:border hover:border-custom-purple"
//     >
//         Print Analysis
//     </button>
// );

// export default StockAnalysisAssistant;






