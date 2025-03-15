import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecommendedStocks } from '../../hooks/useRecommendedStocks';
import StockAnalysisCard from '../Shared/StockAnalysisCard/StockAnalysisCard';

const StockDetail = () => {
  const navigate = useNavigate();
  const { ticker } = useParams();
  const { stocks, loading, error } = useRecommendedStocks(ticker);

  const handleClose = () => {
    navigate('/');
  };

  const handleDetailsClick = (stock) => {
    navigate(`/stock/${stock.name}`, { state: { stock } });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-custom-purple mb-4"></div>
        <p className="text-custom-purple text-lg">Loading analysis...</p>
      </div>
    );
  }

  const stock = stocks.length > 0 ? stocks[0] : null;

  if (error) {
    return (
      <div className="min-h-screen bg-black text-red-500 flex items-center justify-center">
        <p>{error}</p>
      </div>
    );
  }
  
  const analysis = JSON.parse(stock.analysis).stock_summary;

  if (!analysis) {
    return (
      <div className="min-h-screen bg-black text-gray-300 flex items-center justify-center">
        No analysis found for {ticker}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={handleClose}
          className="text-[#0C0B0B] hover:text-gray-600 flex items-center gap-2 mb-6"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </button>

        <div className="bg-white rounded-lg p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold text-[#0C0B0B]">
              {analysis.ticker} - Detailed Analysis
            </h2>
          </div>
          
          <div>
            {/* Primary Analysis Section */}
            <div className="bg-[#f5f5f7] text-[#0C0B0B] shadow-md rounded-lg p-6 max-w-4xl mx-auto mb-6">
              {/* Current Metrics */}
              <div className="mb-6">
                <div className="flex items-center mb-3">
                  <div className="bg-black rounded-full w-12 h-12 flex items-center justify-center mr-3">
                    <span className="text-lg">📊</span>
                  </div>
                  <h4 className="text-xl font-bold">Important Metrics</h4>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-3 bg-white rounded-lg hover:bg-gray-50 transition-all duration-300">
                    <span className="block font-bold">Current Price</span>
                    <span className="text-lg">${analysis.current_metrics?.price?.toFixed(2) || 'N/A'}</span>
                  </div>
                  <div className="p-3 bg-white rounded-lg hover:bg-gray-50 transition-all duration-300">
                    <span className="block font-bold">Volume</span>
                    <span className="text-lg">{analysis.current_metrics?.volume?.toLocaleString() || 'N/A'}</span>
                  </div>
                  <div className="p-3 bg-white rounded-lg hover:bg-gray-50 transition-all duration-300">
                    <span className="block font-bold">52W High</span>
                    <span className="text-lg">${analysis.current_metrics?.fifty_two_week?.high?.toFixed(2) || 'N/A'}</span>
                  </div>
                  <div className="p-3 bg-white rounded-lg hover:bg-gray-50 transition-all duration-300">
                    <span className="block font-bold">52W Low</span>
                    <span className="text-lg">${analysis.current_metrics?.fifty_two_week?.low?.toFixed(2) || 'N/A'}</span>
                  </div>
                </div>
              </div>
  
              {/* Recommendation Section */}
              <div className="border-t border-gray-200 py-4">
                {/* Recommendation Title */}
                <div className="flex flex-col items-center justify-center p-4 mb-4">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold break-words text-center">Recommendation</h3>
                </div>
  
                {/* Action Recommendation */}
                <div className="p-6 bg-white rounded-lg mb-4 hover:bg-gray-50 transition-all duration-300">
                  <div className={`text-3xl font-bold text-center py-3 px-6 rounded-lg ${
                    analysis.recommendation.action.toLowerCase().includes('buy') ? 'bg-green-500/20 text-green-600' :
                    analysis.recommendation.action.toLowerCase().includes('sell') ? 'bg-red-500/20 text-red-600' :
                    'bg-yellow-500/20 text-yellow-600'
                  }`}>
                    {analysis.recommendation.action}
                  </div>
                </div>
  
                <div className="space-y-4">
                  <div className="p-4 bg-white rounded-lg hover:bg-gray-50 transition-all duration-300">
                    <div className="flex items-center mb-3">
                      <div className="bg-black rounded-full w-12 h-12 flex items-center justify-center mr-3">
                        <span className="text-lg">🎯</span>
                      </div>
                      <h4 className="text-xl font-bold">Key Triggers</h4>
                    </div>
                    <ul className="list-disc list-inside ml-11">
                      {analysis.recommendation.triggers.map((trigger, index) => (
                        <li key={index}>{trigger}</li>
                      ))}
                    </ul>
                  </div>
  
                  <div className="p-4 bg-white rounded-lg hover:bg-gray-50 transition-all duration-300">
                    <div className="flex items-center mb-3">
                      <div className="bg-black rounded-full w-12 h-12 flex items-center justify-center mr-3">
                        <span className="text-lg">⚠️</span>
                      </div>
                      <h4 className="text-xl font-bold">Risk Factors</h4>
                    </div>
                    <ul className="list-disc list-inside ml-11">
                      {analysis.recommendation.risk_factors.map((risk, index) => (
                        <li key={index}>{risk}</li>
                      ))}
                    </ul>
                  </div>
                </div>
  
                {/* Trade Setup Section */}
                <div className="mt-6">
                  <div className="flex items-center mb-3">
                    <div className="bg-[#f5f5f7] rounded-full w-12 h-12 flex items-center justify-center mr-3">
                      <span className="text-lg">📈</span>
                    </div>
                    <h4 className="text-xl font-bold">Trade Setup</h4>
                  </div>
                  
                  <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-3">
                      <div className="p-3 bg-white rounded-lg hover:bg-gray-50 transition-all duration-300">
                        <span className="block font-bold">Buy Point</span>
                        <span className="text-lg">${analysis.trade_setup?.buy_point?.toFixed(2) || 'N/A'}</span>
                      </div>
                      <div className="p-3 bg-white rounded-lg hover:bg-gray-50 transition-all duration-300">
                        <span className="block font-bold">Target</span>
                        <span className="text-lg">${analysis.trade_setup?.target_price?.toFixed(2) || 'N/A'}</span>
                      </div>
                      <div className="p-3 bg-white rounded-lg hover:bg-gray-50 transition-all duration-300">
                        <span className="block font-bold">Stop Loss</span>
                        <span className="text-lg">${analysis.trade_setup?.stop_loss?.toFixed(2) || 'N/A'}</span>
                      </div>
                    </div>
                    <div className="p-3 bg-white rounded-lg hover:bg-gray-50 transition-all duration-300">
                      <span className="block font-bold">Setup Type</span>
                      <span className="text-lg">{analysis.trade_setup?.setup_type || 'N/A'}</span>
                    </div>
                  </div>
                </div>
  
                {/* Risk Management Section */}
                <div className="mt-6">
                  <div className="flex items-center mb-3">
                    <div className="bg-[#f5f5f7] rounded-full w-12 h-12 flex items-center justify-center mr-3">
                      <span className="text-lg">🛡️</span>
                    </div>
                    <h4 className="text-xl font-bold">Risk Management</h4>
                  </div>
                  
                  <div className="p-4 bg-white rounded-lg hover:bg-gray-50 transition-all duration-300">
                    <p className="text-lg">{analysis.recommendation.risk_management || 'N/A'}</p>
                  </div>
                </div>
              </div>
              {/* Chart Section */}
              {/* <Chart/> */}
  
              {/* Technical Analysis */}
              <div className="border-t border-gray-200 py-4 space-y-4">
                {/* Technical Analysis Title */}
                <div className="flex flex-col items-center justify-center p-4 mb-4">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold break-words text-center">Technical Analysis</h3>
                </div>
  
                {/* Moving Averages Section */}
                <div className="mb-6">
                  <div className="flex items-center mb-3">
                    <div className="bg-[#f5f5f7] rounded-full w-12 h-12 flex items-center justify-center mr-3">
                      <span className="text-lg">📈</span>
                    </div>
                    <h4 className="text-xl font-bold">Moving Averages (EMA)</h4>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-3">
                    <div className="p-3 bg-white rounded-lg hover:bg-gray-50 transition-all duration-300">
                      <span className="block font-bold">EMA 50</span>
                      <span>${analysis.technical_analysis?.moving_averages?.ema_50?.toFixed(2) || 'N/A'}</span>
                    </div>
                    <div className="p-3 bg-white rounded-lg hover:bg-gray-50 transition-all duration-300">
                      <span className="block font-bold">EMA 150</span>
                      <span>${analysis.technical_analysis?.moving_averages?.ema_150?.toFixed(2) || 'N/A'}</span>
                    </div>
                    <div className="p-3 bg-white rounded-lg hover:bg-gray-50 transition-all duration-300">
                      <span className="block font-bold">EMA 200</span>
                      <span>${analysis.technical_analysis?.moving_averages?.ema_200?.toFixed(2) || 'N/A'}</span>
                    </div>
                  </div>
                </div>
  
                {/* Trend Analysis Section */}
                <div className="mb-6">
                  <div className="flex items-center mb-3">
                    <div className="bg-[#f5f5f7] rounded-full w-12 h-12 flex items-center justify-center mr-3">
                      <span className="text-lg">🎯</span>
                    </div>
                    <h4 className="text-xl font-bold">Trend Analysis</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-white rounded-lg hover:bg-gray-50 transition-all duration-300">
                      <span className="block font-bold mb-2">Overall Trend</span>
                      <div className={`text-lg font-semibold ${
                        analysis.technical_analysis?.trend?.includes('Bullish') ? 'text-green-600' :
                        analysis.technical_analysis?.trend?.includes('Bearish') ? 'text-red-600' :
                        'text-yellow-600'
                      }`}>
                        {analysis.technical_analysis?.trend || 'N/A'}
                      </div>
                    </div>
                    <div className="p-4 bg-white rounded-lg hover:bg-gray-50 transition-all duration-300">
                      <span className="block font-bold mb-2">Distance from 52W High</span>
                      <span className="text-lg">
                        {analysis.technical_analysis?.distance_from_52_week_high || 'N/A'}
                      </span>
                    </div>
                  </div>
                </div>
  
                {/* Volume Analysis */}
                <div className="p-3 bg-white rounded-lg hover:bg-gray-50 transition-all duration-300">
                  <span className="block font-bold mb-2">Volume and Volatility Pattern Analysis</span>
                  <p className="text-sm">{analysis.technical_analysis?.volume_analysis || 'N/A'}</p>
                  <p className="text-sm">{analysis.technical_analysis?.volatility_pattern || 'N/A'}</p>
                </div>
  
                {/* Technical Setup */}
                <div className="space-y-3">
                  <div className="p-3 bg-white rounded-lg hover:bg-gray-50 transition-all duration-300">
                    <span className="block font-bold mb-2">Technical Setup</span>
                    <p className="text-sm">{analysis.technical_analysis?.technical_setup || 'N/A'}</p>
                    <p className="text-sm">{analysis.technical_analysis?.technical_setup_trigger || 'N/A'}</p>
                  </div>
  
                  {/* Key Triggers */}
                  <div className="p-3 bg-white rounded-lg hover:bg-gray-50 transition-all duration-300">
                    <span className="block font-bold mb-2">Key Triggers and Risks</span>
                    <p className="text-sm">{analysis.technical_analysis?.technical_setup_trigger_key_triggers || 'N/A'}</p>
                    <p className="text-sm">{analysis.technical_analysis?.technical_setup_trigger_risk_factors || 'N/A'}</p>
                  </div>
                </div>
              </div>
            
              {/* Fundamental Analysis */}
              <div className="border-t border-custom-purple py-4 space-y-4">
                {/* Fundamental Analysis Title */}
                <div className="flex flex-col items-center justify-center p-4 mb-4">
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
                  
                  <div className="p-4 bg-white rounded-lg hover:bg-gray-50 transition-all duration-300">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-3">
                      {analysis.fundamental_analysis?.quarterly_eps_growth?.map((growth, index) => (
                        <div key={index} className="text-center p-2 bg-[#f5f5f7] rounded-lg">
                          <span className="block font-bold">Q{3 - index}</span>
                          <span className={`text-lg font-semibold ${growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {(growth * 100).toFixed(1)}%
                          </span>
                        </div>
                      ))}
                    </div>
                    <p className="text-sm mt-2">{analysis.fundamental_analysis?.quarterly_eps_growth_trend}</p>
                  </div>
                </div>
  
                {/* Growth Trends */}  
                <div className="mb-6">
                  <div className="flex items-center mb-3">
                    <div className="bg-[#f5f5f7] rounded-full w-12 h-12 flex items-center justify-center mr-3">
                      <span className="text-lg">📊</span>
                    </div>
                    <h4 className="text-xl font-bold">Growth Analysis</h4>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3 bg-white rounded-lg hover:bg-gray-50 transition-all duration-300">
                      <div className="flex items-center mb-2">
                        <div className="bg-black rounded-full w-12 h-12 flex items-center justify-center mr-2">
                          <span className="text-sm">📅</span>
                        </div>
                        <h4 className="font-bold">Annual Growth</h4>
                      </div>
                      <p className="text-sm">{analysis.fundamental_analysis?.annual_growth_trend}</p>
                    </div>
                    <div className="p-3 bg-white rounded-lg hover:bg-gray-50 transition-all duration-300">
                      <div className="flex items-center mb-2">
                        <div className="bg-black rounded-full w-12 h-12 flex items-center justify-center mr-2">
                          <span className="text-sm">🏢</span>
                        </div>
                        <h4 className="font-bold">Industry Position</h4>
                      </div>
                      <p className="text-sm">{analysis.fundamental_analysis?.industry_position}</p>
                    </div>
                  </div>
                </div>
  
                {/* Sector Performance */}
                <div className="p-3 bg-white rounded-lg hover:bg-gray-50 transition-all duration-300">
                  <h4 className="font-bold mb-2">Sector Performance</h4>
                  <p className="text-sm">{analysis.fundamental_analysis?.sector_performance}</p>
                </div>
              </div>
  
              {/* Institutional Ownership */}
              <div className="border-t border-gray-200 py-4">    
                  <div className="flex flex-col items-center justify-center p-4 mb-4">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold break-words text-center">Institutional Ownership</h3>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="p-4 bg-white rounded-lg hover:bg-gray-50 transition-all duration-300">
                      <div className="flex items-center mb-2">
                        <div className="bg-black rounded-full w-12 h-12 flex items-center justify-center mr-3">
                          <span className="text-lg">🏦</span>
                        </div>
                        <span className="text-xl font-bold">Current Ownership</span>
                      </div>
                      <p className="text-sm ml-11">
                        {analysis.institutional_ownership?.institutional_ownership || 'No ownership data available'}
                      </p>
                    </div>
                    <div className="p-4 bg-white rounded-lg hover:bg-gray-50 transition-all duration-300">
                      <div className="flex items-center mb-2">
                        <div className="bg-black rounded-full w-12 h-12 flex items-center justify-center mr-3">
                          <span className="text-lg">📈</span>
                        </div>
                        <span className="text-xl font-bold">Ownership Trend</span>
                      </div>
                      <p className="text-sm ml-11">
                        {analysis.institutional_ownership?.institutional_ownership_trend || 'No trend data available'}
                      </p>
                    </div>
                  </div>
              </div>
  
              {/* Market Analysis */}
              <div className="border-t border-gray-200 py-4">
                {/* Market Analysis Title */}
                <div className="flex flex-col items-center justify-center p-4 mb-4">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold break-words text-center">Market Analysis</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-white rounded-lg hover:bg-gray-50 transition-all duration-300">
                    <div className="flex items-center mb-2">
                      <div className="bg-black rounded-full w-12 h-12 flex items-center justify-center mr-3">
                        <span className="text-lg">🎯</span>
                      </div>
                      <span className="text-xl font-bold">Market Sentiment</span>
                    </div>
                    <div className={`ml-11 text-lg font-semibold ${
                      analysis.market_analysis?.market_sentiment?.toLowerCase().includes('bullish') ? 'text-green-600' :
                      analysis.market_analysis?.market_sentiment?.toLowerCase().includes('bearish') ? 'text-red-600' :
                      'text-yellow-600'
                    }`}>
                      {analysis.market_analysis?.market_sentiment || 'N/A'}
                    </div>
                  </div>
                  <div className="p-4 bg-white rounded-lg hover:bg-gray-50 transition-all duration-300">
                    <div className="flex items-center mb-2">
                      <div className="bg-black rounded-full w-12 h-12 flex items-center justify-center mr-3">
                        <span className="text-lg">📊</span>
                      </div>
                      <span className="text-xl font-bold">Market Trend</span>
                    </div>
                    <div className={`ml-11 text-lg font-semibold ${
                      analysis.market_analysis?.market_trend?.toLowerCase().includes('up') ? 'text-green-600' :
                      analysis.market_analysis?.market_trend?.toLowerCase().includes('down') ? 'text-red-600' :
                      'text-yellow-600'
                    }`}>
                      {analysis.market_analysis?.market_trend || 'N/A'}
                    </div>
                  </div>
                </div>
              </div>
  
              {/* Risk Assessment */}
              <div className="border-t border-gray-200 py-4">
                {/* Risk Assessment Title */}
                <div className="flex flex-col items-center justify-center p-4 mb-4">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold break-words text-center">Risk Assessment</h3>
                </div>
                <div className="space-y-3">
                  <div className="p-4 bg-white rounded-lg hover:bg-gray-50 transition-all duration-300">
                    <div className="flex items-center mb-2">
                      <div className="bg-black rounded-full w-12 h-12 flex items-center justify-center mr-3">
                        <span className="text-lg">🌍</span>
                      </div>
                      <span className="text-xl font-bold">Market Conditions</span>
                    </div>
                    <p className="text-sm ml-11">{analysis.risk_assessment?.market_conditions || 'N/A'}</p>
                  </div>
                  <div className="p-4 bg-white rounded-lg hover:bg-gray-50 transition-all duration-300">
                    <div className="flex items-center mb-2">
                      <div className="bg-black rounded-full w-12 h-12 flex items-center justify-center mr-3">
                        <span className="text-lg">⚠️</span>
                      </div>
                      <span className="text-xl font-bold">Technical Risks</span>
                    </div>
                    <p className="text-sm ml-11">{analysis.risk_assessment?.technical_risks || 'N/A'}</p>
                  </div>
                  <div className="p-4 bg-white rounded-lg hover:bg-gray-50 transition-all duration-300">
                    <div className="flex items-center mb-2">
                      <div className="bg-black rounded-full w-12 h-12 flex items-center justify-center mr-3">
                        <span className="text-lg">🎯</span>
                      </div>
                      <span className="text-xl font-bold">Setup Risks</span>
                    </div>
                    <p className="text-sm ml-11">{analysis.risk_assessment?.setup_risks || 'N/A'}</p>
                  </div>
                </div>
              </div>
  
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockDetail; 