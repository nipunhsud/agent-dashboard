import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useStockAnalyses from '../../hooks/useStockAnalyses';
import useExpandedAnalysis from '../../hooks/useExpandedAnalysis';
import StockAnalysisCard from '../Shared/StockAnalysisCard/StockAnalysisCard';

const Dashboard = () => {
  const { stockAnalyses, loading, error, fetchStockAnalyses } = useStockAnalyses();
  const { expandedAnalysis, setExpandedAnalysis, closeExpandedView } = useExpandedAnalysis();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlTicker = params.get('ticker');
    fetchStockAnalyses(urlTicker);
  }, [fetchStockAnalyses]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-custom-purple mb-4"></div>
        <p className="text-custom-purple text-lg">Loading your analysis history...</p>
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
          <StockAnalysisCard analysis={expandedAnalysis} onClose={closeExpandedView} />
        </div>
      )}
    </div>
  );
};

export default Dashboard; 