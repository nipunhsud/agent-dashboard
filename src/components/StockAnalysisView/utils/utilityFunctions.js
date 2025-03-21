export const isValidTickerSymbol = (ticker) => {
  return /^[A-Z]{1,10}$/.test(ticker);
};

export const handlePrintAnalysis = (attachEventListeners) => {
  const analysisContent = document.getElementById('analysis-content');
  const originalContent = document.body.innerHTML;

  document.body.innerHTML = analysisContent.innerHTML;
  window.print();
  document.body.innerHTML = originalContent;

  attachEventListeners();
};

// const attachEventListeners = () => {
//     document.querySelector('.print-button').onclick = handlePrintAnalysis;
// };

export const handleShare = async (analysisData) => {
  try {
    if (navigator.share) {
      // Mobile share API
      await navigator.share({
        title: `${analysisData.ticker} Stock Analysis by Quanta AI`,
        text: ` Buy point: ${analysisData.trade_setup?.buy_point} Target Price: ${analysisData.trade_setup?.target_price} Stop Loss: ${analysisData.trade_setup?.stop_loss}`,
        triggers: analysisData.technical_analysis?.technical_setup_trigger_key_triggers,
        url: window.location.href
      });
    } else {
      // Fallback to copy link
      const url = window.location.href;
      await navigator.clipboard.writeText(url);

      alert("Link copied to clipboard!");
    }
  } catch (err) {
    console.error("Error sharing:", err);
  }
}; 