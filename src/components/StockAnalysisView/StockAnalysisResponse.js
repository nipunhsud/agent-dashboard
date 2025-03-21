import React, { useState, useEffect, useContext } from "react";

const StockAnalysisResponse = ({stockData}) => { 
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

export default StockAnalysisResponse;
