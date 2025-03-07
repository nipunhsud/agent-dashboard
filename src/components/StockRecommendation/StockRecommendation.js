import React, { useEffect } from 'react';
import useStockAnalyses from '../../hooks/useStockAnalyses';
import useExpandedAnalysis from '../../hooks/useExpandedAnalysis';
import StockRecommendationCard from './StockRecommendationCard/StockRecommendationCard';
import StockAnalysisCard from '../Shared/StockAnalysisCard/StockAnalysisCard';
import { Link, useNavigate } from 'react-router-dom';

const StockRecommendation = () => {
  const { stockAnalyses, loading, error, fetchStockAnalyses } = useStockAnalyses();
  const { expandedAnalysis, setExpandedAnalysis, closeExpandedView } = useExpandedAnalysis();
  const navigate = useNavigate();
  
  useEffect(() => {
    fetchStockAnalyses();
  }, [fetchStockAnalyses]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlTicker = params.get('ticker');
    fetchStockAnalyses(urlTicker);
  }, [fetchStockAnalyses]);

  const handleDetailsClick = (stock) => {
    navigate(`/stock/${stock.name}`);
  };

  // Dummy data for testing
  const dummyStockData = [
    {
      id: "1",
      name: "ONON",
      by: "Stock Analysis",
      price: 25.00,
      volume: 1500000,
      fiftyTwoWeekHigh: 30.00,
      fiftyTwoWeekLow: 20.00,
      recommendation: {
        action: "Buy",
        triggers: ["Strong earnings"],
        risk_factors: ["Market volatility"],
        risk_management: "Diversify",
        trade_setup: {
          buy_point: 28.00,
          target_price: 35.00,
          stop_loss: 24.00,
          setup_type: "Bullish"
        }
      },
      technicalAnalysis: {
        trend: "Uptrend",
        moving_averages: {
          ema_50: 26.00,
          ema_150: 24.00,
          ema_200: 23.00
        },
        volume_analysis: "Above average volume indicating buying pressure.",
        volatility_pattern: "Stable",
        distance_from_52_week_high: "Close to 52-week high",
        technical_setup: "Positive",
        technical_setup_trigger: "Volume increase",
        technical_setup_trigger_key_triggers: "Breakout",
        technical_setup_trigger_risk_factors: "Volatility"
      },
      fundamentalAnalysis: {
        quarterly_eps_growth: [1.5, 1.2, 1.3],
        quarterly_eps_growth_trend: "Positive",
        annual_growth_trend: "Strong",
        annual_eps_growth: [1.5, 1.6, 1.7],
        industry_position: "Leader",
        sector_performance: "Positive"
      },
      institutionalOwnership: {
        institutional_ownership: "High",
        institutional_ownership_trend: "Increasing"
      },
      marketAnalysis: {
        market_sentiment: "Positive",
        market_trend: "Uptrend",
        supply_demand_dynamics: "Balanced"
      },
      riskAssessment: {
        market_conditions: "Favorable",
        fundamentals_risks: "Low",
        technical_risks: "Moderate",
        volume_risks: "Low",
        setup_risks: "Low"
      }
    },
    {
      id: "2",
      name: "APP",
      by: "Stock Analysis",
      price: 15.00,
      volume: 500000,
      fiftyTwoWeekHigh: 20.00,
      fiftyTwoWeekLow: 10.00,
      recommendation: {
        action: "Hold",
        triggers: ["Stable growth"],
        risk_factors: ["Economic downturn"],
        risk_management: "Hedge",
        trade_setup: {
          buy_point: 18.00,
          target_price: 22.00,
          stop_loss: 14.00,
          setup_type: "Neutral"
        }
      },
      technicalAnalysis: {
        trend: "Neutral",
        moving_averages: {
          ema_50: 16.00,
          ema_150: 15.00,
          ema_200: 14.00
        },
        volume_analysis: "Average volume",
        volatility_pattern: "Stable",
        distance_from_52_week_high: "Moderate",
        technical_setup: "Neutral",
        technical_setup_trigger: "Stable",
        technical_setup_trigger_key_triggers: "None",
        technical_setup_trigger_risk_factors: "None"
      },
      fundamentalAnalysis: {
        quarterly_eps_growth: [0.5, 0.6, 0.7],
        quarterly_eps_growth_trend: "Stable",
        annual_growth_trend: "Moderate",
        annual_eps_growth: [0.5, 0.6, 0.7],
        industry_position: "Average",
        sector_performance: "Stable"
      },
      institutionalOwnership: {
        institutional_ownership: "Medium",
        institutional_ownership_trend: "Stable"
      },
      marketAnalysis: {
        market_sentiment: "Neutral",
        market_trend: "Stable",
        supply_demand_dynamics: "Balanced"
      },
      riskAssessment: {
        market_conditions: "Stable",
        fundamentals_risks: "Moderate",
        technical_risks: "Low",
        volume_risks: "Moderate",
        setup_risks: "Low"
      }
    },
    {
      id: "3",
      name: "BROS",
      by: "Stock Analysis",
      price: 50.00,
      volume: 2000000,
      fiftyTwoWeekHigh: 60.00,
      fiftyTwoWeekLow: 40.00,
      recommendation: {
        action: "Sell",
        triggers: ["Overvaluation"],
        risk_factors: ["High competition"],
        risk_management: "Sell short",
        trade_setup: {
          buy_point: 55.00,
          target_price: 65.00,
          stop_loss: 45.00,
          setup_type: "Bearish"
        }
      },
      technicalAnalysis: {
        trend: "Downtrend",
        moving_averages: {
          ema_50: 52.00,
          ema_150: 51.00,
          ema_200: 50.00
        },
        volume_analysis: "High volume indicating selling pressure.",
        volatility_pattern: "Volatile",
        distance_from_52_week_high: "Far",
        technical_setup: "Negative",
        technical_setup_trigger: "Sell-off",
        technical_setup_trigger_key_triggers: "High volume",
        technical_setup_trigger_risk_factors: "Volatility"
      },
      fundamentalAnalysis: {
        quarterly_eps_growth: [-0.5, -0.6, -0.7],
        quarterly_eps_growth_trend: "Negative",
        annual_growth_trend: "Weak",
        annual_eps_growth: [-0.5, -0.6, -0.7],
        industry_position: "Weak",
        sector_performance: "Negative"
      },
      institutionalOwnership: {
        institutional_ownership: "Low",
        institutional_ownership_trend: "Decreasing"
      },
      marketAnalysis: {
        market_sentiment: "Negative",
        market_trend: "Downtrend",
        supply_demand_dynamics: "Imbalanced"
      },
      riskAssessment: {
        market_conditions: "Unfavorable",
        fundamentals_risks: "High",
        technical_risks: "High",
        volume_risks: "High",
        setup_risks: "High"
      }
    },
    {
      id: "4",
      name: "NVDA",
      by: "Stock Analysis",
      price: 200.00,
      volume: 3000000,
      fiftyTwoWeekHigh: 250.00,
      fiftyTwoWeekLow: 150.00,
      recommendation: {
        action: "Buy",
        triggers: ["Innovation"],
        risk_factors: ["Supply chain issues"],
        risk_management: "Long-term hold",
        trade_setup: {
          buy_point: 220.00,
          target_price: 270.00,
          stop_loss: 180.00,
          setup_type: "Bullish"
        }
      },
      technicalAnalysis: {
        trend: "Uptrend",
        moving_averages: {
          ema_50: 210.00,
          ema_150: 205.00,
          ema_200: 200.00
        },
        volume_analysis: "Strong volume indicating buying interest.",
        volatility_pattern: "Stable",
        distance_from_52_week_high: "Close",
        technical_setup: "Positive",
        technical_setup_trigger: "Breakout",
        technical_setup_trigger_key_triggers: "High volume",
        technical_setup_trigger_risk_factors: "Volatility"
      },
      fundamentalAnalysis: {
        quarterly_eps_growth: [2.0, 2.1, 2.2],
        quarterly_eps_growth_trend: "Strong",
        annual_growth_trend: "Very strong",
        annual_eps_growth: [2.0, 2.1, 2.2],
        industry_position: "Leader",
        sector_performance: "Positive"
      },
      institutionalOwnership: {
        institutional_ownership: "Very High",
        institutional_ownership_trend: "Increasing"
      },
      marketAnalysis: {
        market_sentiment: "Positive",
        market_trend: "Uptrend",
        supply_demand_dynamics: "Balanced"
      },
      riskAssessment: {
        market_conditions: "Favorable",
        fundamentals_risks: "Low",
        technical_risks: "Moderate",
        volume_risks: "Low",
        setup_risks: "Low"
      }
    }
  ];

  // Use dummy data for testing
  

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center py-4">
        Error loading analyses: {error}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {stockAnalyses.map((stockData) => {
        const analysis = stockData.analysis;
        const ticker = analysis.stock_summary.ticker;

        return (
          <StockRecommendationCard
            key={stockData.id}
            stock={{
              id: stockData.id,
              name: ticker,
              by: "Stock Analysis",
              price: analysis.stock_summary.current_metrics.price,
              volume: analysis.stock_summary.current_metrics.volume,
              fiftyTwoWeekHigh: analysis.stock_summary.current_metrics.fifty_two_week?.high,
              fiftyTwoWeekLow: analysis.stock_summary.current_metrics.fifty_two_week?.low,
              recommendation: {
                action: analysis.stock_summary.recommendation.action,
                triggers: analysis.stock_summary.recommendation.triggers,
                risk_factors: analysis.stock_summary.recommendation.risk_factors,
                risk_management: analysis.stock_summary.recommendation.risk_management,
                trade_setup: analysis.stock_summary.trade_setup
              },
              technicalAnalysis: analysis.stock_summary.technical_analysis,
              fundamentalAnalysis: analysis.stock_summary.fundamental_analysis,
              institutionalOwnership: analysis.stock_summary.institutional_ownership,
              marketAnalysis: analysis.stock_summary.market_analysis,
              riskAssessment: analysis.stock_summary.risk_assessment
            }}
            onDetailsClick={handleDetailsClick}
          />
        );
      })}

      {expandedAnalysis && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <StockAnalysisCard analysis={expandedAnalysis} onClose={closeExpandedView} />
        </div>
      )}
    </div>
  );
};

export default StockRecommendation;
