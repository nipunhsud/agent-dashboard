const parseAIData = (data, setAnalysisData) => {
    const analysis = JSON.parse(data.response);
    const stockData = analysis.stock_summary;
  
    // Set the analysis data for the chat feature
    setAnalysisData({
      ticker: stockData.ticker,
      trade_setup: {
        buy_point: stockData.trade_setup?.buy_point,
        target_price: stockData.trade_setup?.target_price,
        stop_loss: stockData.trade_setup?.stop_loss,
        setup_type: stockData.trade_setup?.setup_type
      },
      technical_analysis: {
        trend: stockData.technical_analysis?.trend,
        distance_from_52_week_high: stockData.technical_analysis?.distance_from_52_week_high,
        volume_analysis: stockData.technical_analysis?.volume_analysis,
        technical_setup_trigger_key_triggers: stockData.technical_analysis?.technical_setup_trigger_key_triggers,
        technical_setup_trigger_risk_factors: stockData.technical_analysis?.technical_setup_trigger_risk_factors
      },
      fundamental_analysis: {
        quarterly_eps_growth: stockData.fundamental_analysis?.quarterly_eps_growth,
        annual_growth_trend: stockData.fundamental_analysis?.annual_growth_trend,
        industry_position: stockData.fundamental_analysis?.industry_position,
        sector_performance: stockData.fundamental_analysis?.sector_performance
      },
      institutional_ownership: {
        institutional_ownership_trend: stockData.institutional_ownership?.institutional_ownership_trend
      },
      market_analysis: {
        market_sentiment: stockData.market_analysis?.market_sentiment,
        market_trend: stockData.market_analysis?.market_trend
      },
      risk_assessment: {
        market_conditions: stockData.risk_assessment?.market_conditions,
        technical_risks: stockData.risk_assessment?.technical_risks,
        setup_risks: stockData.risk_assessment?.setup_risks
      }
    });
  
    return stockData;
  };
  
  export default parseAIData;