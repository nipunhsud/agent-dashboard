const parseAIData = (data, setAnalysisData) => {
    try {
      // Handle case where data.response is already an object
      const analysis = typeof data.response === 'string' ? JSON.parse(data.response) : data.response;
      
      if (!analysis || !analysis.stock_summary) {
        console.error('Invalid analysis data structure:', analysis);
        throw new Error('Invalid analysis data structure');
      }

      const stockData = analysis.stock_summary;
      
      // Validate required fields
      if (!stockData.ticker) {
        console.error('Missing ticker in stock data:', stockData);
        throw new Error('Missing ticker in stock data');
      }

      // Set the analysis data for the chat feature with safe defaults
      setAnalysisData({
        ticker: stockData.ticker,
        trade_setup: {
          buy_point: stockData.trade_setup?.buy_point ?? null,
          target_price: stockData.trade_setup?.target_price ?? null,
          stop_loss: stockData.trade_setup?.stop_loss ?? null,
          setup_type: stockData.trade_setup?.setup_type ?? null
        },
        technical_analysis: {
          trend: stockData.technical_analysis?.trend ?? null,
          distance_from_52_week_high: stockData.technical_analysis?.distance_from_52_week_high ?? null,
          volume_analysis: stockData.technical_analysis?.volume_analysis ?? null,
          technical_setup_trigger_key_triggers: stockData.technical_analysis?.technical_setup_trigger_key_triggers ?? null,
          technical_setup_trigger_risk_factors: stockData.technical_analysis?.technical_setup_trigger_risk_factors ?? null
        },
        fundamental_analysis: {
          quarterly_eps_growth: stockData.fundamental_analysis?.quarterly_eps_growth ?? null,
          annual_growth_trend: stockData.fundamental_analysis?.annual_growth_trend ?? null,
          industry_position: stockData.fundamental_analysis?.industry_position ?? null,
          sector_performance: stockData.fundamental_analysis?.sector_performance ?? null
        },
        institutional_ownership: {
          institutional_ownership_trend: stockData.institutional_ownership?.institutional_ownership_trend ?? null
        },
        market_analysis: {
          market_sentiment: stockData.market_analysis?.market_sentiment ?? null,
          market_trend: stockData.market_analysis?.market_trend ?? null
        },
        risk_assessment: {
          market_conditions: stockData.risk_assessment?.market_conditions ?? null,
          technical_risks: stockData.risk_assessment?.technical_risks ?? null,
          setup_risks: stockData.risk_assessment?.setup_risks ?? null
        }
      });

      return stockData;
    } catch (error) {
      console.error('Error parsing AI data:', error);
      console.error('Raw data:', data);
      throw new Error(`Failed to parse stock analysis data: ${error.message}`);
    }
  };
  
  export default parseAIData;