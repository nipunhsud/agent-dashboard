const TradingRules = () => {

    return ( 
      <div className="absolute z-50 w-96 p-4 bg-[#0C0B0B] border border-[#f5f5f7] rounded-[12px] shadow-xl mt-2 right-0">
        <h3 className="font-bold mb-3 text-[#6366f1] text-[20px]">Buy Rules</h3>
        <ul className="list-decimal pl-4 mb-4 space-y-2 robotoFont text-[13px] text-[#f5f5f7]">
          <li>Concentrate on listed stocks that sell for more than $20 a share with institutional acceptance.</li>
          <li>Insist on increasing earnings per share in past 3-4 quarters and current quarterly earnings up at least 20%.</li>
          <li>Buy at new highs after sound correction and consolidation, with 50%+ above average volume.</li>
          <li>For confirmation, the stock has a strong technical setup, such as a breakout from a consolidation pattern.</li>
          <li>Base decisions on price points, not attachment</li>
        </ul>
        
        <h3 className="font-bold mb-3 text-[#6366f1] text-[20px]">Sell Rules</h3>
        <ul className="list-disc pl-4 space-y-2 robotoFont text-[13px] text-[#f5f5f7]">
          <li>Sell if price drops 8% below purchase price</li>
          <li>Set specific profit potential expectations</li>
          <li>Consider selling when P/E ratio doubles</li>
          <li>Don't hold losing positions based on emotions</li>
        </ul>
      </div>
    )
}

export default TradingRules;