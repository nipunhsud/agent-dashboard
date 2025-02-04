import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils/AuthContext';
import useCSRFToken from "../../hooks/useCSRFToken"
import useBackendUrl from '../../hooks/useBackendUrl';

const Dashboard = () => {
  const [stockAnalyses, setStockAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuth();
  const csrfToken = useCSRFToken();
  const backendUrl = useBackendUrl();
  const [analysisData, setAnalysisData] = useState({
    ticker: '',
  });
  const navigate = useNavigate();
  const [expandedAnalysis, setExpandedAnalysis] = useState(null);

  const parseAnalysisData = (analysisString) => {
    try {
      // Remove any control characters and escape sequences
      const sanitizedString = analysisString
        .replace(/[\u0000-\u001F\u007F-\u009F]/g, '')
        .replace(/\n/g, '\\n')
        .replace(/\r/g, '\\r')
        .replace(/\t/g, '\\t');
      
      return JSON.parse(sanitizedString);
    } catch (err) {
      console.error('Error parsing analysis data:', err);
      console.log('Problematic string:', analysisString);
      return null;
    }
  };

  const fetchStockAnalyses = useCallback(async () => {
    if (!token || !csrfToken) {
      setLoading(false);
      return;
    }

    try {
      // Get ticker from URL params
      const params = new URLSearchParams(window.location.search);
      const urlTicker = params.get('ticker');
      
      // Build the URL with optional ticker parameter
      const url = urlTicker 
        ? `${backendUrl}/user/stock-analyses?ticker=${urlTicker}`
        : `${backendUrl}/user/stock-analyses/`;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch analyses');
      }

      const data = await response.json();
      if (data.success) {
        const parsedAnalyses = data.analyses.map(analysis => ({
          ...analysis,
          analysis: parseAnalysisData(analysis.analysis) || {}
        }));
        setStockAnalyses(parsedAnalyses);
      }
    } catch (err) {
      console.error('Error fetching stock analyses:', err);
      setError('Failed to load your stock analyses');
    } finally {
      setLoading(false);
    }
  }, [token, csrfToken, backendUrl]);

  useEffect(() => {
    fetchStockAnalyses();
  }, [fetchStockAnalyses]);

  const closeExpandedView = () => {
    setExpandedAnalysis(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-custom-purple"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-red-500 flex items-center justify-center">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-gray-300 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-custom-purple">Your Stock Analysis History</h1>
        
        {stockAnalyses.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-400">No stock analyses found.</p>
            <Link 
              to="/analyze"
              className="mt-4 inline-block px-6 py-3 bg-custom-purple rounded-lg hover:bg-opacity-80 transition-all duration-200"
            >
              Analyze Your First Stock
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {stockAnalyses.map((stockAnalysis) => {
              const analysis = stockAnalysis.analysis;
              const stockSummary = analysis.stock_summary;
              console.log(stockAnalysis)
              return (
                <div 
                  key={stockAnalysis.id}
                  className="bg-gray-900 rounded-lg p-6 hover:shadow-lg transition-all duration-200"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex flex-col">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-custom-purple">
                          {stockSummary.ticker}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            console.log('Filtering by ticker:', stockSummary.ticker);
                            navigate(`/dashboard?ticker=${stockSummary.ticker}`);
                            window.location.reload(); // Force reload to trigger the API call
                          }}
                          className="px-2 py-1 text-sm bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center space-x-1"
                          title="Filter by this ticker"
                        >
                          <span>Filter</span>
                          <span>🔍</span>
                        </button>
                      </div>
                      <span className="text-sm text-gray-400 mt-1">
                        {new Date(stockAnalysis.timestamp).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        // Implement the logic to toggle shortlist
                        console.log('Toggle shortlist for:', stockSummary.ticker);
                      }}
                      className={`px-3 py-1 rounded-lg text-sm transition-all duration-200 ${
                        // Implement the logic to determine if the stock is shortlisted
                        false 
                          ? 'bg-red-500 hover:bg-red-600' 
                          : 'bg-custom-purple hover:bg-opacity-80'
                      }`}
                    >
                      {/* Implement the logic to display the appropriate button text */}
                      Remove
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {/* Current Metrics */}
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="p-2 bg-custom-purple rounded-lg">
                        <span className="block font-bold">Price</span>
                        <span>${stockSummary.current_metrics?.price?.toFixed(2)}</span>
                      </div>
                      <div className="p-2 bg-custom-purple rounded-lg">
                        <span className="block font-bold">Volume</span>
                        <span>{stockSummary.current_metrics?.volume?.toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Recommendation */}
                    <div className="p-3 bg-custom-purple rounded-lg">
                      <span className="block font-bold mb-2">Recommendation</span>
                      <span className={`px-2 py-1 rounded text-sm ${
                        stockSummary.recommendation?.action.includes('BUY') ? 'bg-green-900 text-green-300' :
                        stockSummary.recommendation?.action.includes('SELL') ? 'bg-red-900 text-red-300' :
                        'bg-yellow-900 text-yellow-300'
                      }`}>
                        {stockSummary.recommendation?.action}
                      </span>
                    </div>

                    {/* Trade Setup */}
                    <div className="p-3 bg-custom-purple rounded-lg">
                      <span className="block font-bold mb-2">Trade Setup</span>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-gray-400">Buy Point:</span>
                          <span className="ml-1">${stockSummary.trade_setup?.buy_point?.toFixed(2)}</span>
                        </div>
                        <div>
                          <span className="text-gray-400">Target:</span>
                          <span className="ml-1">${stockSummary.trade_setup?.target_price?.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Technical Analysis */}
                    <div className="p-3 bg-custom-purple rounded-lg">
                      <span className="block font-bold mb-2">Technical Analysis</span>
                      <div className="space-y-1">
                        <div className={`text-sm ${
                          stockSummary.technical_analysis?.trend?.includes('Up') ? 'text-green-400' :
                          stockSummary.technical_analysis?.trend?.includes('Down') ? 'text-red-400' :
                          'text-yellow-400'
                        }`}>
                          Trend: {stockSummary.technical_analysis?.trend}
                        </div>
                        <div className="text-sm">
                          Volume: {stockSummary.technical_analysis?.volume_analysis}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex space-x-3">
                    <Link 
                      to={`/stocks?ticker=${stockSummary.ticker}&autoSearch=true`}
                      className="flex-1 text-center px-4 py-2 bg-custom-purple rounded hover:bg-opacity-80 transition-all duration-200"
                    >
                      Analyze Again
                    </Link>
                    <button
                      onClick={() => setExpandedAnalysis(stockSummary)}
                      className="flex-1 text-center px-4 py-2 bg-gray-700 rounded hover:bg-opacity-80 transition-all duration-200"
                    >
                      More Details
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      
      {expandedAnalysis && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-custom-purple">
                {expandedAnalysis.ticker} - Detailed Analysis
              </h2>
              <button
                onClick={closeExpandedView}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            
            <div>
        {/* Primary Analysis Section */}
        <div className="bg-black text-gray-300 shadow-md rounded-lg p-6 max-w-4xl mx-auto mb-6">
          {/* Stock Analysis Title */}
          <div className="flex flex-col items-center justify-center p-4 mb-4">  
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold break-words text-center text-custom-purple">
              {expandedAnalysis.ticker} Analysis
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
                <span className="text-lg">${expandedAnalysis.current_metrics?.price?.toFixed(2) || 'N/A'}</span>
              </div>
              <div className="p-3 bg-custom-purple rounded-lg hover:bg-opacity-80 transition-all duration-300">
                <span className="block font-bold">Volume</span>
                <span className="text-lg">{expandedAnalysis.current_metrics?.volume?.toLocaleString() || 'N/A'}</span>
              </div>
              <div className="p-3 bg-custom-purple rounded-lg hover:bg-opacity-80 transition-all duration-300">
                <span className="block font-bold">52W High</span>
                <span className="text-lg">${expandedAnalysis.current_metrics?.fifty_two_week?.high?.toFixed(2) || 'N/A'}</span>
              </div>
              <div className="p-3 bg-custom-purple rounded-lg hover:bg-opacity-80 transition-all duration-300">
                <span className="block font-bold">52W Low</span>
                <span className="text-lg">${expandedAnalysis.current_metrics?.fifty_two_week?.low?.toFixed(2) || 'N/A'}</span>
              </div>
            </div>
          </div>

          {/* Recommendation Section */}
          <div className="border-t border-custom-purple py-4">
            {/* Recommendation Title */}
            <div className="flex flex-col items-center justify-center p-4 mb-4">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold break-words text-center">Recommendation</h3>
            </div>

            {/* Action Recommendation */}
            <div className="p-6 bg-custom-purple rounded-lg mb-4 hover:bg-opacity-80 transition-all duration-300">
              <div className={`text-3xl font-bold text-center py-3 px-6 rounded-lg ${
                expandedAnalysis.recommendation.action.toLowerCase().includes('buy') ? 'bg-green-500/20 text-green-400' :
                expandedAnalysis.recommendation.action.toLowerCase().includes('sell') ? 'bg-red-500/20 text-red-400' :
                'bg-yellow-500/20 text-yellow-400'
              }`}>
                {expandedAnalysis.recommendation.action}
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
                  {expandedAnalysis.recommendation.triggers.map((trigger, index) => (
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
                  {expandedAnalysis.recommendation.risk_factors.map((risk, index) => (
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
                    <span className="text-lg">${expandedAnalysis.trade_setup?.buy_point?.toFixed(2) || 'N/A'}</span>
                  </div>
                  <div className="p-3 bg-custom-purple rounded-lg hover:bg-opacity-80 transition-all duration-300">
                    <span className="block font-bold">Target</span>
                    <span className="text-lg">${expandedAnalysis.trade_setup?.target_price?.toFixed(2) || 'N/A'}</span>
                  </div>
                  <div className="p-3 bg-custom-purple rounded-lg hover:bg-opacity-80 transition-all duration-300">
                    <span className="block font-bold">Stop Loss</span>
                    <span className="text-lg">${expandedAnalysis.trade_setup?.stop_loss?.toFixed(2) || 'N/A'}</span>
                  </div>
                </div>
                <div className="p-3 bg-custom-purple rounded-lg hover:bg-opacity-80 transition-all duration-300">
                  <span className="block font-bold">Setup Type</span>
                  <span className="text-lg">{expandedAnalysis.trade_setup?.setup_type || 'N/A'}</span>
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
                <p className="text-lg">{expandedAnalysis.recommendation.risk_management || 'N/A'}</p>
              </div>
            </div>
          </div>
          {/* Chart Section */}
          {/* <Chart/> */}

          {/* Technical Analysis */}
          <div className="border-t border-custom-purple py-4 space-y-4">
            {/* Technical Analysis Title */}
            <div className="flex flex-col items-center justify-center p-4 mb-4">
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
                  <span>${expandedAnalysis.technical_analysis?.moving_averages?.ema_50?.toFixed(2) || 'N/A'}</span>
                </div>
                <div className="p-3 bg-custom-purple rounded-lg hover:bg-opacity-80 transition-all duration-300">
                  <span className="block font-bold">EMA 150</span>
                  <span>${expandedAnalysis.technical_analysis?.moving_averages?.ema_150?.toFixed(2) || 'N/A'}</span>
                </div>
                <div className="p-3 bg-custom-purple rounded-lg hover:bg-opacity-80 transition-all duration-300">
                  <span className="block font-bold">EMA 200</span>
                  <span>${expandedAnalysis.technical_analysis?.moving_averages?.ema_200?.toFixed(2) || 'N/A'}</span>
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
                    expandedAnalysis.technical_analysis?.trend?.includes('Bullish') ? 'text-green-500' :
                    expandedAnalysis.technical_analysis?.trend?.includes('Bearish') ? 'text-red-500' :
                    'text-yellow-500'
                  }`}>
                    {expandedAnalysis.technical_analysis?.trend || 'N/A'}
                  </div>
                </div>
                <div className="p-4 bg-custom-purple rounded-lg hover:bg-opacity-80 transition-all duration-300">
                  <span className="block font-bold mb-2">Distance from 52W High</span>
                  <span className="text-lg">
                    {expandedAnalysis.technical_analysis?.distance_from_52_week_high || 'N/A'}
                  </span>
                </div>
              </div>
            </div>

            {/* Volume Analysis */}
            <div className="p-3 bg-custom-purple rounded-lg hover:bg-opacity-80 transition-all duration-300">
              <span className="block font-bold mb-2">Volume and Volatility Pattern Analysis</span>
              <p className="text-sm">{expandedAnalysis.technical_analysis?.volume_analysis || 'N/A'}</p>
              <p className="text-sm">{expandedAnalysis.technical_analysis?.volatility_pattern || 'N/A'}</p>
            </div>

            {/* Technical Setup */}
            <div className="space-y-3">
              <div className="p-3 bg-custom-purple rounded-lg hover:bg-opacity-80 transition-all duration-300">
                <span className="block font-bold mb-2">Technical Setup</span>
                <p className="text-sm">{expandedAnalysis.technical_analysis?.technical_setup || 'N/A'}</p>
                <p className="text-sm">{expandedAnalysis.technical_analysis?.technical_setup_trigger || 'N/A'}</p>
              </div>

              {/* Key Triggers */}
              <div className="p-3 bg-custom-purple rounded-lg hover:bg-opacity-80 transition-all duration-300">
                <span className="block font-bold mb-2">Key Triggers and Risks</span>
                <p className="text-sm">{expandedAnalysis.technical_analysis?.technical_setup_trigger_key_triggers || 'N/A'}</p>
                <p className="text-sm">{expandedAnalysis.technical_analysis?.technical_setup_trigger_risk_factors || 'N/A'}</p>
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
              
              <div className="p-4 bg-custom-purple rounded-lg hover:bg-opacity-80 transition-all duration-300">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-3">
                  {expandedAnalysis.fundamental_analysis?.quarterly_eps_growth?.map((growth, index) => (
                    <div key={index} className="text-center p-2 bg-black rounded-lg">
                      <span className="block font-bold">Q{3 - index}</span>
                      <span className={`text-lg font-semibold ${growth > 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {(growth * 100).toFixed(1)}%
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-sm mt-2">{expandedAnalysis.fundamental_analysis?.quarterly_eps_growth_trend}</p>
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
                  <p className="text-sm">{expandedAnalysis.fundamental_analysis?.annual_growth_trend}</p>
                </div>
                <div className="p-3 bg-custom-purple rounded-lg hover:bg-opacity-80 transition-all duration-300">
                  <div className="flex items-center mb-2">
                    <div className="bg-black rounded-full w-12 h-12 flex items-center justify-center mr-2">
                      <span className="text-sm">🏢</span>
                    </div>
                    <h4 className="font-bold">Industry Position</h4>
                  </div>
                  <p className="text-sm">{expandedAnalysis.fundamental_analysis?.industry_position}</p>
                </div>
              </div>
            </div>

            {/* Sector Performance */}
            <div className="p-3 bg-custom-purple rounded-lg hover:bg-opacity-80 transition-all duration-300">
              <h4 className="font-bold mb-2">Sector Performance</h4>
              <p className="text-sm">{expandedAnalysis.fundamental_analysis?.sector_performance}</p>
            </div>
          </div>

          {/* Institutional Ownership */}
          <div className="border-t border-custom-purple py-4">    
              <div className="flex flex-col items-center justify-center p-4 mb-4">
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
                    {expandedAnalysis.institutional_ownership?.institutional_ownership || 'No ownership data available'}
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
                    {expandedAnalysis.institutional_ownership?.institutional_ownership_trend || 'No trend data available'}
                  </p>
                </div>
              </div>
          </div>

          {/* Market Analysis */}
          <div className="border-t border-custom-purple py-4">
            {/* Market Analysis Title */}
            <div className="flex flex-col items-center justify-center p-4 mb-4">
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
                  expandedAnalysis.market_analysis?.market_sentiment?.toLowerCase().includes('bullish') ? 'text-green-400' :
                  expandedAnalysis.market_analysis?.market_sentiment?.toLowerCase().includes('bearish') ? 'text-red-400' :
                  'text-yellow-400'
                }`}>
                  {expandedAnalysis.market_analysis?.market_sentiment || 'N/A'}
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
                  expandedAnalysis.market_analysis?.market_trend?.toLowerCase().includes('up') ? 'text-green-400' :
                  expandedAnalysis.market_analysis?.market_trend?.toLowerCase().includes('down') ? 'text-red-400' :
                  'text-yellow-400'
                }`}>
                  {expandedAnalysis.market_analysis?.market_trend || 'N/A'}
                </div>
              </div>
            </div>
          </div>

          {/* Risk Assessment */}
          <div className="border-t border-custom-purple py-4">
            {/* Risk Assessment Title */}
            <div className="flex flex-col items-center justify-center p-4 mb-4">
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
                <p className="text-sm ml-11">{expandedAnalysis.risk_assessment?.market_conditions || 'N/A'}</p>
              </div>
              <div className="p-4 bg-custom-purple rounded-lg hover:bg-opacity-80 transition-all duration-300">
                <div className="flex items-center mb-2">
                  <div className="bg-black rounded-full w-12 h-12 flex items-center justify-center mr-3">
                    <span className="text-lg">⚠️</span>
                  </div>
                  <span className="text-xl font-bold">Technical Risks</span>
                </div>
                <p className="text-sm ml-11">{expandedAnalysis.risk_assessment?.technical_risks || 'N/A'}</p>
              </div>
              <div className="p-4 bg-custom-purple rounded-lg hover:bg-opacity-80 transition-all duration-300">
                <div className="flex items-center mb-2">
                  <div className="bg-black rounded-full w-12 h-12 flex items-center justify-center mr-3">
                    <span className="text-lg">🎯</span>
                  </div>
                  <span className="text-xl font-bold">Setup Risks</span>
                </div>
                <p className="text-sm ml-11">{expandedAnalysis.risk_assessment?.setup_risks || 'N/A'}</p>
              </div>
            </div>
          </div>

        </div>
      </div>
          
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard; 